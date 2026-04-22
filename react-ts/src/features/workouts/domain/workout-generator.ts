import { exerciseCatalog, exerciseMap } from '../data/catalog'
import type { ExerciseId, WorkoutPlan, WorkoutStep } from '../../../shared/types/models'

const DAILY_PATTERN: ExerciseId[] = ['abdos', 'pompes', 'gainage']
const BOSS_PATTERN: ExerciseId[] = ['gainage', 'pompes', 'abdos', 'pompes', 'gainage', 'abdos']
const BOSS_DURATIONS = [120, 150, 120, 150, 150, 210]

function createStep(exerciseId: ExerciseId, index: number, durationSec: number): WorkoutStep {
  const exercise = exerciseMap[exerciseId]

  return {
    id: `${exerciseId}-${index + 1}`,
    exerciseId,
    label: `${exercise.title} ${index + 1}`,
    durationSec,
    focus: exercise.postureCue,
  }
}

function getSeed(date: Date): number {
  return Number(`${date.getUTCFullYear()}${date.getUTCMonth() + 1}${date.getUTCDate()}`)
}

function getTotalSeconds(steps: WorkoutStep[]): number {
  return steps.reduce((total, step) => total + step.durationSec, 0)
}

export function formatMinutes(totalSeconds: number): number {
  return Math.max(1, Math.round(totalSeconds / 60))
}

export function generateDailyWorkout(date: Date): WorkoutPlan {
  const seed = getSeed(date)
  const rotation = seed % DAILY_PATTERN.length
  const rotated = DAILY_PATTERN.map(
    (_, index) => DAILY_PATTERN[(index + rotation) % DAILY_PATTERN.length],
  )
  const durations = [45 + (seed % 3) * 15, 40 + ((seed + 1) % 3) * 10, 60 + ((seed + 2) % 2) * 15]
  const steps = rotated.map((exerciseId, index) => createStep(exerciseId, index, durations[index]))
  const totalSeconds = getTotalSeconds(steps)

  return {
    id: `daily-${seed}`,
    title: 'Quête quotidienne',
    mode: 'daily',
    description: 'Un enchaînement express pour valider ta mission du jour avant que le Bad Cop ne débarque.',
    xpReward: 60,
    estimatedMinutes: formatMinutes(totalSeconds),
    steps,
  }
}

export function generateBossWorkout(seedDate: Date): WorkoutPlan {
  const seed = getSeed(seedDate)
  const shift = seed % exerciseCatalog.length
  const steps = BOSS_PATTERN.map((exerciseId, index) => {
    const rotatedIndex = (DAILY_PATTERN.indexOf(exerciseId) + shift) % DAILY_PATTERN.length
    const rotatedExerciseId = DAILY_PATTERN[rotatedIndex]

    return createStep(rotatedExerciseId, index, BOSS_DURATIONS[index])
  })
  const totalSeconds = getTotalSeconds(steps)

  return {
    id: `boss-${seed}`,
    title: 'Séance Boss de 15 minutes',
    mode: 'boss',
    description: 'Une boucle longue et tendue pour gagner un gros paquet d’XP et faire taire le boss final.',
    xpReward: 140,
    estimatedMinutes: formatMinutes(totalSeconds),
    steps,
  }
}

export function buildCustomWorkout(selection: Record<ExerciseId, number>): WorkoutPlan | null {
  const steps = Object.entries(selection).flatMap(([exerciseId, count]) => {
    const exercise = exerciseMap[exerciseId as ExerciseId]

    return Array.from({ length: count }, (_, index) =>
      createStep(exercise.id, index, exercise.defaultDurationSec),
    )
  })

  if (steps.length === 0) {
    return null
  }

  const totalSeconds = getTotalSeconds(steps)

  return {
    id: `custom-${Object.values(selection).join('-')}`,
    title: 'Routine custom',
    mode: 'custom',
    description: 'Ton assemblage personnel des trois mini-jeux. Court, lisible et prêt à lancer.',
    xpReward: 40 + steps.length * 18,
    estimatedMinutes: formatMinutes(totalSeconds),
    steps,
  }
}
