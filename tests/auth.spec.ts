import { test, expect } from '@playwright/test'

// Public test: verifies the login page renders correctly
test.describe('Auth — public checks', () => {
  test('LOGIN PAGE VISIBLE: shows email, password and submit', async ({ page }) => {
    await page.goto('/login')

    const email = page.getByRole('textbox', { name: /email/i })
    const password = page.getByRole('textbox', { name: /password/i })
    const submit = page.getByRole('button', { name: /sign in|sign up|submit/i })

    await expect(email).toBeVisible()
    await expect(password).toBeVisible()
    await expect(submit).toBeVisible()
  })
})

// Credentialed tests: skip if credentials are not provided
const TEST_EMAIL = process.env.TEST_USER_EMAIL
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD
const hasCredentials = Boolean(TEST_EMAIL && TEST_PASSWORD)

test.describe.configure({ mode: 'serial' })

test.describe('Auth — credentialed flows', () => {
  test.skip(!hasCredentials, 'Skipping credentialed auth tests: set TEST_USER_EMAIL and TEST_USER_PASSWORD')

  test('REDIRECT AFTER LOGIN: successful sign-in redirects to dashboard or /projects', async ({ page }) => {
    await page.goto('/login')

    await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL as string)
    await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD as string)

    await Promise.all([
      page.waitForURL(/\/(projects|$)/, { timeout: 10_000 }),
      page.getByRole('button', { name: /sign in/i }).click(),
    ])

    // Accept either root dashboard or /projects as the post-login landing
    await expect(page).toHaveURL(/\/(projects|$)/)
  })

  test('SIDEBAR NAVIGATION: sidebar links visible after login', async ({ page }) => {
    // Sign in via UI
    await page.goto('/login')
    await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL as string)
    await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD as string)

    await Promise.all([
      page.waitForURL(/\/(projects|$)/, { timeout: 10_000 }),
      page.getByRole('button', { name: /sign in/i }).click(),
    ])

    // Sidebar should contain accessible links inside the main navigation
    const nav = page.getByRole('navigation', { name: /main navigation/i })
    await expect(nav).toBeVisible()

    const overview = nav.getByRole('link', { name: /overview/i })
    const projects = nav.getByRole('link', { name: /projects/i })
    const settings = nav.getByRole('link', { name: /settings/i })

    await expect(overview).toBeVisible()
    await expect(projects).toBeVisible()
    await expect(settings).toBeVisible()
  })
})
