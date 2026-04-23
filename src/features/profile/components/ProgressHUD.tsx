import { getLevelProgress } from '../../rewards/domain/progression'
import { StatChip } from '../../../shared/ui/StatChip'
import type { PlayerProfile } from '../../../shared/types/models'
import playerAvatar from '../../../assets/player-avatar.svg'

interface ProgressHUDProps {
  profile: PlayerProfile
  todayCompleted: boolean
}

export function ProgressHUD({ profile, todayCompleted }: ProgressHUDProps) {
  const progress = getLevelProgress(profile.xp)
  const xpPercent = Math.max(8, progress.ratio * 100)

  return (
    <section className="pixel-card p-4">
      <div className="grid grid-cols-[84px_1fr_auto] items-start gap-3">
        <div className="pixel-card-soft flex h-[84px] w-[84px] items-center justify-center overflow-hidden p-2">
          <img src={playerAvatar} alt="Avatar pixel du joueur" className="h-full w-full object-contain" />
        </div>

        <div className="min-w-0">
          <p className="pixel-font text-[0.5rem] uppercase text-[#d7e6ff]">PLAYER_1</p>
          <h1 className="pixel-font mt-2 text-[0.95rem] uppercase leading-[1.6] text-[#facc15] pixel-shadow-text">
            LV.{progress.level}
          </h1>
          <p className="pixel-font mt-2 text-[0.52rem] uppercase text-[#9dd2ff]">XP</p>
          <div className="xp-bar mt-2 h-4">
            <span style={{ width: `${xpPercent}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[0.8rem] text-[#d6e4ff]">
            <span>
              {progress.xpIntoLevel} / {progress.xpForNextLevel}
            </span>
            <span>{progress.xpForNextLevel - progress.xpIntoLevel} to go</span>
          </div>
        </div>

        <button
          type="button"
          className="pixel-card-soft flex h-12 w-12 items-center justify-center text-2xl text-[#d7e6ff]"
          aria-label="Profil et options"
        >
          ⚙️
        </button>
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
