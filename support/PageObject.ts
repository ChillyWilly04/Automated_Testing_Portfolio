import { Page, Locator } from '@playwright/test';
import { environment } from '../env';

export class PageObject {
    readonly page: Page;
    public responseData?: any;
  
    constructor(page: Page) {
      this.page = page;
      
    }
    async getProductName(productName: Locator) {
      const name = await productName.first().innerText();
      return name;
    }

    async getProductPrice(productPrice: Locator): Promise<number> {
        const priceText = await productPrice.first().innerText();
        const priceMatch = priceText.match(/\d+([,.\s]?\d+)*(\.\d+)?/);
        const numericPrice = parseFloat((priceMatch ? priceMatch[0] : "")
          .replace(/[^\d.-]/g, ''));
        return numericPrice;
      }
    
}
