import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import { StatChip } from '../../../shared/ui/StatChip'
import type { WorkoutPlan } from '../../../shared/types/models'

interface DailyGoalCardProps {
  workout: WorkoutPlan
  todayCompleted: boolean
  onStart: () => void
}

export function DailyGoalCard({ workout, todayCompleted, onStart }: DailyGoalCardProps) {
  return (
    <ArcadePanel
      accent="cyan"
      eyebrow="Setup"
      title="Quête du jour"
      className="space-y-4"
    >
      <p className="text-xl text-[#d6e4ff]">{workout.description}</p>
      <div className="grid grid-cols-3 gap-2">
        <StatChip label="Durée" value={`${workout.estimatedMinutes} min`} />
        <StatChip label="XP" value={`+${workout.xpReward}`} accent="amber" />
        <StatChip
          label="Statut"
          value={todayCompleted ? 'OK' : 'À faire'}
          accent={todayCompleted ? 'emerald' : 'pink'}
        />
      </div>
      <div className="pixel-divider" />
      <ul className="space-y-2 rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-3 text-lg text-[#d6e4ff]">
        {workout.steps.map((step) => (
          <li key={step.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/5 px-3 py-2">
            <span className="text-white">{step.label}</span>
            <span>{step.durationSec}s</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onStart}
        className="pixel-button pixel-button--green w-full px-5 py-4 text-[0.75rem]"
      >
        {todayCompleted ? 'Relancer la quête' : 'Lancer la quête'}
      </button>
    </ArcadePanel>
  )
}
