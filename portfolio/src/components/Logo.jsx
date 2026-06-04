export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
      xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo Jérémy Delfino">
      <circle cx="54" cy="34" r="20" fill="var(--c-sand)" />
      <path d="M80 28 l2.2 6 6 2.2 -6 2.2 -2.2 6 -2.2 -6 -6 -2.2 6 -2.2 z" fill="var(--c-sand)" />
      <path d="M28 44 H72 L66 86 Q65 90 60 90 H40 Q35 90 34 86 Z"
        stroke="var(--c-ink)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M31 52 H69" stroke="var(--c-ink)" strokeWidth="4" strokeLinecap="round" />
      <path d="M45 64 l-5 5 5 5 M55 64 l5 5 -5 5 M52 62 l-4 16"
        stroke="var(--c-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}