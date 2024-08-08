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

  test('Cart is empty by default', async ({
    page,
  }) => {
    const homePage = new HomePageObject(page);
  
      await homePage.clickCartButton();
      await homePage.assertCartModalWindowIsVisible();
      await homePage.assertCartIsEmpty();
      await homePage.clickCloseButton();
      await homePage.assertCartModalWindowIsHidden();
  });