import { useEffect, useState } from 'react'
import { profile } from '../data/resume'

const links = ['about', 'experience', 'projects', 'skills', 'contact']

export default function Navbar({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-md' : ''}`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-medium">
          <span className="text-accent">~/</span>
          {profile.name.split(' ')[0].toLowerCase()}
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className={`rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${active === l ? 'bg-surface text-fg' : 'text-muted hover:text-fg'}`}
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-fg"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted md:hidden"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-b border-line bg-bg/95 px-4 pb-4 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className="block py-2 capitalize text-muted hover:text-fg">
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
