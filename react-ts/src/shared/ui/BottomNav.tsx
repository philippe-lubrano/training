import type { AppScreen } from '../types/models'

interface BottomNavProps {
  currentScreen: AppScreen
  onChange: (screen: AppScreen) => void
}

const items: Array<{ id: AppScreen; label: string; icon: string }> = [
  { id: 'home', label: 'Accueil', icon: '🏠' },
  { id: 'session', label: 'Séance', icon: '⏱️' },
  { id: 'progress', label: 'Progression', icon: '⭐' },
  { id: 'settings', label: 'Réglages', icon: '⚙️' },
]

export function BottomNav({ currentScreen, onChange }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 z-20 mt-6 grid grid-cols-4 gap-2 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-2 shadow-[0_-8px_24px_rgba(15,23,42,0.55)] backdrop-blur">
      {items.map((item) => {
        const isActive = item.id === currentScreen

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`flex min-h-16 flex-col items-center justify-center rounded-2xl border px-2 py-2 text-xs font-semibold transition ${
              isActive
                ? 'border-cyan-400/60 bg-cyan-400/15 text-white'
                : 'border-transparent bg-white/5 text-slate-300'
            }`}
          >
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
