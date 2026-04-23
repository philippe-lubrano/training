import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import type { Exercise } from '../../../shared/types/models'

interface ExerciseInstructionPanelProps {
  exercise: Exercise
}

export function ExerciseInstructionPanel({ exercise }: ExerciseInstructionPanelProps) {
  return (
    <ArcadePanel accent="emerald" eyebrow="Garde la bonne forme" title={exercise.title} className="space-y-4">
      <div className="rounded-[1rem] border-2 border-[#1d7b42] bg-[#071321] p-4 text-center">
        <pre className="overflow-hidden text-lg font-black leading-none tracking-[0.35em] text-[#4ade80]">
          {exercise.pixelHint.join('\n')}
        </pre>
      </div>
      <p className="rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-4 text-xl text-[#d6e4ff]">
        {exercise.postureCue}
      </p>
      <ul className="space-y-2 text-lg text-[#d6e4ff]">
        {exercise.instructions.map((instruction) => (
          <li key={instruction} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            {instruction}
          </li>
        ))}
      </ul>
    </ArcadePanel>
  )
}
