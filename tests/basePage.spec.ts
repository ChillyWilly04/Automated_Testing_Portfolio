import { test, expect } from '@playwright/test';
import { BasePageObject, HomePageObject } from '../support/pages';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.moyo.ua/ua/');
});

test.describe('Product Tests', () => {
  test('The name of the product card contains the partial name', async ({
    page,
  }) => {
    const basePage = new BasePageObject(page);

    await basePage.hoverCategoriesItem();
    await basePage.assertSubMenuIsVisible();
    const subMenuItem = await basePage.getNameOfSubMenuItem();
    await basePage.clickSubMenuItem();
    const headetTitle = await basePage.nameOfCatalogHeaderTitle();
    expect(subMenuItem).toEqual(headetTitle);

    await basePage.getPartialProductName();
    await basePage.fillSearchFieldWithPartialProductName();
    await basePage.assertAllProductCardContainPartialName(
      await basePage.getPartialProductName()
      );
  });

});









