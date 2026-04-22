import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import { StatChip } from '../../../shared/ui/StatChip'
import type { WorkoutPlan } from '../../../shared/types/models'

interface WorkoutGeneratorCardProps {
  workout: WorkoutPlan
  onRegenerate: () => void
  onStart: () => void
}

export function WorkoutGeneratorCard({
  workout,
  onRegenerate,
  onStart,
}: WorkoutGeneratorCardProps) {
  return (
    <ArcadePanel
      accent="pink"
      eyebrow="Générateur rétro"
      title="Séance Boss aléatoire"
      headerAction={
        <button
          type="button"
          onClick={onRegenerate}
          className="rounded-full border border-pink-400/40 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-pink-200"
        >
          Re-roll
        </button>
      }
      className="space-y-4"
    >
      <p className="text-sm text-slate-200">{workout.description}</p>
      <div className="grid grid-cols-3 gap-2">
        <StatChip label="Mode" value="Boss" accent="pink" />
        <StatChip label="Durée" value={`${workout.estimatedMinutes} min`} />
        <StatChip label="XP" value={`+${workout.xpReward}`} accent="amber" />
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-white">Boucle prévue</p>
        <div className="flex flex-wrap gap-2">
          {workout.steps.map((step) => (
            <span
              key={step.id}
              className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.18em]"
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-[1.5rem] border border-pink-300/70 bg-pink-300 px-5 py-4 text-base font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_10px_30px_rgba(244,114,182,0.35)]"
      >
        Affronter le boss
      </button>
    </ArcadePanel>
  )
}
