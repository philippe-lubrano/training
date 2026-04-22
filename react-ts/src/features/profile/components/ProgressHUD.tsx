import { getLevelProgress } from '../../rewards/domain/progression'
import { StatChip } from '../../../shared/ui/StatChip'
import type { PlayerProfile } from '../../../shared/types/models'

interface ProgressHUDProps {
  profile: PlayerProfile
  todayCompleted: boolean
}

export function ProgressHUD({ profile, todayCompleted }: ProgressHUDProps) {
  const progress = getLevelProgress(profile.xp)

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-5 shadow-[0_0_50px_rgba(45,212,191,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-cyan-300">RetroFit Quest</p>
          <h1 className="mt-2 font-mono text-3xl font-black uppercase tracking-[0.16em] text-white">
            {profile.alias}
          </h1>
          <p className="mt-2 max-w-xs text-sm text-slate-300">
            Discipline solo, bonus XP garantis et Bad Cop Telegram prêt à te rappeler la mission.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-right">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-cyan-200">Niveau</p>
          <p className="text-3xl font-black text-white">{progress.level}</p>
        </div>
      </div>
      <div className="mt-4 h-4 overflow-hidden rounded-full border border-white/10 bg-slate-950">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee,#f472b6,#facc15)] transition-all"
          style={{ width: `${Math.max(10, progress.ratio * 100)}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>{progress.xpIntoLevel} XP dans ce niveau</span>
        <span>{progress.xpForNextLevel - progress.xpIntoLevel} XP avant le prochain</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatChip label="XP total" value={profile.xp.toString()} accent="amber" />
        <StatChip label="Streak" value={`${profile.streak} j`} accent="pink" />
        <StatChip label="Badges" value={profile.badges.length.toString()} accent="emerald" />
        <StatChip label="Mission" value={todayCompleted ? 'OK' : 'À faire'} />
      </div>
    </section>
  )
}
