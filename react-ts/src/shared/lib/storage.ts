import type { AppSnapshot } from '../types/models'

const STORAGE_KEY = 'retro-fit-quest'

export const defaultSnapshot: AppSnapshot = {
  onboardingDone: false,
  profile: {
    alias: 'Player One',
    xp: 80,
    totalSessions: 0,
    streak: 0,
    longestStreak: 0,
    lastSessionDate: null,
    badges: [],
    unlocks: [],
    customRoutinesCreated: 0,
  },
  telegram: {
    linked: false,
    enabled: true,
    intensity: 'spicy',
    quietHoursStart: '21:00',
    quietHoursEnd: '08:00',
  },
  sessionHistory: [],
}

export function loadSnapshot(): AppSnapshot {
  if (typeof window === 'undefined') {
    return defaultSnapshot
  }

  const rawSnapshot = window.localStorage.getItem(STORAGE_KEY)

  if (!rawSnapshot) {
    return defaultSnapshot
  }

  try {
    const parsed = JSON.parse(rawSnapshot) as AppSnapshot

    return {
      ...defaultSnapshot,
      ...parsed,
      profile: {
        ...defaultSnapshot.profile,
        ...parsed.profile,
      },
      telegram: {
        ...defaultSnapshot.telegram,
        ...parsed.telegram,
      },
      sessionHistory: parsed.sessionHistory ?? [],
    }
  } catch {
    return defaultSnapshot
  }
}

export function saveSnapshot(snapshot: AppSnapshot) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
}
