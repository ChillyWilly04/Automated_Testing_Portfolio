import { Locator, expect } from '@playwright/test';
import { PageObject } from '../PageObject';

export class HomePageObject extends PageObject {
    readonly catalogButton: Locator = this.page.locator('.header_catalog_btn');
    private readonly sideMenu: Locator = this.page.locator('.menu_wrapper');
    
    async clickCatalogButton() {
        await this.catalogButton.waitFor({ state: 'visible' });
        await this.catalogButton.click();
    }

    async isSideMenuActive(): Promise<boolean> {
        return this.sideMenu.evaluate((element) => element.classList.contains('active'));
    }

    async assertSideMenuIsVisible() {
        const isActive = await this.isSideMenuActive();
        expect(isActive).toBe(true);
    }

}