import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { Minus, X } from 'lucide-react'
import Logo from '../components/Logo'
import Bricks from '../components/Bricks'
import './Skills.css'


const CATEGORIES = [
  { title: 'Langages', blurb: 'Mes outils de tous les jours.', skills: [
    { name: 'JavaScript', level: 3 }, { name: 'Python', level: 3 }, { name: 'Java', level: 1 },
    { name: 'C', level: 2 }, { name: 'TypeScript', level: 2 }, { name: 'C++', level: 2 } ] },
  { title: 'Front-end', blurb: 'Donner forme aux idées.', skills: [
    { name: 'React', level: 3 }, { name: 'HTML5', level: 3 }, { name: 'CSS3', level: 3 },
    { name: 'Tailwind', level: 2 }, { name: 'Framer Motion', level: 2 } ] },
  { title: 'Back-end & données', blurb: 'Ce qui tourne en coulisses.', skills: [
    { name: 'Node.js', level: 2 }, { name: 'SQL', level: 2 }, { name: 'PostgreSQL', level: 2 },
    { name: 'MongoDB', level: 1 }, { name: 'API REST', level: 2 } ] },
  { title: 'Outils & workflow', blurb: 'Pour livrer proprement.', skills: [
    { name: 'Git', level: 3 }, { name: 'GitHub', level: 3 }, { name: 'VS Code', level: 3 },
    { name: 'Docker', level: 1 }, { name: 'Figma', level: 1 }, { name: 'Linux', level: 3 } ] },
]
const LEARNING = ['TypeScript avancé', 'Next.js', 'Docker', 'Tests (Vitest)', 'CI/CD']
const LABELS = { 3: 'confirmé', 2: 'à l’aise', 1: 'en cours' }

/* ── Programmes (icônes du bureau) ───────────────────────────────── */
const PROGRAMS = [
  ...CATEGORIES.map((c, i) => ({ id: `cat-${i}`, kind: 'folder', label: c.title, cat: c })),
  { id: 'terminal', kind: 'terminal', label: 'terminal' },
  { id: 'readme', kind: 'notes', label: 'à_explorer.txt' },
]

/* ── Sortie pré-calculée du terminal ─────────────────────────────── */
const bars = (lvl) => '■'.repeat(lvl) + '□'.repeat(3 - lvl)
const TERMINAL_LINES = (() => {
  const out = ['jeremydelfino@portfolio:~$ ./skills --all', '']
  for (const c of CATEGORIES) {
    out.push(`## ${c.title}`)
    for (const s of c.skills) out.push(`  ${s.name.padEnd(14)} [${bars(s.level)}]  ${LABELS[s.level]}`)
    out.push('')
  }
  const total = CATEGORIES.reduce((a, c) => a + c.skills.length, 0)
  out.push(`> ${total} compétences chargées ✓`)
  return out
})()
const lineClass = (ln) =>
  ln.startsWith('jeremydelfino@') ? 'tl-prompt' : ln.startsWith('##') ? 'tl-head' : ln.startsWith('>') ? 'tl-ok' : 'tl'

/* ── Hooks utilitaires ───────────────────────────────────────────── */
function useCompact() {
  const [c, setC] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(max-width: 760px)')
    const f = () => setC(m.matches); f()
    m.addEventListener('change', f); return () => m.removeEventListener('change', f)
  }, [])
  return c
}
function useClock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => { const id = setInterval(() => setT(new Date()), 30000); return () => clearInterval(id) }, [])
  return t.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}
function useStream(active) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) { setN(0); return }
    setN(0); let i = 0
    const id = setInterval(() => { i += 1; setN(i); if (i >= TERMINAL_LINES.length) clearInterval(id) }, 65)
    return () => clearInterval(id)
  }, [active])
  return n
}

/* ── Icônes line-art ─────────────────────────────────────────────── */
const FolderIcon = ({ s = 52 }) => (
  <svg width={s} height={s * 0.82} viewBox="0 0 64 52" fill="none" aria-hidden="true">
    <path d="M5 16 v-4 a3 3 0 0 1 3 -3 h13 l6 7" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinejoin="round" />
    <rect x="5" y="14" width="54" height="33" rx="5" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3.5" />
  </svg>
)
const TerminalIcon = ({ s = 52 }) => (
  <svg width={s} height={s * 0.82} viewBox="0 0 64 52" fill="none" aria-hidden="true">
    <rect x="4" y="5" width="56" height="42" rx="7" fill="#1C1B18" stroke="var(--c-ink)" strokeWidth="3.5" />
    <path d="M15 20 l8 6 -8 6" stroke="#9BC472" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 32 h14" stroke="#9BC472" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
)
const NoteIcon = ({ s = 48 }) => (
  <svg width={s} height={s * 1.12} viewBox="0 0 48 54" fill="none" aria-hidden="true">
    <path d="M7 4 h26 l9 9 v37 H7 Z" fill="var(--c-brick)" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M33 4 v9 h9" fill="none" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M14 26 H34 M14 33 H34 M14 40 H27" stroke="var(--c-ink)" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
const ProgIcon = ({ kind, s }) =>
  kind === 'terminal' ? <TerminalIcon s={s} /> : kind === 'notes' ? <NoteIcon s={s} /> : <FolderIcon s={s} />

/* Doodles de fond de bureau (pont avec « l'établi ») */
const Plant = ({ s = 64 }) => (
  <svg width={s} height={s * 1.15} viewBox="0 0 64 74" fill="none" aria-hidden="true">
    <g className="sk-sway">
      <ellipse cx="22" cy="34" rx="9" ry="18" transform="rotate(-26 22 34)" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" />
      <ellipse cx="42" cy="32" rx="9" ry="19" transform="rotate(24 42 32)" fill="var(--c-sage)" stroke="var(--c-ink)" strokeWidth="3" />
      <ellipse cx="32" cy="22" rx="8.5" ry="20" transform="rotate(-2 32 22)" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" />
    </g>
    <path d="M15 48 H49 L44 70 Q43.5 73 40 73 H24 Q20.5 73 20 70 Z" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M18 54 H46" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
)
const Mug = ({ s = 56 }) => (
  <svg width={s} height={s} viewBox="0 0 56 60" fill="none" aria-hidden="true">
    <g className="sk-steam" fill="none" stroke="#9BC472" strokeOpacity="0.6" strokeWidth="2.4" strokeLinecap="round">
      <path d="M20 22 c-3 -5 3 -7 0 -12" /><path d="M30 22 c-3 -5 3 -7 0 -12" />
    </g>
    <rect x="8" y="24" width="34" height="26" rx="7" fill="var(--c-brick)" stroke="var(--c-ink)" strokeWidth="3.5" />
    <ellipse cx="25" cy="25" rx="15" ry="3.6" fill="var(--c-sand)" />
    <path d="M42 29 c12 0 12 15 0 15" fill="none" stroke="var(--c-ink)" strokeWidth="3.5" />
  </svg>
)

function Meter({ level }) {
  return (
    <span className="skill__meter" aria-hidden="true">
      {[1, 2, 3].map((n) => <span key={n} className={`skill__seg ${n <= level ? 'is-on' : ''}`} />)}
    </span>
  )
}

/* ── Fenêtre déplaçable ──────────────────────────────────────────── */
function Win({ prog, z, active, compact, constraints, pos, onFocus, onClose, onMin }) {
  const controls = useDragControls()
  const n = useStream(prog.kind === 'terminal') // flux machine-à-écrire, démarre à l'ouverture
  return (
    <motion.div
      className={`win win--${prog.kind} ${active ? 'is-active' : ''} ${compact ? 'win--compact' : ''}`}
      style={compact ? { zIndex: z } : { zIndex: z, left: pos.x, top: pos.y }}
      drag={!compact} dragControls={controls} dragListener={false}
      dragConstraints={constraints} dragMomentum={false} dragElastic={0.04}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.85, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 12 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <div className="win__bar" onPointerDown={(e) => { if (!compact) controls.start(e) }}>
        <span className="win__title">{prog.kind === 'folder' ? `~/${prog.label}` : prog.label}</span>
        <span className="win__btns">
          <button className="win__btn" aria-label="Réduire" onPointerDown={(e) => e.stopPropagation()} onClick={onMin}><Minus size={14} strokeWidth={3} /></button>
          <button className="win__btn win__btn--close" aria-label="Fermer" onPointerDown={(e) => e.stopPropagation()} onClick={onClose}><X size={14} strokeWidth={3} /></button>
        </span>
      </div>

      <div className="win__body">
        {prog.kind === 'folder' && (
          <>
            <p className="win__hint">{prog.cat.blurb}</p>
            <ul className="filelist">
              {prog.cat.skills.map((sk) => (
                <li key={sk.name} className="filerow" title={LABELS[sk.level]}>
                  <span className="filerow__name">{sk.name}</span>
                  <Meter level={sk.level} />
                </li>
              ))}
            </ul>
            <p className="win__foot">{prog.cat.skills.length} éléments</p>
          </>
        )}

        {prog.kind === 'terminal' && (
          <pre className="termout">
            {TERMINAL_LINES.slice(0, n).map((ln, i) => (
              <div key={i} className={lineClass(ln)}>{ln || '\u00A0'}</div>
            ))}
            <span className="termcur">_</span>
          </pre>
        )}

        {prog.kind === 'notes' && (
          <div className="note">
            <p className="note__h">// prochaines explorations</p>
            <ul className="note__list">
              {LEARNING.map((x) => <li key={x}><span className="chk" /> {x}</li>)}
            </ul>
            <p className="note__foot">// TODO: ne jamais arrêter d’apprendre ∞</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const cascade = (k) => ({ x: 70 + k * 30, y: 38 + k * 26 })

export default function Skills() {
  const compact = useCompact()
  const clock = useClock()
  const screenRef = useRef(null)
  const [booted, setBooted] = useState(false)
  const [open, setOpen] = useState(['terminal'])
  const [min, setMin] = useState(() => new Set())
  const [pos, setPos] = useState({ terminal: { x: 70, y: 38 } })

  const activeId = open.filter((id) => !min.has(id)).slice(-1)[0]

  const openProg = (id) => {
    setMin((m) => { const s = new Set(m); s.delete(id); return s })
    setOpen((o) => {
      if (o.includes(id)) return [...o.filter((x) => x !== id), id]
      setPos((p) => (p[id] ? p : { ...p, [id]: cascade(o.length) }))
      return [...o, id]
    })
  }
  const focus = (id) => setOpen((o) => (o[o.length - 1] === id ? o : [...o.filter((x) => x !== id), id]))
  const close = (id) => { setOpen((o) => o.filter((x) => x !== id)); setMin((m) => { const s = new Set(m); s.delete(id); return s }) }
  const minimize = (id) => setMin((m) => new Set(m).add(id))
  const taskClick = (id) => { if (min.has(id)) openProg(id); else if (activeId === id) minimize(id); else focus(id) }

  const prog = (id) => PROGRAMS.find((p) => p.id === id)
  const visible = open.filter((id) => !min.has(id))

  return (
    <section id="skills" className="skills">
      <div className="skills__panel">
        <Bricks />
        <div className="skills__content">
          <header className="skills__head">
            <p className="mono">&gt; compétences _</p>
            <h2>Mon environnement de travail</h2>
            <p className="skills__lead">
              Voici l'endroit qui me passionne, même si à première vu ce n'est pas très joli c'est l'endroit qui a révolutionné le monde et qui continuera de le faire. Alors vous aussi venez découvrir mes capacités et mes compétences via ce magnifique terminal
            </p>
          </header>

          {/* ── L'écran / OS ───────────────────────────────────────── */}
          <motion.div
            className="os"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onViewportEnter={() => setBooted(true)}
          >
            <div className="os__bar">
              <span className="os__dots"><i /><i /><i /></span>
              <span className="os__name">JD//OS — ~/compétences</span>
              <span className="os__bar-spacer" />
            </div>

            <div className="os__screen" ref={screenRef}>
              {/* fond de bureau */}
              <div className="os__wall" aria-hidden="true" />
              <span className="os__deco os__deco--plant"><Plant s={64} /></span>
              <span className="os__deco os__deco--mug"><Mug s={54} /></span>
              <span className="os__sticky" aria-hidden="true">
                <span>note :</span> reste curieux ✦
              </span>

              {/* icônes du bureau */}
              <motion.div
                className="os__icons"
                initial="hidden" animate={booted ? 'show' : 'hidden'}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
              >
                {PROGRAMS.map((p) => (
                  <motion.button
                    key={p.id} className="os__icon" onClick={() => openProg(p.id)}
                    variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1 } }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  >
                    <ProgIcon kind={p.kind} s={48} />
                    <span className="os__icon-label">{p.label}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* fenêtres */}
              <div className={`os__windows ${compact ? 'os__windows--stack' : ''}`}>
                <AnimatePresence>
                  {visible.map((id) => {
                    const p = prog(id)
                    return (
                      <Win
                        key={id} prog={p} compact={compact} constraints={screenRef}
                        z={20 + open.indexOf(id)} active={activeId === id} pos={pos[id] || cascade(0)}
                        onFocus={() => focus(id)} onClose={() => close(id)} onMin={() => minimize(id)}
                      />
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* barre des tâches */}
              <div className="os__taskbar">
                <span className="os__start"><Logo size={22} /></span>
                <div className="os__tasks">
                  {open.map((id) => {
                    const p = prog(id)
                    return (
                      <button
                        key={id}
                        className={`os__task ${activeId === id ? 'is-active' : ''} ${min.has(id) ? 'is-min' : ''}`}
                        onClick={() => taskClick(id)}
                      >
                        <ProgIcon kind={p.kind} s={16} />
                        <span>{p.label}</span>
                      </button>
                    )
                  })}
                </div>
                <span className="os__clock">{clock}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}