'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { UseFormRegister } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import { serviceTypes, lisbonParishes, howFoundOptions } from '@/lib/content'

// TODO: Cria uma conta em formspree.io → cria um novo form → copia o endpoint aqui
// Exemplo: 'https://formspree.io/f/xyzabcde'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const schema = z.object({
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Endereço de email inválido'),
  telefone: z.string().min(9, 'O telefone deve ter pelo menos 9 dígitos'),
  servico: z.string().min(1, 'Por favor seleccione um serviço'),
  zona: z.string().min(1, 'Por favor seleccione uma zona'),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  comoEncontrou: z.string().min(1, 'Por favor seleccione uma opção'),
  privacidade: z.boolean().refine((val) => val === true, {
    message: 'Deve aceitar a política de privacidade',
  }),
})

type FormData = z.infer<typeof schema>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-red-500 text-xs mt-1" role="alert">{message}</p>
}

function SelectField({
  label, id, options, placeholder, register, error,
}: {
  label: string
  id: keyof FormData
  options: string[]
  placeholder: string
  register: UseFormRegister<FormData>
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-texto mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        id={id}
        {...register(id)}
        className="w-full px-4 py-3 border border-creme-dark rounded bg-white text-texto text-sm focus:outline-none focus:border-terracota focus:ring-1 focus:ring-terracota transition-colors"
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <FieldError message={error} />
    </div>
  )
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const inputClass = 'w-full px-4 py-3 border border-creme-dark rounded bg-white text-texto text-sm focus:outline-none focus:border-terracota focus:ring-1 focus:ring-terracota transition-colors placeholder:text-gray-400'

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // TODO: mostrar mensagem de erro ao utilizador em produção
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-creme">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">Contacto</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">Pedir Orçamento Gratuito</h2>
          <p className="text-gray-600">Preenche o formulário e entraremos em contacto em menos de 24 horas.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-creme-dark">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="font-playfair text-2xl text-texto mb-2">Pedido Enviado!</h3>
                <p className="text-gray-600">
                  Recebemos o seu pedido de orçamento. Entraremos em contacto em menos de 24 horas.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-texto mb-1.5">
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input id="nome" type="text" placeholder="João Silva" {...register('nome')} className={inputClass} aria-label="Nome completo" />
                    <FieldError message={errors.nome?.message} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-texto mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input id="email" type="email" placeholder="joao@exemplo.pt" {...register('email')} className={inputClass} aria-label="Endereço de email" />
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-texto mb-1.5">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <input id="telefone" type="tel" placeholder="+351 912 345 678" {...register('telefone')} className={inputClass} aria-label="Número de telefone" />
                    <FieldError message={errors.telefone?.message} />
                  </div>
                  <SelectField label="Tipo de Serviço" id="servico" options={serviceTypes} placeholder="Seleccione um serviço" register={register} error={errors.servico?.message} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <SelectField label="Zona de Lisboa" id="zona" options={lisbonParishes} placeholder="Seleccione uma freguesia" register={register} error={errors.zona?.message} />
                  <SelectField label="Como nos encontrou" id="comoEncontrou" options={howFoundOptions} placeholder="Seleccione uma opção" register={register} error={errors.comoEncontrou?.message} />
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-texto mb-1.5">
                    Descrição do Trabalho <span className="text-red-500">*</span>
                  </label>
                  <textarea id="descricao" placeholder="Descreva o trabalho que pretende realizar..." rows={4} {...register('descricao')} className={`${inputClass} resize-none`} aria-label="Descrição do trabalho" />
                  <FieldError message={errors.descricao?.message} />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" {...register('privacidade')} className="mt-0.5 w-4 h-4 accent-terracota" aria-label="Aceitar política de privacidade" />
                    <span className="text-sm text-gray-600">
                      Aceito a{' '}
                      <a href="/politica-de-privacidade" className="text-terracota underline hover:text-terracota-dark">política de privacidade</a>
                      {' '}e consinto o tratamento dos meus dados para efeitos de resposta ao pedido.
                    </span>
                  </label>
                  <FieldError message={errors.privacidade?.message} />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-terracota text-white py-4 rounded font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-terracota-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Enviar pedido de orçamento"
                >
                  {submitting ? <span>A enviar...</span> : <><Send size={16} /> Enviar Pedido de Orçamento</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
