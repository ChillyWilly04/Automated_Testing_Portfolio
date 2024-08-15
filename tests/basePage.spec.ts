import { test, expect } from '../support/fixtures';
import { BasePageObject, CartPageObject, HomePageObject } from '../support/pages';

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

  test('Add product item to compare section', async ({
    page,
  }) => {
    const basePage = new BasePageObject(page);

    await basePage.hoverCategoriesItem();
    await basePage.clickSubMenuItem();
    const itemCount = await basePage.clickCompareButtons(4);
    const countOfCompareProductCard = await basePage.assertCompareIconItemCount();
    expect(countOfCompareProductCard).toBe(itemCount);
    await basePage.goToCompareSection();
    const countOfProductItem = await basePage.getCountOfProductItem();
    expect(itemCount).toBe(countOfProductItem);
    await basePage.deleteAllProductCard();
    await basePage.assertCompareSectionIsEmpty();
  });

  test('Only those product items are displayed according to the selected filter options', async ({
    page,
  }) => {
    const basePage = new BasePageObject(page);

    await basePage.hoverCategoriesItem();
    await basePage.clickSubMenuItem();
    await basePage.clickFirstLabelOfFilterOptionMaker();
    await basePage.assertAllProductCardContainPartialName(
      await basePage.getMakerName()
      );
  });

  test('Add product item to the cart', async ({
    page,
  }) => {
    const basePage = new BasePageObject(page);
    const cartPage = new CartPageObject(page);

    await basePage.hoverCategoriesItem();
    await basePage.clickSubMenuItem();
    const productName = await basePage.getProductName(basePage.productName);
    const productPrice = await basePage.getProductPrice(basePage.priceProductCard);
    await basePage.addProductItemToCart();
    await cartPage.assertCartSectionIsVisible();
    const cartProductName = await cartPage.getProductName(cartPage.productName);
    expect(cartProductName).toBe(productName);

    const cartProductPrice = await basePage.getProductPrice(cartPage.productPrice);
    expect(cartProductPrice).toBe(productPrice);
  });

  test('Add a promo code to the cart', async ({
    page,
  }) => {
    const basePage = new BasePageObject(page);
    const cartPage = new CartPageObject(page);
    const homePage = new HomePageObject(page);
    
    await basePage.hoverCategoriesItem();
    await basePage.clickSubMenuItem();
    await basePage.addProductItemToCart();
    await cartPage.assertCartSectionIsVisible();
    await cartPage.fillPromoCode();
    await cartPage.assertErrorMessageIsVisible();
    await cartPage.confirmBtnIsDisabled();
    await cartPage.clickRemoveBtn();
    await homePage.clickCartButton();
    await homePage.assertCartModalWindowIsVisible();
    await homePage.assertCartIsEmpty();
  });

  test('Verify product card visibility and fetch status', async ({
    page,
  }) => {
    const basePage = new BasePageObject(page);

    await basePage.hoverCategoriesItem();
    await basePage.clickSubMenuItem();
    await basePage.assertProductCardIsVisible();
    const statusCode = await basePage.getLookupResponse();
    expect(statusCode).toBe(200);
  });
  
  test('Update product quantity in the cart', async ({ page }) => {
    const basePage = new BasePageObject(page);
    const cartPage = new CartPageObject(page);
  
    await basePage.hoverCategoriesItem();
    await basePage.clickSubMenuItem();
    const productPrice = await basePage.getProductPrice(basePage.priceProductCard);
    await basePage.addProductItemToCart();
  
    await cartPage.assertCartSectionIsVisible();
    await cartPage.updateProductQuantity();

    const currentQuantity = await cartPage.getCurrentQuantity();
    const updatedProductPrice = await cartPage.getTotalPrice();
  
    expect(updatedProductPrice).toBe(productPrice * currentQuantity);
  });

  test.skip('Only products within selected price range are displayed', async ({ page }) => {
    const basePage = new BasePageObject(page);
  
    await basePage.hoverCategoriesItem();
    await basePage.clickSubMenuItem();
    await basePage.applyPriceRangeFilter(70000, 90000);
    await basePage.assertAllFiltersAreApplied();
    await basePage.assertAllProductsWithinPriceRange(70000, 90000);
  });

});









