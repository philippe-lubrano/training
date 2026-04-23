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
    <ArcadePanel accent="emerald" eyebrow="Le bot Telegram te surveille" title="Discipline mode" className="space-y-4">
      <p className="text-xl text-[#d6e4ff]">
        Le bot reste opt-in, drôle et insistant. Il te relance seulement si tu n’as pas validé ta quête du jour.
      </p>
      <div className="grid gap-3 rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-4 text-xl text-[#d6e4ff]">
        <label className="flex items-center justify-between gap-3">
          <span>Compte Telegram lié</span>
          <button
            type="button"
            onClick={() => onUpdate({ linked: !settings.linked })}
            className={`pixel-button px-4 py-2 text-[0.45rem] ${settings.linked ? 'pixel-button--green' : 'pixel-button--blue'}`}
          >
            {settings.linked ? 'Lié' : 'Lier'}
          </button>
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>Relances activées</span>
          <button
            type="button"
            onClick={() => onUpdate({ enabled: !settings.enabled })}
            className={`pixel-button px-4 py-2 text-[0.45rem] ${settings.enabled ? 'pixel-button--green' : 'pixel-button--red'}`}
          >
            {settings.enabled ? 'Actif' : 'Off'}
          </button>
        </label>
      </div>
      <div>
        <p className="pixel-font mb-2 text-[0.42rem] uppercase leading-[1.5] text-[#9bb0cb]">Intensité du bot</p>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(intensityLabels) as TelegramIntensity[]).map((intensity) => {
            const isActive = settings.intensity === intensity

            return (
              <button
                key={intensity}
                type="button"
                onClick={() => onUpdate({ intensity })}
                className={`pixel-button px-3 py-3 text-[0.45rem] ${isActive ? 'pixel-button--green' : 'pixel-button--blue'}`}
              >
                {intensityLabels[intensity]}
              </button>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-lg text-[#d6e4ff]">
        <label className="rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-3">
          <span className="pixel-font mb-2 block text-[0.42rem] uppercase leading-[1.5] text-[#9bb0cb]">
            Début calme
          </span>
          <input
            type="time"
            value={settings.quietHoursStart}
            onChange={(event) => onUpdate({ quietHoursStart: event.target.value })}
            className="w-full rounded-xl border-2 border-[#41567a] bg-[#071321] px-3 py-3 text-white"
          />
        </label>
        <label className="rounded-2xl border-2 border-[#41567a] bg-[#0c1c2e] p-3">
          <span className="pixel-font mb-2 block text-[0.42rem] uppercase leading-[1.5] text-[#9bb0cb]">
            Fin calme
          </span>
          <input
            type="time"
            value={settings.quietHoursEnd}
            onChange={(event) => onUpdate({ quietHoursEnd: event.target.value })}
            className="w-full rounded-xl border-2 border-[#41567a] bg-[#071321] px-3 py-3 text-white"
          />
        </label>
      </div>
    </ArcadePanel>
  )
}
