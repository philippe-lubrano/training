import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import type { Exercise, ExerciseId, WorkoutPlan } from '../../../shared/types/models'
import { ExerciseTile } from './ExerciseTile'

interface RoutineBuilderProps {
  exercises: Exercise[]
  selection: Record<ExerciseId, number>
  preview: WorkoutPlan | null
  onAdjust: (exerciseId: ExerciseId, delta: -1 | 1) => void
  onStart: () => void
}

export function RoutineBuilder({
  exercises,
  selection,
  preview,
  onAdjust,
  onStart,
}: RoutineBuilderProps) {
  return (
    <ArcadePanel accent="amber" eyebrow="Routine custom" title="Assemble ta séance" className="space-y-4">
      <p className="text-sm text-slate-200">
        Monte ta routine avec les trois mini-jeux. De gros boutons, peu d’options, zéro friction.
      </p>
      <div className="grid gap-3">
        {exercises.map((exercise) => (
          <ExerciseTile
            key={exercise.id}
            exercise={exercise}
            count={selection[exercise.id]}
            onIncrement={() => onAdjust(exercise.id, 1)}
            onDecrement={() => onAdjust(exercise.id, -1)}
          />
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Aperçu</p>
            <p className="text-lg font-black text-white">
              {preview ? `${preview.estimatedMinutes} min · ${preview.steps.length} blocs` : 'Ajoute au moins un bloc'}
            </p>
          </div>
          <button
            type="button"
            onClick={onStart}
            disabled={!preview}
            className="rounded-[1.5rem] border border-amber-300/70 bg-amber-300 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-slate-500"
          >
            Démarrer
          </button>
        </div>
        {preview && (
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {preview.steps.map((step) => (
              <li key={step.id} className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 px-3 py-2">
                <span className="font-semibold text-white">{step.label}</span>
                <span>{step.durationSec}s</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ArcadePanel>
  )
}
