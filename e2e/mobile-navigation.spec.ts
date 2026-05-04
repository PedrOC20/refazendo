import { test, expect } from '@playwright/test'

test.describe('Navegação Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hamburger menu abre e fecha', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /abrir menu/i })
    await expect(hamburger).toBeVisible()

    await hamburger.click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
    await expect(page.getByRole('button', { name: /fechar menu/i })).toBeVisible()

    await page.getByRole('button', { name: /fechar menu/i }).click()
    await expect(page.locator('#mobile-menu')).not.toBeVisible()
  })

  test('menu mobile fecha ao clicar num link', async ({ page }) => {
    await page.getByRole('button', { name: /abrir menu/i }).click()
    await expect(page.locator('#mobile-menu')).toBeVisible()

    await page.locator('#mobile-menu').getByRole('link', { name: 'Serviços' }).click()
    await expect(page.locator('#mobile-menu')).not.toBeVisible()
  })

  test('nav desktop está oculta em mobile', async ({ page }) => {
    const desktopNav = page.locator('nav[aria-label="Navegação principal"]')
    await expect(desktopNav).toBeHidden()
  })

  test('hero tem CTAs empilhados verticalmente em mobile', async ({ page }) => {
    const ctaContainer = page.locator('.flex-col.sm\\:flex-row').first()
    await expect(ctaContainer).toBeVisible()
  })
})
