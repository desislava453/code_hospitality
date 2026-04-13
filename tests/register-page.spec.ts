import { test, expect } from './fixtures';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { generateRandomEmail, generateRandomPassword } from './utils/helpers';

test.beforeEach(async ({ basePage }) => {
  await expect(basePage).toHaveURL(/\/login\/?$/);
  const loginPage = new LoginPage(basePage);
  await loginPage.joinHereLink.click();
});

test('registers with valid credentials', async ({ basePage }) => {
  const registerPage = new RegisterPage(basePage);
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  await registerPage.fillEmail(email);
  await registerPage.fillPassword(password);
  await registerPage.selectConsentCheckbox();
  await registerPage.registerButton.click();
  await expect(registerPage.verificationPopup).toBeVisible();
  await expect(registerPage.verificationPopup).toContainText('Verification code sent');
});