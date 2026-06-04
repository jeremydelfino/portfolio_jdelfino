export default function DeskScene({ role }) {
  return (
    <div className="desk-wrap">
      <svg viewBox="0 0 380 300" className="desk" xmlns="http://www.w3.org/2000/svg"
        role="img" aria-label="Bureau : grand écran affichant un terminal, une plante et une tasse de café">
        <path d="M348 36 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5 z" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="2" />
        <rect x="30" y="244" width="320" height="16" rx="8" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
        <rect x="178" y="216" width="24" height="30" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
        <rect x="154" y="238" width="72" height="12" rx="6" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
        <rect x="86" y="34" width="220" height="186" rx="20" fill="var(--c-ink)" />
        <rect x="78" y="26" width="220" height="186" rx="20" fill="var(--c-surface)" stroke="var(--c-ink)" strokeWidth="4" />
        <rect x="94" y="42" width="188" height="154" rx="12" fill="#1C1B18" />
        <circle cx="110" cy="58" r="4" fill="var(--c-sage)" />
        <circle cx="125" cy="58" r="4" fill="#9BC472" />
        <circle cx="140" cy="58" r="4" fill="var(--c-forest)" />
        <g className="sway">
          <ellipse cx="44" cy="210" rx="15" ry="30" transform="rotate(-28 44 210)" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" />
          <ellipse cx="70" cy="206" rx="15" ry="31" transform="rotate(22 70 206)" fill="var(--c-sage)" stroke="var(--c-ink)" strokeWidth="3" />
          <ellipse cx="56" cy="188" rx="14" ry="34" transform="rotate(-3 56 188)" fill="var(--c-forest)" stroke="var(--c-ink)" strokeWidth="3" />
        </g>
        <path d="M30 242 H84 L76 276 H38 Z" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
        <rect x="24" y="234" width="66" height="12" rx="5" fill="var(--c-sand)" stroke="var(--c-ink)" strokeWidth="4" />
        <g className="steam" fill="none" stroke="var(--c-ink)" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round">
          <path d="M316 212 c-4 -7 4 -10 0 -17" />
          <path d="M328 212 c-4 -7 4 -10 0 -17" />
        </g>
        <rect x="304" y="216" width="44" height="30" rx="7" fill="var(--c-brick)" stroke="var(--c-ink)" strokeWidth="4" />
        <ellipse cx="326" cy="217" rx="19" ry="4.5" fill="var(--c-forest)" />
        <path d="M348 223 c14 0 14 17 0 17" fill="none" stroke="var(--c-ink)" strokeWidth="4" />
      </svg>
      <div className="term">
        &gt; {role}<span className="cursor">_</span>
        <span className="term__dim"><br />&gt; _</span>
      </div>
    </div>
  )
}