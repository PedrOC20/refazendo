export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://refazendo.pt',
    name: 'Refazendo',
    description: 'Empresa especializada em remodelações de casas de banho, cozinhas e apartamentos em Lisboa. +10 anos de experiência.',
    url: 'https://refazendo.pt',
    telephone: '+351912345678',
    email: 'geral@refazendo.pt',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisboa',
      addressCountry: 'PT',
    },
    areaServed: { '@type': 'City', name: 'Lisboa' },
    serviceType: [
      'Remodelação de Casas de Banho', 'Remodelação de Cozinhas',
      'Remodelação de Apartamentos', 'Electricidade', 'Canalização', 'Pinturas',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Remodelação',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Casas de Banho' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Cozinhas' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remodelação de Apartamentos' } },
      ],
    },
  }
}
