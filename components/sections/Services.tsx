'use client'

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
            Cobrimos todas as necessidades da sua obra - da concepção à execução, com qualidade em cada detalhe.
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
