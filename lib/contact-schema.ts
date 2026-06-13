import { z } from 'zod'

export const contactSchema = z.object({
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Endereço de email inválido'),
  telefone: z.string().min(9, 'O telefone deve ter pelo menos 9 dígitos'),
  servico: z.string().min(1, 'Por favor seleccione um serviço'),
  zona: z.string().min(1, 'Por favor seleccione uma zona'),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  comoEncontrou: z.string().min(1, 'Por favor seleccione uma opção'),
  privacidade: z.boolean().refine((val) => val === true, {
    message: 'Deve aceitar a política de privacidade',
  }),
  marketing: z.boolean().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildContactEmailHtml(data: ContactFormData) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;background:#F9F6F1;font-weight:600;width:180px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`

  return `<!doctype html>
<html lang="pt">
<head><meta charset="utf-8"><title>Novo pedido de orçamento</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#FFFFFF;color:#1A1A1A;margin:0;padding:24px">
  <div style="max-width:640px;margin:0 auto">
    <h1 style="font-family:Georgia,serif;font-size:22px;margin:0 0 4px">Novo pedido de orçamento</h1>
    <p style="color:#6B6B6B;margin:0 0 20px">Refazendo · formulário do site</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #EDE8DF;border-radius:6px;overflow:hidden">
      ${row('Nome', data.nome)}
      ${row('Email', data.email)}
      ${row('Telefone', data.telefone)}
      ${row('Tipo de serviço', data.servico)}
      ${row('Zona de Lisboa', data.zona)}
      ${row('Como nos encontrou', data.comoEncontrou)}
      ${row('Descrição', data.descricao)}
      ${row('Aceita marketing?', data.marketing ? 'Sim' : 'Não')}
    </table>
    <p style="color:#6B6B6B;font-size:12px;margin:24px 0 0">Responde directamente a este email para falar com o cliente — o Reply-To está definido.</p>
  </div>
</body>
</html>`
}
