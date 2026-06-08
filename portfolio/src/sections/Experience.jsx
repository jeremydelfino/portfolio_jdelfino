import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CalendarRange, Link2, X, MousePointerClick } from 'lucide-react'
import './Experience.css'

/* ──────────────────────────────────────────────────────────────────
   👉 SEULE ZONE À ÉDITER — le contenu de chaque objet de la pièce.
   anchor : point (grille 1000×640) où s'accroche la pop-up.
   ────────────────────────────────────────────────────────────────── */
const ENTRIES = {
  epitech: {
    type: 'formation', title: 'EPITECH', place: 'Marseille', flag: '🇫🇷',
    period: '2022 — 2027', badge: 'en cours', anchor: { x: 540, y: 404 },
    role: 'Programme Grande École · Expert en Ingénierie Logicielle',
    desc: "Titre d’Expert(e) en technologie de l’information. Pédagogie 100 % par projets, du bas-niveau (C / C++) au développement moderne.",
    tags: ['C', 'C++', 'Python', 'React', 'Projets'], note: 'Le fil rouge de tout mon parcours.',
  },
  lycee: {
    type: 'formation', title: 'Lycée Lacordaire', place: 'Marseille', flag: '🇫🇷',
    period: '2019 — 2022', badge: 'Mention Bien', anchor: { x: 200, y: 104 },
    role: 'Baccalauréat Général',
    desc: "Spécialités : Mathématiques, Physique-Chimie et SES. Là où le code est devenu une vocation.",
    tags: ['Mathématiques', 'Physique-Chimie', 'SES'],
  },
  myongji: {
    type: 'formation', title: 'Myongji University', place: 'Séoul · Corée du Sud', flag: '🇰🇷',
    period: '2025 — 2026', badge: 'échange', anchor: { x: 85, y: 470 },
    role: 'Échange universitaire',
    desc: "Finance, marketing et management, ainsi que programmation et DB Design. Immersion culturelle et apprentissage du coréen.",
    tags: ['DB Design', 'Finance', 'Marketing', '한국어'], note: 'Échange dans le cadre d’Epitech.',
  },
  brother: {
    type: 'experience', title: 'Brother France', place: 'Paris', flag: '🇫🇷',
    period: '2023', badge: 'Stage · 4 mois', anchor: { x: 710, y: 404 },
    role: 'Data Engineer',
    desc: "Gestion de bases de données, création et automatisation de scripts en Python.",
    tags: ['Python', 'SQL', 'Data', 'Automatisation'], note: 'Pendant ma scolarité à Epitech.',
  },
  bde: {
    type: 'asso', title: 'BDE Marsatek', place: 'Epitech Marseille', flag: '🇫🇷',
    period: '2023 — 2025', badge: 'Associatif', anchor: { x: 370, y: 470 },
    role: 'Vice-Président puis Président',
    desc: "Bureau des étudiants d’Epitech Marseille : gestion de l’association et préparation des événements de l’école.",
    tags: ['Leadership', 'Événementiel', 'Gestion'], note: 'En parallèle de mes études.',
  },
  college: {
    type: 'experience', title: 'Collège Lacordaire', place: 'Marseille', flag: '🇫🇷',
    period: 'Sept. 2024 — Mars 2025', badge: 'Freelance', anchor: { x: 235, y: 408 },
    role: 'Enseignant de Python',
    desc: "Cours de Python auprès d’élèves de collège — vulgariser et transmettre, le vrai test de la maîtrise.",
    tags: ['Python', 'Pédagogie', 'Freelance'], note: 'En freelance, pendant Epitech.',
  },
  capgemini: {
    type: 'experience', title: 'Capgemini Engineering', place: 'Aix-en-Provence', flag: '🇫🇷',
    period: '2025', badge: 'Stage · 4 mois', anchor: { x: 880, y: 380 },
    role: 'Administrateur Systèmes & Réseaux',
    desc: "Résolution de tickets et mise en place d’un Zabbix automatisé en Python.",
    tags: ['Linux', 'Réseaux', 'Zabbix', 'Python'], note: 'Stage pendant mon cursus Epitech.',
  },
}
const TYPE_LABEL = { formation: 'Formation', experience: 'Expérience', asso: 'Associatif' }

/* ── Wrapper « objet cliquable » : halo + objet + point-indice + nom ─ */
function Hotspot({ id, type, label, cue, halo, tagY, sel, setSel, children }) {
  const active = sel === id
  const w = label.length * 7.4 + 22
  return (
    <g className={`hot hot--${type} ${active ? 'is-active' : ''}`}
      role="button" tabIndex={0} aria-label={label} aria-haspopup="dialog"
      onClick={() => setSel(id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSel(id))}>
      <ellipse className="hot__halo" cx={halo.cx} cy={halo.cy} rx={halo.rx} ry={halo.ry} />
      {children}
      <g className="hot__cue">
        <circle className="hot__cue-ring" cx={cue.x} cy={cue.y} r="12" fill="none" />
        <circle className="hot__cue-dot" cx={cue.x} cy={cue.y} r="5.5" />
      </g>
      <g className="hot__tag" transform={`translate(${cue.x} ${tagY})`}>
        <rect x={-w / 2} y="-12" width={w} height="24" rx="12" />
        <text textAnchor="middle" dominantBaseline="central">{label}</text>
      </g>
    </g>
  )
}

export default function Experience() {
  const [sel, setSel] = useState(null)
  const closeRef = useRef(null)
  const entry = sel ? ENTRIES[sel] : null

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSel(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { if (sel && closeRef.current) closeRef.current.focus() }, [sel])

  let popStyle = {}, place = 'above'
  if (entry) {
    const leftPct = Math.min(Math.max((entry.anchor.x / 1000) * 100, 26), 74)
    const topPct = (entry.anchor.y / 640) * 100
    place = entry.anchor.y < 300 ? 'below' : 'above'
    popStyle = { left: `${leftPct}%`, top: `${topPct}%` }
  }

  return (
    <section id="experience" className="experience">
      <div className="experience__inner">
        {/* en-tête (section normale, AU-DESSUS — pas de cadre dans le cadre) */}
        <header className="experience__head">
          <p className="mono">&gt; la salle _</p>
          <h2>Entre dans la salle de mon parcours</h2>
          <div className="experience__subrow">
            <p className="experience__hint">
              <MousePointerClick size={16} strokeWidth={2.4} />
              Clique sur un objet marqué d’un point coloré pour ouvrir sa fiche.
            </p>
            <ul className="legend" aria-label="Légende">
              <li><span className="legend__dot legend__dot--formation" /> Formation</li>
              <li><span className="legend__dot legend__dot--experience" /> Expérience</li>
              <li><span className="legend__dot legend__dot--asso" /> Asso</li>
            </ul>
          </div>
        </header>

        {/* ── LA PIÈCE = LE CADRE UNIQUE ──────────────────────────── */}
        <div className="room-frame">
          <div className="room-clip">
            <svg viewBox="0 0 1000 640" className="room" role="img"
              aria-label="Pièce illustrée : un bureau-école avec sept objets cliquables représentant mon parcours.">

              {/* murs + sol */}
              <rect className="r-wall" x="0" y="0" width="1000" height="442" />
              <rect className="r-floor" x="0" y="438" width="1000" height="202" />
              {[80, 140, 200, 260, 320, 380].map((y) => (
                <line key={y} className="r-brickline" x1="0" y1={y} x2="1000" y2={y} />
              ))}
              <line className="r-floorline" x1="0" y1="440" x2="1000" y2="440" />
              <rect className="r-base" x="0" y="430" width="1000" height="12" />
              <ellipse className="r-rug" cx="500" cy="600" rx="340" ry="46" />
              {/* lignes de perspective au sol */}
              {[120, 380, 640, 880].map((x, i) => (
                <line key={i} className="r-persp" x1={x} y1="640" x2={x * 0.55 + 230} y2="444" />
              ))}

              {/* ── DÉCO (non cliquable) ─────────────────────────── */}
              <g className="decor" aria-hidden="true">
                {/* moulure plafond + 2e spot */}
                <line className="d-moulure" x1="0" y1="14" x2="1000" y2="14" />

                {/* lampe suspendue */}
                <line className="d-cord" x1="300" y1="14" x2="300" y2="150" />
                <path className="d-shade" d="M278 150 q22 -24 44 0 z" />
                <circle className="d-bulb" cx="300" cy="150" r="4" />

                {/* horloge (coin haut-droit) */}
                <circle className="d-clock-f" cx="958" cy="58" r="24" />
                <circle className="d-clock-c" cx="958" cy="58" r="2.5" />
                <line className="d-hand" x1="958" y1="58" x2="958" y2="44" />
                <line className="d-hand" x1="958" y1="58" x2="969" y2="58" />

                {/* fenêtre + ciel + buildings + soleil */}
                <rect className="d-window" x="700" y="60" width="234" height="150" rx="8" />
                <rect className="d-sky" x="706" y="66" width="222" height="138" rx="5" />
                <circle className="d-sun" cx="760" cy="104" r="15" />
                <path className="d-cloud" d="M820 96 q8 -14 22 -6 q12 -8 18 6 q10 0 6 10 l-52 0 q-6 -8 6 -10 z" />
                <g className="d-city">
                  <rect x="712" y="150" width="26" height="48" /><rect x="744" y="132" width="22" height="66" />
                  <rect x="772" y="158" width="30" height="40" /><rect x="808" y="120" width="20" height="78" />
                  <rect x="834" y="150" width="28" height="48" /><rect x="868" y="138" width="24" height="60" />
                  <rect x="898" y="160" width="24" height="38" />
                </g>
                <line className="d-mull" x1="817" y1="60" x2="817" y2="210" />
                <line className="d-mull" x1="700" y1="135" x2="934" y2="135" />

                {/* bibliothèque murale (centre) */}
                <rect className="d-shelf-box" x="360" y="120" width="240" height="104" rx="6" />
                <line className="d-shelf-l" x1="360" y1="172" x2="600" y2="172" />
                <g className="d-books">
                  <rect x="372" y="132" width="14" height="38" fill="var(--c-forest)" /><rect x="388" y="128" width="14" height="42" fill="var(--c-exp)" />
                  <rect x="404" y="136" width="12" height="34" fill="var(--c-sage)" /><rect x="418" y="130" width="16" height="40" fill="var(--c-sand)" />
                  <rect x="438" y="134" width="13" height="36" fill="var(--c-forest)" /><rect x="455" y="128" width="15" height="42" fill="var(--c-exp)" />
                  <rect x="474" y="138" width="12" height="32" fill="var(--c-sage)" />
                  <rect x="372" y="184" width="15" height="36" fill="var(--c-exp)" /><rect x="389" y="180" width="13" height="40" fill="var(--c-sand)" />
                  <rect x="404" y="186" width="14" height="34" fill="var(--c-forest)" /><rect x="540" y="182" width="14" height="38" fill="var(--c-sage)" />
                  <rect x="556" y="180" width="16" height="40" fill="var(--c-exp)" /><rect x="574" y="186" width="13" height="34" fill="var(--c-forest)" />
                </g>
                {/* un petit pot sur la bibliothèque */}
                <path className="d-pot" d="M508 184 h22 l-3 16 h-16 z" />
                <path className="d-leaf" d="M519 184 q-9 -3 -10 -16 q9 1 10 16 M519 184 q9 -3 10 -16 q-9 1 -10 16 M519 184 v-18" />

                {/* étagère + trophée (entre biblio et fenêtre) */}
                <rect className="d-plank" x="624" y="186" width="86" height="9" rx="3" />
                <path className="d-trophy" d="M650 150 h22 v8 q0 12 -11 12 q-11 0 -11 -12 z" />
                <path className="d-trophy-h" d="M650 152 q-9 0 -9 8 q0 6 9 6 M672 152 q9 0 9 8 q0 6 -9 6" />
                <rect className="d-trophy-b" x="655" y="172" width="12" height="6" /><rect className="d-trophy-b" x="650" y="178" width="22" height="6" />
                <circle className="d-ball" cx="696" cy="178" r="8" />

                {/* cadre photo (paysage) */}
                <rect className="d-frame" x="300" y="250" width="80" height="64" rx="4" />
                <rect className="d-frame-in" x="307" y="257" width="66" height="50" rx="2" />
                <path className="d-mtn" d="M307 307 l18 -28 12 16 14 -22 15 34 z" />
                <circle className="d-frame-sun" cx="360" cy="270" r="6" />

                {/* calendrier mural */}
                <rect className="d-cal" x="150" y="250" width="72" height="86" rx="5" />
                <rect className="d-cal-top" x="150" y="250" width="72" height="20" rx="5" />
                <g className="d-cal-dots">
                  {[0, 1, 2, 3].map((c) => [0, 1, 2].map((r) => (
                    <circle key={`${c}-${r}`} cx={166 + c * 14} cy={284 + r * 14} r="2.6" />
                  )))}
                </g>
                <circle className="d-cal-mark" cx="194" cy="298" r="6" />

                {/* poster Corée */}
                <rect className="d-poster" x="24" y="120" width="92" height="104" rx="6" />
                <circle className="d-poster-c" cx="70" cy="158" r="16" />
                <text className="d-poster-t" x="70" y="208" textAnchor="middle">코드</text>

                {/* portemanteau (mur gauche bas) */}
                <line className="d-rack" x1="60" y1="300" x2="60" y2="436" />
                <line className="d-hook" x1="60" y1="312" x2="44" y2="320" />
                <line className="d-hook" x1="60" y1="312" x2="76" y2="320" />
                <path className="d-coat" d="M40 326 q20 -10 40 0 l-6 56 h-28 z" />

                {/* mug fumant + clavier sur le bureau Epitech */}
                <path className="d-steam" d="M470 502 q-6 -8 0 -16 q6 -8 0 -16" />
                <rect className="d-key" x="500" y="540" width="120" height="6" rx="3" />

                {/* corbeille (coin droit) */}
                <path className="d-bin" d="M788 566 h34 l-5 44 h-24 z" />
                <line className="d-bin-l" x1="794" y1="578" x2="816" y2="578" />

                {/* plante d'angle (droite) */}
                <g transform="translate(944 548)">
                  <path className="d-leaf" d="M16 36 q-14 -4 -15 -26 q13 1 15 26 M16 36 q14 -4 15 -26 q-13 1 -15 26 M16 36 v-28" />
                  <path className="d-pot" d="M5 38 H27 L24 58 H8 Z" />
                </g>
              </g>

              {/* ── OBJETS CLIQUABLES (fond → avant) ─────────────── */}

              {/* LYCÉE — diplôme encadré au mur */}
              <Hotspot id="lycee" type="formation" label="Lycée Lacordaire"
                cue={{ x: 200, y: 104 }} halo={{ cx: 200, cy: 168, rx: 82, ry: 76 }} tagY={84} sel={sel} setSel={setSel}>
                <rect x="142" y="122" width="116" height="90" rx="6" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="4" />
                <line x1="158" y1="150" x2="242" y2="150" stroke="var(--c-ink)" strokeWidth="3" />
                <line x1="158" y1="166" x2="242" y2="166" stroke="var(--c-ink)" strokeWidth="2.4" opacity="0.6" />
                <line x1="158" y1="180" x2="220" y2="180" stroke="var(--c-ink)" strokeWidth="2.4" opacity="0.6" />
                <circle cx="230" cy="196" r="9" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="2.6" />
                <path d="M170 122 L200 112 L230 122 L200 132 Z" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" strokeLinejoin="round" />
              </Hotspot>

              {/* CAPGEMINI — baie serveur */}
              <Hotspot id="capgemini" type="experience" label="Capgemini"
                cue={{ x: 880, y: 392 }} halo={{ cx: 880, cy: 500, rx: 72, ry: 128 }} tagY={372} sel={sel} setSel={setSel}>
                <rect x="836" y="404" width="88" height="196" rx="9" fill="#2B2A28" stroke="var(--c-ink)" strokeWidth="4" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <rect x="846" y={418 + i * 36} width="68" height="24" rx="4" fill="var(--c-surface)" stroke="var(--c-ink)" strokeWidth="2.6" />
                    <circle cx="856" cy={430 + i * 36} r="3" fill="#9BC472" />
                    <circle cx="866" cy={430 + i * 36} r="3" fill="var(--c-sand)" />
                  </g>
                ))}
              </Hotspot>

              {/* BROTHER — imprimante sur meuble */}
              <Hotspot id="brother" type="experience" label="Brother France"
                cue={{ x: 710, y: 404 }} halo={{ cx: 710, cy: 510, rx: 88, ry: 110 }} tagY={384} sel={sel} setSel={setSel}>
                <rect x="650" y="506" width="120" height="92" rx="6" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
                <line x1="650" y1="548" x2="770" y2="548" stroke="var(--c-ink)" strokeWidth="3" />
                <circle cx="710" cy="572" r="4" fill="var(--c-ink)" />
                <rect x="656" y="458" width="108" height="50" rx="8" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="672" y="476" width="76" height="6" rx="3" fill="var(--c-ink)" />
                <circle cx="752" cy="468" r="3.5" fill="#9BC472" stroke="var(--c-ink)" strokeWidth="1.5" />
                <rect x="686" y="418" width="48" height="44" rx="3" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="3" />
                <line x1="694" y1="430" x2="726" y2="430" stroke="var(--c-exp)" strokeWidth="2.4" />
                <line x1="694" y1="438" x2="720" y2="438" stroke="var(--c-ink)" strokeWidth="2" opacity="0.6" />
                <line x1="694" y1="446" x2="724" y2="446" stroke="var(--c-ink)" strokeWidth="2" opacity="0.6" />
              </Hotspot>

              {/* EPITECH — bureau + écran terminal (pièce maîtresse) */}
              <Hotspot id="epitech" type="formation" label="EPITECH"
                cue={{ x: 540, y: 404 }} halo={{ cx: 540, cy: 500, rx: 150, ry: 116 }} tagY={384} sel={sel} setSel={setSel}>
                <rect x="420" y="520" width="240" height="18" rx="6" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="432" y="538" width="16" height="60" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="632" y="538" width="16" height="60" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="500" y="486" width="22" height="34" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="486" y="512" width="50" height="10" rx="5" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="452" y="420" width="160" height="100" rx="14" fill="var(--c-ink)" />
                <rect x="446" y="414" width="160" height="100" rx="14" fill="var(--c-surface)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="460" y="428" width="132" height="72" rx="8" fill="#1C1B18" />
                <path d="M486 452 l-12 12 12 12 M566 452 l12 12 -12 12 M548 446 l-10 36" fill="none" stroke="#9BC472" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                <g className="sway-sm">
                  <ellipse cx="468" cy="510" rx="7" ry="15" fill="var(--c-sage)" stroke="var(--c-ink)" strokeWidth="2.6" />
                </g>
              </Hotspot>

              {/* COLLÈGE — tableau sur chevalet */}
              <Hotspot id="college" type="experience" label="Collège Lacordaire"
                cue={{ x: 235, y: 410 }} halo={{ cx: 235, cy: 500, rx: 110, ry: 110 }} tagY={390} sel={sel} setSel={setSel}>
                <line x1="170" y1="546" x2="150" y2="612" stroke="var(--c-ink)" strokeWidth="5" strokeLinecap="round" />
                <line x1="300" y1="546" x2="320" y2="612" stroke="var(--c-ink)" strokeWidth="5" strokeLinecap="round" />
                <line x1="235" y1="548" x2="235" y2="612" stroke="var(--c-ink)" strokeWidth="4" strokeLinecap="round" />
                <rect x="150" y="430" width="170" height="118" rx="6" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="4" />
                <path d="M186 462 l-12 14 12 14 M268 462 l12 14 -12 14 M250 456 l-12 40" fill="none" stroke="var(--c-sand)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="178" y1="520" x2="292" y2="520" stroke="var(--c-sand)" strokeWidth="2.6" opacity="0.7" />
                <rect x="158" y="544" width="154" height="10" rx="4" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3" />
              </Hotspot>

              {/* BDE — pupitre + micro */}
              <Hotspot id="bde" type="asso" label="BDE Marsatek"
                cue={{ x: 370, y: 470 }} halo={{ cx: 370, cy: 560, rx: 74, ry: 96 }} tagY={450} sel={sel} setSel={setSel}>
                <path d="M332 600 L408 600 L396 516 L344 516 Z" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" strokeLinejoin="round" />
                <rect x="350" y="540" width="40" height="26" rx="4" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="3" />
                <text x="370" y="557" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="12" fill="var(--c-ink)">BDE</text>
                <line x1="370" y1="516" x2="370" y2="488" stroke="var(--c-ink)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="370" cy="484" r="8" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" />
              </Hotspot>

              {/* MYONGJI — globe sur table */}
              <Hotspot id="myongji" type="formation" label="Myongji University"
                cue={{ x: 85, y: 470 }} halo={{ cx: 85, cy: 540, rx: 78, ry: 96 }} tagY={450} sel={sel} setSel={setSel}>
                <rect x="30" y="560" width="110" height="14" rx="5" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
                <rect x="40" y="574" width="12" height="40" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3.5" />
                <rect x="118" y="574" width="12" height="40" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3.5" />
                <rect x="78" y="552" width="14" height="10" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="3" />
                <circle cx="85" cy="524" r="32" fill="var(--c-sage)" stroke="var(--c-ink)" strokeWidth="4" />
                <ellipse cx="85" cy="524" rx="32" ry="13" fill="none" stroke="var(--c-ink)" strokeWidth="2.6" />
                <path d="M85 492 c-18 12 -18 52 0 64 M85 492 c18 12 18 52 0 64" fill="none" stroke="var(--c-ink)" strokeWidth="2.6" />
              </Hotspot>
            </svg>
          </div>

          {/* ── POP-UP (hors du clip → jamais coupée) ────────────── */}
          <AnimatePresence>
            {entry && (
              <>
                <motion.div className="pop-backdrop"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSel(null)} />
                <motion.div className={`pop pop--${place} pop--${entry.type}`} style={popStyle}
                  role="dialog" aria-modal="true" aria-label={entry.title}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}>
                  <button ref={closeRef} className="pop__close" onClick={() => setSel(null)} aria-label="Fermer">
                    <X size={16} strokeWidth={2.6} />
                  </button>
                  <div className="pop__top">
                    <span className={`pop__badge pop__badge--${entry.type}`}>{TYPE_LABEL[entry.type]}</span>
                    <span className="pop__chip">{entry.badge}</span>
                  </div>
                  <h3 className="pop__title">{entry.title} <span className="pop__flag">{entry.flag}</span></h3>
                  <p className="pop__meta"><MapPin size={14} strokeWidth={2.5} /> {entry.place}</p>
                  <p className="pop__meta"><CalendarRange size={14} strokeWidth={2.5} /> {entry.period}</p>
                  <p className="pop__role">{entry.role}</p>
                  <p className="pop__desc">{entry.desc}</p>
                  {entry.note && <p className="pop__note"><Link2 size={13} strokeWidth={2.5} /> {entry.note}</p>}
                  <ul className="pop__tags">{entry.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <span className="pop__beak" aria-hidden="true" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}