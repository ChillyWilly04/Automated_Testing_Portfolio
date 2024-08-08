import { Locator, expect } from '@playwright/test';
import { PageObject } from '../PageObject';
import { Helpers } from '../helpers/Helpers';

export class CartPageObject extends PageObject {
    private readonly cartSection: Locator = this.page.locator('div[data-header-title="<p>Оформлення замовлення за 3 кроки</p>"]');
    readonly productName: Locator = this.page.locator('.cart-item_content > a.product-link');
    readonly productPrice: Locator = this.page.locator('.cart-item_content .price-new');
    private readonly promoCodeField = this.page.locator('input[name="promocode"]');
    private readonly confirmBtn = this.page.getByRole('button', { name: 'Оформити замовлення' });
    private readonly removeBtn = this.page.locator('.cart-items-list .remove');
  
    async assertCartSectionIsVisible() {
        await this.cartSection.waitFor({ state: 'visible' });
        await expect(this.cartSection).toBeVisible();
    }

    async fillPromoCode() {
        const promoCode: string = Helpers.generateRandomString(6);
    
        await this.promoCodeField.click();
        await this.promoCodeField.fill(promoCode);
        await this.page.keyboard.press('Enter');
    }

    async assertErrorMessageIsVisible() {
        await expect(this.page.locator('.error-message')).toBeVisible();
    }

    async confirmBtnIsDisabled() {
        await expect(this.confirmBtn).toHaveClass(
            'rds-btn btn--disabled'
          );
    }

    async clickRemoveBtn() {
        await this.removeBtn.click();
    }
}