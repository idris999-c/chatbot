import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { siteCache } from '@/lib/siteCache';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'dummy-key-for-build');

export async function POST(request: NextRequest) {
  try {
    // Check if Google API key is configured
    if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'dummy-key-for-build') {
      return NextResponse.json(
        { error: 'Google API key is not configured. Please set GOOGLE_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Site içeriklerini cache'den al (eğer yoksa tara)
    const cacheStatus = siteCache.getCrawlStatus();
    let siteContent = '';

    if (!cacheStatus.isCrawled && !cacheStatus.isCrawling) {
      // İlk çağrıda siteyi tara (async, arka planda devam eder)
      siteCache.crawlSite().catch(err => console.error('Crawl error:', err));
    } else if (cacheStatus.isCrawled && cacheStatus.pageCount > 0) {
      // Siteden taranan içerikleri al
      siteContent = siteCache.getCombinedContent();
    }
    // Eğer isCrawled=true ama pageCount=0 ise, site yapılandırılmamış demektir
    // Normal chatbot olarak devam eder

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
    });

    // Build system prompt
    let systemPrompt = '';
    
    // Eğer site içeriği varsa, AI'ya bildir
    if (siteContent) {
      systemPrompt += 'Sen sadece belirli bir web sitesinin içeriğinden cevap veren bir AI asistanısın.\n\n';
      systemPrompt += 'ÖNEMLİ KURALLAR:\n';
      systemPrompt += '1. SADECE aşağıdaki web sitesi içeriği ile ilgili sorulara cevap vereceksin\n';
      systemPrompt += '2. Site dışı hiçbir soruya cevap VERME\n';
      systemPrompt += '3. Site dışı bir soru sorulursa: "Üzgünüm, ben sadece [site adı] hakkında soruları cevaplayabilirim." de\n';
      systemPrompt += '4. Türkçe cevap ver, kısa ve net ol\n\n';
      systemPrompt += 'Web Sitesi İçeriği:\n';
      systemPrompt += siteContent;
      systemPrompt += '\n\nYukarıdaki web sitesi içeriğini kullanarak kullanıcının sorusunu cevapla.\n\n';
    } else {
      // Genel chatbot
      systemPrompt += 'Sen yardımcı bir AI asistanısın. Kullanıcılara Türkçe olarak yardımcı ol. Kısa ve net cevaplar ver.\n\n';
    }
    
    // Add previous conversation
    if (history && history.length > 0) {
      history.forEach((msg: any) => {
        if (msg.role === 'user') {
          systemPrompt += `Kullanıcı: ${msg.content}\n`;
        } else {
          systemPrompt += `Asistan: ${msg.content}\n`;
        }
      });
    }

    // Add current message
    systemPrompt += `Kullanıcı: ${message}\nAsistan:`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
    });
  } catch (error) {
    console.error('Google AI API error:', error);
    return NextResponse.json(
      { error: 'AI servisi şu anda kullanılamıyor' },
      { status: 500 }
    );
  }
}

