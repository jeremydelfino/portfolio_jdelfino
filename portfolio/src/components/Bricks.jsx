import { motion } from 'framer-motion'
import './Bricks.css'

const CLUSTER = [
  { x: 6, y: 6, r: -5 }, { x: 56, y: 6, r: 2 }, { x: 106, y: 6, r: -3 },
  { x: -8, y: 31, r: 3 }, { x: 42, y: 31, r: -4 }, { x: 92, y: 31, r: 2 },
  { x: 10, y: 56, r: -2 }, { x: 60, y: 56, r: 3 }, { x: -4, y: 81, r: 4 },
]
const CORNERS = [['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']]
const CORNER_BRICKS = CORNERS.flatMap(([v, h]) =>
  CLUSTER.map(({ x, y, r }) => ({ [v]: `${y}px`, [h]: `${x}px`, r }))
)
const STRAYS = [
  { top: '40%', left: '2%', r: -6 }, { top: '54%', right: '2%', r: 6 },
  { top: '14%', left: '28%', r: -4 }, { bottom: '12%', right: '28%', r: 5 },
]
const ALL = [...CORNER_BRICKS, ...STRAYS]

const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.025 } } }
const brick = {
  hidden: { opacity: 0, scale: 0.5 },
  show: (r) => ({ opacity: 1, scale: 1, rotate: r, transition: { type: 'spring', stiffness: 280, damping: 18 } }),
}

export default function Bricks() {
  return (
    <motion.div className="bricks" variants={wrap} initial="hidden" animate="show" aria-hidden="true">
      {ALL.map((b, i) => (
        <motion.span key={i} className="bk" custom={b.r} variants={brick}
          style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom }} />
      ))}
    </motion.div>
  )
}