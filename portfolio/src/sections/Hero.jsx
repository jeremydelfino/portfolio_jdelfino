import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { PenTool, Lightbulb, Share2 } from 'lucide-react'
import Bricks from '../components/Bricks'
import DeskScene from '../components/DeskScene'
import './Hero.css'

const ROLES = ['développeur', 'étudiant en informatique', 'amateur de vanilla latté', 'fan KC']

function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    if (!deleting && text === word) { const t = setTimeout(() => setDeleting(true), pause); return () => clearTimeout(t) }
    if (deleting && text === '') { setDeleting(false); setI(i + 1); return }
    const t = setTimeout(() => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), deleting ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [text, deleting, i, words, speed, pause])
  return text
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const TRIO = [
  { icon: PenTool, title: 'Créer', desc: 'Donner vie aux idées.' },
  { icon: Lightbulb, title: 'Apprendre', desc: 'Explorer sans relâche.' },
  { icon: Share2, title: 'Partager', desc: 'Transmettre mes trouvailles.' },
]

export default function Hero() {
  const role = useTypewriter(ROLES)
  return (
    <section id="hero" className="hero">
      <div className="hero__panel">
        <Bricks />
        <div className="hero__content">
          <div className="hero__main">
            <div className="hero__text">
              <motion.p className="mono" {...fade(0.3)}>&gt; portfolio _</motion.p>
              <motion.h1 className="hero__name" {...fade(0.4)}>Jérémy<br />Delfino</motion.h1>
              <motion.p className="hero__lead" {...fade(0.55)}>Étudiant en informatique qui transforme le café en code propre.</motion.p>
              <motion.div className="hero__cta" {...fade(0.7)}>
                <a href="#projects" className="btn btn--primary btn--lg">Voir mes projets</a>
                <a href="#contact" className="btn btn--ghost btn--lg">Me contacter</a>
              </motion.div>
            </div>
            <motion.div className="hero__visual" {...fade(0.5)}>
              <DeskScene role={role} />
            </motion.div>
          </div>
          <div className="hero__trio">
            {TRIO.map(({ icon: Icon, title, desc }, i) => (
              <motion.article key={title} className="trio" {...fade(0.85 + i * 0.12)}>
                <div className="trio__icon"><Icon size={28} strokeWidth={2.2} /></div>
                <div><h3>{title}</h3><p>{desc}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}