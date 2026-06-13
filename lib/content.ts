// ============================================================
// lib/content.ts
// ÚNICO FICHEIRO A EDITAR para actualizar textos, dados da
// empresa, equipa, testemunhos, serviços e imagens.
// ============================================================

import {
  Bath, ChefHat, Home, Wrench, Paintbrush, DoorOpen,
  Zap, HardHat, Sparkles, Building2, Award, Users, Eye, Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const company = {
  name: 'Refazendo',
  tagline: 'Transformamos espaços, melhoramos vidas',
  phone: '+351 935 336 759',
  email: 'refazendo.mail@gmail.com',
  address: 'Lisboa, Portugal',
  facebook: 'https://facebook.com/refazendo',
  instagram: 'https://instagram.com/refazendo',
}

// Dados legais para a Política de Privacidade.
// Substituir os marcadores [A PREENCHER] antes de publicar em produção.
export const legal = {
  legalName: 'Refazendo [A PREENCHER: Razão social completa]',
  nipc: '[A PREENCHER: NIPC]',
  fullAddress: '[A PREENCHER: Morada completa, Lisboa]',
  lastUpdated: '2026-06-13',
  resendUrl: 'https://resend.com',
  resendPrivacyUrl: 'https://resend.com/legal/privacy-policy',
  dpfUrl: 'https://www.dataprivacyframework.gov',
  cnpdUrl: 'https://www.cnpd.pt',
}

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  slug: string
}

export const services: Service[] = [
  { icon: Bath, title: 'Remodelação de Casas de Banho', description: 'Transformamos a sua casa de banho com materiais de qualidade e acabamentos premium.', slug: 'casas-de-banho' },
  { icon: ChefHat, title: 'Remodelação de Cozinhas', description: 'Cozinhas funcionais e elegantes, executadas com rigor e acabamentos de qualidade.', slug: 'cozinhas' },
  { icon: Home, title: 'Apartamentos e Moradias', description: 'Remodelação completa de espaços residenciais, com execução rigorosa e respeito pelos prazos.', slug: 'apartamentos' },
  { icon: Wrench, title: 'Reparações e Manutenção', description: 'Serviço rápido e eficaz para todas as reparações do lar.', slug: 'reparacoes' },
  { icon: Paintbrush, title: 'Pinturas Interiores e Exteriores', description: 'Acabamentos perfeitos com tintas de alta qualidade e aplicação profissional.', slug: 'pinturas' },
  { icon: DoorOpen, title: 'Janelas e Portas', description: 'Substituição e instalação de caixilharia com critérios de eficiência energética.', slug: 'janelas-portas' },
  { icon: Zap, title: 'Electricidade e Canalização', description: 'Instalações eléctricas e canalizações certificadas e em conformidade.', slug: 'electricidade' },
  { icon: HardHat, title: 'Obras Gerais de Construção', description: 'Obras estruturais e de ampliação com rigor técnico e respeito pelos prazos.', slug: 'obras-gerais' },
  { icon: Sparkles, title: 'Limpeza de Telhados', description: 'Limpeza profissional de telhados e remoção de musgo, com inspecção e selagem de pontos críticos.', slug: 'limpeza-telhados' },
  { icon: Building2, title: 'Pinturas e Remodelação de Prédios', description: 'Pinturas de fachadas e obras em condomínios, com plano de estaleiro e cumprimento de prazos.', slug: 'predios' },
]

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
}

export const team: TeamMember[] = [
  { name: 'João Silva', role: 'Mestre de Obras', bio: '+15 anos de experiência em obras residenciais em Lisboa.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Carlos Ferreira', role: 'Especialista em Azulejos', bio: 'Artesão certificado com formação em técnicas tradicionais e contemporâneas.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Ana Costa', role: 'Gestora de Projecto', bio: 'Coordena cada obra garantindo prazos, qualidade e comunicação constante.', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { name: 'Miguel Santos', role: 'Electricista Certificado', bio: 'Instalações eléctricas residenciais e comerciais, com certificação CERTIEL.', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
]

export interface Testimonial {
  name: string
  zone: string
  text: string
  rating: number
}

export const testimonials: Testimonial[] = [
  { name: 'Maria Rodrigues', zone: 'Cascais', text: 'Ficámos absolutamente encantados com o resultado da nossa casa de banho. A equipa foi extremamente profissional, cumpriu os prazos e o acabamento é impecável. Recomendamos sem hesitar!', rating: 5 },
  { name: 'António Mendes', zone: 'Parque das Nações', text: 'Remodelação completa da cozinha em tempo record. O orçamento foi detalhado e não houve surpresas. A qualidade dos materiais e o cuidado com os pormenores fizeram toda a diferença.', rating: 5 },
  { name: 'Sofia Lopes', zone: 'Príncipe Real', text: 'Já recorremos à Refazendo duas vezes — primeiro para a casa de banho, depois para o apartamento completo. Profissionalismo e qualidade em tudo. A minha casa de sonho, finalmente!', rating: 5 },
  { name: 'Rui Oliveira', zone: 'Chiado', text: 'Excelente serviço do início ao fim. A gestora de projecto manteve-nos sempre informados. O resultado superou as nossas expectativas. Obra entregue no prazo combinado.', rating: 5 },
]

export interface ProcessStep {
  number: string
  icon: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  { number: '01', icon: '📋', title: 'Contacto & Consulta', description: 'Preencha o formulário ou ligue-nos. Respondemos em 24 horas.' },
  { number: '02', icon: '🏠', title: 'Visita ao Local', description: 'Avaliamos o espaço e as suas necessidades sem qualquer compromisso.' },
  { number: '03', icon: '📄', title: 'Orçamento Detalhado', description: 'Proposta clara e transparente, sem surpresas nem custos ocultos.' },
  { number: '04', icon: '🔨', title: 'Execução da Obra', description: 'Trabalho rigoroso, com respeito pelo seu espaço e pelos prazos.' },
  { number: '05', icon: '✅', title: 'Entrega & Garantia', description: 'Acompanhamento pós-obra e garantia sobre todo o trabalho realizado.' },
]

export interface WhyUsItem {
  icon: LucideIcon
  title: string
  description: string
}

export const whyUsItems: WhyUsItem[] = [
  { icon: Award, title: 'Experiência Comprovada', description: '+10 anos a transformar casas em Lisboa, com centenas de obras concluídas.' },
  { icon: Users, title: 'Equipa Qualificada', description: 'Profissionais certificados em cada área, seleccionados pelo seu rigor.' },
  { icon: Eye, title: 'Transparência Total', description: 'Orçamentos detalhados, sem letra pequena, sem custos inesperados.' },
  { icon: Shield, title: 'Garantia Pós-Obra', description: 'Acompanhamento após a conclusão, porque a nossa responsabilidade não termina na entrega.' },
]

export interface BeforeAfterPair {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  caption: string
}

// Substituir pelas URLs das fotografias reais da empresa
export const beforeAfterPairs: BeforeAfterPair[] = [
  { before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', beforeAlt: 'Casa de banho antiga antes da remodelação', afterAlt: 'Casa de banho moderna após remodelação em Lisboa', caption: 'Casa de Banho — Cascais, 2024' },
  { before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', beforeAlt: 'Cozinha antiga antes da remodelação', afterAlt: 'Cozinha moderna após remodelação em Lisboa', caption: 'Cozinha — Parque das Nações, 2024' },
  { before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80', beforeAlt: 'Apartamento antes da remodelação', afterAlt: 'Apartamento renovado em Lisboa', caption: 'Apartamento T3 — Príncipe Real, 2023' },
]

export const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80', alt: 'Remodelação de casa de banho em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80', alt: 'Cozinha moderna renovada em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80', alt: 'Sala de estar renovada em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80', alt: 'Casa de banho premium em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', alt: 'Renovação de moradia em Lisboa' },
  { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80', alt: 'Revestimento de azulejos artesanais Lisboa' },
]

export const lisbonParishes = [
  'Ajuda', 'Alcântara', 'Arroios', 'Avenidas Novas', 'Beato', 'Belém',
  'Benfica', 'Campo de Ourique', 'Campolide', 'Carnide', 'Estrela',
  'Lumiar', 'Marvila', 'Misericórdia', 'Olivais', 'Parque das Nações',
  'Penha de França', 'Santa Clara', 'Santa Maria Maior', 'Santo António',
  'São Domingos de Benfica', 'São Vicente', 'Outro',
]

export const serviceTypes = [
  'Casa de Banho', 'Cozinha', 'Apartamento / Moradia',
  'Electricidade', 'Canalização', 'Pinturas', 'Reparações Gerais',
  'Limpeza de Telhados', 'Pinturas/Remodelação de Prédios', 'Outro',
]

export const howFoundOptions = ['Google', 'Recomendação', 'Redes Sociais', 'Outro']
