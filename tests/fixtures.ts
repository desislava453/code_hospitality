import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

export type TestFixtures = {
  basePage: Page;
  loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
  basePage: async ({ page }, use) => {
    await page.goto('');
    await use(page);
  },
  loginPage: async ({ basePage }, use) => {
    const loginPage = new LoginPage(basePage);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
