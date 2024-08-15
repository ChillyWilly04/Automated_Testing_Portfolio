import { test } from '../support/fixtures';
import { HomePageObject } from '../support/pages';

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