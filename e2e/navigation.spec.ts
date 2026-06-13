import { test, expect } from '@playwright/test'

test.describe('Navegação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('página carrega sem erros de consola críticos', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const critical = errors.filter(e =>
      !e.includes('hydration') && !e.includes('lastpass') && !e.includes('extension')
    )
    expect(critical).toHaveLength(0)
  })

  test('header está visível com logo e links', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(page.getByRole('link', { name: /Refazendo/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Serviços' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Pedir Orçamento' }).first()).toBeVisible()
  })

  test('links de âncora fazem scroll para a secção correcta', async ({ page }) => {
    await page.getByRole('link', { name: 'Serviços' }).click()
    await expect(page.locator('#servicos')).toBeInViewport({ ratio: 0.3 })
  })

  test('link "Pedir Orçamento" leva para o formulário', async ({ page }) => {
    await page.getByRole('link', { name: 'Pedir Orçamento' }).first().click()
    await expect(page.locator('#contacto')).toBeInViewport({ ratio: 0.3 })
  })

  test('todas as secções estão presentes na página', async ({ page }) => {
    await expect(page.locator('#servicos')).toBeAttached()
    await expect(page.locator('#trabalhos')).toBeAttached()
    await expect(page.locator('#contacto')).toBeAttached()
  })

  test('existe apenas um h1', async ({ page }) => {
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
    await expect(h1s).toContainText('Transformamos a Sua Casa')
  })
})
