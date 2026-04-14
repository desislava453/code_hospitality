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

test('shows error when required fields are empty', async ({ basePage }) => {
  const registerPage = new RegisterPage(basePage);

  await expect(registerPage.emailInput).toBeFocused();
  await registerPage.emailInput.press('Tab');
  await basePage.keyboard.press('Tab');

  await expect(registerPage.requiredFieldError).toHaveCount(2);
  await expect(registerPage.requiredFieldError).toHaveText(['Required field', 'Required field']);
});

test('shows error when email is invalid', async ({ basePage }) => {
  const registerPage = new RegisterPage(basePage);

  await registerPage.fillEmail('invalid-email');
  await expect(registerPage.requiredFieldError).toHaveText('Invalid e-mail');
});

test('shows error when leave the checkbox unchecked', async ({ basePage }) => {
  const registerPage = new RegisterPage(basePage);
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  await registerPage.fillEmail(email);
  await registerPage.fillPassword(password);
  await registerPage.registerButton.click();
  await expect(registerPage.requiredFieldError.nth(1)).toBeVisible();
  await expect(registerPage.requiredFieldError.nth(1)).toHaveText('Required field');
});

test('shows error when email is already registered', async ({ basePage }) => {
  const registerPage = new RegisterPage(basePage);
  const loginPage = new LoginPage(basePage);
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  await registerPage.fillEmail(email);
  await console.log(`Generated email: ${email}`);
  await registerPage.fillPassword(password);
  await registerPage.selectConsentCheckbox();
  await registerPage.registerButton.click();
  await expect(registerPage.verificationPopup).toBeVisible();

  // Attempt to register with the same email again
  await basePage.goBack({ waitUntil: 'domcontentloaded' });
  await loginPage.joinHereLink.click();
  await registerPage.fillEmail(email);
  await console.log(`Generated email: ${email}`);
  await registerPage.fillPassword(password);
  await registerPage.selectConsentCheckbox();
  await registerPage.registerButton.click();

  await expect(registerPage.errorBanner).toBeVisible();
  await expect(registerPage.errorBanner).toHaveText('User with this email already exist');
});