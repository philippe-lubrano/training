import { exerciseMap } from '../../workouts/data/catalog'
import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import { StatChip } from '../../../shared/ui/StatChip'
import type { SessionState, WorkoutPlan } from '../../../shared/types/models'
import { BigTimer } from './BigTimer'
import { ExerciseInstructionPanel } from './ExerciseInstructionPanel'
import { PrimaryActionButton } from './PrimaryActionButton'

interface SessionPlayerProps {
  workout: WorkoutPlan
  sessionState: SessionState
  onToggle: () => void
  onAdvance: () => void
  onFinish: () => void
}

export function SessionPlayer({
  workout,
  sessionState,
  onToggle,
  onAdvance,
  onFinish,
}: SessionPlayerProps) {
  const currentStep = workout.steps[sessionState.stepIndex]
  const exercise = exerciseMap[currentStep.exerciseId]
  const isRunning = sessionState.status === 'running'
  const isIdle = sessionState.status === 'idle'
  const actionLabel = isIdle ? 'Commencer la série' : isRunning ? 'Pause' : 'Reprendre'

  return (
    <div className="space-y-4">
      <ArcadePanel accent="cyan" eyebrow={workout.mode} title={workout.title} className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <StatChip label="Étape" value={`${sessionState.stepIndex + 1}/${workout.steps.length}`} />
          <StatChip label="XP" value={`+${workout.xpReward}`} accent="amber" />
          <StatChip label="Mode" value={workout.mode.toUpperCase()} accent="pink" />
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">Bloc actif</p>
          <p className="mt-2 text-2xl font-black text-white">
            {exercise.emoji} {currentStep.label}
          </p>
          <p className="mt-2 text-sm text-slate-300">{currentStep.focus}</p>
        </div>
        <BigTimer secondsLeft={sessionState.secondsLeft} />
        <div className="grid gap-3">
          <PrimaryActionButton label={actionLabel} onClick={onToggle} />
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onAdvance}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-white"
            >
              {sessionState.stepIndex === workout.steps.length - 1 ? 'Clôturer' : 'Bloc suivant'}
            </button>
            <button
              type="button"
              onClick={onFinish}
              className="rounded-[1.5rem] border border-amber-300/60 bg-amber-300/15 px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-amber-100"
            >
              Terminer la séance
            </button>
          </div>
        </div>
      </ArcadePanel>
      <ExerciseInstructionPanel exercise={exercise} />
    </div>
  )
}
