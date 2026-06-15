import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { company, legal } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Refazendo',
  description:
    'Como a Refazendo recolhe, utiliza e protege os seus dados pessoais ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD).',
  alternates: { canonical: 'https://refazendo.pt/politica-de-privacidade' },
  robots: { index: true, follow: true },
}

const h2 = 'font-playfair text-2xl lg:text-3xl text-texto mt-12 mb-4'
const p = 'text-gray-700 leading-relaxed mb-4'
const ul = 'list-disc pl-6 space-y-2 text-gray-700 mb-4'
const link = 'text-terracota underline hover:text-terracota-dark'

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32 pb-20 bg-creme">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 border-b border-creme-dark pb-8">
            <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">
              Informação Legal
            </p>
            <h1 className="font-playfair text-4xl lg:text-5xl text-texto mb-3">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última actualização: {legal.lastUpdated}
            </p>
          </header>

          <section>
            <p className={p}>
              A {company.name} respeita a sua privacidade e está empenhada em proteger
              os dados pessoais que nos confia. Esta política explica que dados
              recolhemos, como os utilizamos e quais os seus direitos ao abrigo do
              Regulamento (UE) 2016/679 (RGPD) e da Lei n.º 58/2019.
            </p>

            <h2 className={h2}>1. Quem somos</h2>
            <p className={p}>
              A Refazendo é o nome comercial sob o qual{' '}
              <strong>{legal.controllerName}</strong> presta serviços de remodelação
              como trabalhador independente. O responsável pelo tratamento dos seus
              dados pessoais é:
            </p>
            <ul className={ul}>
              <li><strong>Nome:</strong> {legal.controllerName}</li>
              <li><strong>NIF:</strong> {legal.controllerNif}</li>
              <li><strong>Local:</strong> {legal.controllerLocation}</li>
              <li>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${company.email}`} className={link}>{company.email}</a>
              </li>
              <li>
                <strong>Telefone:</strong>{' '}
                <a href={`tel:${company.phone}`} className={link}>{company.phone}</a>
              </li>
            </ul>

            <h2 className={h2}>2. Que dados recolhemos</h2>
            <p className={p}>
              Recolhemos apenas os dados que nos fornece voluntariamente através do
              formulário de contacto presente nesta página:
            </p>
            <ul className={ul}>
              <li>Nome</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
              <li>Zona da obra (freguesia de Lisboa ou indicação equivalente)</li>
              <li>Tipo de serviço pretendido</li>
              <li>Descrição da obra ou intervenção</li>
              <li>Forma como nos encontrou (campo opcional para fins estatísticos)</li>
            </ul>
            <p className={p}>
              Não recolhemos dados sensíveis, dados de menores, nem fazemos perfis
              automatizados de visitantes do site.
            </p>

            <h2 className={h2}>3. Para que utilizamos os seus dados</h2>
            <p className={p}>
              Distinguimos duas finalidades, com bases legais e checkboxes próprios no
              formulário de contacto:
            </p>
            <p className={p}>
              <strong>a) Tratamento operacional</strong> — necessário para responder ao
              seu pedido (consentimento dado através do checkbox obrigatório):
            </p>
            <ul className={ul}>
              <li>Responder ao seu pedido de orçamento ou esclarecimento.</li>
              <li>Agendar e realizar a visita técnica ao local da obra.</li>
              <li>
                Comunicar consigo durante a execução da obra e no período de garantia
                pós-obra.
              </li>
              <li>
                Manter um registo interno de contactos comerciais para fins de
                organização e seguimento do pedido.
              </li>
            </ul>
            <p className={p}>
              <strong>b) Comunicações comerciais e newsletter</strong> — apenas se
              aceitar o checkbox opcional específico de marketing:
            </p>
            <ul className={ul}>
              <li>
                Envio de novidades sobre serviços, promoções pontuais e dicas
                relacionadas com remodelações.
              </li>
              <li>
                Pode retirar o consentimento a qualquer momento, sem que isso afecte a
                relação comercial com a Refazendo ou qualquer obra em curso.
              </li>
            </ul>
            <p className={p}>
              Não fazemos perfis automatizados, não cedemos os seus dados a terceiros
              para fins publicitários, nem utilizamos os seus dados para fins não
              relacionados com as finalidades acima.
            </p>

            <h2 className={h2}>4. Fundamento legal do tratamento</h2>
            <p className={p}>
              Cada finalidade tem um fundamento legal próprio, separado e independente:
            </p>
            <ul className={ul}>
              <li>
                <strong>Resposta ao pedido (operacional)</strong> — Art. 6.º, n.º 1,
                al. b) do RGPD (execução de diligências pré-contratuais) e al. a)
                (consentimento, dado através do checkbox obrigatório no formulário).
              </li>
              <li>
                <strong>Marketing e newsletter</strong> — Art. 6.º, n.º 1, al. a) do
                RGPD (consentimento expresso, específico e granular, dado através do
                checkbox opcional separado). Pode ser retirado a qualquer momento, sem
                qualquer impacto na restante relação com a Refazendo (ver ponto 8).
              </li>
            </ul>

            <h2 className={h2}>5. Com quem partilhamos os dados</h2>
            <p className={p}>
              Os dados submetidos através do formulário são entregues ao seguinte
              subcontratante, ao abrigo do Art. 28.º do RGPD:
            </p>
            <ul className={ul}>
              <li>
                <strong>Resend, Inc.</strong> (Delaware, EUA) — serviço de envio de
                emails transaccionais utilizado para nos entregar a mensagem que nos
                enviou. A Resend participa no{' '}
                <a href={legal.dpfUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  EU-US Data Privacy Framework
                </a>
                . A política de privacidade da Resend está disponível{' '}
                <a href={legal.resendPrivacyUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  aqui
                </a>.
              </li>
            </ul>
            <p className={p}>
              Para além desta entidade, os seus dados podem ser partilhados com
              autoridades públicas quando a lei o exigir. Não vendemos nem cedemos os
              seus dados a terceiros para fins comerciais.
            </p>

            <h2 className={h2}>6. Transferências internacionais</h2>
            <p className={p}>
              O envio do formulário implica uma transferência de dados para servidores
              da Resend, localizados nos Estados Unidos da América. Esta transferência
              é realizada ao abrigo do EU-US Data Privacy Framework, que foi
              reconhecido pela Comissão Europeia como mecanismo de garantia adequada
              (Decisão de Adequação de 10 de Julho de 2023).
            </p>

            <h2 className={h2}>7. Por quanto tempo guardamos os dados</h2>
            <ul className={ul}>
              <li>
                Contactos sem seguimento comercial: até <strong>24 meses</strong>{' '}
                após o último contacto.
              </li>
              <li>
                Clientes com obra adjudicada: durante o período legal de conservação
                de documentos contabilísticos e fiscais (mínimo 10 anos, nos termos do
                Código Comercial e da legislação fiscal aplicável).
              </li>
              <li>
                Dados utilizados para marketing e newsletter: até à retirada do
                consentimento ou após <strong>36 meses</strong> de inactividade
                (o que ocorrer primeiro).
              </li>
              <li>
                Após o decurso destes prazos, os dados são eliminados ou anonimizados.
              </li>
            </ul>

            <h2 className={h2}>8. Os seus direitos</h2>
            <p className={p}>
              Nos termos dos artigos 15.º a 22.º do RGPD, tem o direito a:
            </p>
            <ul className={ul}>
              <li>Aceder aos seus dados pessoais e obter cópia dos mesmos.</li>
              <li>Solicitar a rectificação de dados incorrectos ou desactualizados.</li>
              <li>
                Pedir o apagamento dos seus dados, quando já não sejam necessários
                para a finalidade que motivou a recolha.
              </li>
              <li>Solicitar a limitação ou opor-se ao tratamento.</li>
              <li>Exercer o direito à portabilidade dos dados.</li>
              <li>Retirar o consentimento a qualquer momento.</li>
            </ul>
            <p className={p}>
              Para exercer estes direitos, basta enviar um email para{' '}
              <a href={`mailto:${company.email}`} className={link}>{company.email}</a>,
              identificando-se de forma a permitir-nos confirmar a sua identidade.
              Responderemos no prazo máximo de 30 dias.
            </p>
            <p className={p}>
              Em particular para o consentimento de marketing: pode cancelar a
              subscrição em qualquer momento, bastando responder com{' '}
              <strong>&quot;cancelar&quot;</strong> a qualquer email comercial que receba, ou
              enviar essa indicação para{' '}
              <a href={`mailto:${company.email}`} className={link}>{company.email}</a>.
              Todas as comunicações comerciais incluirão sempre instruções claras de
              cancelamento.
            </p>

            <h2 className={h2}>9. Reclamação à autoridade de controlo</h2>
            <p className={p}>
              Sem prejuízo de qualquer outro recurso, tem o direito de apresentar
              reclamação à autoridade de controlo competente em Portugal:
            </p>
            <ul className={ul}>
              <li>
                <strong>Comissão Nacional de Protecção de Dados (CNPD)</strong>
              </li>
              <li>Av. D. Carlos I, 134, 1.º — 1200-651 Lisboa</li>
              <li>
                <a href={legal.cnpdUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  www.cnpd.pt
                </a>
              </li>
            </ul>

            <h2 className={h2}>10. Cookies</h2>
            <p className={p}>
              Este site <strong>não utiliza cookies</strong> de rastreamento,
              análise de tráfego, publicidade ou redes sociais. Os tipos de letra são
              servidos através da Google Fonts (apenas como ficheiros estáticos, sem
              cookies associadas) e as imagens da galeria são carregadas a partir da
              Unsplash. Caso, no futuro, sejam introduzidas ferramentas de analítica
              ou outras tecnologias com cookies, esta política será actualizada e
              será apresentado um pedido de consentimento prévio.
            </p>

            <h2 className={h2}>Alterações a esta política</h2>
            <p className={p}>
              Podemos actualizar esta política sempre que se justifique. A versão em
              vigor é sempre a publicada nesta página, indicada pela data de última
              actualização no topo.
            </p>

            <div className="mt-12 pt-8 border-t border-creme-dark">
              <Link href="/" className={`${link} inline-flex items-center gap-2`}>
                ← Voltar ao início
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
