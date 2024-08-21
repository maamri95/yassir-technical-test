import { test, expect, } from '@playwright/test';

test('Sort reservations by date', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  const firstReservationDate = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  // User clicks on date header to sort
  await page.getByRole('button', { name: 'Reservation date' }).click();
  // Then List of reservations is updated based on the sorting applied
  const sortedFirstReservationDate = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  await expect(sortedFirstReservationDate).not.toBe(firstReservationDate);
});

test('Sort reservations by status', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  const firstReservationId = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  // User clicks on status header to sort
  await page.getByRole('button', { name: 'Status' }).click();
  // Then List of reservations is updated based on the sorting applied
  const sortedFirstReservationId = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  await expect(sortedFirstReservationId).not.toBe(firstReservationId);
});

test('Sort reservations by shift', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  const firstReservationId = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  // User clicks on shift header to sort
  await page.getByRole('button', { name: 'Shift' }).click();
  // Then List of reservations is updated based on the sorting applied
  const sortedFirstReservationId = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  await expect(sortedFirstReservationId).not.toBe(firstReservationId);
});

test('Sort reservations by area', async ({ page }) => {
  // Given User is in the reservation list section
  await page.goto('/');
  const firstReservationId = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  // User clicks on area header to sort
  await page.getByRole('button', { name: 'Area' }).click();
  // Then List of reservations is updated based on the sorting applied
  const sortedFirstReservationId = await page.locator('tbody[class]').locator('tr').first().locator('td').first().innerText();
  await expect(sortedFirstReservationId).not.toBe(firstReservationId);
});
