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
    handleScroll()
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
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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
            <nav id="mobile-menu" className="flex flex-col px-4 py-4 gap-1" aria-label="Menu mobile">
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
                aria-label="Pedir orçamento gratuito"
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
