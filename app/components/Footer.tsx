'use client'

import { motion } from 'motion/react'

interface FooterProps {
  isVisible: boolean
}

export default function Footer({ isVisible }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
      className="fixed bottom-8 left-0 right-0 text-center"
    >
      <p className="text-[10px] tracking-[0.3em] text-[#4a4745] uppercase">
        Questo sito è stato realizzato da&nbsp;
        <a
          href="https://vdesign.website"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-300 hover:text-[#c9a96e]"
        >
          vdesign.website
        </a>
      </p>
    </motion.footer>
  )
}
