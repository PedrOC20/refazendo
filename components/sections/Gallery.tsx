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
