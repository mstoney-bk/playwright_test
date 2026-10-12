const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('shows the page title', async ({ page }) => {
  await expect(page).toHaveTitle('Todo Demo');
});

test('adds a todo', async ({ page }) => {
  await page.fill('#todo-input', 'Buy milk');
  await page.click('button[type=submit]');
  await expect(page.locator('#todo-list li')).toHaveText(['Buy milk']);
});

test('ignores empty todos', async ({ page }) => {
  await page.click('button[type=submit]');
  await expect(page.locator('#todo-list li')).toHaveCount(0);
});

test('counts remaining items', async ({ page }) => {
  for (const item of ['One', 'Two', 'Three']) {
    await page.fill('#todo-input', item);
    await page.click('button[type=submit]');
  }
  await page.click('text=Two');
  await expect(page.locator('#count')).toHaveText('2 items');
});

test('slow test (shows up in Test Engine timings)', async ({ page }) => {
  await page.waitForTimeout(3000);
  await expect(page.locator('h1')).toHaveText('Todos');
});

// Fails about 30% of the time so Test Engine can detect it as flaky.
// Set FLAKY_RATE=0 to turn it off.
test('flaky test (for the demo)', async ({ page }) => {
  const rate = Number(process.env.FLAKY_RATE ?? 0.3);
  await expect(page.locator('h1')).toHaveText('Todos');
  expect(Math.random() >= rate, 'Random failure to demo flaky detection').toBe(true);
});
