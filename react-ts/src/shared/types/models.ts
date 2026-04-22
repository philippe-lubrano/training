export type ExerciseId = 'abdos' | 'pompes' | 'gainage'
export type WorkoutMode = 'daily' | 'boss' | 'custom'
export type AppScreen = 'home' | 'session' | 'progress' | 'settings'
export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed'
export type TelegramIntensity = 'soft' | 'spicy' | 'boss'

export interface Exercise {
  id: ExerciseId
  title: string
  emoji: string
  difficulty: 'modéré' | 'tonique' | 'endurant'
  defaultDurationSec: number
  repGoal: string
  flavorText: string
  postureCue: string
  instructions: string[]
  pixelHint: string[]
}

export interface WorkoutStep {
  id: string
  exerciseId: ExerciseId
  label: string
  durationSec: number
  focus: string
}

export interface WorkoutPlan {
  id: string
  title: string
  mode: WorkoutMode
  description: string
  xpReward: number
  estimatedMinutes: number
  steps: WorkoutStep[]
}

export interface BadgeDefinition {
  id: string
  title: string
  description: string
  icon: string
}

export interface BadgeUnlock extends BadgeDefinition {
  unlockedAt: string
}

export interface Unlockable {
  id: string
  title: string
  description: string
  levelRequired: number
}

export interface TelegramSettings {
  linked: boolean
  enabled: boolean
  intensity: TelegramIntensity
  quietHoursStart: string
  quietHoursEnd: string
}

export interface SessionRecord {
  id: string
  workoutId: string
  title: string
  mode: WorkoutMode
  completedAt: string
  durationSec: number
  xpEarned: number
  uniqueDayCompletion: boolean
}

export interface PlayerProfile {
  alias: string
  xp: number
  totalSessions: number
  streak: number
  longestStreak: number
  lastSessionDate: string | null
  badges: BadgeUnlock[]
  unlocks: string[]
  customRoutinesCreated: number
}

export interface AppSnapshot {
  onboardingDone: boolean
  profile: PlayerProfile
  telegram: TelegramSettings
  sessionHistory: SessionRecord[]
}

export interface SessionState {
  status: SessionStatus
  stepIndex: number
  secondsLeft: number
}

export interface SessionResult {
  workout: WorkoutPlan
  xpEarned: number
  newBadges: BadgeUnlock[]
  newUnlocks: Unlockable[]
  streak: number
  level: number
}
