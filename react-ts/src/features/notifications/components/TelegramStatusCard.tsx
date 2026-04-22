import { ArcadePanel } from '../../../shared/ui/ArcadePanel'
import type { TelegramIntensity, TelegramSettings } from '../../../shared/types/models'

interface TelegramStatusCardProps {
  settings: TelegramSettings
  onUpdate: (patch: Partial<TelegramSettings>) => void
}

const intensityLabels: Record<TelegramIntensity, string> = {
  soft: 'Soft',
  spicy: 'Spicy',
  boss: 'Boss',
}

export function TelegramStatusCard({ settings, onUpdate }: TelegramStatusCardProps) {
  return (
    <ArcadePanel accent="emerald" eyebrow="Bad Cop" title="Discipline Telegram" className="space-y-4">
      <p className="text-sm text-slate-200">
        Le bot reste opt-in, drôle et insistant. Il te relance seulement si tu n’as pas validé ta quête du jour.
      </p>
      <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <label className="flex items-center justify-between gap-3">
          <span>Compte Telegram lié</span>
          <button
            type="button"
            onClick={() => onUpdate({ linked: !settings.linked })}
            className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] ${
              settings.linked
                ? 'border-emerald-300/70 bg-emerald-300/20 text-emerald-100'
                : 'border-white/10 bg-slate-900 text-slate-300'
            }`}
          >
            {settings.linked ? 'Lié' : 'Lier'}
          </button>
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>Relances activées</span>
          <button
            type="button"
            onClick={() => onUpdate({ enabled: !settings.enabled })}
            className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] ${
              settings.enabled
                ? 'border-cyan-300/70 bg-cyan-300/20 text-cyan-100'
                : 'border-white/10 bg-slate-900 text-slate-300'
            }`}
          >
            {settings.enabled ? 'Actif' : 'Off'}
          </button>
        </label>
      </div>
      <div>
        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Intensité du bot</p>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(intensityLabels) as TelegramIntensity[]).map((intensity) => {
            const isActive = settings.intensity === intensity

            return (
              <button
                key={intensity}
                type="button"
                onClick={() => onUpdate({ intensity })}
                className={`rounded-2xl border px-3 py-3 text-sm font-black uppercase tracking-[0.18em] ${
                  isActive
                    ? 'border-emerald-300/70 bg-emerald-300/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-300'
                }`}
              >
                {intensityLabels[intensity]}
              </button>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
        <label className="rounded-3xl border border-white/10 bg-white/5 p-3">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">
            Début calme
          </span>
          <input
            type="time"
            value={settings.quietHoursStart}
            onChange={(event) => onUpdate({ quietHoursStart: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-3 text-white"
          />
        </label>
        <label className="rounded-3xl border border-white/10 bg-white/5 p-3">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">
            Fin calme
          </span>
          <input
            type="time"
            value={settings.quietHoursEnd}
            onChange={(event) => onUpdate({ quietHoursEnd: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-3 text-white"
          />
        </label>
      </div>
    </ArcadePanel>
  )
}
