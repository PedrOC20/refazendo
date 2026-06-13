import { test, expect } from '@playwright/test'

test.describe('Formulário de Contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contacto')
    await page.locator('#contacto').scrollIntoViewIfNeeded()
  })

  test('formulário está visível com todos os campos obrigatórios', async ({ page }) => {
    await expect(page.locator('#nome')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#telefone')).toBeVisible()
    await expect(page.locator('#descricao')).toBeVisible()
    await expect(page.getByRole('button', { name: /enviar pedido/i })).toBeVisible()
  })

  test('validação: erro ao submeter formulário vazio', async ({ page }) => {
    await page.getByRole('button', { name: /enviar pedido/i }).click()
    await expect(page.getByRole('alert').first()).toBeVisible()
    await expect(page.getByText(/pelo menos 2 caracteres/i)).toBeVisible()
  })

  test('validação: email inválido mostra erro', async ({ page }) => {
    await page.locator('#nome').fill('João Silva')
    await page.locator('#email').fill('nao-e-um-email')
    await page.getByRole('button', { name: /enviar pedido/i }).click()
    await expect(page.getByText(/endereço de email inválido/i)).toBeVisible()
  })

  test('validação: telefone curto mostra erro', async ({ page }) => {
    await page.locator('#nome').fill('João Silva')
    await page.locator('#email').fill('joao@exemplo.pt')
    await page.locator('#telefone').fill('123')
    await page.getByRole('button', { name: /enviar pedido/i }).click()
    await expect(page.getByText(/pelo menos 9 dígitos/i)).toBeVisible()
  })

  test('validação: checkbox RGPD obrigatório', async ({ page }) => {
    await page.locator('#nome').fill('João Silva')
    await page.locator('#email').fill('joao@exemplo.pt')
    await page.locator('#telefone').fill('+351912345678')
    await page.locator('#descricao').fill('Quero remodelar a minha casa de banho.')
    await page.locator('select#servico').selectOption('Casa de Banho')
    await page.locator('select#zona').selectOption('Estrela')
    await page.locator('select#comoEncontrou').selectOption('Google')
    await page.getByRole('button', { name: /enviar pedido/i }).click()
    await expect(page.getByText(/política de privacidade/i).filter({ hasText: /deve aceitar/i })).toBeVisible()
  })

  test('formulário não configurado mostra mensagem de erro amigável', async ({ page }) => {
    // Quando FORMSPREE não está configurado, deve mostrar mensagem sem crash
    await page.locator('#nome').fill('João Silva')
    await page.locator('#email').fill('joao@exemplo.pt')
    await page.locator('#telefone').fill('+351912345678')
    await page.locator('#descricao').fill('Quero remodelar a minha casa de banho.')
    await page.locator('select#servico').selectOption('Casa de Banho')
    await page.locator('select#zona').selectOption('Estrela')
    await page.locator('select#comoEncontrou').selectOption('Google')
    await page.getByLabel('Aceitar política de privacidade').check()
    await page.getByRole('button', { name: /enviar pedido/i }).click()
    // Com endpoint não configurado, deve mostrar erro (não crash)
    await expect(page.getByText(/formulário não configurado|ocorreu um erro|sem ligação/i)).toBeVisible()
  })
})
