import type { AppScreen } from '../types/models'

interface BottomNavProps {
  currentScreen: AppScreen
  onChange: (screen: AppScreen) => void
}

const items: Array<{ id: AppScreen; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'session', label: 'Effort', icon: '⏱️' },
  { id: 'progress', label: 'Badges', icon: '🛡️' },
  { id: 'settings', label: 'Profile', icon: '👤' },
]

export function BottomNav({ currentScreen, onChange }: BottomNavProps) {
  return (
    <nav className="mt-auto grid grid-cols-4 gap-2 px-1 pt-2">
      {items.map((item) => {
        const isActive = item.id === currentScreen

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`flex min-h-[72px] flex-col items-center justify-center rounded-2xl border-4 px-2 py-2 transition ${
              isActive
                ? 'border-[#164c17] bg-[#22c55e] text-white shadow-[0_6px_0_rgba(0,0,0,0.35)]'
                : 'border-[#24344f] bg-[#0d2037] text-[#93a8c4] shadow-[0_6px_0_rgba(0,0,0,0.28)]'
            }`}
          >
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <span className="pixel-font mt-2 text-[0.42rem] uppercase leading-[1.5]">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
