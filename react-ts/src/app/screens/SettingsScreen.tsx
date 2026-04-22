import { TelegramStatusCard } from '../../features/notifications/components/TelegramStatusCard'
import { ArcadePanel } from '../../shared/ui/ArcadePanel'
import type { TelegramSettings } from '../../shared/types/models'

interface SettingsScreenProps {
  telegram: TelegramSettings
  onUpdateTelegram: (patch: Partial<TelegramSettings>) => void
}

export function SettingsScreen({ telegram, onUpdateTelegram }: SettingsScreenProps) {
  return (
    <div className="space-y-4">
      <TelegramStatusCard settings={telegram} onUpdate={onUpdateTelegram} />
      <ArcadePanel accent="cyan" eyebrow="Backend ready" title="Cible Firebase" className="space-y-3">
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Auth Firebase pour connexion anonyme ou email.</li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Firestore pour profil, sessions, badges, routines et statut quotidien.</li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Fonctions planifiées pour piloter les relances Telegram côté serveur.</li>
        </ul>
      </ArcadePanel>
      <ArcadePanel accent="pink" eyebrow="PWA" title="Expérience mobile" className="space-y-3">
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Écran unique, gros boutons, zones tactiles larges et contraste élevé.</li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Manifest prêt pour l’installation écran d’accueil.</li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Base idéale pour brancher Playwright sur les parcours critiques ensuite.</li>
        </ul>
      </ArcadePanel>
    </div>
  )
}
