import { badgeCatalog, unlockCatalog } from '../../workouts/data/catalog'
import type { BadgeUnlock, PlayerProfile, Unlockable, WorkoutMode } from '../../../shared/types/models'

export const XP_PER_LEVEL = 120

export function getTodayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export function getLevelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function getLevelProgress(xp: number) {
  const level = getLevelFromXp(xp)
  const xpFloor = (level - 1) * XP_PER_LEVEL
  const xpIntoLevel = xp - xpFloor

  return {
    level,
    xpIntoLevel,
    xpForNextLevel: XP_PER_LEVEL,
    ratio: xpIntoLevel / XP_PER_LEVEL,
  }
}

export function computeStreak(lastSessionDate: string | null, today: string, currentStreak: number) {
  if (lastSessionDate === today) {
    return { streak: currentStreak, uniqueDayCompletion: false }
  }

  if (!lastSessionDate) {
    return { streak: 1, uniqueDayCompletion: true }
  }

  const msPerDay = 1000 * 60 * 60 * 24
  const diffDays = Math.round(
    (new Date(today).getTime() - new Date(lastSessionDate).getTime()) / msPerDay,
  )

  if (diffDays === 1) {
    return { streak: currentStreak + 1, uniqueDayCompletion: true }
  }

  return { streak: 1, uniqueDayCompletion: true }
}

export function collectNewBadges(
  profile: PlayerProfile,
  mode: WorkoutMode,
  unlockedAt: string,
): BadgeUnlock[] {
  const owned = new Set(profile.badges.map((badge) => badge.id))
  const conditions = [
    ['first-sweat', profile.totalSessions >= 1],
    ['three-sessions', profile.totalSessions >= 3],
    ['streak-3', profile.streak >= 3],
    ['streak-7', profile.streak >= 7],
    ['custom-routine', profile.customRoutinesCreated >= 1],
    ['boss-clear', mode === 'boss'],
  ] as const

  return conditions.flatMap(([badgeId, unlocked]) => {
    if (!unlocked || owned.has(badgeId)) {
      return []
    }

    const definition = badgeCatalog.find((badge) => badge.id === badgeId)

    return definition ? [{ ...definition, unlockedAt }] : []
  })
}

export function collectNewUnlocks(level: number, existingUnlockIds: string[]): Unlockable[] {
  const existing = new Set(existingUnlockIds)

  return unlockCatalog.filter(
    (unlock) => unlock.levelRequired <= level && !existing.has(unlock.id),
  )
}
