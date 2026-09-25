import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, kicker, title, children }: { id: string; kicker: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal>
        <p className="font-mono text-sm text-accent">{kicker}</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-xs text-muted">{children}</span>
  )
}
