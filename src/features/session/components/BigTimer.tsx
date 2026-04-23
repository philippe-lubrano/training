interface BigTimerProps {
  secondsLeft: number
}

function formatTime(secondsLeft: number): string {
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function BigTimer({ secondsLeft }: BigTimerProps) {
  return (
    <div className="rounded-[1.25rem] px-4 py-5 text-center">
      <p className="pixel-font text-[0.44rem] uppercase leading-[1.5] text-[#d7e6ff]">Temps restant</p>
      <p className="pixel-font pixel-shadow-text mt-4 text-[2.8rem] leading-none tracking-[0.08em] text-[#facc15] sm:text-[4.2rem]">
        {formatTime(secondsLeft)}
      </p>
    </div>
  )
}
