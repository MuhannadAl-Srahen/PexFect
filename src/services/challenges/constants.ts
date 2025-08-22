export const DIFFICULTY_COLORS = {
  Beginner:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  Intermediate:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
  Advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
} as const

export type DifficultyLevel = keyof typeof DIFFICULTY_COLORS
