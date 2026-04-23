import { ProgressHUD } from '../../features/profile/components/ProgressHUD'
import { TelegramStatusCard } from '../../features/notifications/components/TelegramStatusCard'
import { DailyGoalCard } from '../../features/workouts/components/DailyGoalCard'
import { RoutineBuilder } from '../../features/workouts/components/RoutineBuilder'
import { WorkoutGeneratorCard } from '../../features/workouts/components/WorkoutGeneratorCard'
import type {
  Exercise,
  ExerciseId,
  PlayerProfile,
  TelegramSettings,
  WorkoutPlan,
} from '../../shared/types/models'

interface HomeScreenProps {
  profile: PlayerProfile
  todayCompleted: boolean
  dailyWorkout: WorkoutPlan
  bossWorkout: WorkoutPlan
  exercises: Exercise[]
  customSelection: Record<ExerciseId, number>
  customPreview: WorkoutPlan | null
  telegram: TelegramSettings
  hasActiveSession: boolean
  onStartDaily: () => void
  onRegenerateBoss: () => void
  onStartBoss: () => void
  onAdjustRoutine: (exerciseId: ExerciseId, delta: -1 | 1) => void
  onStartCustom: () => void
  onOpenProgress: () => void
  onOpenSession: () => void
  onUpdateTelegram: (patch: Partial<TelegramSettings>) => void
}

export function HomeScreen({
  profile,
  todayCompleted,
  dailyWorkout,
  bossWorkout,
  exercises,
  customSelection,
  customPreview,
  telegram,
  hasActiveSession,
  onStartDaily,
  onRegenerateBoss,
  onStartBoss,
  onAdjustRoutine,
  onStartCustom,
  onOpenProgress,
  onOpenSession,
  onUpdateTelegram,
}: HomeScreenProps) {
  const queuedBlocks = Object.values(customSelection).reduce((total, value) => total + value, 0)

  return (
    <div className="space-y-4">
      <ProgressHUD profile={profile} todayCompleted={todayCompleted} />
      <section className="pixel-card space-y-4 p-4">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <div>
            <p className="pixel-font text-[0.55rem] uppercase text-[#9dd2ff]">Pas de champion</p>
            <p className="pixel-font mt-2 text-[0.7rem] leading-[1.7] text-white">Sans discipline !</p>
          </div>
          <div className="pixel-card-soft flex h-16 w-16 items-center justify-center text-3xl">🏆</div>
        </div>

        <button
          type="button"
          onClick={onStartDaily}
          className="pixel-button pixel-button--green pixel-shadow-text w-full px-5 py-5 text-center text-base leading-[1.5]"
        >
          START
          <span className="mt-2 block text-base">WORKOUT</span>
        </button>

        {hasActiveSession && (
          <button
            type="button"
            onClick={onOpenSession}
            className="pixel-button pixel-button--yellow w-full px-4 py-3 text-[0.7rem]"
          >
            Reprendre la séance
          </button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onStartBoss}
            className="pixel-button pixel-button--blue flex min-h-24 flex-col items-center justify-center gap-2 px-3 py-4 text-[0.62rem]"
          >
            <span className="text-2xl">🎲</span>
            Random
          </button>
          <button
            type="button"
            onClick={() =>
              document.getElementById('builder-zone')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
            className="pixel-button pixel-button--purple flex min-h-24 flex-col items-center justify-center gap-2 px-3 py-4 text-[0.62rem]"
          >
            <span className="text-2xl">🛠️</span>
            Custom
          </button>
          <button
            type="button"
            onClick={onOpenProgress}
            className="pixel-button pixel-button--orange flex min-h-24 flex-col items-center justify-center gap-2 px-3 py-4 text-[0.62rem]"
          >
            <span className="text-2xl">📊</span>
            Stats
          </button>
          <button
            type="button"
            onClick={onOpenProgress}
            className="pixel-button pixel-button--teal flex min-h-24 flex-col items-center justify-center gap-2 px-3 py-4 text-[0.62rem]"
          >
            <span className="text-2xl">🏅</span>
            Badges
          </button>
        </div>

        <div className="pixel-card-soft grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-[#d6e4ff]">
          <div>
            <p className="pixel-font text-[0.48rem] text-[#86efac]">Today loadout</p>
            <p className="mt-2 text-2xl leading-none text-white">
              {dailyWorkout.steps.length} blocs • +{dailyWorkout.xpReward} XP
            </p>
          </div>
          <div className="text-right text-xl leading-none text-[#facc15]">
            <p>{queuedBlocks}x</p>
            <p className="text-sm text-[#9bb0cb]">custom</p>
          </div>
        </div>
      </section>

      <DailyGoalCard workout={dailyWorkout} todayCompleted={todayCompleted} onStart={onStartDaily} />
      <WorkoutGeneratorCard
        workout={bossWorkout}
        onRegenerate={onRegenerateBoss}
        onStart={onStartBoss}
      />
      <div id="builder-zone">
        <RoutineBuilder
          exercises={exercises}
          selection={customSelection}
          preview={customPreview}
          onAdjust={onAdjustRoutine}
          onStart={onStartCustom}
        />
      </div>
      <TelegramStatusCard settings={telegram} onUpdate={onUpdateTelegram} />
    </div>
  )
}
