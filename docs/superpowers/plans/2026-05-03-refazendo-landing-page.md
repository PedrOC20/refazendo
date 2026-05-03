# Refazendo Landing Page — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing page profissional completa para a Refazendo em Next.js 15, com logo SVG, 10 secções, animações Framer Motion, formulário via Formspree e SEO técnico completo.

**Architecture:** Componentes por secção em `components/sections/`, todos os textos e dados editáveis em `lib/content.ts`, componentes UI reutilizáveis em `components/ui/`. `'use client'` apenas onde há interactividade ou animações directas (Header, Hero, Gallery, Process, Testimonials, WhyUs, ContactForm e os UI cards animados).

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v3, Framer Motion v11, React Hook Form 7 + Zod 3, Lucide React, next/image

---

## Mapa de Ficheiros

| Ficheiro | Responsabilidade |
|---------|-----------------|
| `app/layout.tsx` | Metadata SEO, fontes Google, JSON-LD script |
| `app/page.tsx` | Composição das 10 secções |
| `app/globals.css` | CSS reset, scroll behaviour, base styles |
| `next.config.ts` | Remote patterns para Unsplash |
| `tailwind.config.ts` | Paleta Refazendo, variáveis de fonte |
| `lib/content.ts` | Todos os textos, dados e URLs de imagens — único ficheiro a editar |
| `lib/schema.ts` | JSON-LD LocalBusiness + AggregateRating |
| `public/logo.svg` | Logo SVG estático |
| `components/ui/Logo.tsx` | Logo React inline, variante `default` / `white` |
| `components/ui/BeforeAfterSlider.tsx` | Slider interactivo mouse + touch com clip-path |
| `components/ui/ServiceCard.tsx` | Card de serviço com hover lift |
| `components/ui/TeamCard.tsx` | Card de membro da equipa |
| `components/ui/TestimonialCard.tsx` | Card de testemunho com estrelas |
| `components/sections/Header.tsx` | Nav sticky blur, hamburger mobile |
| `components/sections/Hero.tsx` | Hero fullscreen, stagger animations |
| `components/sections/Services.tsx` | Grid 8 serviços |
| `components/sections/Gallery.tsx` | Before/After sliders + masonry grid |
| `components/sections/Process.tsx` | Timeline 5 passos (H desktop / V mobile) |
| `components/sections/Team.tsx` | Grid 4 membros equipa |
| `components/sections/Testimonials.tsx` | Grid desktop / carousel mobile |
| `components/sections/WhyUs.tsx` | 4 pilares de confiança |
| `components/sections/ContactForm.tsx` | Formulário Formspree + React Hook Form + Zod |
| `components/sections/Footer.tsx` | Footer com contacto, links, badges RGPD |

---

### Task 1: Scaffold do projecto e dependências

**Files:**
- Create: projecto via `create-next-app`
- Modify: `package.json` (dependências adicionais)

- [ ] **Step 1: Criar o projecto Next.js 15**

```bash
cd /Users/pedroc20/code/PedrOC20/refazendo
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

Expected: estrutura App Router criada, sem erros.

- [ ] **Step 2: Instalar dependências**

```bash
npm install framer-motion react-hook-form @hookform/resolvers zod lucide-react
```

Expected: `node_modules` actualizado sem erros.

- [ ] **Step 3: Verificar que o dev server arranca**

```bash
npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected: `200`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 with framer-motion, react-hook-form, zod, lucide-react"
```

---

### Task 2: Configurar next.config.ts, Tailwind e globals.css

**Files:**
- Modify: `next.config.ts`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Substituir next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 2: Substituir tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracota: {
          DEFAULT: '#8B4513',
          light: '#A0522D',
          dark: '#6B3410',
        },
        creme: {
          DEFAULT: '#F9F6F1',
          dark: '#EDE8DF',
        },
        dourado: {
          DEFAULT: '#C9A96E',
          light: '#D4BA88',
          dark: '#B8934A',
        },
        texto: '#1A1A1A',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Substituir app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-creme text-texto font-sans;
  }

  h1, h2, h3, h4 {
    @apply font-playfair;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 4: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros de tipagem.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind palette, fonts and Unsplash remote patterns"
```

---

### Task 3: Criar lib/content.ts

**Files:**
- Create: `lib/content.ts`

- [ ] **Step 1: Criar lib/content.ts com todos os dados editáveis**

```typescript
// ============================================================
// lib/content.ts
// ÚNICO FICHEIRO A EDITAR para actualizar textos, dados da
// empresa, equipa, testemunhos, serviços e imagens.
// ============================================================

import {
  Bath, ChefHat, Home, Wrench, Paintbrush, DoorOpen,
  Zap, HardHat, Award, Users, Eye, Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const company = {
  name: 'Refazendo',
  tagline: 'Transformamos espaços, melhoramos vidas',
  phone: '+351 912 345 678',
  email: 'geral@refazendo.pt',
  address: 'Lisboa, Portugal',
  facebook: 'https://facebook.com/refazendo',
  instagram: 'https://instagram.com/refazendo',
}

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  slug: string
}

export const services: Service[] = [
  {
    icon: Bath,
    title: 'Remodelação de Casas de Banho',
    description: 'Transformamos a sua casa de banho com materiais de qualidade e acabamentos premium.',
    slug: 'casas-de-banho',
  },
  {
    icon: ChefHat,
    title: 'Remodelação de Cozinhas',
    description: 'Cozinhas funcionais e elegantes, desenhadas para o seu estilo de vida.',
    slug: 'cozinhas',
  },
  {
    icon: Home,
    title: 'Apartamentos e Moradias',
    description: 'Remodelação completa de espaços residenciais, do projecto à entrega.',
    slug: 'apartamentos',
  },
  {
    icon: Wrench,
    title: 'Reparações e Manutenção',
    description: 'Serviço rápido e eficaz para todas as reparações do lar.',
    slug: 'reparacoes',
  },
  {
    icon: Paintbrush,
    title: 'Pinturas Interiores e Exteriores',
    description: 'Acabamentos perfeitos com tintas de alta qualidade e aplicação profissional.',
    slug: 'pinturas',
  },
  {
    icon: DoorOpen,
    title: 'Janelas e Portas',
    description: 'Substituição e instalação de caixilharia com critérios de eficiência energética.',
    slug: 'janelas-portas',
  },
  {
    icon: Zap,
    title: 'Electricidade e Canalização',
    description: 'Instalações eléctricas e canalizações certificadas e em conformidade.',
    slug: 'electricidade',
  },
  {
    icon: HardHat,
    title: 'Obras Gerais de Construção',
    description: 'Obras estruturais e de ampliação com rigor técnico e respeito pelos prazos.',
    slug: 'obras-gerais',
  },
]

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
}

export const team: TeamMember[] = [
  {
    name: 'João Silva',
    role: 'Mestre de Obras',
    bio: '+15 anos de experiência em obras residenciais em Lisboa.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Carlos Ferreira',
    role: 'Especialista em Azulejos',
    bio: 'Artesão certificado com formação em técnicas tradicionais e contemporâneas.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Ana Costa',
    role: 'Gestora de Projecto',
    bio: 'Coordena cada obra garantindo prazos, qualidade e comunicação constante.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Miguel Santos',
    role: 'Electricista Certificado',
    bio: 'Instalações eléctricas residenciais e comerciais, com certificação CERTIEL.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  },
]

export interface Testimonial {
  name: string
  zone: string
  text: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Maria Rodrigues',
    zone: 'Cascais',
    text: 'Ficámos absolutamente encantados com o resultado da nossa casa de banho. A equipa foi extremamente profissional, cumpriu os prazos e o acabamento é impecável. Recomendamos sem hesitar!',
    rating: 5,
  },
  {
    name: 'António Mendes',
    zone: 'Parque das Nações',
    text: 'Remodelação completa da cozinha em tempo record. O orçamento foi detalhado e não houve surpresas. A qualidade dos materiais e o cuidado com os pormenores fizeram toda a diferença.',
    rating: 5,
  },
  {
    name: 'Sofia Lopes',
    zone: 'Príncipe Real',
    text: 'Já recorremos à Refazendo duas vezes — primeiro para a casa de banho, depois para o apartamento completo. Profissionalismo e qualidade em tudo. A minha casa de sonho, finalmente!',
    rating: 5,
  },
  {
    name: 'Rui Oliveira',
    zone: 'Chiado',
    text: 'Excelente serviço do início ao fim. A gestora de projecto manteve-nos sempre informados. O resultado superou as nossas expectativas. Obra entregue no prazo combinado.',
    rating: 5,
  },
]

export interface ProcessStep {
  number: string
  icon: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  { number: '01', icon: '📋', title: 'Contacto & Consulta', description: 'Preenche o formulário ou liga-nos. Respondemos em 24 horas.' },
  { number: '02', icon: '🏠', title: 'Visita ao Local', description: 'Avaliamos o espaço e as tuas necessidades sem qualquer compromisso.' },
  { number: '03', icon: '📄', title: 'Orçamento Detalhado', description: 'Proposta clara e transparente, sem surpresas nem custos ocultos.' },
  { number: '04', icon: '🔨', title: 'Execução da Obra', description: 'Trabalho rigoroso, com respeito pelo teu espaço e pelos prazos.' },
  { number: '05', icon: '✅', title: 'Entrega & Garantia', description: 'Acompanhamento pós-obra e garantia sobre todo o trabalho realizado.' },
]

export interface WhyUsItem {
  icon: LucideIcon
  title: string
  description: string
}

export const whyUsItems: WhyUsItem[] = [
  { icon: Award, title: 'Experiência Comprovada', description: '+10 anos a transformar casas em Lisboa, com centenas de obras concluídas.' },
  { icon: Users, title: 'Equipa Qualificada', description: 'Profissionais certificados em cada área, seleccionados pelo seu rigor.' },
  { icon: Eye, title: 'Transparência Total', description: 'Orçamentos detalhados, sem letra pequena, sem custos inesperados.' },
  { icon: Shield, title: 'Garantia Pós-Obra', description: 'Acompanhamento após a conclusão, porque a nossa responsabilidade não termina na entrega.' },
]

export interface BeforeAfterPair {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  caption: string
}

// Substituir pelas URLs das fotografias reais da empresa
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    after:  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    beforeAlt: 'Casa de banho antiga antes da remodelação',
    afterAlt: 'Casa de banho moderna após remodelação em Lisboa',
    caption: 'Casa de Banho — Cascais, 2024',
  },
  {
    before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    after:  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    beforeAlt: 'Cozinha antiga antes da remodelação',
    afterAlt: 'Cozinha moderna após remodelação em Lisboa',
    caption: 'Cozinha — Parque das Nações, 2024',
  },
  {
    before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    after:  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    beforeAlt: 'Apartamento antes da remodelação',
    afterAlt: 'Apartamento renovado em Lisboa',
    caption: 'Apartamento T3 — Príncipe Real, 2023',
  },
]

export const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80', alt: 'Remodelação de casa de banho em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80', alt: 'Cozinha moderna renovada em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80', alt: 'Sala de estar renovada em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80', alt: 'Casa de banho premium em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', alt: 'Renovação de moradia em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80', alt: 'Revestimento de azulejos artesanais Lisboa' },
]

export const lisbonParishes = [
  'Ajuda', 'Alcântara', 'Arroios', 'Avenidas Novas', 'Beato', 'Belém',
  'Benfica', 'Campo de Ourique', 'Campolide', 'Carnide', 'Estrela',
  'Lumiar', 'Marvila', 'Misericórdia', 'Olivais', 'Parque das Nações',
  'Penha de França', 'Santa Clara', 'Santa Maria Maior', 'Santo António',
  'São Domingos de Benfica', 'São Vicente', 'Outro',
]

export const serviceTypes = [
  'Casa de Banho', 'Cozinha', 'Apartamento / Moradia',
  'Electricidade', 'Canalização', 'Pinturas', 'Reparações Gerais', 'Outro',
]

export const howFoundOptions = ['Google', 'Recomendação', 'Redes Sociais', 'Outro']
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add content.ts with all editable data and types"
```

---

### Task 4: Criar lib/schema.ts

**Files:**
- Create: `lib/schema.ts`

- [ ] **Step 1: Criar lib/schema.ts**

```typescript
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://refazendo.pt',
    name: 'Refazendo',
    description: 'Empresa especializada em remodelações de casas de banho, cozinhas e apartamentos em Lisboa. +10 anos de experiência.',
    url: 'https://refazendo.pt',
    telephone: '+351912345678',
    email: 'geral@refazendo.pt',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisboa',
      addressCountry: 'PT',
    },
    areaServed: { '@type': 'City', name: 'Lisboa' },
    serviceType: [
      'Remodelação de Casas de Banho', 'Remodelação de Cozinhas',
      'Remodelação de Apartamentos', 'Electricidade', 'Canalização', 'Pinturas',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Remodelação',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Casas de Banho' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Cozinhas' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Apartamentos' } },
      ],
    },
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/schema.ts
git commit -m "feat: add JSON-LD LocalBusiness schema for SEO"
```

---

### Task 5: Logo SVG + componente Logo

**Files:**
- Create: `public/logo.svg`
- Create: `components/ui/Logo.tsx`

- [ ] **Step 1: Criar public/logo.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48" fill="none">
  <path d="M8 32 L24 16 L40 32" stroke="#8B4513" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="12" y="32" width="24" height="14" rx="1" stroke="#8B4513" stroke-width="2"/>
  <line x1="20" y1="32" x2="28" y2="46" stroke="#C9A96E" stroke-width="2" stroke-linecap="round"/>
  <rect x="20" y="38" width="8" height="8" rx="1" stroke="#8B4513" stroke-width="1.5"/>
  <text x="54" y="35" font-family="DM Sans, system-ui, sans-serif" font-size="15" font-weight="300" letter-spacing="5" fill="#1A1A1A">REFAZENDO</text>
</svg>
```

- [ ] **Step 2: Criar components/ui/Logo.tsx**

Criar a pasta `components/ui/` se não existir.

```typescript
interface LogoProps {
  variant?: 'default' | 'white'
  className?: string
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  const stroke = variant === 'white' ? '#FFFFFF' : '#8B4513'
  const text = variant === 'white' ? '#FFFFFF' : '#1A1A1A'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      fill="none"
      className={`h-10 w-auto ${className}`}
      aria-label="Refazendo — empresa de remodelações em Lisboa"
      role="img"
    >
      <path d="M8 32 L24 16 L40 32" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="32" width="24" height="14" rx="1" stroke={stroke} strokeWidth="2" />
      <line x1="20" y1="32" x2="28" y2="46" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="38" width="8" height="8" rx="1" stroke={stroke} strokeWidth="1.5" />
      <text
        x="54"
        y="35"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="15"
        fontWeight="300"
        letterSpacing="5"
        fill={text}
      >
        REFAZENDO
      </text>
    </svg>
  )
}
```

- [ ] **Step 3: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add public/logo.svg components/ui/Logo.tsx
git commit -m "feat: add Refazendo logo SVG and React component"
```

---

### Task 6: Criar app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Substituir app/layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { getLocalBusinessSchema } from '@/lib/schema'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Refazendo | Remodelações e Reparações em Lisboa',
  description: 'Empresa especializada em remodelações de casas de banho, cozinhas e apartamentos em Lisboa. Orçamento gratuito, sem compromisso. +10 anos de experiência.',
  keywords: ['remodelações Lisboa', 'obras Lisboa', 'casa de banho Lisboa', 'remodelação cozinha Lisboa', 'empresa de obras Lisboa', 'Refazendo'],
  openGraph: {
    title: 'Refazendo | Remodelações e Reparações em Lisboa',
    description: 'Remodelações de casas de banho, cozinhas e apartamentos em Lisboa. Orçamento gratuito.',
    url: 'https://refazendo.pt',
    siteName: 'Refazendo',
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refazendo | Remodelações em Lisboa',
    description: 'Remodelações de casas de banho, cozinhas e apartamentos em Lisboa.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://refazendo.pt' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = getLocalBusinessSchema()

  return (
    <html lang="pt" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure layout with SEO metadata, Google Fonts and JSON-LD"
```

---

### Task 7: Criar Header

**Files:**
- Create: `components/sections/Header.tsx`

- [ ] **Step 1: Criar components/sections/Header.tsx**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'
import { company } from '@/lib/content'

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Equipa', href: '#equipa' },
  { label: 'Testemunhos', href: '#testemunhos' },
  { label: 'Contacto', href: '#contacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-creme/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" aria-label="Refazendo — ir para o topo">
            <Logo variant={scrolled ? 'default' : 'white'} />
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-terracota ${
                  scrolled ? 'text-texto' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${company.phone}`}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? 'text-texto hover:text-terracota' : 'text-white/90 hover:text-white'
              }`}
              aria-label={`Ligar para ${company.phone}`}
            >
              <Phone size={16} />
              {company.phone}
            </a>
            <a
              href="#contacto"
              className="bg-terracota text-white px-5 py-2.5 rounded text-sm font-medium tracking-wide hover:bg-terracota-dark transition-colors"
              aria-label="Pedir orçamento gratuito"
            >
              Pedir Orçamento
            </a>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen
              ? <X size={24} className={scrolled ? 'text-texto' : 'text-white'} />
              : <Menu size={24} className={scrolled ? 'text-texto' : 'text-white'} />
            }
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-creme border-t border-creme-dark"
          >
            <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Menu mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-texto font-medium border-b border-creme-dark last:border-0 hover:text-terracota transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-3 bg-terracota text-white text-center py-3 rounded font-medium hover:bg-terracota-dark transition-colors"
              >
                Pedir Orçamento
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Header.tsx
git commit -m "feat: add sticky Header with backdrop blur and mobile hamburger menu"
```

---

### Task 8: Criar Hero

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Criar components/sections/Hero.tsx**

```typescript
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle } from 'lucide-react'

const badges = ['+10 Anos de Experiência', 'Orçamento Sem Compromisso', 'Garantia Pós-Obra']

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=80"
        alt="Remodelação de interiores premium em Lisboa pela Refazendo"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto pt-20">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="text-dourado text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Lisboa · Portugal
          </motion.p>

          <motion.h1
            variants={item}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-balance"
          >
            Transformamos a Sua Casa com Qualidade e Rigor
          </motion.h1>

          <motion.p variants={item} className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Remodelações e reparações em Lisboa — do projeto à entrega, com garantia pós-obra
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#trabalhos"
              className="border-2 border-white text-white px-8 py-3.5 rounded text-sm font-medium tracking-wide hover:bg-white hover:text-texto transition-all duration-200"
              aria-label="Ver os nossos trabalhos"
            >
              Ver os Nossos Trabalhos
            </a>
            <a
              href="#contacto"
              className="bg-terracota text-white px-8 py-3.5 rounded text-sm font-medium tracking-wide hover:bg-terracota-dark transition-all duration-200"
              aria-label="Pedir orçamento gratuito"
            >
              Pedir Orçamento Grátis
            </a>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {badges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircle size={16} className="text-dourado flex-shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={24} className="text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with full-screen image and staggered animations"
```

---

### Task 9: ServiceCard e secção Services

**Files:**
- Create: `components/ui/ServiceCard.tsx`
- Create: `components/sections/Services.tsx`

- [ ] **Step 1: Criar components/ui/ServiceCard.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import type { Service } from '@/lib/content'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(139, 69, 19, 0.12)' }}
      className="bg-white rounded-lg p-6 border border-creme-dark cursor-default"
    >
      <div className="w-12 h-12 bg-creme rounded-lg flex items-center justify-center mb-4">
        <Icon size={24} className="text-terracota" aria-hidden="true" />
      </div>
      <h3 className="font-playfair text-lg font-semibold text-texto mb-2">{service.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
    </motion.div>
  )
}
```

- [ ] **Step 2: Criar components/sections/Services.tsx**

```typescript
import { services } from '@/lib/content'
import { ServiceCard } from '@/components/ui/ServiceCard'

export function Services() {
  return (
    <section id="servicos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">O Que Fazemos</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">Os Nossos Serviços</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Cobrimos todas as necessidades da sua obra — da concepção à execução, com qualidade em cada detalhe.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ServiceCard.tsx components/sections/Services.tsx
git commit -m "feat: add Services section with animated cards"
```

---

### Task 10: Criar BeforeAfterSlider

**Files:**
- Create: `components/ui/BeforeAfterSlider.tsx`

- [ ] **Step 1: Criar components/ui/BeforeAfterSlider.tsx**

O slider usa `clipPath: inset(0 X% 0 0)` para clipar a imagem "antes" — mantém a imagem na sua largura natural e apenas ajusta o que é visível. Isto é mais correcto do que clipar o div contentor.

```typescript
'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'
import type { BeforeAfterPair } from '@/lib/content'

export function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none touch-none"
        onMouseMove={(e) => dragging && updatePosition(e.clientX)}
        onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX) }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
        aria-label={`Comparação antes e depois: ${pair.caption}`}
      >
        {/* After image — base layer, full width */}
        <Image
          src={pair.after}
          alt={pair.afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Before image — clipped from the right using clip-path */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={pair.beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <ArrowLeftRight size={16} className="text-terracota" />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">Antes</span>
        <span className="absolute bottom-3 right-3 bg-terracota/80 text-white text-xs px-2 py-1 rounded pointer-events-none">Depois</span>
      </div>
      <p className="text-xs text-gray-500 text-center">{pair.caption}</p>
    </div>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/ui/BeforeAfterSlider.tsx
git commit -m "feat: add BeforeAfterSlider with clip-path technique and touch support"
```

---

### Task 11: Criar secção Gallery

**Files:**
- Create: `components/sections/Gallery.tsx`

- [ ] **Step 1: Criar components/sections/Gallery.tsx**

```typescript
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'
import { beforeAfterPairs, galleryImages } from '@/lib/content'

export function Gallery() {
  return (
    <section id="trabalhos" className="py-20 lg:py-28 bg-creme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">Portfólio</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">Os Nossos Trabalhos</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Arrasta o cursor para comparar o antes e o depois das nossas obras.
          </p>
        </motion.div>

        {/* Before/After Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {beforeAfterPairs.map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BeforeAfterSlider pair={pair} />
            </motion.div>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="break-inside-avoid rounded-lg overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={index % 2 === 0 ? 400 : 500}
                className="w-full object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Gallery.tsx
git commit -m "feat: add Gallery section with Before/After sliders and masonry grid"
```

---

### Task 12: Criar secção Process

**Files:**
- Create: `components/sections/Process.tsx`

- [ ] **Step 1: Criar components/sections/Process.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { processSteps } from '@/lib/content'

export function Process() {
  return (
    <section className="py-20 lg:py-28 bg-texto overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-dourado text-sm font-medium tracking-[0.25em] uppercase mb-3">Processo</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Como Trabalhamos</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Cinco passos claros, do primeiro contacto à entrega da sua obra.
          </p>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-start relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-px bg-dourado/30" />
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex-1 flex flex-col items-center text-center px-4"
            >
              <div className="relative z-10 w-16 h-16 bg-terracota rounded-full flex items-center justify-center mb-5 border-4 border-texto">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <span className="text-dourado text-xs font-medium tracking-widest mb-2">{step.number}</span>
              <h3 className="font-playfair text-white text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden flex flex-col relative">
          <div className="absolute left-8 top-4 bottom-4 w-px bg-dourado/30" />
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6 pb-10 last:pb-0"
            >
              <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-terracota rounded-full flex items-center justify-center border-4 border-texto">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <div className="pt-3">
                <span className="text-dourado text-xs font-medium tracking-widest">{step.number}</span>
                <h3 className="font-playfair text-white text-lg font-semibold mt-1 mb-1">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Process.tsx
git commit -m "feat: add Process timeline (horizontal desktop, vertical mobile)"
```

---

### Task 13: TeamCard e secção Team

**Files:**
- Create: `components/ui/TeamCard.tsx`
- Create: `components/sections/Team.tsx`

- [ ] **Step 1: Criar components/ui/TeamCard.tsx**

```typescript
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { TeamMember } from '@/lib/content'

export function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-dourado mb-4 shadow-md">
        <Image
          src={member.photo}
          alt={`Fotografia de ${member.name}, ${member.role} na Refazendo`}
          width={112}
          height={112}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-texto mb-1">{member.name}</h3>
      <p className="text-terracota text-sm font-medium tracking-wide mb-2">{member.role}</p>
      <p className="text-gray-600 text-sm leading-relaxed max-w-[12rem]">{member.bio}</p>
    </motion.div>
  )
}
```

- [ ] **Step 2: Criar components/sections/Team.tsx**

```typescript
import { team } from '@/lib/content'
import { TeamCard } from '@/components/ui/TeamCard'

export function Team() {
  return (
    <section id="equipa" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">Quem Somos</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">A Nossa Equipa</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Profissionais experientes e certificados, dedicados à excelência em cada obra.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add components/ui/TeamCard.tsx components/sections/Team.tsx
git commit -m "feat: add Team section with circular photo cards"
```

---

### Task 14: TestimonialCard e secção Testimonials

**Files:**
- Create: `components/ui/TestimonialCard.tsx`
- Create: `components/sections/Testimonials.tsx`

- [ ] **Step 1: Criar components/ui/TestimonialCard.tsx**

```typescript
import type { Testimonial } from '@/lib/content'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} estrelas de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i < rating ? '#F4A823' : '#E5E7EB'} className="w-4 h-4" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-xl p-7 border border-creme-dark shadow-sm h-full">
      <StarRating rating={testimonial.rating} />
      <blockquote className="text-gray-700 text-sm leading-relaxed mb-5 italic">
        "{testimonial.text}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-terracota rounded-full flex items-center justify-center text-white font-playfair font-bold text-lg flex-shrink-0">
          {testimonial.name[0]}
        </div>
        <div>
          <p className="font-semibold text-texto text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.zone}</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Criar components/sections/Testimonials.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/lib/content'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

export function Testimonials() {
  return (
    <section id="testemunhos" className="py-20 lg:py-28 bg-creme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">Clientes</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">O Que Dizem de Nós</h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="#F4A823" className="w-4 h-4">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">4.9 no Google Reviews</span>
          </div>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="snap-start flex-shrink-0 w-[85vw]">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add components/ui/TestimonialCard.tsx components/sections/Testimonials.tsx
git commit -m "feat: add Testimonials section with Google Reviews style stars"
```

---

### Task 15: Criar secção WhyUs

**Files:**
- Create: `components/sections/WhyUs.tsx`

- [ ] **Step 1: Criar components/sections/WhyUs.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { whyUsItems } from '@/lib/content'

export function WhyUs() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">Diferenciais</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">Porquê Escolher a Refazendo</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUsItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-creme border border-creme-dark"
              >
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center">
                  <Icon size={48} className="text-dourado" aria-hidden="true" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-texto mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhyUs.tsx
git commit -m "feat: add WhyUs trust section with 4 value pillars"
```

---

### Task 16: Criar ContactForm

**Files:**
- Create: `components/sections/ContactForm.tsx`

- [ ] **Step 1: Criar components/sections/ContactForm.tsx**

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { UseFormRegister } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import { serviceTypes, lisbonParishes, howFoundOptions } from '@/lib/content'

// TODO: Cria uma conta em formspree.io → cria um novo form → copia o endpoint aqui
// Exemplo: 'https://formspree.io/f/xyzabcde'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const schema = z.object({
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Endereço de email inválido'),
  telefone: z.string().min(9, 'O telefone deve ter pelo menos 9 dígitos'),
  servico: z.string().min(1, 'Por favor seleccione um serviço'),
  zona: z.string().min(1, 'Por favor seleccione uma zona'),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  comoEncontrou: z.string().min(1, 'Por favor seleccione uma opção'),
  privacidade: z.literal(true, {
    errorMap: () => ({ message: 'Deve aceitar a política de privacidade' }),
  }),
})

type FormData = z.infer<typeof schema>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-red-500 text-xs mt-1" role="alert">{message}</p>
}

function SelectField({
  label, id, options, placeholder, register, error,
}: {
  label: string
  id: keyof FormData
  options: string[]
  placeholder: string
  register: UseFormRegister<FormData>
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-texto mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        id={id}
        {...register(id)}
        className="w-full px-4 py-3 border border-creme-dark rounded bg-white text-texto text-sm focus:outline-none focus:border-terracota focus:ring-1 focus:ring-terracota transition-colors"
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <FieldError message={error} />
    </div>
  )
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const inputClass = 'w-full px-4 py-3 border border-creme-dark rounded bg-white text-texto text-sm focus:outline-none focus:border-terracota focus:ring-1 focus:ring-terracota transition-colors placeholder:text-gray-400'

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // TODO: mostrar mensagem de erro ao utilizador em produção
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-creme">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">Contacto</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">Pedir Orçamento Gratuito</h2>
          <p className="text-gray-600">Preenche o formulário e entraremos em contacto em menos de 24 horas.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-creme-dark">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="font-playfair text-2xl text-texto mb-2">Pedido Enviado!</h3>
                <p className="text-gray-600">
                  Recebemos o seu pedido de orçamento. Entraremos em contacto em menos de 24 horas.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-texto mb-1.5">
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input id="nome" type="text" placeholder="João Silva" {...register('nome')} className={inputClass} aria-label="Nome completo" />
                    <FieldError message={errors.nome?.message} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-texto mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input id="email" type="email" placeholder="joao@exemplo.pt" {...register('email')} className={inputClass} aria-label="Endereço de email" />
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-texto mb-1.5">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <input id="telefone" type="tel" placeholder="+351 912 345 678" {...register('telefone')} className={inputClass} aria-label="Número de telefone" />
                    <FieldError message={errors.telefone?.message} />
                  </div>
                  <SelectField label="Tipo de Serviço" id="servico" options={serviceTypes} placeholder="Seleccione um serviço" register={register} error={errors.servico?.message} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <SelectField label="Zona de Lisboa" id="zona" options={lisbonParishes} placeholder="Seleccione uma freguesia" register={register} error={errors.zona?.message} />
                  <SelectField label="Como nos encontrou" id="comoEncontrou" options={howFoundOptions} placeholder="Seleccione uma opção" register={register} error={errors.comoEncontrou?.message} />
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-texto mb-1.5">
                    Descrição do Trabalho <span className="text-red-500">*</span>
                  </label>
                  <textarea id="descricao" placeholder="Descreva o trabalho que pretende realizar..." rows={4} {...register('descricao')} className={`${inputClass} resize-none`} aria-label="Descrição do trabalho" />
                  <FieldError message={errors.descricao?.message} />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" {...register('privacidade')} className="mt-0.5 w-4 h-4 accent-terracota" aria-label="Aceitar política de privacidade" />
                    <span className="text-sm text-gray-600">
                      Aceito a{' '}
                      <a href="/politica-de-privacidade" className="text-terracota underline hover:text-terracota-dark">política de privacidade</a>
                      {' '}e consinto o tratamento dos meus dados para efeitos de resposta ao pedido.
                    </span>
                  </label>
                  <FieldError message={errors.privacidade?.message} />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-terracota text-white py-4 rounded font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-terracota-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Enviar pedido de orçamento"
                >
                  {submitting ? <span>A enviar...</span> : <><Send size={16} /> Enviar Pedido de Orçamento</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ContactForm.tsx
git commit -m "feat: add ContactForm with Zod validation and Formspree endpoint"
```

---

### Task 17: Criar Footer

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Criar components/sections/Footer.tsx**

```typescript
import { Facebook, Instagram, Phone, Mail, MapPin, Shield } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { company, services } from '@/lib/content'

export function Footer() {
  return (
    <footer className="bg-texto text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo variant="white" className="mb-4" />
            <p className="text-white/60 text-sm leading-relaxed mb-5">{company.tagline}</p>
            <div className="flex gap-3">
              <a href={company.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-terracota transition-colors"
                aria-label="Visitar página Facebook da Refazendo">
                <Facebook size={16} />
              </a>
              <a href={company.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-terracota transition-colors"
                aria-label="Visitar perfil Instagram da Refazendo">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <a href="#servicos" className="text-white/60 text-sm hover:text-dourado transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${company.phone}`} className="flex items-center gap-3 text-white/60 text-sm hover:text-dourado transition-colors" aria-label={`Ligar para ${company.phone}`}>
                  <Phone size={15} className="text-dourado flex-shrink-0" />{company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-white/60 text-sm hover:text-dourado transition-colors" aria-label={`Enviar email para ${company.email}`}>
                  <Mail size={15} className="text-dourado flex-shrink-0" />{company.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin size={15} className="text-dourado flex-shrink-0" />{company.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Refazendo. Todos os direitos reservados.{' '}
            <a href="/politica-de-privacidade" className="hover:text-white/60 underline">Política de Privacidade</a>
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Shield size={12} className="text-dourado" />Empresa registada em Portugal
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Shield size={12} className="text-dourado" />RGPD Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat: add Footer with contact info, social links and RGPD badges"
```

---

### Task 18: Compor app/page.tsx e verificação final

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Substituir app/page.tsx**

```typescript
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Gallery } from '@/components/sections/Gallery'
import { Process } from '@/components/sections/Process'
import { Team } from '@/components/sections/Team'
import { Testimonials } from '@/components/sections/Testimonials'
import { WhyUs } from '@/components/sections/WhyUs'
import { ContactForm } from '@/components/sections/ContactForm'
import { Footer } from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Process />
        <Team />
        <Testimonials />
        <WhyUs />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verificar tipagem completa**

```bash
npx tsc --noEmit
```

Expected: zero erros de tipagem.

- [ ] **Step 3: Verificar build de produção**

```bash
npm run build
```

Expected: build sem erros. Sem warnings críticos sobre imagens ou metadata.

- [ ] **Step 4: Testar visualmente no browser**

```bash
npm run dev
```

Abrir `http://localhost:3000` e verificar manualmente:

- [ ] Header transparente sobre Hero, fica branco/blur ao scroll
- [ ] Hero: imagem de fundo visível, texto centrado, 2 CTAs e 3 badges
- [ ] Serviços: 8 cards em grid, hover lift funciona
- [ ] Antes/Depois: sliders respondem ao drag do rato
- [ ] Process: timeline horizontal em desktop (>1024px), vertical em mobile
- [ ] Equipa: 4 fotos circulares com borda dourada
- [ ] Testemunhos: grid em desktop, carousel com scroll-snap em 375px
- [ ] Formulário: campos de validação mostram erros em PT, botão desactiva durante envio
- [ ] Footer: logo branco, links de serviços e contacto, badges RGPD

- [ ] **Step 5: Commit final**

```bash
git add app/page.tsx
git commit -m "feat: compose full Refazendo landing page — all 10 sections complete"
```

---

## Notas de Entrega ao Cliente

Antes do lançamento, o cliente deve:

1. **Formspree** — registar conta em [formspree.io](https://formspree.io), criar form, substituir `YOUR_FORM_ID` em `components/sections/ContactForm.tsx`
2. **Imagens reais** — substituir URLs Unsplash em `lib/content.ts` por fotografias reais da empresa
3. **Dados da empresa** — actualizar `company` em `lib/content.ts` (telefone, email, morada, redes sociais)
4. **Domínio** — actualizar `https://refazendo.pt` em `app/layout.tsx` e `lib/schema.ts` para o domínio real
5. **OG Image** — criar `public/og-image.jpg` (1200×630px) e adicionar ao metadata

**Deploy:**
```bash
npx vercel --prod
```
