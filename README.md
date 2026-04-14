# Code Hospitality registration E2E tests
End-to-end (E2E) tests for the Code Hospitality registration page.

## First local run

Run these commands when setting up the project for the first time:

- `npm ci`
- `npx playwright install --with-deps`
- `npm run test:chromium`

## Test profiles

- `full`: runs all Playwright tests.
- `smoke`: runs only tests tagged with `@smoke`.

Available npm scripts:

- `npm run test:full` - Run all tests on all browsers
- `npm run test:smoke` - Run smoke tests on all browsers
- `npm run test:chromium` - Run all tests on Chromium only
- `npm run test:firefox` - Run all tests on Firefox only
- `npm run test:webkit` - Run all tests on WebKit only
- `npm run test:ui` - Run tests in UI mode
- `npm run test:headed` - Run tests in headed mode

## GitHub Actions profile selection

The Playwright workflow supports manual profile selection:

1. Open **Actions** in GitHub.
2. Select the **Playwright Tests** workflow.
3. Click **Run workflow**.
4. Choose `full` or `smoke` from the `profile` dropdown.
5. Choose `chromium`, `firefox`, `webkit`, or `all` from the `browser` dropdown.

For `push` and `pull_request`, the workflow runs the `full` profile on `chromium` by default.

When `browser=all`, the workflow runs chromium, firefox, and webkit in one job and publishes one hosted HTML index page with links to each browser report.

For single-browser runs, the workflow publishes a direct HTML Playwright report link in the Actions summary via GitHub Pages when running from main or master.

Note: enable GitHub Pages in repository settings (Build and deployment source: GitHub Actions) to use the hosted HTML report link.
