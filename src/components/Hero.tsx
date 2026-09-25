import { motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '../data/resume'

const HeroScene = lazy(() => import('./HeroScene'))

function useTyping(words: string[]) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    const done = !deleting && text === word
    const t = setTimeout(
      () => {
        if (done) return setDeleting(true)
        if (deleting && text === '') {
          setDeleting(false)
          return setI((n) => n + 1)
        }
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      },
      done ? 1600 : deleting ? 35 : 70,
    )
    return () => clearTimeout(t)
  }, [text, deleting, i, words])
  return text
}

export default function Hero({ colors }: { colors: { accent: string; accent2: string } }) {
  const typed = useTyping(profile.roles)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="absolute inset-0 md:left-1/3">
        {!reduced && (
          <Suspense fallback={null}>
            <HeroScene {...colors} />
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none relative mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-2" />
          {profile.location} · open to conversations
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
        >
          Hi, I'm <br />
          <span className="grad-text">{profile.name.split(' ')[0]}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 h-8 font-mono text-lg text-fg sm:text-2xl"
        >
          &gt; {typed}
          <span className="animate-pulse text-accent">▍</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-4 max-w-lg text-muted sm:text-lg"
        >
          {profile.headline}. 8.5+ years shipping production-scale AI and distributed systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pointer-events-auto mt-8 flex flex-wrap gap-3"
        >
          <a href="#projects" className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5">
            See my work
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-surface/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            Download resume
          </a>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-muted" aria-label="Scroll down">
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="block">
          scroll ↓
        </motion.span>
      </a>
    </section>
  )
}
