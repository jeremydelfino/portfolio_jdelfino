import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Check } from 'lucide-react'
import Logo from '../components/Logo'
import './Contact.css'

const MAIL = 'jeremydelfino3@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/jeremydelfino/'

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <line x1="7" y1="10" x2="7" y2="17" />
    <circle cx="7" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    <line x1="12" y1="17" x2="12" y2="10" />
    <path d="M12 12.6a2.5 2.5 0 0 1 5 0V17" />
  </svg>
)

/* ── Vignettes du fond (timbres, cachets, avions…) ───────────────── */
const StampArt = ({ kind }) => {
  const ink = { stroke: 'var(--c-ink)', strokeWidth: 2.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (kind) {
    case 'code': return <path d="M20 22 l-7 8 7 8 M40 22 l7 8 -7 8 M34 18 l-8 24" {...ink} />
    case 'star': return <path d="M30 14 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 z" stroke="var(--c-ink)" strokeWidth="2.4" fill="var(--c-sand)" strokeLinejoin="round" />
    case 'plant': return (<g {...ink}><path d="M30 44 V24" /><path d="M30 30 q-12 -2 -14 -14 q12 0 14 12" fill="var(--c-forest)" /><path d="M30 26 q12 -2 14 -14 q-12 0 -14 12" fill="var(--c-sage)" /></g>)
    case 'note': return (<g {...ink}><path d="M24 40 V18 l16 -4 v22" /><ellipse cx="20" cy="40" rx="5" ry="4" fill="var(--c-forest)" /><ellipse cx="36" cy="36" rx="5" ry="4" fill="var(--c-forest)" /></g>)
    case 'plane': return <path d="M14 30 L46 16 L34 44 L30 32 z M30 32 L46 16" {...ink} fill="var(--c-brick)" />
    case 'cup':
    default: return (<g {...ink}><rect x="16" y="22" width="22" height="18" rx="4" fill="var(--c-brick)" /><path d="M38 26 c8 0 8 10 0 10" /><path d="M22 18 q-2 -4 0 -8 M30 18 q-2 -4 0 -8" strokeWidth="2" /></g>)
  }
}
const Stamp = ({ kind = 'cup', tone = 'var(--c-sage)', s = 58 }) => (
  <svg width={s} height={s * 1.22} viewBox="0 0 60 73" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="56" height="69" rx="3" fill={tone} stroke="var(--c-ink)" strokeWidth="2.2" />
    <rect x="4.5" y="4.5" width="51" height="64" fill="none" stroke="#F6F1E9" strokeWidth="3" strokeDasharray="1.6 3.4" />
    <StampArt kind={kind} />
    <text x="9" y="64" fontFamily="var(--font-mono), monospace" fontSize="7" fill="var(--c-ink)">JD·POST</text>
    <text x="46" y="16" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight="700" fill="var(--c-ink)">7</text>
  </svg>
)
const Postmark = ({ s = 92 }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <g stroke="#B0503F" strokeOpacity="0.8" strokeWidth="2.4" fill="none">
      <circle cx="50" cy="50" r="34" /><circle cx="50" cy="50" r="26" />
      <path d="M14 50 q8 -5 16 0 t16 0 t16 0 t16 0" strokeWidth="2" />
      <text x="50" y="36" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="8.5" fontWeight="700" fill="#B0503F" stroke="none">PAR AVION</text>
      <text x="50" y="70" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="8" fill="#B0503F" stroke="none">SEOUL · 2026</text>
    </g>
  </svg>
)
const Plane = ({ s = 30 }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M4 18 L28 6 L19 28 L15 19 z" fill="var(--c-brick)" stroke="var(--c-ink)" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M15 19 L28 6" stroke="var(--c-ink)" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)
const Globe = () => (
  <svg className="mb-globe" viewBox="0 0 400 400" fill="none" aria-hidden="true">
    <circle cx="200" cy="200" r="150" stroke="var(--c-ink)" strokeWidth="2" strokeDasharray="2 7" />
    <ellipse cx="200" cy="200" rx="60" ry="150" stroke="var(--c-ink)" strokeWidth="2" strokeDasharray="2 7" />
    <ellipse cx="200" cy="200" rx="120" ry="150" stroke="var(--c-ink)" strokeWidth="2" strokeDasharray="2 7" />
    <line x1="50" y1="200" x2="350" y2="200" stroke="var(--c-ink)" strokeWidth="2" strokeDasharray="2 7" />
    <path d="M70 150 H330 M64 250 H336" stroke="var(--c-ink)" strokeWidth="2" strokeDasharray="2 7" />
  </svg>
)
const AirTag = ({ children }) => <span className="airtag">{children}</span>

/* dispersion dense des éléments du fond */
const STAMPS = [
  { kind: 'cup', tone: 'var(--c-sage)', s: 58, rot: -8, float: true, style: { top: '6%', left: '4%' } },
  { kind: 'code', tone: 'var(--c-sand)', s: 54, rot: 6, style: { top: '14%', right: '6%' } },
  { kind: 'star', tone: 'var(--c-surface)', s: 50, rot: -5, float: true, style: { top: '42%', left: '2%' } },
  { kind: 'note', tone: 'var(--c-sand)', s: 56, rot: 9, style: { bottom: '10%', left: '7%' } },
  { kind: 'plant', tone: 'var(--c-sage)', s: 52, rot: -7, style: { bottom: '14%', right: '5%' } },
  { kind: 'plane', tone: '#D9A86A', s: 50, rot: 4, float: true, style: { top: '60%', right: '3%' } },
  { kind: 'code', tone: 'var(--c-sage)', s: 46, rot: -10, style: { top: '30%', left: '9%' }, hide: true },
  { kind: 'cup', tone: 'var(--c-sand)', s: 48, rot: 7, style: { bottom: '30%', left: '3%' }, hide: true },
  { kind: 'star', tone: 'var(--c-sage)', s: 44, rot: 12, float: true, style: { top: '8%', right: '20%' }, hide: true },
]
const POSTMARKS = [
  { s: 96, style: { top: '4%', right: '24%' } },
  { s: 78, style: { bottom: '6%', right: '22%' }, hide: true },
  { s: 70, style: { top: '52%', left: '12%' }, hide: true },
]

function MailBackdrop() {
  return (
    <div className="mail-backdrop" aria-hidden="true">
      <div className="mb-dots" />
      <Globe />
      <svg className="mb-paths" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <path d="M40 480 Q400 120 960 240" stroke="var(--c-ink)" strokeWidth="2.5" strokeDasharray="3 9" fill="none" opacity="0.5" />
        <path d="M60 120 Q500 380 940 460" stroke="var(--c-ink)" strokeWidth="2.5" strokeDasharray="3 9" fill="none" opacity="0.45" />
      </svg>
      <span className="mb-plane mb-plane--1"><Plane s={30} /></span>
      <span className="mb-plane mb-plane--2"><Plane s={26} /></span>
      <span className="mb-plane mb-plane--3"><Plane s={22} /></span>
      <span className="airtag airtag--1">PAR AVION</span>
      <span className="airtag airtag--2">AIR MAIL</span>
      <span className="airtag airtag--3 md-hide">VIA AIR MAIL</span>
      {STAMPS.map((st, i) => (
        <span key={i} className={`mb-stamp ${st.float ? 'is-float' : ''} ${st.hide ? 'md-hide' : ''}`}
          style={{ ...st.style, '--rot': `${st.rot}deg`, '--d': `${(i % 5) * 0.4}s` }}>
          <Stamp kind={st.kind} tone={st.tone} s={st.s} />
        </span>
      ))}
      {POSTMARKS.map((pm, i) => (
        <span key={i} className={`mb-postmark ${pm.hide ? 'md-hide' : ''}`} style={pm.style}><Postmark s={pm.s} /></span>
      ))}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio — message de ${form.name || 'quelqu’un'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${MAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="contact">
      <div className="contact__panel">
        <MailBackdrop />

        <div className="contact__content">
          <header className="contact__head">
            <p className="mono">&gt; contact _</p>
            <h2>Écris-moi une carte</h2>
            <p className="contact__lead">Un projet, une question, ou juste pour discuter, n'hésitez pas !</p>
            <p className="contact__lead">Une carte postale ça fait toujours plaisir ! 🙂"</p>

          </header>

          <motion.div
            className="postcard"
            initial={{ opacity: 0, y: 40, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <form className="postcard__inner" onSubmit={submit}>
              {/* moitié gauche : message */}
              <div className="pc-left">
                <label className="pc-field">
                  <span>// ton message</span>
                  <textarea value={form.message} onChange={set('message')} required rows={6}
                    placeholder="Salut Jérémy, j’ai vu ton portfolio et…" />
                </label>
              </div>

              {/* moitié droite : adresse + timbre */}
              <div className="pc-right">
                <div className="pc-stampbox">
                  <span className="pc-stamp"><Logo size={30} /><small>JD·POST</small></span>
                  <span className={`pc-postmark ${sent ? 'is-on' : ''}`}><Postmark s={84} /></span>
                </div>
                <p className="pc-to">À : Jérémy Delfino</p>
                <label className="pc-field">
                  <span>ton nom</span>
                  <input type="text" value={form.name} onChange={set('name')} required placeholder="Prénom Nom" />
                </label>
                <label className="pc-field">
                  <span>ton email</span>
                  <input type="email" value={form.email} onChange={set('email')} required placeholder="toi@mail.com" />
                </label>
                <button type="submit" className="btn btn--primary pc-send">
                  {sent ? <><Check size={17} strokeWidth={2.6} /> En route !</> : <><Send size={16} strokeWidth={2.4} /> Poster</>}
                </button>
              </div>
            </form>
          </motion.div>

          <div className="contact__direct">
            <span>ou en direct :</span>
            <a className="contact__chip" href={`mailto:${MAIL}`}><Mail size={16} strokeWidth={2.4} /> {MAIL}</a>
            <a className="contact__chip" href={LINKEDIN} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={16} /> LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* NOTE — recevoir les messages sans client mail :
   1) crée un formulaire sur https://formspree.io (gratuit), récupère ton endpoint
   2) remplace `submit` par un fetch POST vers l'endpoint avec `form`
   3) garde l'animation `setSent(true)` en cas de succès. */