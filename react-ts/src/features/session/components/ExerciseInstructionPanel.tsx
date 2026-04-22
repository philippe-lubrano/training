import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import type { Exercise } from '../../../shared/types/models'

interface ExerciseInstructionPanelProps {
  exercise: Exercise
}

export function ExerciseInstructionPanel({ exercise }: ExerciseInstructionPanelProps) {
  return (
    <ArcadePanel accent="emerald" eyebrow="Posture parfaite" title={exercise.title} className="space-y-4">
      <div className="rounded-[1.75rem] border border-emerald-400/30 bg-slate-950 p-4 text-center">
        <pre className="overflow-hidden font-mono text-lg font-black leading-none tracking-[0.35em] text-emerald-300">
          {exercise.pixelHint.join('\n')}
        </pre>
      </div>
      <p className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        {exercise.postureCue}
      </p>
      <ul className="space-y-2 text-sm text-slate-200">
        {exercise.instructions.map((instruction) => (
          <li key={instruction} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            {instruction}
          </li>
        ))}
      </ul>
    </ArcadePanel>
  )
}
