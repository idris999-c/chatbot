import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

    // Get the Gemini model - Google AI Studio'da desteklenen model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
    });

    // Build conversation history with proper format
    let conversationHistory = 'Sen yardımcı bir AI asistanısın. Kullanıcılara Türkçe olarak yardımcı ol. Kısa ve net cevaplar ver.\n\n';
    
    // Add previous conversation
    if (history && history.length > 0) {
      history.forEach((msg: any) => {
        if (msg.role === 'user') {
          conversationHistory += `Kullanıcı: ${msg.content}\n`;
        } else {
          conversationHistory += `Asistan: ${msg.content}\n`;
        }
      });
    }

    // Add current message
    conversationHistory += `Kullanıcı: ${message}\nAsistan:`;

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
