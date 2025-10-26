import { NextRequest, NextResponse } from 'next/server';
import { scrapeUrl, isValidUrl, normalizeUrl } from '@/lib/webScraper';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // URL'yi normalize et
    const normalizedUrl = normalizeUrl(url);
    
    // URL geçerliliğini kontrol et
    if (!isValidUrl(normalizedUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // İçeriği çek
    const content = await scrapeUrl(normalizedUrl);

    if (!content) {
      return NextResponse.json(
        { error: 'Could not scrape content from URL' },
        { status: 500 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Web content API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch web content' },
      { status: 500 }
    );
  }
}

