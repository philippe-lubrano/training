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
  const isActive = typeof count === 'number' && count > 0

  return (
    <article className="pixel-card overflow-hidden p-3">
      <div className="grid grid-cols-[72px_1fr_auto] items-center gap-3">
        <div className="pixel-card-soft flex h-[72px] items-center justify-center text-3xl">{exercise.emoji}</div>
        <div>
          <p className="pixel-font text-[0.52rem] uppercase leading-[1.6] text-white">
            {exercise.title}
          </p>
          <p className="text-xl leading-tight text-[#9bb0cb]">{exercise.repGoal}</p>
          <p className="text-base text-[#d6e4ff]">{exercise.defaultDurationSec}s / bloc</p>
        </div>
        <div className={`pixel-card-soft flex h-10 w-10 items-center justify-center text-xl ${isActive ? 'text-[#4ade80]' : 'text-[#6b7f9e]'}`}>
          {isActive ? '✅' : '⬜'}
        </div>
      </div>

      <p className="mt-3 text-lg text-[#d6e4ff]">{exercise.flavorText}</p>

      {typeof count === 'number' && onIncrement && onDecrement && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-2">
          <button
            type="button"
            onClick={onDecrement}
            className="pixel-button pixel-button--blue flex h-12 w-12 items-center justify-center px-0 py-0 text-xl"
            aria-label={`Retirer un bloc de ${exercise.title}`}
          >
            −
          </button>
          <div className="text-center">
            <p className="pixel-font text-[0.42rem] uppercase leading-[1.5] text-[#9bb0cb]">Reps</p>
            <p className="text-3xl leading-none text-white">{count}</p>
          </div>
          <button
            type="button"
            onClick={onIncrement}
            className="pixel-button pixel-button--green flex h-12 w-12 items-center justify-center px-0 py-0 text-xl"
            aria-label={`Ajouter un bloc de ${exercise.title}`}
          >
            +
          </button>
        </div>
      )}
    </article>
  )
}
