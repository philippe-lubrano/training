interface StatChipProps {
  label: string
  value: string
  accent?: 'cyan' | 'pink' | 'amber' | 'emerald'
}

const accentTokens = {
  cyan: 'border-[#2452a8] bg-[#12305d] text-[#c3deff]',
  pink: 'border-[#5c2fa0] bg-[#36205d] text-[#ead8ff]',
  amber: 'border-[#9a5f08] bg-[#5f3a0d] text-[#ffedc2]',
  emerald: 'border-[#1d7b42] bg-[#114528] text-[#d7ffe6]',
} as const

export function StatChip({ label, value, accent = 'cyan' }: StatChipProps) {
  return (
    <div className={`pixel-card-soft border px-3 py-2 ${accentTokens[accent]}`}>
      <p className="pixel-font text-[0.42rem] uppercase leading-[1.6] text-[#9fb4d4]">{label}</p>
      <p className="mt-1 text-[1.35rem] leading-none text-white">{value}</p>
    </div>
  )
}
