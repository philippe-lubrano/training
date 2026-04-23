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
    <ArcadePanel accent="amber" eyebrow="Sélectionne tes exercices" title="Custom build" className="space-y-4">
      <p className="text-xl text-[#d6e4ff]">
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
      <div className="rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="pixel-font text-[0.44rem] uppercase leading-[1.6] text-[#9bb0cb]">Aperçu</p>
            <p className="mt-2 text-2xl text-white">
              {preview ? `${preview.estimatedMinutes} min · ${preview.steps.length} blocs` : 'Ajoute au moins un bloc'}
            </p>
          </div>
          <button
            type="button"
            onClick={onStart}
            disabled={!preview}
            className="pixel-button pixel-button--green px-5 py-4 text-[0.58rem] disabled:border-[#2b3f5e] disabled:bg-[#213247] disabled:text-[#72839e]"
          >
            Démarrer
          </button>
        </div>
        {preview && (
          <ul className="mt-4 space-y-2 text-lg text-[#d6e4ff]">
            {preview.steps.map((step) => (
              <li key={step.id} className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-white">{step.label}</span>
                <span>{step.durationSec}s</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ArcadePanel>
  )
}
