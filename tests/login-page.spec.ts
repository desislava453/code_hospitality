import { test, expect } from './fixtures';
import { LoginPage } from './pages/LoginPage';

test('base url is loaded', async ({ basePage }) => {
  await expect(basePage).toHaveURL(/\/login\/?$/);
  const loginPage = new LoginPage(basePage);
  await loginPage.joinButton.click();
});