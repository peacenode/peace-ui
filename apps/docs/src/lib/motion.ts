import type { Transition, Variants } from "motion/react"

export const springs = {
  snappy: { type: "spring", stiffness: 500, damping: 30 } as Transition,
  gentle: { type: "spring", stiffness: 300, damping: 25 } as Transition,
  bouncy: { type: "spring", stiffness: 400, damping: 15 } as Transition,
  slow: { type: "spring", stiffness: 200, damping: 20 } as Transition,
}

export const presets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,
  slideUp: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  } satisfies Variants,
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } satisfies Variants,
}
