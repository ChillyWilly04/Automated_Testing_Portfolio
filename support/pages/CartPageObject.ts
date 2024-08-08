import { Locator, expect } from '@playwright/test';
import { PageObject } from '../PageObject';
import { Helpers } from '../helpers/Helpers';

export class CartPageObject extends PageObject {
    private readonly cartSection: Locator = this.page.locator('div[data-header-title="<p>Оформлення замовлення за 3 кроки</p>"]');
    readonly productName: Locator = this.page.locator('.cart-item_content > a.product-link');
    readonly productPrice: Locator = this.page.locator('.cart-item_content .price-new');
  
    async assertCartSectionIsVisible() {
        await this.cartSection.waitFor({ state: 'visible' });
        await expect(this.cartSection).toBeVisible();
    }
}