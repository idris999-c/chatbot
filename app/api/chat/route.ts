import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { scrapeUrl, isValidUrl, normalizeUrl } from '@/lib/webScraper';

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

    // URL tespiti için regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = message.match(urlRegex);
    let webContent = '';

    // Eğer mesajda URL varsa, içeriği çek
    if (urls && urls.length > 0) {
      for (const urlStr of urls) {
        const normalizedUrl = normalizeUrl(urlStr);
        if (isValidUrl(normalizedUrl)) {
          const scraped = await scrapeUrl(normalizedUrl);
          if (scraped) {
            webContent += `\n\n[Bir web sitesinden alınan içerik: ${scraped.title}]\n${scraped.content}\n[Bu içerik ${scraped.url} adresinden alınmıştır]\n\n`;
          }
        }
      }
    }

    // Get the Gemini model - Google AI Studio'da desteklenen model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
    });

    // Build conversation history with proper format
    let systemPrompt = 'Sen yardımcı bir AI asistanısın. Kullanıcılara Türkçe olarak yardımcı ol. Kısa ve net cevaplar ver.\n\n';
    
    // Eğer web içeriği varsa, AI'ya bildir
    if (webContent) {
      systemPrompt += 'ÖNEMLİ: Kullanıcı bir web sitesinden içerik paylaşmış. Bu içeriği dikkate alarak cevap ver.\n\n';
      systemPrompt += 'Web Sitesi İçeriği:\n' + webContent;
      systemPrompt += '\nYukarıdaki web içeriğini kullanarak kullanıcının sorusunu cevapla.\n\n';
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

    const conversationHistory = systemPrompt;

    const result = await model.generateContent(conversationHistory);
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
