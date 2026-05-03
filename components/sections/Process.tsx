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
