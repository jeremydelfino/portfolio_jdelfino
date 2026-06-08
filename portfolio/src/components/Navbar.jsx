import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import './NavBar.css'

const LINKS = [
  { label: 'À propos', href: '#about', id: 'about' },
  { label: 'Parcours', href: '#experience', id: 'experience' },
  { label: 'Projets', href: '#projects', id: 'projects' },
  { label: 'Compétences', href: '#skills', id: 'skills' },
]
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }
const item = { hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.id), 'contact']
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <motion.header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="nav__pill">
        <a href="#hero" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__chip"><Logo size={26} /></span>
          <span className="nav__name">Jérémy Delfino</span>
        </a>

        <motion.nav className="nav__links" variants={wrap} initial="hidden" animate="show">
          {LINKS.map((l) => (
            <motion.a key={l.id} href={l.href} variants={item}
              className={`nav__link ${active === l.id ? 'is-active' : ''}`}>{l.label}</motion.a>
          ))}
          <motion.a href="#contact" variants={item}
            className={`nav__contact ${active === 'contact' ? 'is-active' : ''}`}>Contact</motion.a>
        </motion.nav>

        <button className="nav__burger" aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="nav__mobile"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <div className="nav__mobile-inner">
              {LINKS.map((l) => (
                <a key={l.id} href={l.href} onClick={() => setOpen(false)}
                  className={active === l.id ? 'is-active' : ''}>{l.label}</a>
              ))}
              <a href="#contact" className="nav__contact" onClick={() => setOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}