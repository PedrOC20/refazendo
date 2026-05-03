'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { TeamMember } from '@/lib/content'

export function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-dourado mb-4 shadow-md">
        <Image
          src={member.photo}
          alt={`Fotografia de ${member.name}, ${member.role} na Refazendo`}
          width={112}
          height={112}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-texto mb-1">{member.name}</h3>
      <p className="text-terracota text-sm font-medium tracking-wide mb-2">{member.role}</p>
      <p className="text-gray-600 text-sm leading-relaxed max-w-[12rem]">{member.bio}</p>
    </motion.div>
  )
}
