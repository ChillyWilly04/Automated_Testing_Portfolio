import { Page, Locator } from '@playwright/test';
import { environment } from '../env';

export class PageObject {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
}
