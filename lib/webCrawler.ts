import { scrapeUrl } from './webScraper';

export interface CrawledPage {
  url: string;
  title: string;
  content: string;
}

/**
 * Belirli bir domain içindeki tüm sayfaları tarar
 */
export class WebCrawler {
  private baseUrl: string;
  private baseDomain: string;
  private crawledUrls: Set<string>;
  private pages: CrawledPage[];
  private maxDepth: number;
  private maxPages: number;

  constructor(baseUrl: string, maxDepth: number = 2, maxPages: number = 20) {
    this.baseUrl = baseUrl;
    this.baseDomain = new URL(baseUrl).hostname;
    this.crawledUrls = new Set<string>();
    this.pages = [];
    this.maxDepth = maxDepth;
    this.maxPages = maxPages;
  }

  /**
   * Siteyi taramaya başla
   */
  async crawl(): Promise<CrawledPage[]> {
    console.log(`Starting crawl of ${this.baseUrl}...`);
    await this.crawlPage(this.baseUrl, 0);
    console.log(`Crawl complete. Found ${this.pages.length} pages.`);
    return this.pages;
  }

  /**
   * Tek bir sayfayı tara ve içerikleri topla
   */
  private async crawlPage(url: string, depth: number): Promise<void> {
    // Maksimum derinlik kontrolü
    if (depth > this.maxDepth) {
      return;
    }

    // Maksimum sayfa kontrolü
    if (this.pages.length >= this.maxPages) {
      return;
    }

    // Zaten taranmış mı?
    if (this.crawledUrls.has(url)) {
      return;
    }

    // Aynı domain içinde mi?
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname !== this.baseDomain) {
        return;
      }
    } catch {
      return;
    }

    console.log(`Crawling: ${url}`);

    // URL'yi işaretle
    this.crawledUrls.add(url);

    // Sayfayı oku
    const scraped = await scrapeUrl(url);
    
    if (!scraped) {
      return;
    }

    // Sayfayı listeye ekle
    this.pages.push({
      url: scraped.url,
      title: scraped.title,
      content: scraped.content,
    });

    // Sayfanın HTML'inden linkleri bul
    const links = this.extractLinks(scraped.html);

    // Her link için recursive crawl
    for (const link of links) {
      await this.crawlPage(link, depth + 1);
    }
  }

  /**
   * HTML içeriğinden linkleri çıkarır
   */
  private extractLinks(html: string): string[] {
    const links: string[] = [];
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;

    while ((match = hrefRegex.exec(html)) !== null) {
      const link = match[1];
      
      // Göreceli linkleri tam linke çevir
      if (link.startsWith('/')) {
        links.push(`${this.baseUrl}${link}`);
      } else if (link.startsWith('http://') || link.startsWith('https://')) {
        links.push(link);
      }
    }

    return links;
  }

  /**
   * Tüm taranan sayfaları birleştir
   */
  getCombinedContent(): string {
    let combined = '';
    
    this.pages.forEach((page, index) => {
      combined += `\n\n[Sayfa ${index + 1}: ${page.title}]\n`;
      combined += `URL: ${page.url}\n`;
      combined += `İçerik: ${page.content}\n`;
    });

    return combined;
  }

  /**
   * Taranan sayfaları getir
   */
  getPages(): CrawledPage[] {
    return this.pages;
  }
}

