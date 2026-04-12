import { test, expect } from '@playwright/test';

test('login page is reachable', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveURL(/\/login\/?$/);
  await expect(page).toHaveTitle(/.+/);
});