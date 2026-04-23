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
      eyebrow="Choisis ton mode"
      title="Random / Boss"
      headerAction={
        <button
          type="button"
          onClick={onRegenerate}
          className="pixel-button pixel-button--blue px-3 py-2 text-[0.45rem]"
        >
          Re-roll
        </button>
      }
      className="space-y-4"
    >
      <p className="text-xl text-[#d6e4ff]">{workout.description}</p>
      <div className="grid grid-cols-3 gap-2">
        <StatChip label="Mode" value="Boss" accent="pink" />
        <StatChip label="Durée" value={`${workout.estimatedMinutes} min`} />
        <StatChip label="XP" value={`+${workout.xpReward}`} accent="amber" />
      </div>
      <div className="rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-4 text-lg text-[#d6e4ff]">
        <p className="pixel-font mb-3 text-[0.46rem] uppercase leading-[1.6] text-white">Boucle prévue</p>
        <div className="flex flex-wrap gap-2">
          {workout.steps.map((step) => (
            <span
              key={step.id}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm uppercase"
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="pixel-button pixel-button--purple w-full px-5 py-4 text-[0.75rem]"
      >
        Affronter le boss
      </button>
    </ArcadePanel>
  )
}
