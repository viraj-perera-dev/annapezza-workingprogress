'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Logo from './components/Logo'
import ContactInfo from './components/ContactInfo'
import Footer from './components/Footer'

const TEXT1 = "Abbiamo deciso di rifarci il look! Il sito è in pausa per qualche giorno perché stiamo preparando una vetrina tutta nuova e tante novità che non vediamo l'ora di mostrarti."
const TEXT2 = "Ci scusiamo per il momentaneo disagio. Se hai urgenza di un ordine, contattaci tramite WhatsApp al numero in seguito."

const ease = [0.25, 0.46, 0.45, 0.94] as const

export default function Home() {
  const [logoSettled, setLogoSettled] = useState(false)
  const [typingDone, setTypingDone] = useState(false)

  const handleLogoComplete = useCallback(() => setLogoSettled(true), [])

  // Show phone number after TEXT2 finishes (delay 0.35s + duration 1.1s + small buffer)
  useEffect(() => {
    if (!logoSettled) return
    const t = setTimeout(() => setTypingDone(true), 1600)
    return () => clearTimeout(t)
  }, [logoSettled])

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#080808]">

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Logo — absolute top center */}
      <div className="absolute inset-x-0 top-8 flex justify-center">
        <Logo onComplete={handleLogoComplete} />
      </div>

      {/* Text + contact — vertically centered in the viewport */}
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="flex flex-col items-center gap-5 w-full md:w-2/3">

          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={logoSettled
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 22, filter: 'blur(10px)' }}
            transition={{ duration: 1.1, ease }}
            className="text-base md:text-lg font-light leading-relaxed tracking-wide text-[#f5f0eb]"
          >
            {TEXT1}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={logoSettled
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 22, filter: 'blur(10px)' }}
            transition={{ duration: 1.1, ease, delay: 0.35 }}
            className="text-sm md:text-base font-light leading-relaxed tracking-wide text-[#9a9490]"
          >
            {TEXT2}
          </motion.p>

          <ContactInfo isVisible={typingDone} />
        </div>
      </div>

      {/* Footer always at bottom edge */}
      <Footer isVisible={logoSettled} />

    </div>
  )
}
