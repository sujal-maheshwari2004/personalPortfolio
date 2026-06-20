import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home renders the hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Maheshwari/ })).toBeVisible();
});

test("command palette opens with the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  await expect(page.getByPlaceholder(/command or search/i)).toBeVisible();
});

test("terminal opens with backtick", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Backquote");
  await expect(page.getByLabel("terminal input")).toBeVisible();
});

test("theme toggle flips the dark class", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const before = await html.getAttribute("class");
  await page.getByRole("button", { name: /mode/i }).first().click();
  await expect.poll(async () => (await html.getAttribute("class")) !== before).toBe(true);
});

test("case study route renders", async ({ page }) => {
  await page.goto("/work/driftguard");
  await expect(page.getByRole("heading", { name: "DriftGuard" })).toBeVisible();
});

test("home has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter((v) => ["serious", "critical"].includes(v.impact));
  expect(serious).toEqual([]);
});
