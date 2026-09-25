import { useState } from 'react'
import { profile } from '../data/resume'
import { Reveal } from './ui'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <p className="relative font-mono text-sm text-accent">05 · contact</p>
          <h2 className="relative mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Let's build something <span className="grad-text">intelligent</span>.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-muted">
            Open to conversations about LLM platforms, agentic systems, RAG and tech-lead roles.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5">
              Email me
            </a>
            <button onClick={copy} className="rounded-full border border-line bg-bg px-5 py-2.5 font-mono text-sm transition-transform hover:-translate-y-0.5">
              {copied ? '✓ copied' : profile.email}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-line bg-bg px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5">
              LinkedIn ↗
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border border-line bg-bg px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5">
              GitHub ↗
            </a>
          </div>
        </div>
      </Reveal>
      <footer className="mt-12 flex flex-col items-center justify-between gap-2 font-mono text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with React · Three.js · Framer Motion</p>
      </footer>
    </section>
  )
}
