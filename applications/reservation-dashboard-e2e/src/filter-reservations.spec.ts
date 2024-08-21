import { test, expect } from '@playwright/test';

test.skip('Filter reservations', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  // When User filters the reservations by date
  await page.fill('input[name="date"]', '2022-01-01');
  await page.click('button[type="submit"]');
  // Then List of reservations for the selected date are displayed
  // List of reservations for upcoming days are displayed
  expect(await page.locator('h1').innerText()).toContain('Welcome');
});
