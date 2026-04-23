import { exerciseMap } from '../../workouts/data/catalog'
import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import { StatChip } from '../../../shared/ui/StatChip'
import type { SessionState, WorkoutPlan } from '../../../shared/types/models'
import { BigTimer } from './BigTimer'
import { ExerciseInstructionPanel } from './ExerciseInstructionPanel'
import { PrimaryActionButton } from './PrimaryActionButton'
import pushupHero from '../../../assets/pushup-hero.svg'

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
  const progressPercent = ((sessionState.stepIndex + 1) / workout.steps.length) * 100

  return (
    <div className="space-y-4">
      <ArcadePanel accent="cyan" eyebrow="Mode effort" title={currentStep.label} className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="pixel-font text-[0.6rem] uppercase leading-[1.6] text-white">{exercise.title}</p>
          <p className="pixel-font text-[0.52rem] uppercase leading-[1.6] text-[#d7e6ff]">
            {sessionState.stepIndex + 1} / {workout.steps.length}
          </p>
        </div>

        <div className="pixel-meter h-5">
          <span style={{ width: `${progressPercent}%` }} />
        </div>

        <BigTimer secondsLeft={sessionState.secondsLeft} />

        <div className="rounded-[1.25rem] border-2 border-[#24344f] bg-[#091827] p-4 text-center">
          <img src={pushupHero} alt="Illustration pixel d’exercice" className="mx-auto h-auto w-full max-w-[220px]" />
        </div>

        <div className="pixel-card-soft p-4 text-center">
          <p className="pixel-font text-[0.42rem] uppercase leading-[1.6] text-[#86efac]">Focus</p>
          <p className="mt-2 text-2xl leading-tight text-[#d6e4ff]">{currentStep.focus}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatChip label="Étape" value={`${sessionState.stepIndex + 1}/${workout.steps.length}`} />
          <StatChip label="XP" value={`+${workout.xpReward}`} accent="amber" />
          <StatChip label="Mode" value={workout.mode.toUpperCase()} accent="pink" />
        </div>

        <div className="grid gap-3">
          <PrimaryActionButton label={actionLabel} onClick={onToggle} />
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onAdvance}
              className="pixel-button pixel-button--yellow px-4 py-4 text-[0.55rem]"
            >
              {sessionState.stepIndex === workout.steps.length - 1 ? 'Clôturer' : 'Bloc suivant'}
            </button>
            <button
              type="button"
              onClick={onFinish}
              className="pixel-button pixel-button--red px-4 py-4 text-[0.55rem]"
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
