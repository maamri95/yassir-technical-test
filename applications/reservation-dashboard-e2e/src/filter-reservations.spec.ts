import { test, expect, } from '@playwright/test';

test('Filter reservations by date', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  // When User filters the reservations by date
  await page.getByRole('button', { name: 'Pick a date' }).click();
  await page.getByLabel('Go to previous month').click({
    clickCount: 72
  });
  await page.getByRole('gridcell', { name: '12' }).click();
  // Then List of reservations for the selected date are displayed
  // List of reservations for upcoming days are displayed
  await expect(await page.locator('tbody[class]').locator('tr')).toHaveCount(2);
});

test('Filter reservations by status', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  // When User filters the reservations by status
  await page.getByRole('combobox').first().click();
  await page.getByLabel('seated').click();
  // Then List of reservations for the selected status are displayed
  // List of reservations for upcoming days are displayed
  await expect(await page.locator('tbody[class]').locator('tr')).toHaveCount(4);
});

test('Filter reservations by shift', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  // When User filters the reservations by shift
  await page.getByRole('combobox').nth(1).click();
  await page.getByLabel('lunch').getByText('lunch').click();
  // Then List of reservations for the selected shift are displayed
  // List of reservations for upcoming days are displayed
  await expect(await page.locator('tbody[class]').locator('tr')).toHaveCount(10);
});

test('Filter reservations by area', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  // When User filters the reservations by area
  await page.getByRole('combobox').nth(2).click();
  await page.getByLabel('bar').click();
  // Then List of reservations for the selected area are displayed
  // List of reservations for upcoming days are displayed
  await expect(await page.locator('tbody[class]').locator('tr')).toHaveCount(11);
});
