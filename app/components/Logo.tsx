'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'motion/react'
import Image from 'next/image'

interface LogoProps {
  onComplete: () => void
}

export default function Logo({ onComplete }: LogoProps) {
  const controls = useAnimation()
  const measureRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const el = measureRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    // Scale so the logo spans the full viewport width
    const fullWidthScale = window.innerWidth / rect.width

    // Y offset to move the logo from its top position to the viewport center
    const logoCenter = rect.top + rect.height / 2
    const viewportCenter = window.innerHeight / 2
    const centerY = viewportCenter - logoCenter

    controls.set({ scale: fullWidthScale, y: centerY, opacity: 0 })

    let cancelled = false

    const run = async () => {
      // Phase 1 — appear at full-screen size
      await controls.start({
        opacity: 1,
        transition: { duration: 0.9, ease: 'easeOut' },
      })
      if (cancelled) return

      // Hold
      await new Promise<void>((r) => setTimeout(r, 700))
      if (cancelled) return

      // Phase 2 — shrink to actual size and settle at top
      await controls.start({
        scale: 1,
        y: 0,
        transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
      })
      if (cancelled) return

      onCompleteRef.current()
    }

    run()
    return () => {
      cancelled = true
    }
  }, [controls])

  return (
    <div ref={measureRef}>
      <motion.div
        animate={controls}
        initial={{ opacity: 0 }}
        style={{ willChange: 'transform, opacity' }}
        className=""
      >
        <Image src="/logo.svg" alt="Logo" width={500} height={500} className="w-56 h-56 object-contain" priority />
      </motion.div>
    </div>
  )
}
