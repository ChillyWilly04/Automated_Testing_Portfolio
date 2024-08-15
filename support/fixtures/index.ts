import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto('https://www.moyo.ua/ua/');
    await use(page);
  },
});

export { expect } from '@playwright/test';