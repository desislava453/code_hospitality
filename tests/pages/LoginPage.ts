import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly joinHereLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.joinHereLink = page.getByRole('link', { name: 'Join here' });
  }
}
