import { Locator, expect } from '@playwright/test';
import { PageObject } from '../PageObject';

export class HomePageObject extends PageObject {
    readonly catalogButton: Locator = this.page.locator('.header_catalog_btn');
    private readonly sideMenu: Locator = this.page.locator('.menu_wrapper');
    private readonly cartButton: Locator = this.page.locator('.header_actions').filter({ hasText: 'Кошик' });
    private readonly cartModalWindow: Locator = this.page.locator('.modal__container');
    private readonly iconEmptyCart: Locator = this.page.getByAltText('Ваш кошик порожній');
    private readonly closeCartModalWindow: Locator = this.page.locator('.modal__close');
    
    async clickCatalogButton() {
        await this.catalogButton.waitFor({ state: 'visible' });
        await this.catalogButton.click();
    }

    async isSideMenuActive(): Promise<boolean> {
        return this.sideMenu.evaluate((element) => element.classList.contains('active'));
    }

    async assertSideMenuIsVisible() {
        await this.sideMenu.waitFor({ state: 'visible' });
        const isActive = await this.isSideMenuActive();
        expect(isActive).toBe(true);
    }

    async clickCartButton() {
        await this.cartButton.waitFor({ state: 'visible' });
        await this.cartButton.click();
    }

    async assertCartModalWindowIsVisible() {
        await expect(this.cartModalWindow).toBeVisible();
    }

    async assertCartIsEmpty() {
        await expect(this.iconEmptyCart).toBeVisible();
    }

    async clickCloseButton() {
        await this.closeCartModalWindow.click();
    }

    async assertCartModalWindowIsHidden() {
        await expect(this.cartModalWindow).toBeHidden();
    }

}