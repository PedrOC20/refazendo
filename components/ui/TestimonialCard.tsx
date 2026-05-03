import type { Testimonial } from '@/lib/content'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} estrelas de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i < rating ? '#F4A823' : '#E5E7EB'} className="w-4 h-4" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-xl p-7 border border-creme-dark shadow-sm h-full">
      <StarRating rating={testimonial.rating} />
      <blockquote className="text-gray-700 text-sm leading-relaxed mb-5 italic">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-terracota rounded-full flex items-center justify-center text-white font-playfair font-bold text-lg flex-shrink-0">
          {testimonial.name[0]}
        </div>
        <div>
          <p className="font-semibold text-texto text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.zone}</p>
        </div>
      </div>
    </div>
  )
}
