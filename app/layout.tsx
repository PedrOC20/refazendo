import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { getLocalBusinessSchema } from '@/lib/schema'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-next',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans-next',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Refazendo | Remodelações e Reparações em Lisboa',
  description: 'Especialistas em remodelações de casas de banho, cozinhas e apartamentos em Lisboa. Orçamento gratuito, sem compromisso. +10 anos de experiência.',
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
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
