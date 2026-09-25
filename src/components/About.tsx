import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { education, profile, stats } from '../data/resume'
import { Reveal, Section } from './ui'

// Counts the numeric part of a stat up from 0, keeping its prefix/suffix ("8.5+", "50–68%").
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    const m = value.match(/^([^\d]*)([\d,.]+)(.*)$/)
    if (!inView || !m || !ref.current) return
    const target = parseFloat(m[2].replace(/,/g, ''))
    const decimals = m[2].includes('.') ? 1 : 0
    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = m[1] + v.toLocaleString('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + m[3]
      },
    })
    return () => controls.stop()
  }, [inView, value])
  return <span ref={ref}>{value}</span>
}

export default function About() {
  return (
    <Section id="about" kicker="01 · about" title={<>Building AI that holds up <span className="grad-text">in production</span></>}>
      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted md:col-span-3">
          <p>{profile.summary}</p>
          <p>
            I work across the full stack of LLM systems — secure ingestion, hybrid retrieval, multi-agent orchestration with
            LangGraph and CrewAI, model serving on <span className="text-fg">AWS Bedrock</span> and{' '}
            <span className="text-fg">Vertex AI</span>, and the evaluation, guardrails and observability that keep it all reliable.
          </p>
          <div className="space-y-3 pt-4">
            {education.map((e) => (
              <div key={e.degree} className="flex flex-col gap-1 border-l-2 border-line pl-4 text-base sm:flex-row sm:justify-between">
                <div>
                  <p className="text-fg">{e.degree}</p>
                  <p className="text-sm">{e.school}</p>
                </div>
                <p className="font-mono text-sm">{e.period}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent">
                <p className="font-display text-3xl font-bold text-fg sm:text-4xl">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
