import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Code2, ImagePlus } from 'lucide-react'
import Bricks from '../components/Bricks'
import './Projects.css'

/* ──────────────────────────────────────────────────────────────────
   👉 ZONE À ÉDITER — tes projets.
   image : laisse '' pour afficher l'emplacement, ou mets le chemin de ta capture.
           • depuis public/  →  image: '/projets/brewcode.png'
           • depuis src/     →  importe en haut puis  image: brewcodeImg
   accent : 'sage' | 'sand' | 'forest'  (couleur de l'onglet)
   ────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'junglegap', name: 'JungleGap', year: '2025', type: 'Web app · React - Backend : Python FastAPI',
    accent: 'sage', image: '',
    pitch: 'Site communautaire pour la communauté LoL FR, mini-jeux, simulation de carrière Club, prédictions sur les matchs.',
    challenge: 'Un site pour passer le temps des queues, parier sur les games de vos streamers et amis...',
    solution: 'Une carte interactive qui note les cafés sur le “score dev” (wifi, prises, bruit, café) avec avis communautaires et filtres en temps réel.',
    stack: ['React', 'Vite', 'Python', 'Node.js', 'PostgreSQL'],
    result: 'Lancement de la bêta en 2026, sortie officielle en 2027.',
    links: { demo: '#', code: '#' },
  },
  {
    id: 'milo', name: 'Milo Education', year: '2025', type: 'Web app / Mobile · React',
    accent: 'sand', image: '',
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
                  {/* Page gauche : image */}
                  <div className="page page--left">
                    <div className="photo">
                      <span className="photo__tape photo__tape--l" aria-hidden="true" />
                      <span className="photo__tape photo__tape--r" aria-hidden="true" />
                      {p.image ? (
                        <img src={p.image} alt={`Aperçu du projet ${p.name}`} className="photo__img" />
                      ) : (
                        <div className="photo__ph">
                          <ImagePlus size={30} strokeWidth={2} />
                          <span>ton image ici</span>
                          <small>public/projets/{p.id}.png</small>
                        </div>
                      )}
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