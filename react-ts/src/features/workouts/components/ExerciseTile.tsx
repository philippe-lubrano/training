import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import type { Exercise } from '../../../shared/types/models'

interface ExerciseTileProps {
  exercise: Exercise
  count?: number
  onIncrement?: () => void
  onDecrement?: () => void
}

export function ExerciseTile({
  exercise,
  count,
  onIncrement,
  onDecrement,
}: ExerciseTileProps) {
  return (
    <ArcadePanel accent="emerald" className="space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.15em] text-white">
            {exercise.emoji} {exercise.title}
          </p>
          <p className="mt-1 text-sm text-slate-300">{exercise.flavorText}</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
          {exercise.difficulty}
        </span>
      </div>
      <div className="grid gap-2 text-sm text-slate-200">
        <p>Objectif : {exercise.repGoal}</p>
        <p>Bloc standard : {exercise.defaultDurationSec}s</p>
        <p className="text-emerald-200">Posture : {exercise.postureCue}</p>
      </div>
      {typeof count === 'number' && onIncrement && onDecrement && (
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-2">
          <button
            type="button"
            onClick={onDecrement}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-2xl font-black text-white"
            aria-label={`Retirer un bloc de ${exercise.title}`}
          >
            −
          </button>
          <div className="text-center">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Blocs</p>
            <p className="text-2xl font-black text-white">{count}</p>
          </div>
          <button
            type="button"
            onClick={onIncrement}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/60 bg-emerald-400/20 text-2xl font-black text-white"
            aria-label={`Ajouter un bloc de ${exercise.title}`}
          >
            +
          </button>
        </div>
      )}
    </ArcadePanel>
  )
}
