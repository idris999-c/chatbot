import * as cheerio from 'cheerio';

export interface ScrapedContent {
  title: string;
  content: string;
  html: string;
  url: string;
}

/**
 * Belirli bir URL'den web içeriğini çeker
 */
export async function scrapeUrl(url: string): Promise<ScrapedContent | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WebCrawler/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Title'ı al
    const title = $('title').text() || $('h1').first().text() || 'Başlık Yok';

    // Tüm metin içeriğini topla
    let content = '';

    // Önemli elementleri öncelikle al
    const importantTags = ['h1', 'h2', 'h3', 'p', 'article', 'main'];
    
    importantTags.forEach(tag => {
      $(tag).each((_, element) => {
        const text = $(element).text().trim();
        if (text) {
          content += text + '\n\n';
        }
      });
    });

    // Eğer içerik yeterli değilse, body'den al
    if (content.length < 100) {
      content = $('body').text().trim();
    }

    // Fazla boşlukları temizle
    content = content.replace(/\s+/g, ' ').trim();

    // İçerik çok uzunsa kısalt
    if (content.length > 5000) {
      content = content.substring(0, 5000) + '...';
    }

    return {
      title,
      content,
      html,
      url,
    };
  } catch (error) {
    console.error('Error scraping URL:', error);
    return null;
  }
}

/**
 * URL geçerliliğini kontrol eder
 */
export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * URL'yi normalize eder (başına https ekler vs)
 */
export function normalizeUrl(urlString: string): string {
  try {
    // Eğer zaten geçerli bir URL ise
    if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
      return urlString;
    }
    
    // Eğer başında www. yoksa http:// ekle
    if (!urlString.includes('://')) {
      return `https://${urlString}`;
    }
    
    return urlString;
  } catch {
    return urlString;
  }
}

