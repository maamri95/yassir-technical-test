import { test, expect, } from '@playwright/test';


test('Search reservations by customer first name', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  // When User searches by first name of the reservation
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('yuri');
  // Displays the results for the specified first name in the list
  await expect(await page.locator('tbody[class]').locator('tr')).toHaveCount(1);
});

test('Search reservations by customer last name', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  // When User searches by last name of the reservation
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').nth(1).fill('spires');
  // Displays the results for the specified last name in the list
  await expect(await page.locator('tbody[class]').locator('tr')).toHaveCount(1);
});
