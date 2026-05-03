# Refazendo — Landing Page Design Spec
**Date:** 2026-05-03  
**Status:** Approved

---

## 1. Project Overview

Landing page profissional para **Refazendo**, empresa de remodelações e reparações domésticas sediada em Lisboa. Objectivo: conversão (pedidos de orçamento), credibilidade, e visibilidade orgânica em Google PT.

---

## 2. Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Animações | Framer Motion |
| Formulário | React Hook Form + Zod |
| Form backend | Formspree (sem código de servidor) |
| Imagens | next/image (Unsplash URLs) |
| Fontes | Playfair Display (headings) + DM Sans (corpo) via Google Fonts |
| Ícones | Lucide React |
| SEO | Next.js 15 Metadata API nativa + JSON-LD manual |
| Deployment | Vercel |

---

## 3. Identidade Visual

### Logo
- **Tipo:** Símbolo geométrico + wordmark
- **Símbolo:** Casa abstracta formada por duas linhas diagonais que se cruzam (evoca "R" e transformação), traço fino
- **Wordmark:** "REFAZENDO" em DM Sans Light com letter-spacing largo
- **Formato:** SVG inline em `components/ui/Logo.tsx`, também exportado em `public/logo.svg`
- **Versões:** cor (terracota sobre creme) e inverso (creme sobre escuro para header com scroll)

### Paleta de Cores
```css
--terracota: #8B4513;   /* primária */
--creme:     #F9F6F1;   /* fundo */
--dourado:   #C9A96E;   /* accent */
--texto:     #1A1A1A;   /* quase-preto */
--cinzento:  #6B7280;   /* texto secundário */
```

### Tipografia
- **Headings:** Playfair Display (400, 700) — nunca Inter/Roboto/Arial
- **Corpo:** DM Sans (300, 400, 500)
- **Tracking largo** no wordmark e labels de secção

---

## 4. Estrutura de Ficheiros

```
app/
  layout.tsx                  ← fonts, metadata global, JSON-LD script
  page.tsx                    ← composição das 10 secções
  globals.css                 ← variáveis CSS, base styles

components/
  sections/
    Header.tsx
    Hero.tsx
    Services.tsx
    Gallery.tsx               ← Before/After + masonry
    Process.tsx
    Team.tsx
    Testimonials.tsx
    WhyUs.tsx
    ContactForm.tsx
    Footer.tsx
  ui/
    Logo.tsx                  ← SVG inline, props: variant (default|white)
    BeforeAfterSlider.tsx     ← drag handle, mouse + touch
    ServiceCard.tsx
    TestimonialCard.tsx
    TeamCard.tsx

lib/
  content.ts                  ← ÚNICO ficheiro a editar para textos/dados
  schema.ts                   ← JSON-LD builders

public/
  logo.svg
```

---

## 5. `lib/content.ts` — Dados Editáveis

Contém (tudo tipado com TypeScript):
- `company`: nome, tagline, telefone, email, morada, NIF, redes sociais
- `services[]`: ícone, título, descrição
- `team[]`: nome, cargo, bio curta, foto URL
- `testimonials[]`: nome, zona, texto, rating
- `processSteps[]`: ícone, título, descrição
- `whyUs[]`: ícone, título, descrição
- `lisbonParishes[]`: lista de freguesias para dropdown
- `beforeAfterPairs[]`: URLs before/after + legenda

---

## 6. Secções — Especificação Detalhada

### 6.1 Header
- `position: sticky top-0 z-50`
- Fundo: transparente → `backdrop-blur-md bg-creme/80` ao scroll (via `useScrollY`)
- Logo à esquerda, nav links âncora ao centro, CTA "Pedir Orçamento" à direita
- Mobile: hamburger → menu full-screen com `AnimatePresence` slide-down
- Links: `#servicos | #trabalhos | #equipa | #testemunhos | #contacto`

### 6.2 Hero
- Background: `next/image` com `priority`, `fill`, `object-cover`, overlay `bg-black/50`
- Unsplash query: `luxury interior renovation portugal bathroom`
- Layout centrado, texto branco
- Hierarquia: label pequena ("Lisboa · Portugal") → h1 grande → subtítulo → 2 CTAs → 3 badges
- Animação: `staggerChildren` 0.15s, `fadeInUp` para cada elemento
- h1: "Transformamos a Sua Casa com Qualidade e Rigor"
- Subtítulo: "Remodelações e reparações em Lisboa — do projeto à entrega, com garantia pós-obra"
- CTAs: "Ver os Nossos Trabalhos" (outline) + "Pedir Orçamento Grátis" (filled terracota)
- Badges: ✓ +10 Anos de Experiência | ✓ Orçamento Sem Compromisso | ✓ Garantia Pós-Obra

### 6.3 Serviços (`#servicos`)
- h2: "Os Nossos Serviços"
- Grid: 2col mobile / 4col desktop
- 8 serviços: Casas de Banho, Cozinhas, Apartamentos/Moradias, Reparações, Pinturas, Janelas/Portas, Electricidade/Canalização, Obras Gerais
- Cada `ServiceCard`: ícone Lucide (48px, terracota), h3, descrição 2 linhas
- Hover: `translateY(-4px)` + `box-shadow` elevado, transição 200ms

### 6.4 Antes & Depois (`#trabalhos`)
- h2: "Os Nossos Trabalhos"
- **BeforeAfterSlider:** 3 instâncias em grid, drag handle central com ícone ↔
  - Touch events + mouse events
  - Clip-path animado via `useState` + `onMouseMove`/`onTouchMove`
  - Legenda discreta abaixo de cada par
- **Galeria masonry:** 6-8 imagens Unsplash em `columns-2 md:columns-3`, gap uniforme
  - Queries: "interior renovation portugal", "kitchen remodel", "apartment renovation lisbon"

### 6.5 Processo de Trabalho
- h2: "Como Trabalhamos"
- 5 passos com ícone numerado + título + descrição
- Desktop: timeline horizontal com linha conectora SVG animada ao scroll
- Mobile: timeline vertical com linha lateral
- Animação: passos entram em sequência com `staggerChildren`

### 6.6 Equipa (`#equipa`)
- h2: "A Nossa Equipa"
- Grid 2col mobile / 4col desktop, 4 membros
- `TeamCard`: foto circular (80px), nome, cargo, bio 1 linha
- Fotos: Unsplash query "construction professional portrait"
- Nomes placeholder: João Silva, Carlos Ferreira, Ana Costa, Miguel Santos

### 6.7 Testemunhos (`#testemunhos`)
- h2: "O Que Dizem os Nossos Clientes"
- Grid 2col desktop / carousel mobile (scroll-snap)
- 4 `TestimonialCard`: 5 estrelas SVG (estilo Google), texto citação, nome, zona Lisboa
- Conteúdo realista em PT (ex: "Ficámos muito satisfeitos com a remodelação da casa de banho...")

### 6.8 Porquê Escolher-nos
- h2: "Porquê Escolher a Refazendo"
- Fundo: creme com textura subtil (pattern CSS ou imagem de baixa opacidade)
- Grid 2x2: Experiência Comprovada, Equipa Qualificada, Transparência Total, Garantia Pós-Obra
- Ícone grande (64px) em dourado, h3, parágrafo curto

### 6.9 Formulário (`#contacto`)
- h2: "Pedir Orçamento Gratuito"
- Campos obrigatórios marcados com *
- Campos: nome, email, telefone, tipo de serviço (dropdown), zona Lisboa (dropdown), descrição (textarea), como encontrou (dropdown), checkbox RGPD
- Validação: React Hook Form + Zod, mensagens de erro em PT
- Submit: POST para Formspree endpoint (comentário `// TODO: substituir FORMSPREE_ENDPOINT`)
- Success state: animação fade-in de mensagem de confirmação elegante
- Layout: 2col desktop (nome+email, telefone+serviço, zona+como), full-width mobile

### 6.10 Footer
- Logo + tagline ("Transformamos espaços, melhoramos vidas")
- 3 colunas: Links rápidos | Serviços | Contacto
- Contacto: telefone, email, morada Lisboa
- Redes sociais: Facebook + Instagram (ícones Lucide)
- Bottom bar: copyright + política de privacidade + badges (Empresa PT | RGPD)

---

## 7. SEO Técnico

### Metadata (`app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  title: "Refazendo | Remodelações e Reparações em Lisboa",
  description: "Empresa especializada em remodelações de casas de banho, cozinhas e apartamentos em Lisboa. Orçamento gratuito, sem compromisso. +10 anos de experiência.",
  keywords: ["remodelações Lisboa", "obras Lisboa", "casa de banho Lisboa", "remodelação cozinha Lisboa", "empresa de obras Lisboa", "Refazendo"],
  openGraph: { title, description, url, siteName, locale: "pt_PT", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://refazendo.pt" }
}
```

### JSON-LD (`lib/schema.ts`)
- `LocalBusiness`: name, description, url, telephone, address (Lisboa), areaServed
- `AggregateRating`: ratingValue 4.9, reviewCount 47
- `Service[]`: um por cada serviço principal

### Performance
- Hero image: `priority` prop
- Todas as imagens: `sizes` correcto por breakpoint
- Fontes: `display: swap`, `preconnect` para fonts.googleapis.com
- Scroll reveals: `once: true` para não re-animar

### Semântica HTML
- 1 `<h1>` único (Hero)
- `<h2>` em cada secção
- `<h3>` em cards e sub-itens
- `alt` descritivo em português em todas as imagens
- `aria-label` em botões de ícone e campos de formulário
- `<nav>`, `<main>`, `<footer>`, `<section>` correctos

---

## 8. Responsividade

| Breakpoint | Comportamento |
|-----------|--------------|
| 375px (mobile) | 1 coluna, hamburger menu, timeline vertical, formulário full-width |
| 640px (sm) | Serviços 2col |
| 768px (md) | Testemunhos 2col, Before/After 2col |
| 1024px (lg) | Nav desktop, Serviços 4col, timeline horizontal |
| 1280px (xl) | Max-width container, espaçamentos generosos |

BeforeAfterSlider: touch-friendly com `onTouchMove`, `touch-none` para evitar scroll conflict.

---

## 9. Decisões Tomadas

| Decisão | Escolha | Razão |
|---------|---------|-------|
| Form backend | Formspree | Zero manutenção, sem backend |
| Next.js version | 15 | Versão estável actual |
| Arquitectura | Componentes por secção + `lib/content.ts` | Fácil entrega ao cliente |
| Logo | Símbolo + wordmark | Versatilidade de marca |
| Animações | Framer Motion | Qualidade + API declarativa |
