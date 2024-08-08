import { test } from '@playwright/test';
import { HomePageObject } from '../support/pages';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.moyo.ua/ua/');
});


test('Side menu is visible', async ({
    page,
  }) => {
    const homePage = new HomePageObject(page);
  
      await homePage.clickCatalogButton();
      await homePage.assertSideMenuIsVisible();
      
  });