import { useEffect, useMemo, useRef, useState } from 'react'
import { skills } from '../data/resume'
import { Reveal, Section } from './ui'

// Rotating 3D tag sphere. Pointer position steers the spin; hovering a group highlights its tags.
function TagSphere({ highlight }: { highlight: string | null }) {
  const tags = useMemo(() => skills.flatMap((g) => g.items.map((t) => ({ t, g: g.group }))), [])
  const box = useRef<HTMLDivElement>(null)
  const els = useRef<(HTMLSpanElement | null)[]>([])
  const speed = useRef({ x: 0.002, y: 0.004 })

  const base = useMemo(
    () =>
      tags.map((_, i) => {
        const phi = Math.acos(-1 + (2 * i + 1) / tags.length)
        const theta = Math.sqrt(tags.length * Math.PI) * phi
        return [Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)]
      }),
    [tags],
  )

  useEffect(() => {
    const pos = base.map((p) => [...p])
    let raf = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tick = () => {
      const r = (box.current?.offsetWidth ?? 300) / 2.4
      const { x: ax, y: ay } = speed.current
      const [cx, sx, cy, sy] = [Math.cos(ax), Math.sin(ax), Math.cos(ay), Math.sin(ay)]
      pos.forEach((p, i) => {
        // rotate around X then Y
        const y1 = p[1] * cx - p[2] * sx
        const z1 = p[1] * sx + p[2] * cx
        const x2 = p[0] * cy + z1 * sy
        const z2 = -p[0] * sy + z1 * cy
        p[0] = x2
        p[1] = y1
        p[2] = z2
        const el = els.current[i]
        if (!el) return
        const scale = (z2 + 2) / 3
        el.style.transform = `translate(-50%, -50%) translate3d(${x2 * r}px, ${y1 * r}px, 0) scale(${scale})`
        el.style.opacity = String(0.25 + ((z2 + 1) / 2) * 0.75)
        el.style.zIndex = String(Math.round(z2 * 100) + 100)
      })
      if (!reduced) raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [base])

  const onMove = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    speed.current = { x: -ny * 0.03, y: nx * 0.03 }
  }

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={() => (speed.current = { x: 0.002, y: 0.004 })}
      className="relative mx-auto aspect-square w-full max-w-md touch-none select-none"
      aria-label="Skills sphere"
    >
      {tags.map(({ t, g }, i) => (
        <span
          key={t}
          ref={(el) => {
            els.current[i] = el
          }}
          className={`absolute top-1/2 left-1/2 whitespace-nowrap font-mono text-sm transition-colors sm:text-base ${
            highlight && highlight !== g ? 'text-muted/40' : highlight ? 'font-semibold text-accent' : 'text-fg'
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <Section id="skills" kicker="04 · skills" title="The toolkit">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <TagSphere highlight={hover} />
        </Reveal>
        <div className="space-y-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06}>
              <div
                onMouseEnter={() => setHover(g.group)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setHover((h) => (h === g.group ? null : g.group))}
                className={`cursor-default rounded-2xl border p-4 transition-colors ${hover === g.group ? 'border-accent bg-surface' : 'border-line'}`}
              >
                <p className="font-display font-semibold">{g.group}</p>
                <p className="mt-1 text-sm text-muted">{g.items.join(' · ')}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
