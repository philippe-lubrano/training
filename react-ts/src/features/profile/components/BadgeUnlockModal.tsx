import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import type { BadgeUnlock } from '../../../shared/types/models'

interface BadgeUnlockModalProps {
  badges: BadgeUnlock[]
  onClose: () => void
}

export function BadgeUnlockModal({ badges, onClose }: BadgeUnlockModalProps) {
  if (badges.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end bg-slate-950/80 p-4 backdrop-blur sm:items-center sm:justify-center">
      <ArcadePanel accent="pink" title="Récompense débloquée" className="w-full max-w-md space-y-4">
        <p className="text-sm text-slate-200">
          Tu viens de débloquer {badges.length > 1 ? 'de nouveaux badges' : 'un nouveau badge'}.
        </p>
        <div className="space-y-3">
          {badges.map((badge) => (
            <article key={badge.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-lg font-black text-white">
                <span className="mr-2" aria-hidden="true">
                  {badge.icon}
                </span>
                {badge.title}
              </p>
              <p className="mt-1 text-sm text-slate-300">{badge.description}</p>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-[1.5rem] border border-pink-300/70 bg-pink-300 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950"
        >
          Reprendre la quête
        </button>
      </ArcadePanel>
    </div>
  )
}
