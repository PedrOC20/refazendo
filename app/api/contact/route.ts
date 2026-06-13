import { Resend } from 'resend'
import { contactSchema, buildContactEmailHtml } from '@/lib/contact-schema'

const TO = process.env.CONTACT_DESTINATION_EMAIL ?? 'refazendo.mail@gmail.com'
const FROM = 'Refazendo <formulario@refazendo.pt>'

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: 'Formulário não configurado. Contacte-nos pelo telefone.' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const data = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: data.email,
      subject: `Novo pedido de orçamento — ${data.nome}`,
      html: buildContactEmailHtml(data),
    })
    if (result.error) throw new Error(result.error.message)
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] resend error:', err)
    return Response.json(
      { error: 'Ocorreu um erro ao enviar o pedido. Por favor tente novamente.' },
      { status: 500 },
    )
  }
}
