'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const TEXT1 = "Abbiamo deciso di rifarci il look! Il sito è in pausa per qualche giorno perché stiamo preparando una vetrina tutta nuova e tante novità che non vediamo l'ora di mostrarti."

const TEXT2 = "Ci scusiamo per il momentaneo disagio. Se hai urgenza di un ordine, contattaci tramite WhatsApp al numero in seguito."

interface TypingTextProps {
  isVisible: boolean
  onComplete: () => void
}

export default function TypingText({ isVisible, onComplete }: TypingTextProps) {
  const [displayed1, setDisplayed1] = useState('')
  const [displayed2, setDisplayed2] = useState('')
  const [phase, setPhase] = useState<'text1' | 'text2' | 'done'>('text1')
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Phase 1 — type first block
  useEffect(() => {
    if (!isVisible || phase !== 'text1') return

    let i = 0
    const interval = setInterval(() => {
      i += 1
      setDisplayed1(TEXT1.slice(0, i))
      if (i >= TEXT1.length) {
        clearInterval(interval)
        // Short pause before starting second block
        setTimeout(() => setPhase('text2'), 600)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [isVisible, phase])

  // Phase 2 — type second block
  useEffect(() => {
    if (phase !== 'text2') return

    let i = 0
    const interval = setInterval(() => {
      i += 1
      setDisplayed2(TEXT2.slice(0, i))
      if (i >= TEXT2.length) {
        clearInterval(interval)
        setPhase('done')
        setTimeout(() => onCompleteRef.current(), 400)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [phase])

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col gap-5 text-center md:w-2/3 w-full"
    >
      {/* First block */}
      <p className="text-base md:text-lg font-light leading-relaxed tracking-wide text-[#f5f0eb]">
        {displayed1}
        {phase === 'text1' && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.65, repeatType: 'reverse' }}
            className="ml-1 inline-block h-[1em] w-[1.5px] translate-y-[0.1em] bg-[#c9a96e]"
          />
        )}
      </p>

      {/* Second block — fades in when phase reaches text2 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'text1' ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="text-sm md:text-base font-light leading-relaxed tracking-wide text-[#9a9490]"
      >
        {displayed2}
        {phase === 'text2' && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.65, repeatType: 'reverse' }}
            className="ml-1 inline-block h-[0.9em] w-[1.5px] translate-y-[0.1em] bg-[#c9a96e]"
          />
        )}
      </motion.p>
    </motion.div>
  )
}
