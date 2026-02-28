'use client'

import { motion } from 'motion/react'

// Replace with the actual contact phone number
const PHONE_DISPLAY = '+39 389 1659031'
const PHONE_HREF = 'tel:+3891659031'

interface ContactInfoProps {
  isVisible: boolean
}

export default function ContactInfo({ isVisible }: ContactInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className="flex items-center gap-4"
    >
      {/* Decorative line */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="block h-px w-10 origin-right bg-[#c9a96e] opacity-40"
      />

      <a
        href={PHONE_HREF}
        className="text-sm tracking-[0.25em] text-[#9a9490] transition-colors duration-300 hover:text-[#c9a96e]"
      >
        {PHONE_DISPLAY}
      </a>

      {/* Decorative line */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="block h-px w-10 origin-left bg-[#c9a96e] opacity-40"
      />
    </motion.div>
  )
}
