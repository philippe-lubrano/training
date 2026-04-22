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
    <div className="rounded-[2rem] border border-cyan-400/30 bg-cyan-400/10 px-6 py-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.18)]">
      <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cyan-200">Chrono</p>
      <p className="mt-2 font-mono text-6xl font-black tracking-[0.14em] text-white sm:text-7xl">
        {formatTime(secondsLeft)}
      </p>
    </div>
  )
}
