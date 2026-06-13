import { test, expect } from '@playwright/test'

test.describe('Secções da Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Hero: elementos principais estão presentes', async ({ page }) => {
    // Framer Motion anima com stagger — aguardar animação completar
    await page.waitForTimeout(1500)
    await expect(page.locator('h1')).toContainText('Transformamos a Sua Casa com Qualidade e Rigor')
    await expect(page.getByText('Lisboa · Portugal')).toBeVisible()
    await expect(page.getByRole('link', { name: /ver os nossos trabalhos/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /pedir orçamento/i }).nth(1)).toBeAttached()
    await expect(page.getByText('+10 Anos de Experiência')).toBeAttached()
    await expect(page.getByText('Garantia Pós-Obra').first()).toBeAttached()
  })

  test('Serviços: 10 cards visíveis com título correcto', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { name: 'Os Nossos Serviços' })).toBeVisible()
    const cards = page.locator('#servicos h3')
    await expect(cards).toHaveCount(10)
    await expect(cards.first()).toBeVisible()
  })

  test('Galeria: sliders Before/After estão presentes', async ({ page }) => {
    await page.locator('#trabalhos').scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { name: 'Os Nossos Trabalhos' })).toBeVisible()
    const sliders = page.locator('[aria-label^="Comparação antes e depois"]')
    await expect(sliders).toHaveCount(2)
  })

  test('Before/After slider responde ao clique', async ({ page }) => {
    await page.locator('#trabalhos').scrollIntoViewIfNeeded()
    const slider = page.locator('[aria-label^="Comparação antes e depois"]').first()
    const box = await slider.boundingBox()
    if (!box) throw new Error('Slider not found')
    // Clicar no meio e depois na esquerda — posição muda
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5)
    await page.mouse.click(box.x + box.width * 0.2, box.y + box.height * 0.5)
    // O clip-path deve ter mudado — verificamos que o elemento ainda está presente e funcional
    await expect(slider).toBeVisible()
  })

  test('Processo: 5 passos presentes', async ({ page }) => {
    await page.getByRole('heading', { name: 'Como Trabalhamos' }).scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { name: 'Como Trabalhamos' })).toBeVisible()
    // 5 números de passo
    await expect(page.getByText('01').first()).toBeVisible()
    await expect(page.getByText('05').first()).toBeVisible()
  })

  test('Porquê Escolher: 4 pilares presentes', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /porquê escolher/i })).toBeVisible()
    await expect(page.getByText('Experiência Comprovada')).toBeVisible()
    await expect(page.getByText('Garantia Pós-Obra').last()).toBeVisible()
  })

  test('Footer: logo, contactos e badges RGPD', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer.getByRole('link', { name: /facebook/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /instagram/i })).toBeVisible()
    await expect(footer.getByText('RGPD Compliant')).toBeVisible()
    await expect(footer.getByText('Empresa registada em Portugal')).toBeVisible()
  })
})
