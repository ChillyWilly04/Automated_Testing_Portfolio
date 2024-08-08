import { Locator, expect } from '@playwright/test';
import { PageObject } from '../PageObject';

export class BasePageObject extends PageObject {
    private readonly categoriesItem: Locator = this.page.locator('.catalog-menu li').filter({ hasText: 'Смартфони і телефони' });
    private readonly subMenu: Locator = this.categoriesItem.locator('.catalog-submenu-container');
    private readonly subMenuItem: Locator = this.subMenu.locator('.catalog-submenu-item').first();
    private readonly catalogHeaderTitle: Locator = this.page.locator('h1.catalog_head_title');
    private readonly productCard: Locator = this.page.locator('.product-card_image');
    readonly productName: Locator = this.page.locator('.product-card_title');
    private readonly searchField: Locator = this.page.locator('#search-input');
    private readonly compareBtnOfProductCard: Locator = this.page.locator('.product-card_compare-btn');
    private readonly compareBtn: Locator = this.page.locator('.header_actions_compare');
    private readonly deleteBtn: Locator = this.page.locator('.product-card_remove');
    private readonly compareSectionEmptyIcon: Locator = this.page.locator('.compare-empty');

    async hoverCategoriesItem() {
        await this.categoriesItem.waitFor({ state: 'visible' });
        await this.categoriesItem.hover();
    }

    async assertSubMenuIsVisible() {
        await expect(this.subMenu).toBeVisible();
    }

    async getNameOfSubMenuItem() {
        await this.subMenuItem.innerText();
    }

    async clickSubMenuItem() {
        await this.subMenuItem.click();
    }

    async nameOfCatalogHeaderTitle() {
        await this.catalogHeaderTitle.innerText();
    }

    async getPartialProductName() {
        await this.productCard.first().waitFor({ state: 'visible' });
        const name = await this.productName.first().innerText();
        const match = name.match(/Смартфон\s+(\w+)/);
        const nextWord = match?.[1] ?? '';
        return nextWord;
    }

    async fillSearchFieldWithPartialProductName() {
        const productName = await this.getPartialProductName();
    
        await this.searchField.click();
        await this.searchField.fill(productName);
        await this.page.keyboard.press('Enter');
    }

    async assertAllProductCardContainPartialName(comparableName: string) {
        const partialProductName = await comparableName.toUpperCase();
        const arrayOfProductNames = await this.productName.allTextContents();
        const productNames = arrayOfProductNames.map(name => name.toUpperCase());
        productNames.forEach(name => {
          expect(name).toContain(partialProductName);
          });
    }

    async clickCompareButtons(count) {
        for (let i = 0; i < count; i++) {
            await this.compareBtnOfProductCard.nth(i).click();
        }
        return count;
    }

    async assertCompareIconItemCount() {
        const itemCountText = await this.page.locator('.header_actions_item_count').innerText();
        const itemCount = parseInt(itemCountText, 10);
        return itemCount;
    }

    async goToCompareSection() {
        await this.compareBtn.click();
    }

    async getCountOfProductItem() {
        const countOfProductItem = await this.page.locator('.compare-table-header-item').count();
        return countOfProductItem;
    }

    async deleteAllProductCard() {
        const productCardCount = await this.productCard.count();
    
        for (let i = 0; i < productCardCount; i++) {
            await this.deleteBtn.first().click();
        }
    }

    async assertCompareSectionIsEmpty() {
        await expect(this.compareSectionEmptyIcon).toBeVisible();
    }

}
