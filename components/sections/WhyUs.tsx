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
