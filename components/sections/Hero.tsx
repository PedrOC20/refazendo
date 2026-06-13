'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle } from 'lucide-react'

const badges = ['+10 Anos de Experiência', 'Orçamento Sem Compromisso', 'Garantia Pós-Obra']

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const } } }

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/portfolio/casa-banho-depois.jpg"
        alt="Casa de banho renovada pela Refazendo em Lisboa — mármore e duche em vidro"
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
            className="font-playfair text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-balance"
          >
            Transformamos a Sua Casa com Qualidade e Rigor
          </motion.h1>

          <motion.p variants={item} className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Remodelações e reparações em Lisboa — execução rigorosa com garantia pós-obra
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
