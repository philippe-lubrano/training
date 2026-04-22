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
  onOpenSession,
  onUpdateTelegram,
}: HomeScreenProps) {
  return (
    <div className="space-y-4">
      <ProgressHUD profile={profile} todayCompleted={todayCompleted} />
      {hasActiveSession && (
        <button
          type="button"
          onClick={onOpenSession}
          className="w-full rounded-[1.5rem] border border-fuchsia-300/60 bg-fuchsia-300/15 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-fuchsia-100"
        >
          Reprendre la séance en cours
        </button>
      )}
      <DailyGoalCard workout={dailyWorkout} todayCompleted={todayCompleted} onStart={onStartDaily} />
      <WorkoutGeneratorCard
        workout={bossWorkout}
        onRegenerate={onRegenerateBoss}
        onStart={onStartBoss}
      />
      <RoutineBuilder
        exercises={exercises}
        selection={customSelection}
        preview={customPreview}
        onAdjust={onAdjustRoutine}
        onStart={onStartCustom}
      />
      <TelegramStatusCard settings={telegram} onUpdate={onUpdateTelegram} />
    </div>
  )
}
