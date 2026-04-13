import { Page, Locator, expect } from '@playwright/test';


export class RegisterPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly consentCheckbox: Locator;
  readonly verificationPopup: Locator;
  readonly requiredFieldError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'E-mail address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.registerButton = page.locator('button[type="submit"]');
    this.consentCheckbox = page.getByRole('checkbox');
    this.verificationPopup = page.locator('[id="verificationCodeForm"]');
    this.requiredFieldError = page.locator('.q-field__messages [role="alert"]');
  }

  async fillEmail(email: string): Promise<string> {
    await this.page.locator('.q-loading').waitFor({ state: 'hidden' });
    await this.emailInput.click();
    await this.emailInput.type(email, { delay: 50 });

    return email;
  }

  async fillPassword(password: string): Promise<string> {
    await this.page.locator('.q-loading').waitFor({ state: 'hidden' });
    await this.passwordInput.click();
    await this.passwordInput.type(password);

    return password;
  }

  async selectConsentCheckbox() {
    await expect(this.page.locator('.q-loading')).toBeHidden();
    await this.consentCheckbox.locator('.q-checkbox__inner').click();
    await expect(this.consentCheckbox).toHaveAttribute('aria-checked', 'true');
  }
}
