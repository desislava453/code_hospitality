import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export type TestFixtures = {
  basePage: Page;
  loginPage: LoginPage;
  registerPage: RegisterPage;
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
  registerPage: async ({ basePage }, use) => {
    const registerPage = new RegisterPage(basePage);
    await use(registerPage);
  },
});

export { expect } from '@playwright/test';
