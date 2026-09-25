import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import { featuredProjects, type Project } from '../data/resume'
import { Chip, Reveal, Section } from './ui'

function TiltCard({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const glow = useTransform([x, y], ([gx, gy]: number[]) => `radial-gradient(400px circle at ${gx * 100}% ${gy * 100}%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%)`)

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }

  return (
    <Reveal delay={(index % 3) * 0.08} className="[perspective:1000px]">
      <motion.button
        onClick={onOpen}
        onMouseMove={onMove}
        onMouseLeave={() => {
          x.set(0.5)
          y.set(0.5)
        }}
        style={{ rotateX, rotateY }}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 text-left transition-colors hover:border-accent"
      >
        <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0" />
        <div className="relative flex items-center justify-between">
          <span className="font-mono text-xs text-muted">{p.company}</span>
          <span className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">↗</span>
        </div>
        <h3 className="relative mt-4 font-display text-2xl font-bold">{p.name}</h3>
        <p className="relative mt-1 text-sm text-muted">{p.tagline}</p>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {p.metrics.map((m) => (
            <span key={m} className="rounded-md bg-accent/10 px-2 py-1 font-mono text-xs text-accent">
              {m}
            </span>
          ))}
        </div>
        <div className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
          {p.tech.slice(0, 4).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </motion.button>
    </Reveal>
  )
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-surface p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted">{p.company}</p>
            <h3 className="mt-1 font-display text-3xl font-bold">{p.name}</h3>
            <p className="mt-1 text-muted">{p.tagline}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted hover:text-fg">
            ✕
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.metrics.map((m) => (
            <span key={m} className="rounded-md bg-accent/10 px-2.5 py-1.5 font-mono text-sm text-accent">
              {m}
            </span>
          ))}
        </div>
        <ul className="mt-6 space-y-3 leading-relaxed text-muted">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2">
              <span className="text-accent-2">▹</span>
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  return (
    <Section id="projects" kicker="03 · projects" title={<>Systems I've <span className="grad-text">shipped</span></>}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <TiltCard key={p.name} p={p} index={i} onOpen={() => setSelected(p)} />
        ))}
      </div>
      <AnimatePresence>{selected && <Modal p={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </Section>
  )
}
