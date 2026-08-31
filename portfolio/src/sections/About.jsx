import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RotateCw, MapPin, Download } from 'lucide-react'
import Logo from '../components/Logo'
import Bricks from '../components/Bricks'
import './About.css'

const meChill = '/dev_me_chill.png'
const CV_URL = '/cv.pdf' 
const LINKEDIN = 'https://www.linkedin.com/in/jeremydelfino/'


const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <line x1="7" y1="10" x2="7" y2="17" />
    <circle cx="7" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    <line x1="12" y1="17" x2="12" y2="10" />
    <path d="M12 12.6a2.5 2.5 0 0 1 5 0V17" />
  </svg>
)

/* ──────────────────────────────────────────────────────────────────
   Zone info
   ────────────────────────────────────────────────────────────────── */
const ME = {
  name: 'Jérémy DELFINO',
  role: 'Étudiant en informatique & développeur',
  city: 'Marseille & alentours',
  line: 'Passionné de tech, d\'esport.',
}
const POLAROID = {
  caption: 'Quelques une de mes passions au dos :)',
  back: 'Débutant au Piano, adore les animaux, un petit peu cinéphile, fan de culture G, Evidement les jeux vidéos et l\'esport, et pour finir les jeux de sociétés et les voitures',
}
const STICKIES = [
  { text: 'A appris le code en 2015 via les mods Minecraft.', tone: 'sand', rot: -3 },
  { text: 'Un beau code c\'est parfait, mais avec un beau design c\'est encore mieux.', tone: 'surface', rot: 2 },
  { text: 'Mon rêve ? Travailler dans le monde dans l\'esport ', tone: 'sage', rot: -2 },
  { text: '// en ce moment je travaille sur : Milo', tone: 'surface', rot: 3 },
  { text: 'Mon passe-temps du moment : Continuer Outer Wilds.', tone: 'sand', rot: -4 },
]
const TICKET = { artist: 'Imagine Dragons', sub: 'Stade de France', row: 'PLACE 21 · RANG F' }
const COFFEE = { filled: 7, total: 10 }

const LAYOUT = {
  polaroid: { left: '4%', top: 58, rot: -4, z: 6 },
  idcard: { right: '5%', top: 54, rot: 3, z: 5 },
  ticket: { left: '6%', top: 372, rot: 2, z: 4 },
  loyalty: { right: '8%', top: 388, rot: -2, z: 4 },
  mug: { left: '47%', top: 432, rot: 0, z: 2 },
  city: { left: '30%', top: 430, rot: 4, z: 3 },
  sticky: [
    { left: '33%', top: 48, rot: -2, z: 3 },
    { left: '60%', top: 248, rot: 3, z: 3 },
    { left: '29%', top: 230, rot: -3, z: 3 },
    { left: '62%', top: 56, rot: 2, z: 3 },
    { left: '45%', top: 128, rot: -3, z: 3 },
  ],
}

/* ── Liège ─────────────────────────────────────────── */
const Tack = () => (
  <span className="tack" aria-hidden="true">
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
      <line x1="11" y1="9" x2="11" y2="23" stroke="var(--c-ink)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="11" cy="8" r="7" fill="#D9776A" stroke="var(--c-ink)" strokeWidth="2.5" />
      <circle cx="8.5" cy="5.5" r="2" fill="var(--c-paper)" opacity="0.8" />
    </svg>
  </span>
)
const CupMini = ({ on }) => (
  <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 5 h8 v4 a3 3 0 0 1 -3 3 H6 a3 3 0 0 1 -3 -3 z" fill={on ? 'var(--c-sand)' : 'none'} stroke="var(--c-ink)" strokeWidth="1.6" />
    <path d="M11 6 c2.5 0 2.5 4 0 4" fill="none" stroke="var(--c-ink)" strokeWidth="1.6" />
  </svg>
)
const Mug = ({ s = 64 }) => (
  <svg width={s} height={s} viewBox="0 0 56 60" fill="none" aria-hidden="true">
    <g className="ab-steam" fill="none" stroke="var(--c-ink)" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round">
      <path d="M20 22 c-3 -5 3 -7 0 -12" /><path d="M30 22 c-3 -5 3 -7 0 -12" />
    </g>
    <rect x="8" y="24" width="34" height="26" rx="7" fill="var(--c-brick)" stroke="var(--c-ink)" strokeWidth="3.5" />
    <ellipse cx="25" cy="25" rx="15" ry="3.6" fill="var(--c-sand)" />
    <path d="M42 29 c12 0 12 15 0 15" fill="none" stroke="var(--c-ink)" strokeWidth="3.5" />
  </svg>
)
const Garland = () => {
  const colors = ['var(--c-sage)', 'var(--c-sand)', 'var(--c-forest)']
  return (
    <svg className="garland" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 14 Q500 46 1000 14" fill="none" stroke="var(--c-ink)" strokeWidth="2.5" />
      {Array.from({ length: 11 }).map((_, i) => {
        const x = 30 + i * 94
        const y = 14 + Math.sin((i / 10) * Math.PI) * 30
        return <path key={i} d={`M${x} ${y} l16 0 l-8 22 z`} fill={colors[i % 3]} stroke="var(--c-ink)" strokeWidth="2.2" strokeLinejoin="round" />
      })}
    </svg>
  )
}

/* ── DÉCOR ─────────── */
const Pendant = ({ s = 64 }) => (
  <svg width={s} height={s * 2.1} viewBox="0 0 60 126" fill="none" aria-hidden="true">
    <line x1="30" y1="0" x2="30" y2="54" stroke="var(--c-ink)" strokeWidth="2.5" />
    <ellipse className="lamp-glow" cx="30" cy="88" rx="36" ry="24" fill="#F6E7B0" />
    <rect x="23" y="48" width="14" height="9" rx="3" fill="var(--c-surface)" stroke="var(--c-ink)" strokeWidth="2.8" />
    <path d="M9 60 Q30 100 51 60 Z" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
    <ellipse cx="30" cy="74" rx="9" ry="5" fill="#FBEFB8" />
  </svg>
)
const FairyLights = () => (
  <svg className="fairy" viewBox="0 0 1000 56" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 8 Q250 44 500 14 T1000 10" fill="none" stroke="var(--c-ink)" strokeWidth="2" />
    {Array.from({ length: 22 }).map((_, i) => {
      const x = 18 + i * 45
      const t = i / 21
      const y = 8 + Math.sin(t * Math.PI * 2) * 16 + 16
      return (
        <g key={i}>
          <line x1={x} y1={y - 10} x2={x} y2={y} stroke="var(--c-ink)" strokeWidth="1.4" />
          <circle className="bulb" cx={x} cy={y + 3} r="4.5" fill="#F6E7B0" stroke="var(--c-ink)" strokeWidth="1.5" style={{ animationDelay: `${(i % 6) * 0.32}s` }} />
        </g>
      )
    })}
  </svg>
)
const Monstera = ({ s = 150 }) => (
  <svg width={s} height={s * 1.4} viewBox="0 0 150 210" fill="none" aria-hidden="true">
    <g className="ab-sway">
      <path d="M75 120 C40 110 25 70 40 40 C70 55 82 90 75 120 Z" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M75 120 C110 108 128 70 112 38 C82 54 70 92 75 120 Z" fill="var(--c-sage)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M75 122 C55 96 55 50 75 18 C95 50 95 96 75 122 Z" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M75 124 C44 124 24 100 18 74 C50 78 72 100 75 124 Z" fill="var(--c-sage)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M75 124 C106 124 126 100 132 74 C100 78 78 100 75 124 Z" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
    </g>
    <path d="M50 150 H100 L92 204 Q91 209 85 209 H65 Q59 209 58 204 Z" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M54 160 H96" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
)
const HangingPlant = ({ s = 96 }) => (
  <svg width={s} height={s * 1.5} viewBox="0 0 96 144" fill="none" aria-hidden="true">
    <g className="ab-sway-slow">
      <path d="M48 36 a30 14 0 1 0 0.1 0" fill="var(--c-surface)" stroke="var(--c-ink)" strokeWidth="3" />
      <path d="M22 40 H74 L68 64 H28 Z" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 60 q-10 28 -4 54" stroke="var(--c-forest)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M48 62 q4 34 0 64" stroke="var(--c-sage)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M66 60 q10 26 4 50" stroke="var(--c-forest)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="26" cy="118" r="6" fill="var(--c-forest)" /><circle cx="48" cy="128" r="6" fill="var(--c-sage)" /><circle cx="70" cy="112" r="6" fill="var(--c-forest)" />
    </g>
    <line x1="48" y1="0" x2="48" y2="34" stroke="var(--c-ink)" strokeWidth="2" />
  </svg>
)
const Window = ({ s = 168 }) => (
  <svg width={s} height={s * 1.12} viewBox="0 0 170 190" fill="none" aria-hidden="true">
    <rect x="6" y="6" width="158" height="170" rx="10" fill="#EAF0EC" stroke="var(--c-ink)" strokeWidth="4" />
    <circle cx="128" cy="44" r="16" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="2.5" />
    <path d="M14 150 h40 v-44 h22 v44 h18 v-66 h26 v66 h36" fill="var(--c-forest)" />
    <path d="M14 150 h40 v-44 h22 v44 h18 v-66 h26 v66 h36" fill="none" stroke="var(--c-ink)" strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="85" y1="6" x2="85" y2="176" stroke="var(--c-ink)" strokeWidth="4" />
    <line x1="6" y1="92" x2="164" y2="92" stroke="var(--c-ink)" strokeWidth="4" />
    <rect x="0" y="176" width="170" height="14" rx="4" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
  </svg>
)
const NeonCup = ({ s = 92 }) => (
  <svg className="neon" width={s} height={s} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <g stroke="var(--c-sage)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26 40 h40 v22 a14 14 0 0 1 -14 14 H40 a14 14 0 0 1 -14 -14 z" />
      <path d="M66 44 c16 0 16 22 0 22" />
      <path d="M40 30 c-4 -7 4 -9 0 -16" /><path d="M52 30 c-4 -7 4 -9 0 -16" />
    </g>
  </svg>
)
const Shelf = ({ s = 150 }) => (
  <svg width={s} height={s * 0.7} viewBox="0 0 150 105" fill="none" aria-hidden="true">
    <rect x="6" y="64" width="138" height="13" rx="3" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3" />
    <path d="M18 77 l10 16 M132 77 l-10 16" stroke="var(--c-ink)" strokeWidth="3" strokeLinecap="round" />
    <rect x="22" y="38" width="26" height="26" rx="5" fill="var(--c-brick)" stroke="var(--c-ink)" strokeWidth="3" />
    <path d="M48 44 c10 0 10 14 0 14" fill="none" stroke="var(--c-ink)" strokeWidth="3" />
    <rect x="64" y="30" width="14" height="34" rx="2" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" />
    <rect x="80" y="34" width="14" height="30" rx="2" fill="var(--c-sage)" stroke="var(--c-ink)" strokeWidth="3" />
    <ellipse cx="116" cy="56" rx="13" ry="8" fill="var(--c-surface)" stroke="var(--c-ink)" strokeWidth="3" />
    <path d="M116 30 q4 -8 0 -14" stroke="var(--c-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
  </svg>
)
const Menu = ({ s = 150 }) => (
  <svg width={s} height={s * 0.95} viewBox="0 0 150 142" fill="none" aria-hidden="true">
    <line x1="40" y1="0" x2="48" y2="22" stroke="var(--c-ink)" strokeWidth="2.4" />
    <line x1="110" y1="0" x2="102" y2="22" stroke="var(--c-ink)" strokeWidth="2.4" />
    <rect x="10" y="20" width="130" height="116" rx="8" fill="#1C1B18" stroke="var(--c-ink)" strokeWidth="4" />
    <text x="75" y="48" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="22" fill="#F6F1E9">카페</text>
    <line x1="34" y1="60" x2="116" y2="60" stroke="#8FA17C" strokeWidth="2" />
    <text x="26" y="82" fontFamily="monospace" fontSize="12" fill="#E9E2D2">vanilla latté ✓</text>
    <text x="26" y="102" fontFamily="monospace" fontSize="12" fill="#E9E2D2">americano</text>
    <text x="26" y="122" fontFamily="monospace" fontSize="12" fill="#E9E2D2">flat white</text>
  </svg>
)
const Stool = ({ s = 78 }) => (
  <svg width={s} height={s} viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <ellipse cx="40" cy="26" rx="26" ry="11" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3.5" />
    <path d="M20 30 l-8 44 M60 30 l8 44 M30 33 l-3 41 M50 33 l3 41" stroke="var(--c-ink)" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M16 56 H64" stroke="var(--c-ink)" strokeWidth="3" />
  </svg>
)

function CafeBackdrop() {
  return (
    <div className="cafe-backdrop" aria-hidden="true">
      <span className="bd bd-fairy"><FairyLights /></span>
      <span className="bd bd-lamp bd-lamp--l"><Pendant s={62} /></span>
      <span className="bd bd-lamp bd-lamp--r"><Pendant s={70} /></span>
      <span className="bd bd-hangplant bd-hide"><HangingPlant s={92} /></span>
      <span className="bd bd-neon bd-hide"><NeonCup s={88} /></span>
      <span className="bd bd-shelf bd-hide"><Shelf s={150} /></span>
      <span className="bd bd-window bd-hide"><Window s={168} /></span>
      <span className="bd bd-monstera bd-hide"><Monstera s={150} /></span>
      <span className="bd bd-menu bd-hide"><Menu s={148} /></span>
      <span className="bd bd-stool bd-hide"><Stool s={76} /></span>
    </div>
  )
}

/* ── Élément épinglé ─────────────────────────────────────────────── */
function Pin({ at, className = '', tack = true, compact, constraints, children }) {
  const flow = compact
  return (
    <motion.div
      className={`pin ${className} ${flow ? 'pin--flow' : ''}`}
      style={flow
        ? { '--rot': `${(at.rot || 0) / 2}deg` }
        : { left: at.left, right: at.right, top: at.top, zIndex: at.z || 1, '--rot': `${at.rot || 0}deg` }}
      drag={!flow} dragConstraints={constraints} dragMomentum={false} dragElastic={0.05}
      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 60, cursor: 'grabbing' }}
      initial={{ opacity: 0, y: -54, rotate: (at.rot || 0) * 2.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: flow ? (at.rot || 0) / 2 : (at.rot || 0) }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 240, damping: 17 }}
      whileHover={{ scale: 1.035, rotate: 0, y: -5, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
    >
      {tack && <Tack />}
      {children}
    </motion.div>
  )
}

function useCompact() {
  const [c, setC] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(max-width: 760px)')
    const f = () => setC(m.matches); f()
    m.addEventListener('change', f); return () => m.removeEventListener('change', f)
  }, [])
  return c
}

export default function About() {
  const compact = useCompact()
  const board = useRef(null)
  const [flip, setFlip] = useState(false)

  return (
    <section id="about" className="about">
      <div className="about__panel">
        <Bricks />
        <CafeBackdrop />

        <div className="about__content">
          <header className="about__head">
            <p className="mono">&gt; whoami _</p>
            <h2>Derrière l’écran</h2>
            <p className="about__lead">
              En Corée du Sud, j'adorai regarder l'histoire des propriétaires de café via la décoration, et les tableaux en liège. Si tu n'as pas envie de lire un CV classique, tu peux découvrir mon parcours et mes passions à travers ce petit tableau.
            </p>
            <div className="about__actions">
              <a className="btn btn--primary about__btn" href={CV_URL} download="CV-Jeremy-Delfino.pdf">
                <Download size={18} strokeWidth={2.4} /> Télécharger mon CV
              </a>
              <a className="btn btn--ghost about__btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={18} /> LinkedIn
              </a>
            </div>
          </header>

          <div className="board" ref={board}>
            <Garland />

            <Pin at={LAYOUT.polaroid} className="pin--polaroid" compact={compact} constraints={board}>
              <span className="tape" aria-hidden="true" />
              <div className={`polaroid ${flip ? 'is-flip' : ''}`}>
                <div className="polaroid__inner">
                  <div className="polaroid__face polaroid__front">
                    <img src={meChill} alt="Jérémy Delfino" className="polaroid__img" />
                    <p className="polaroid__cap">{POLAROID.caption}</p>
                  </div>
                  <div className="polaroid__face polaroid__back">
                    <p className="polaroid__backh">✎</p>
                    <p>{POLAROID.back}</p>
                  </div>
                </div>
                <button className="flipbtn" aria-label="Retourner la photo"
                  onPointerDown={(e) => e.stopPropagation()} onClick={() => setFlip((f) => !f)}>
                  <RotateCw size={14} strokeWidth={2.6} />
                </button>
              </div>
            </Pin>

            <Pin at={LAYOUT.idcard} className="pin--id" compact={compact} constraints={board}>
              <div className="idcard">
                <div className="idcard__top"><span className="idcard__chip"><Logo size={22} /></span> CARTE&nbsp;DEV</div>
                <dl className="idcard__rows">
                  <div><dt>nom</dt><dd>{ME.name}</dd></div>
                  <div><dt>rôle</dt><dd>{ME.role}</dd></div>
                  <div><dt>base</dt><dd>{ME.city}</dd></div>
                </dl>
                <p className="idcard__line">“{ME.line}”</p>
              </div>
            </Pin>

            {STICKIES.map((s, i) => (
              <Pin key={i} at={{ ...LAYOUT.sticky[i % LAYOUT.sticky.length], rot: s.rot }}
                className={`pin--sticky sticky--${s.tone}`} tack={false} compact={compact} constraints={board}>
                <span className="sticky__tape" aria-hidden="true" />
                <p>{s.text}</p>
              </Pin>
            ))}

            <Pin at={LAYOUT.ticket} className="pin--ticket" compact={compact} constraints={board}>
              <div className="ticket">
                <div className="ticket__stub">{TICKET.artist}</div>
                <div className="ticket__main">
                  <strong>LIVE</strong>
                  <span>{TICKET.sub}</span>
                  <span className="ticket__row">{TICKET.row}</span>
                </div>
              </div>
            </Pin>

            <Pin at={LAYOUT.loyalty} className="pin--loyalty" compact={compact} constraints={board}>
              <div className="loyalty">
                <p className="loyalty__h">café club</p>
                <div className="loyalty__stamps">
                  {Array.from({ length: COFFEE.total }).map((_, i) => <CupMini key={i} on={i < COFFEE.filled} />)}
                </div>
                <small>vanilla latté = carburant</small>
              </div>
            </Pin>

            <Pin at={LAYOUT.city} className="pin--city" compact={compact} constraints={board}>
              <span className="citynote"><MapPin size={16} strokeWidth={2.6} /> {ME.city}</span>
            </Pin>

            <Pin at={LAYOUT.mug} className="pin--mug" tack={false} compact={compact} constraints={board}>
              <Mug s={62} />
            </Pin>
          </div>
        </div>
      </div>
    </section>
  )
}