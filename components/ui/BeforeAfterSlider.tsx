'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'
import type { BeforeAfterPair } from '@/lib/content'

export function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none touch-none"
        onMouseMove={(e) => dragging && updatePosition(e.clientX)}
        onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX) }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
        onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
        aria-label={`Comparação antes e depois: ${pair.caption}`}
      >
        {/* After image — base layer, full width */}
        <Image
          src={pair.after}
          alt={pair.afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Before image — clipped from the right using clip-path */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={pair.beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <ArrowLeftRight size={16} className="text-terracota" />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">Antes</span>
        <span className="absolute bottom-3 right-3 bg-terracota/80 text-white text-xs px-2 py-1 rounded pointer-events-none">Depois</span>
      </div>
      <p className="text-xs text-gray-500 text-center">{pair.caption}</p>
    </div>
  )
}
