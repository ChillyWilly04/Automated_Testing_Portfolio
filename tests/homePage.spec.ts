import { test } from '@playwright/test';
import { HomePageObject } from '../support/pages';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.moyo.ua/ua/');
});
