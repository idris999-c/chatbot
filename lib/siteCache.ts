import { WebCrawler, CrawledPage } from './webCrawler';
import { TARGET_SITE_URL } from './config';

/**
 * Site içeriklerini hafızada tutan cache sistemi
 */
class SiteCache {
  private pages: CrawledPage[] = [];
  private isCrawled: boolean = false;
  private isCrawling: boolean = false;
  private targetUrl: string = '';

  /**
   * Siteyi tara ve cache'e kaydet
   */
  async crawlSite(url?: string): Promise<void> {
    // Eğer zaten taranıyor veya taranmışsa, tekrar tarama
    if (this.isCrawling || this.isCrawled) {
      return;
    }

    this.isCrawling = true;
    
    try {
      // URL belirleme
      this.targetUrl = url || TARGET_SITE_URL;
      
      if (!this.targetUrl) {
        console.warn('No target site URL configured. Chatbot will work as a normal assistant.');
        this.isCrawling = false;
        this.isCrawled = false; // Normal chatbot olarak çalışsın
        return;
      }

      console.log(`Starting site crawl for: ${this.targetUrl}`);

      // Crawler oluştur ve tara
      const crawler = new WebCrawler(this.targetUrl, 2, 20);
      this.pages = await crawler.crawl();

      if (this.pages.length > 0) {
        this.isCrawled = true;
        console.log(`Site crawl complete. Cached ${this.pages.length} pages.`);
      } else {
        console.warn('No pages crawled. Chatbot will work as a normal assistant.');
        this.isCrawled = false;
      }
    } catch (error) {
      console.error('Site crawl error:', error);
      this.isCrawled = false; // Hata durumunda normal chatbot olarak çalış
    } finally {
      this.isCrawling = false;
    }
  }

  /**
   * Taranan içerikleri getir
   */
  getPages(): CrawledPage[] {
    return this.pages;
  }

  /**
   * Tüm içerikleri birleştir
   */
  getCombinedContent(): string {
    if (this.pages.length === 0) {
      return '';
    }

    let combined = 'Web sitesinden taranan içerikler:\n\n';
    
    this.pages.forEach((page, index) => {
      combined += `[Sayfa ${index + 1}: ${page.title}]\n`;
      combined += `URL: ${page.url}\n`;
      combined += `İçerik: ${page.content}\n\n`;
    });

    return combined;
  }

  /**
   * Cache'i temizle
   */
  clear(): void {
    this.pages = [];
    this.isCrawled = false;
    this.isCrawling = false;
  }

  /**
   * Taranma durumu
   */
  getCrawlStatus(): { isCrawled: boolean; isCrawling: boolean; pageCount: number } {
    return {
      isCrawled: this.isCrawled,
      isCrawling: this.isCrawling,
      pageCount: this.pages.length,
    };
  }
}

// Singleton instance
export const siteCache = new SiteCache();

