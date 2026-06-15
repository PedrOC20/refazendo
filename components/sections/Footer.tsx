import { Phone, Mail, MapPin, Shield } from 'lucide-react'
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
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href={company.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-terracota transition-colors"
                aria-label="Visitar perfil Instagram da Refazendo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
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
            &copy; {new Date().getFullYear()} Refazendo. Todos os direitos reservados.{' '}
            <a href="/politica-de-privacidade" className="hover:text-white/60 underline">Política de Privacidade</a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Shield size={12} className="text-dourado" />Trabalhador independente em Portugal
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
