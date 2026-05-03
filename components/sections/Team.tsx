import { team } from '@/lib/content'
import { TeamCard } from '@/components/ui/TeamCard'

export function Team() {
  return (
    <section id="equipa" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-terracota text-sm font-medium tracking-[0.25em] uppercase mb-3">Quem Somos</p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-texto mb-4">A Nossa Equipa</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Profissionais experientes e certificados, dedicados à excelência em cada obra.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
