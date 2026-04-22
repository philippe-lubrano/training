import { unlockCatalog } from '../../features/workouts/data/catalog'
import { getLevelProgress } from '../../features/rewards/domain/progression'
import { ArcadePanel } from '../../shared/ui/ArcadePanel'
import { StatChip } from '../../shared/ui/StatChip'
import type { PlayerProfile, SessionRecord } from '../../shared/types/models'

interface ProgressScreenProps {
  profile: PlayerProfile
  sessionHistory: SessionRecord[]
}

export function ProgressScreen({ profile, sessionHistory }: ProgressScreenProps) {
  const progress = getLevelProgress(profile.xp)
  const unlocked = unlockCatalog.filter((unlock) => profile.unlocks.includes(unlock.id))
  const upcoming = unlockCatalog.filter((unlock) => !profile.unlocks.includes(unlock.id))

  return (
    <div className="space-y-4">
      <ArcadePanel accent="cyan" eyebrow="Progression" title="Ton profil" className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatChip label="Niveau" value={progress.level.toString()} accent="emerald" />
          <StatChip label="XP" value={profile.xp.toString()} accent="amber" />
          <StatChip label="Sessions" value={profile.totalSessions.toString()} accent="pink" />
          <StatChip label="Streak max" value={`${profile.longestStreak} j`} />
        </div>
      </ArcadePanel>
      <ArcadePanel accent="pink" eyebrow="Badges" title="Collection" className="space-y-3">
        {profile.badges.length > 0 ? (
          profile.badges.map((badge) => (
            <article key={badge.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-lg font-black text-white">
                {badge.icon} {badge.title}
              </p>
              <p className="mt-1 text-sm text-slate-300">{badge.description}</p>
            </article>
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-400">
            Aucun badge débloqué pour le moment. Termine une séance pour commencer la collection.
          </p>
        )}
      </ArcadePanel>
      <ArcadePanel accent="amber" eyebrow="Déblocages" title="Récompenses" className="space-y-3">
        {unlocked.map((unlock) => (
          <div key={unlock.id} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <p className="font-semibold text-white">{unlock.title}</p>
            <p>{unlock.description}</p>
          </div>
        ))}
        {upcoming.length > 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 p-4 text-sm text-slate-300">
            Prochain objectif : {upcoming[0].title} au niveau {upcoming[0].levelRequired}.
          </div>
        )}
      </ArcadePanel>
      <ArcadePanel accent="emerald" eyebrow="Historique" title="Dernières séances" className="space-y-3">
        {sessionHistory.length > 0 ? (
          sessionHistory.slice(0, 5).map((session) => (
            <div key={session.id} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">{session.title}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                  {session.mode}
                </span>
              </div>
              <p className="mt-2">{new Date(session.completedAt).toLocaleDateString('fr-FR')} · +{session.xpEarned} XP</p>
            </div>
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-400">
            Aucune séance enregistrée. Tout commence par la première mission.
          </p>
        )}
      </ArcadePanel>
    </div>
  )
}
