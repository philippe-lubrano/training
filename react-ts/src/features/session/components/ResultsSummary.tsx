import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import { StatChip } from '../../../shared/ui/StatChip'
import type { SessionResult } from '../../../shared/types/models'

interface ResultsSummaryProps {
  result: SessionResult
  onGoHome: () => void
}

export function ResultsSummary({ result, onGoHome }: ResultsSummaryProps) {
  return (
    <ArcadePanel accent="amber" eyebrow="Résultats" title="Séance validée" className="space-y-4">
      <p className="text-sm text-slate-200">
        Mission accomplie. Tu repars avec de l’XP, une série mise à jour et peut-être quelques bonus.
      </p>
      <div className="grid grid-cols-3 gap-2">
        <StatChip label="XP" value={`+${result.xpEarned}`} accent="amber" />
        <StatChip label="Niveau" value={result.level.toString()} accent="emerald" />
        <StatChip label="Streak" value={`${result.streak} j`} accent="pink" />
      </div>
      {result.newBadges.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Badges débloqués</p>
          <div className="flex flex-wrap gap-2">
            {result.newBadges.map((badge) => (
              <span key={badge.id} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white">
                {badge.icon} {badge.title}
              </span>
            ))}
          </div>
        </div>
      )}
      {result.newUnlocks.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Contenus débloqués</p>
          <ul className="space-y-2 text-sm text-slate-200">
            {result.newUnlocks.map((unlock) => (
              <li key={unlock.id} className="rounded-2xl border border-white/10 px-3 py-3">
                <span className="font-semibold text-white">{unlock.title}</span> · {unlock.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={onGoHome}
        className="w-full rounded-[1.5rem] border border-cyan-300/70 bg-cyan-300 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950"
      >
        Retour à l’accueil
      </button>
    </ArcadePanel>
  )
}
