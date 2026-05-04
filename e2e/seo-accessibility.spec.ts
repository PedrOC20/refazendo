import { test, expect } from '@playwright/test'

test.describe('SEO e Acessibilidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('meta title correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/Refazendo.*Lisboa/i)
  })

  test('meta description presente', async ({ page }) => {
    const desc = page.locator('meta[name="description"]')
    const content = await desc.getAttribute('content')
    expect(content).toContain('Lisboa')
    expect(content!.length).toBeGreaterThan(50)
  })

  test('lang="pt" no html', async ({ page }) => {
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'pt')
  })

  test('JSON-LD LocalBusiness presente', async ({ page }) => {
    const script = page.locator('script[type="application/ld+json"]')
    await expect(script).toBeAttached()
    const content = await script.textContent()
    expect(content).toContain('LocalBusiness')
    expect(content).toContain('Refazendo')
    expect(content).toContain('Lisboa')
  })

  test('imagem hero tem alt text', async ({ page }) => {
    const heroImg = page.locator('section').first().locator('img').first()
    const alt = await heroImg.getAttribute('alt')
    expect(alt).toBeTruthy()
    expect(alt!.length).toBeGreaterThan(10)
  })

  test('botões têm aria-label (hamburger no DOM com aria-label)', async ({ page }) => {
    // O CTA "Pedir Orçamento" tem aria-label
    const ctaBtn = page.locator('a[aria-label="Pedir orçamento gratuito"]').first()
    await expect(ctaBtn).toBeAttached()
    const label = await ctaBtn.getAttribute('aria-label')
    expect(label).toBeTruthy()
  })

  test('links de telefone são clicáveis (href=tel:)', async ({ page }) => {
    const telLinks = page.locator('a[href^="tel:"]')
    await expect(telLinks.first()).toBeAttached()
  })

  test('estrutura de headings correcta (h1 → h2 → h3)', async ({ page }) => {
    // Apenas 1 h1
    await expect(page.locator('h1')).toHaveCount(1)
    // h2 em cada secção principal (mínimo 5)
    const h2Count = await page.locator('h2').count()
    expect(h2Count).toBeGreaterThanOrEqual(5)
  })

  test('logo SVG tem role e aria-label', async ({ page }) => {
    const logo = page.locator('svg[role="img"]').first()
    await expect(logo).toBeAttached()
    const label = await logo.getAttribute('aria-label')
    expect(label).toContain('Refazendo')
  })
})
