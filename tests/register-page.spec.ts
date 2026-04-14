import { test, expect } from './fixtures';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { generateRandomEmail, generateRandomPassword } from './utils/helpers';

async function fillAndSubmitForm(
  registerPage: RegisterPage,
  email: string,
  password: string,
  selectConsent: boolean = true
) {
  await registerPage.fillEmail(email);
  await registerPage.fillPassword(password);
  if (selectConsent) {
    await registerPage.selectConsentCheckbox();
  }
  await registerPage.registerButton.click();
}

test.beforeEach(async ({ basePage }) => {
  await expect(basePage).toHaveURL(/\/login\/?$/);
  const loginPage = new LoginPage(basePage);
  await loginPage.joinHereLink.click();
});

test('registers with valid credentials @smoke', async ({ registerPage }) => {
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  await test.step('Fill registration form with valid credentials', async () => {
    await fillAndSubmitForm(registerPage, email, password);
  });

  await test.step('Verify verification popup appears', async () => {
    await expect(registerPage.verificationPopup).toBeVisible();
    await expect(registerPage.verificationPopup).toContainText('Verification code sent');
  });
});

test('shows error when required fields are empty @smoke', async ({ registerPage, basePage }) => {
  await test.step('Tab through empty form fields', async () => {
    await expect(registerPage.emailInput).toBeFocused();
    await registerPage.emailInput.press('Tab');
    await basePage.keyboard.press('Tab');
  });

  await test.step('Verify validation errors for empty fields', async () => {
    await expect(registerPage.validationError).toHaveCount(2);
    await expect(registerPage.validationError).toHaveText(['Required field', 'Required field']);
  });
});

test('shows error when email is invalid', async ({ registerPage }) => {
  await test.step('Fill email with invalid format', async () => {
    await registerPage.fillEmail('invalid-email');
  });

  await test.step('Verify invalid email error message', async () => {
    await expect(registerPage.validationError).toHaveText('Invalid e-mail');
  });
});

test('shows error when consent checkbox is not checked', async ({ registerPage }) => {
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  await test.step('Fill form without checking consent checkbox', async () => {
    await fillAndSubmitForm(registerPage, email, password, false);
  });

  await test.step('Verify consent checkbox validation error', async () => {
    await expect(registerPage.validationError).toContainText(['Required field']);
  });
});