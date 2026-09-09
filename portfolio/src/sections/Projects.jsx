import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Code2, ImagePlus, Maximize2, X } from 'lucide-react'
import Bricks from '../components/Bricks'
import './Projects.css'

/* ──────────────────────────────────────────────────────────────────
   Deux façons de fournir les images d'un projet :

   1) public/  →  publicSeq('milo', 12)
      Génère /milo/01.png … /milo/12.png. Les fichiers absents sont
      retirés automatiquement (onError), donc mets un count large.
      Vite ne sait PAS lister public/ : c'est le seul moyen.

   2) src/assets/projets/<dossier>/  →  gallery: 'milo'
      Vraiment automatique (glob à la compilation), aucun count.
   ────────────────────────────────────────────────────────────────── */

// respecte le base path Vite (déploiement en sous-dossier)
const publicUrl = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

const publicSeq = (folder, count, { ext = 'png', pad = 2 } = {}) =>
  Array.from({ length: count }, (_, i) =>
    publicUrl(`${folder}/${String(i + 1).padStart(pad, '0')}.${ext}`)
  )

const FILES = import.meta.glob(
  '../assets/projets/*/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true, import: 'default' }
)

const GALLERIES = Object.entries(FILES).reduce((acc, [path, src]) => {
  const folder = path.split('/').at(-2)          // .../projets/milo/01.png → 'milo'
  ;(acc[folder] ||= []).push({ path, src })
  return acc
}, {})

// tri naturel : 2.png avant 10.png
Object.values(GALLERIES).forEach((list) =>
  list.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }))
)

/** Priorité : images[] → gallery (src/assets) → image (string) → placeholder */
const resolveShots = (p) => {
  if (p.images?.length) return p.images
  if (p.gallery && GALLERIES[p.gallery]) return GALLERIES[p.gallery].map((f) => f.src)
  if (p.image) return [p.image]
  return []
}

/* ──────────────────────────────────────────────────────────────────
   👉 ZONE À ÉDITER — tes projets.
   images  : publicSeq('milo', 12)  → public/milo/01.png, 02.png…
   gallery : nom du dossier dans src/assets/projets/
   fit     : 'contain' (défaut) → image entière + fond flouté
             'cover'            → remplit le cadre, recadre les bords
   accent  : 'sage' | 'sand' | 'forest'  (couleur de l'onglet)
   ────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'junglegap', name: 'JungleGap', year: '2025', type: 'Web app · React - Backend : Python FastAPI',
    accent: 'sage', images: publicSeq('junglegap', 12), fit: 'contain',
    pitch: 'Site communautaire pour la communauté LoL FR, mini-jeux, simulation de carrière Club, prédictions sur les matchs.',
    challenge: 'Un site pour passer le temps des queues, parier sur les games de vos streamers et amis...',
    solution: 'Une carte interactive qui note les cafés sur le “score dev” (wifi, prises, bruit, café) avec avis communautaires et filtres en temps réel.',
    stack: ['React', 'Vite', 'Python', 'Node.js', 'PostgreSQL'],
    result: 'Lancement de la bêta en 2026, sortie officielle en 2027.',
    links: { demo: '#', code: '#' },
  },
  {
    id: 'milo', name: 'Milo Education', year: '2025', type: 'Web app / Mobile · React',
    accent: 'sand', images: publicSeq('milo', 12), fit: 'contain',
    pitch: 'Un compagnon de devoir et de révisions pour les collégiens.',
    challenge: 'Rendre l\'apprentissage ludique et personnalisé, avec un assistant IA qui aide à comprendre les cours, faire les devoirs et réviser pour les contrôles, le tout à faible coût.',
    solution: 'Une mascotte 3D vous accompagne dans votre apprentissage, avec des explications interactives, des quiz personnalisés et un suivi de vos progrès. Un mode multijoueur permet de réviser entre amis et de se challenger sur les quiz.',
    stack: ['TypeScript', 'React', 'Canvas API', 'Framer Motion'],
    result: '30 Bêta-Testeurs, 2 partenaires nous suivent déjà pour cette bêta.',
    links: { demo: 'https://www.milo-education.fr', code: '#' },
  },
]

const ACCENT = { sage: 'var(--c-sage)', sand: 'var(--c-sand)', forest: 'var(--c-forest)' }

const spread = {
  enter: (dir) => ({ rotateY: dir >= 0 ? -16 : 16, x: dir >= 0 ? 60 : -60, opacity: 0 }),
  center: { rotateY: 0, x: 0, opacity: 1 },
  exit: (dir) => ({ rotateY: dir >= 0 ? 16 : -16, x: dir >= 0 ? -60 : 60, opacity: 0 }),
}

const slide = {
  enter: (dir) => ({ x: dir >= 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? -40 : 40, opacity: 0 }),
}

const Spiral = () => (
  <svg className="book__spiral" viewBox="0 0 24 460" preserveAspectRatio="none" aria-hidden="true">
    {Array.from({ length: 13 }).map((_, i) => {
      const y = 22 + i * 34
      return (
        <g key={i}>
          <path d={`M5 ${y} q14 -8 14 0`} fill="none" stroke="var(--c-ink)" strokeWidth="2.4" />
          <ellipse cx="12" cy={y + 6} rx="9" ry="5" fill="none" stroke="var(--c-ink)" strokeWidth="2.4" />
        </g>
      )
    })}
  </svg>
)

const CoffeeRing = () => (
  <svg className="coffee-ring" width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden="true">
    <circle cx="35" cy="35" r="26" fill="none" stroke="#9C6B3F" strokeWidth="4" strokeOpacity="0.28" strokeDasharray="3 6" />
    <circle cx="35" cy="35" r="20" fill="none" stroke="#9C6B3F" strokeWidth="2.5" strokeOpacity="0.2" />
  </svg>
)

/* Lightbox — rendue dans document.body via portail.
   Indispensable : .book__spread porte un rotateY, et une transform crée un
   containing block qui « capture » les enfants en position:fixed. */
function Lightbox({ shots, index, name, onClose, onStep }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)

    // verrou de scroll, en restaurant la valeur d'origine
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, onStep])

  return createPortal(
    <motion.div
      className="lightbox" role="dialog" aria-modal="true"
      aria-label={`Aperçu ${index + 1} du projet ${name}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Fermer">
        <X size={20} strokeWidth={2.6} />
      </button>

      {/* stopPropagation : cliquer l'image ne ferme pas */}
      <motion.figure
        className="lightbox__frame" onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 8 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={shots[index]} alt={`Aperçu ${index + 1} du projet ${name}`} className="lightbox__img" />
        <figcaption className="lightbox__caption">
          {name} · {String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </figcaption>
      </motion.figure>

      {shots.length > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev" aria-label="Image précédente"
            onClick={(e) => { e.stopPropagation(); onStep(-1) }}
          >
            <ChevronLeft size={26} strokeWidth={2.4} />
          </button>
          <button
            className="lightbox__nav lightbox__nav--next" aria-label="Image suivante"
            onClick={(e) => { e.stopPropagation(); onStep(1) }}
          >
            <ChevronRight size={26} strokeWidth={2.4} />
          </button>
        </>
      )}
    </motion.div>,
    document.body
  )
}

/* Galerie d'un projet — remontée à chaque changement de projet (key={p.id}),
   donc l'état repart naturellement à zéro.
   Les images 404 sont retirées de la liste au chargement. */
function Gallery({ project }) {
  const [shots, setShots] = useState(() => resolveShots(project))
  const [[cursor, dir], setShot] = useState([0, 0])
  const [open, setOpen] = useState(false)

  // clamp au rendu : évite tout index hors bornes après une suppression
  const i = Math.min(cursor, shots.length - 1)
  const fit = project.fit || 'contain'

  const step = (d) => setShot(() => [(i + d + shots.length) % shots.length, d])
  const jump = (n) => setShot(() => [n, n > i ? 1 : -1])
  const drop = (src) => setShots((list) => list.filter((s) => s !== src))

  if (shots.length === 0) {
    return (
      <div className="photo__ph">
        <ImagePlus size={30} strokeWidth={2} />
        <span>ton image ici</span>
        <small>public/{project.id}/01.png</small>
      </div>
    )
  }

  return (
    <div className={`gallery gallery--${fit}`}>
      {/* Préchargement invisible : valide l'existence de chaque fichier
          et met les images suivantes en cache navigateur. */}
      <div className="gallery__probe" aria-hidden="true">
        {shots.map((src) => (
          <img key={src} src={src} alt="" onError={() => drop(src)} loading="eager" />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={shots[i]} className="gallery__slide"
          custom={dir} variants={slide}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* fond flouté : même image, agrandie et recadrée, pour remplir le cadre */}
          {fit === 'contain' && (
            <img src={shots[i]} alt="" aria-hidden="true" className="gallery__blur" />
          )}
          <img
            src={shots[i]}
            alt={`Aperçu ${i + 1} du projet ${project.name}`}
            className="photo__img gallery__img"
          />
        </motion.div>
      </AnimatePresence>

      <button className="gallery__zoom" onClick={() => setOpen(true)} aria-label="Voir en grand">
        <Maximize2 size={15} strokeWidth={2.6} /> <span>voir en grand</span>
      </button>

      {shots.length > 1 && (
        <>
          <button className="gallery__nav gallery__nav--prev" onClick={() => step(-1)} aria-label="Image précédente">
            <ChevronLeft size={18} strokeWidth={2.6} />
          </button>
          <button className="gallery__nav gallery__nav--next" onClick={() => step(1)} aria-label="Image suivante">
            <ChevronRight size={18} strokeWidth={2.6} />
          </button>

          <div className="gallery__dots" role="tablist" aria-label="Images du projet">
            {shots.map((src, n) => (
              <button
                key={src} role="tab" aria-selected={n === i}
                className={`gallery__dot ${n === i ? 'is-active' : ''}`}
                onClick={() => jump(n)} aria-label={`Image ${n + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {open && (
          <Lightbox
            shots={shots} index={i} name={project.name}
            onClose={() => setOpen(false)} onStep={step}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Projects() {
  const [[idx, dir], setState] = useState([0, 0])
  const p = PROJECTS[idx]
  const go = (next) => {
    const t = (next + PROJECTS.length) % PROJECTS.length
    setState([t, t > idx ? 1 : -1])
  }

  return (
    <section id="projects" className="projects">
      <div className="projects__panel">
        <Bricks />
        <div className="projects__content">
          <header className="projects__head">
            <p className="mono">&gt; projets _</p>
            <h2>Mon carnet de projets</h2>
            <p className="projects__lead">
              Quelques pages de mon cahier. Tourne-les avec les onglets ou les flèches.
            </p>
          </header>

          <div className="book">
            {/* Onglets / marque-pages */}
            <nav className="book__tabs" aria-label="Liste des projets">
              {PROJECTS.map((proj, i) => (
                <button
                  key={proj.id}
                  className={`tab ${i === idx ? 'is-active' : ''}`}
                  style={{ '--tab': ACCENT[proj.accent] }}
                  onClick={() => setState([i, i > idx ? 1 : -1])}
                >
                  <span className="tab__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tab__name">{proj.name}</span>
                </button>
              ))}
            </nav>

            {/* Le cahier ouvert */}
            <div className="book__stage">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.article
                  key={p.id} className="book__spread" custom={dir} variants={spread}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Page gauche : galerie */}
                  <div className="page page--left">
                    <div className="photo">
                      <span className="photo__tape photo__tape--l" aria-hidden="true" />
                      <span className="photo__tape photo__tape--r" aria-hidden="true" />
                      <Gallery key={p.id} project={p} />
                    </div>
                    <p className="page__meta">{p.type} · {p.year}</p>
                  </div>

                  <Spiral />

                  {/* Page droite : détails */}
                  <div className="page page--right">
                    <CoffeeRing />
                    <h3 className="proj__title">{p.name}</h3>
                    <p className="proj__pitch">{p.pitch}</p>

                    <div className="proj__block">
                      <span className="proj__label">// le défi</span>
                      <p>{p.challenge}</p>
                    </div>
                    <div className="proj__block">
                      <span className="proj__label">// ce que j’ai fait</span>
                      <p>{p.solution}</p>
                    </div>
                    <div className="proj__block">
                      <span className="proj__label">// résultat</span>
                      <p>{p.result}</p>
                    </div>

                    <ul className="proj__stack">
                      {p.stack.map((t) => <li key={t}>{t}</li>)}
                    </ul>

                    <div className="proj__links">
                      <a className="btn btn--primary proj__btn" href={p.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} strokeWidth={2.4} /> Lien
                      </a>
                      <a className="btn btn--ghost proj__btn" href={p.links.code} target="_blank" rel="noopener noreferrer">
                        <Code2 size={16} strokeWidth={2.4} /> Code
                      </a>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Contrôles séquentiels */}
              <div className="book__controls">
                <button className="page-btn" onClick={() => go(idx - 1)} aria-label="Projet précédent"><ArrowLeft size={18} strokeWidth={2.6} /></button>
                <span className="book__counter">{String(idx + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                <button className="page-btn" onClick={() => go(idx + 1)} aria-label="Projet suivant"><ArrowRight size={18} strokeWidth={2.6} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}