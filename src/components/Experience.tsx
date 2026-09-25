import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { experience } from '../data/resume'
import { Chip, Reveal, Section } from './ui'

export default function Experience() {
  const [open, setOpen] = useState(0)
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <Section id="experience" kicker="02 · experience" title="Where I've built">
      <ol ref={ref} className="relative ml-2 sm:ml-4">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-line" />
        <motion.div style={{ scaleY }} className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2" />
        {experience.map((job, i) => {
          const isOpen = open === i
          return (
            <li key={job.company} className="relative pb-10 pl-8 sm:pl-12">
              <span
                className={`absolute top-1.5 -left-[7px] h-3.5 w-3.5 rounded-full border-2 transition-colors ${isOpen ? 'border-accent bg-accent' : 'border-line bg-bg'}`}
              />
              <Reveal>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="group w-full text-left" aria-expanded={isOpen}>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold group-hover:text-accent sm:text-2xl">
                    {job.title} <span className="text-muted">@ {job.company}</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {job.location} · {job.projects.map((p) => p.name).join(', ')}{' '}
                    <span className="text-accent">{isOpen ? '−' : '+'}</span>
                  </p>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 space-y-4">
                        {job.projects.map((p) => (
                          <div key={p.name} className="rounded-2xl border border-line bg-surface p-5">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <p className="font-display text-lg font-semibold">{p.name}</p>
                              <p className="text-sm text-muted">{p.tagline}</p>
                            </div>
                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                              {p.points.map((pt) => (
                                <li key={pt} className="flex gap-2">
                                  <span className="text-accent-2">▹</span>
                                  {pt}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {p.tech.map((t) => (
                                <Chip key={t}>{t}</Chip>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
