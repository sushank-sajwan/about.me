import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'

function initialTheme() {
  const saved = document.documentElement.dataset.theme
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme)
  const [colors, setColors] = useState({ accent: '#7c9cff', accent2: '#5eead4' })
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable */
    }
    // The 3D scene can't read CSS vars, so pass the resolved theme colours down.
    const cs = getComputedStyle(document.documentElement)
    setColors({ accent: cs.getPropertyValue('--accent').trim(), accent2: cs.getPropertyValue('--accent-2').trim() })
  }, [theme])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2" />
      <Navbar theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero colors={colors} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
