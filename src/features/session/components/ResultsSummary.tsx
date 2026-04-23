import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import { StatChip } from '../../../shared/ui/StatChip'
import type { SessionResult } from '../../../shared/types/models'

interface ResultsSummaryProps {
  result: SessionResult
  onGoHome: () => void
}

export function ResultsSummary({ result, onGoHome }: ResultsSummaryProps) {
  return (
    <ArcadePanel accent="amber" eyebrow="Écran de victoire" title="Level complete!" className="space-y-4 text-center">
      <div className="space-y-3">
        <p className="pixel-font text-[0.55rem] uppercase leading-[1.7] text-[#86efac]">XP gagnée</p>
        <div className="pixel-card-soft space-y-3 p-4">
          <p className="pixel-font text-[0.9rem] leading-[1.8] text-[#facc15] pixel-shadow-text">+{result.xpEarned} XP</p>
          <div className="grid grid-cols-3 gap-2 text-left">
            <StatChip label="Niveau" value={result.level.toString()} accent="emerald" />
            <StatChip label="Streak" value={`${result.streak} j`} accent="pink" />
            <StatChip label="Mode" value={result.workout.mode.toUpperCase()} />
          </div>
        </div>
      </div>

      {result.newBadges.length > 0 && (
        <div className="rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-4 text-left">
          <p className="pixel-font mb-3 text-[0.44rem] uppercase leading-[1.5] text-[#86efac]">Nouveau badge débloqué</p>
          <div className="grid grid-cols-3 gap-2">
            {result.newBadges.map((badge) => (
              <div key={badge.id} className="pixel-card-soft flex min-h-24 flex-col items-center justify-center gap-2 p-3 text-center">
                <span className="text-3xl">{badge.icon}</span>
                <span className="pixel-font text-[0.38rem] leading-[1.5] text-white">{badge.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {result.newUnlocks.length > 0 && (
        <div className="rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-4 text-left">
          <p className="pixel-font mb-3 text-[0.44rem] uppercase leading-[1.5] text-[#9dd2ff]">Récompenses</p>
          <ul className="space-y-2 text-lg text-[#d6e4ff]">
            {result.newUnlocks.map((unlock) => (
              <li key={unlock.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <span className="text-white">{unlock.title}</span> · {unlock.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="pixel-card-soft p-4 text-left text-xl text-[#d6e4ff]">
        <p className="pixel-font text-[0.42rem] uppercase leading-[1.5] text-[#9dd2ff]">Message du bot</p>
        <p className="mt-2">Le bot Telegram te surveille... demain champion.</p>
      </div>

      <button
        type="button"
        onClick={onGoHome}
        className="pixel-button pixel-button--green w-full px-5 py-4 text-[0.7rem]"
      >
        Claim reward
      </button>
      <button
        type="button"
        onClick={onGoHome}
        className="pixel-button pixel-button--blue w-full px-5 py-4 text-[0.7rem]"
      >
        Back to home
      </button>
    </ArcadePanel>
  )
}
