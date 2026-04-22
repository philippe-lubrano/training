import { useCallback, useEffect, useMemo, useState } from 'react'
import { OnboardingScreen } from './screens/OnboardingScreen'
import { HomeScreen } from './screens/HomeScreen'
import { ProgressScreen } from './screens/ProgressScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { BottomNav } from '../shared/ui/BottomNav'
import { exerciseCatalog } from '../features/workouts/data/catalog'
import {
  buildCustomWorkout,
  generateBossWorkout,
  generateDailyWorkout,
} from '../features/workouts/domain/workout-generator'
import {
  collectNewBadges,
  collectNewUnlocks,
  computeStreak,
  getLevelFromXp,
  getTodayKey,
} from '../features/rewards/domain/progression'
import { loadSnapshot, saveSnapshot } from '../shared/lib/storage'
import type {
  AppScreen,
  ExerciseId,
  SessionResult,
  SessionState,
  TelegramSettings,
  WorkoutPlan,
} from '../shared/types/models'
import { BadgeUnlockModal } from '../features/profile/components/BadgeUnlockModal'
import { SessionPlayer } from '../features/session/components/SessionPlayer'
import { ResultsSummary } from '../features/session/components/ResultsSummary'
import { ArcadePanel } from '../shared/ui/ArcadePanel'

const initialSelection: Record<ExerciseId, number> = {
  abdos: 1,
  pompes: 1,
  gainage: 1,
}

const initialSessionState: SessionState = {
  status: 'idle',
  stepIndex: 0,
  secondsLeft: 0,
}

export function AppShell() {
  const initialSnapshot = useMemo(() => loadSnapshot(), [])
  const [screen, setScreen] = useState<AppScreen>('home')
  const [onboardingDone, setOnboardingDone] = useState(initialSnapshot.onboardingDone)
  const [profile, setProfile] = useState(initialSnapshot.profile)
  const [telegram, setTelegram] = useState(initialSnapshot.telegram)
  const [sessionHistory, setSessionHistory] = useState(initialSnapshot.sessionHistory)
  const [customSelection, setCustomSelection] = useState<Record<ExerciseId, number>>(initialSelection)
  const [dailyWorkout] = useState(() => generateDailyWorkout(new Date()))
  const [bossSeed, setBossSeed] = useState(0)
  const [activeWorkout, setActiveWorkout] = useState<WorkoutPlan | null>(null)
  const [sessionState, setSessionState] = useState<SessionState>(initialSessionState)
  const [lastResult, setLastResult] = useState<SessionResult | null>(null)
  const [badgeModal, setBadgeModal] = useState(initialSnapshot.profile.badges.slice(-1))

  const todayKey = getTodayKey()
  const todayCompleted = profile.lastSessionDate === todayKey
  const bossWorkout = useMemo(() => generateBossWorkout(new Date(Date.now() + bossSeed * 86_400_000)), [bossSeed])
  const customPreview = useMemo(() => buildCustomWorkout(customSelection), [customSelection])

  useEffect(() => {
    saveSnapshot({
      onboardingDone,
      profile,
      telegram,
      sessionHistory,
    })
  }, [onboardingDone, profile, sessionHistory, telegram])

  useEffect(() => {
    if (!activeWorkout || sessionState.status !== 'running') {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setSessionState((currentState) => {
        if (currentState.status !== 'running') {
          return currentState
        }

        if (currentState.secondsLeft > 1) {
          return { ...currentState, secondsLeft: currentState.secondsLeft - 1 }
        }

        const nextIndex = currentState.stepIndex + 1

        if (nextIndex < activeWorkout.steps.length) {
          return {
            status: 'running',
            stepIndex: nextIndex,
            secondsLeft: activeWorkout.steps[nextIndex].durationSec,
          }
        }

        return {
          ...currentState,
          status: 'completed',
          secondsLeft: 0,
        }
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [activeWorkout, sessionState.status])

  const resetSession = useCallback(() => {
    setActiveWorkout(null)
    setSessionState(initialSessionState)
  }, [])

  const finalizeSession = useCallback(
    (workout: WorkoutPlan) => {
      const completedAt = new Date().toISOString()
      const today = getTodayKey(new Date(completedAt))
      const totalDuration = workout.steps.reduce((total, step) => total + step.durationSec, 0)
      const streakUpdate = computeStreak(profile.lastSessionDate, today, profile.streak)
      const nextProfile = {
        ...profile,
        xp: profile.xp + workout.xpReward,
        totalSessions: profile.totalSessions + 1,
        streak: streakUpdate.streak,
        longestStreak: Math.max(profile.longestStreak, streakUpdate.streak),
        lastSessionDate: today,
        customRoutinesCreated:
          profile.customRoutinesCreated + (workout.mode === 'custom' ? 1 : 0),
      }
      const newBadges = collectNewBadges(nextProfile, workout.mode, completedAt)
      const nextLevel = getLevelFromXp(nextProfile.xp)
      const newUnlocks = collectNewUnlocks(nextLevel, nextProfile.unlocks)
      const updatedProfile = {
        ...nextProfile,
        badges: [...nextProfile.badges, ...newBadges],
        unlocks: [...nextProfile.unlocks, ...newUnlocks.map((unlock) => unlock.id)],
      }

      setProfile(updatedProfile)
      setSessionHistory((history) => [
        {
          id: `${workout.id}-${completedAt}`,
          workoutId: workout.id,
          title: workout.title,
          mode: workout.mode,
          completedAt,
          durationSec: totalDuration,
          xpEarned: workout.xpReward,
          uniqueDayCompletion: streakUpdate.uniqueDayCompletion,
        },
        ...history,
      ])
      setLastResult({
        workout,
        xpEarned: workout.xpReward,
        newBadges,
        newUnlocks,
        streak: updatedProfile.streak,
        level: nextLevel,
      })
      if (newBadges.length > 0) {
        setBadgeModal(newBadges)
      }
      resetSession()
      setScreen('session')
    },
    [profile, resetSession],
  )

  useEffect(() => {
    if (sessionState.status === 'completed' && activeWorkout) {
      finalizeSession(activeWorkout)
    }
  }, [activeWorkout, finalizeSession, sessionState.status])

  const startWorkout = useCallback((workout: WorkoutPlan) => {
    setActiveWorkout(workout)
    setLastResult(null)
    setSessionState({
      status: 'idle',
      stepIndex: 0,
      secondsLeft: workout.steps[0]?.durationSec ?? 0,
    })
    setScreen('session')
  }, [])

  const toggleSession = useCallback(() => {
    setSessionState((currentState) => ({
      ...currentState,
      status:
        currentState.status === 'running'
          ? 'paused'
          : currentState.status === 'idle' || currentState.status === 'paused'
            ? 'running'
            : currentState.status,
    }))
  }, [])

  const advanceSession = useCallback(() => {
    if (!activeWorkout) {
      return
    }

    setSessionState((currentState) => {
      const nextIndex = currentState.stepIndex + 1

      if (nextIndex >= activeWorkout.steps.length) {
        return { ...currentState, status: 'completed', secondsLeft: 0 }
      }

      return {
        status: currentState.status,
        stepIndex: nextIndex,
        secondsLeft: activeWorkout.steps[nextIndex].durationSec,
      }
    })
  }, [activeWorkout])

  const adjustRoutine = useCallback((exerciseId: ExerciseId, delta: -1 | 1) => {
    setCustomSelection((currentSelection) => ({
      ...currentSelection,
      [exerciseId]: Math.max(0, currentSelection[exerciseId] + delta),
    }))
  }, [])

  const updateTelegram = useCallback((patch: Partial<TelegramSettings>) => {
    setTelegram((currentState) => ({ ...currentState, ...patch }))
  }, [])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_55%,#020617_100%)] px-4 pb-6 pt-4 text-slate-100 antialiased sm:px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col">
        <div className="flex-1 space-y-4 pb-4">
          {screen === 'home' && (
            <HomeScreen
              profile={profile}
              todayCompleted={todayCompleted}
              dailyWorkout={dailyWorkout}
              bossWorkout={bossWorkout}
              exercises={exerciseCatalog}
              customSelection={customSelection}
              customPreview={customPreview}
              telegram={telegram}
              hasActiveSession={Boolean(activeWorkout)}
              onStartDaily={() => startWorkout(dailyWorkout)}
              onRegenerateBoss={() => setBossSeed((seed) => seed + 1)}
              onStartBoss={() => startWorkout(bossWorkout)}
              onAdjustRoutine={adjustRoutine}
              onStartCustom={() => {
                if (customPreview) {
                  startWorkout(customPreview)
                }
              }}
              onOpenSession={() => setScreen('session')}
              onUpdateTelegram={updateTelegram}
            />
          )}

          {screen === 'session' && activeWorkout && (
            <SessionPlayer
              workout={activeWorkout}
              sessionState={sessionState}
              onToggle={toggleSession}
              onAdvance={advanceSession}
              onFinish={() => finalizeSession(activeWorkout)}
            />
          )}

          {screen === 'session' && !activeWorkout && lastResult && (
            <ResultsSummary result={lastResult} onGoHome={() => setScreen('home')} />
          )}

          {screen === 'session' && !activeWorkout && !lastResult && (
            <ArcadePanel accent="cyan" eyebrow="Séance" title="Prêt pour l’effort" className="space-y-4">
              <p className="text-sm text-slate-200">
                Lance une quête quotidienne, un boss de 15 minutes ou une routine custom pour voir ici ton écran d’effort grand format.
              </p>
              <button
                type="button"
                onClick={() => setScreen('home')}
                className="w-full rounded-[1.5rem] border border-cyan-300/70 bg-cyan-300 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950"
              >
                Retour à l’accueil
              </button>
            </ArcadePanel>
          )}

          {screen === 'progress' && (
            <ProgressScreen profile={profile} sessionHistory={sessionHistory} />
          )}

          {screen === 'settings' && (
            <SettingsScreen telegram={telegram} onUpdateTelegram={updateTelegram} />
          )}
        </div>

        <BottomNav currentScreen={screen} onChange={setScreen} />
      </div>

      {!onboardingDone && <OnboardingScreen onEnter={() => setOnboardingDone(true)} />}
      <BadgeUnlockModal badges={badgeModal} onClose={() => setBadgeModal([])} />
    </main>
  )
}
