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
