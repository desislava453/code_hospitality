import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly joinButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.joinButton = page.getByText('Join', { exact: true });
  }
}
