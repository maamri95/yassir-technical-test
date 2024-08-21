import { test, expect } from '@playwright/test';

test('Display the reservations as a list', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');

  // List of reservations for upcoming days are displayed
  await expect(await page.locator('tbody[class]').locator('tr')).toHaveCount(20);
});
