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
      eyebrow="Mission du jour"
      title="Valider ta séance"
      className="space-y-4"
    >
      <p className="text-sm text-slate-200">{workout.description}</p>
      <div className="grid grid-cols-3 gap-2">
        <StatChip label="Durée" value={`${workout.estimatedMinutes} min`} />
        <StatChip label="XP" value={`+${workout.xpReward}`} accent="amber" />
        <StatChip
          label="Statut"
          value={todayCompleted ? 'OK' : 'À faire'}
          accent={todayCompleted ? 'emerald' : 'pink'}
        />
      </div>
      <ul className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        {workout.steps.map((step) => (
          <li key={step.id} className="flex items-center justify-between gap-3">
            <span className="font-semibold text-white">{step.label}</span>
            <span>{step.durationSec}s</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-[1.5rem] border border-cyan-300/70 bg-cyan-300 px-5 py-4 text-base font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_10px_30px_rgba(34,211,238,0.35)]"
      >
        {todayCompleted ? 'Relancer la quête' : 'Lancer la quête'}
      </button>
    </ArcadePanel>
  )
}
