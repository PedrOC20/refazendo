'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, animate } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'
import type { BeforeAfterPair } from '@/lib/content'

export function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const hintedRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-100px' })

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  // Window-level listeners while dragging — keeps drag alive if cursor leaves the box.
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => updatePosition(e.clientX)
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, updatePosition])

  // Hint animation: subtle wiggle the first time the slider enters the viewport.
  useEffect(() => {
    if (!inView || hintedRef.current) return
    hintedRef.current = true
    const controls = animate(50, [50, 62, 38, 50], {
      duration: 1.4,
      times: [0, 0.25, 0.65, 1],
      onUpdate: setPosition,
    })
    return () => controls.stop()
  }, [inView])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 15 : 5
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPosition((p) => Math.max(0, p - step)) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPosition((p) => Math.min(100, p + step)) }
    else if (e.key === 'Home') { e.preventDefault(); setPosition(0) }
    else if (e.key === 'End') { e.preventDefault(); setPosition(100) }
  }

  const dividerTransition = dragging ? 'none' : 'left 400ms cubic-bezier(0.4, 0, 0.2, 1)'

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none touch-none focus-visible:outline-2 focus-visible:outline-terracota focus-visible:outline-offset-2"
        onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX) }}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
        onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
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
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: dragging ? 'none' : 'clip-path 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
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
          className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-lg pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)', transition: dividerTransition }}
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ArrowLeftRight size={18} className="text-terracota" />
          </motion.div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">Antes</span>
        <span className="absolute bottom-3 right-3 bg-terracota/80 text-white text-xs px-2 py-1 rounded pointer-events-none">Depois</span>
      </div>
      <p className="text-xs text-gray-500 text-center">{pair.caption}</p>
    </div>
  )
}
