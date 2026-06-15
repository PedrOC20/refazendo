export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://refazendo.pt',
    name: 'Refazendo',
    description: 'Especialistas em remodelações de casas de banho, cozinhas e apartamentos em Lisboa. +10 anos de experiência.',
    url: 'https://refazendo.pt',
    telephone: '+351935336759',
    email: 'refazendo.mail@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisboa',
      addressCountry: 'PT',
    },
    areaServed: { '@type': 'City', name: 'Lisboa' },
    serviceType: [
      'Remodelação de Casas de Banho', 'Remodelação de Cozinhas',
      'Remodelação de Apartamentos', 'Electricidade', 'Canalização', 'Pinturas',
      'Limpeza de Telhados', 'Pinturas e Remodelação de Prédios',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Remodelação',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Casas de Banho' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Cozinhas' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Apartamentos' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpeza de Telhados' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pinturas e Remodelação de Prédios' } },
      ],
    },
  }
}
