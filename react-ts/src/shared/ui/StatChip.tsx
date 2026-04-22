interface StatChipProps {
  label: string
  value: string
  accent?: 'cyan' | 'pink' | 'amber' | 'emerald'
}

const accentTokens = {
  cyan: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-100',
  pink: 'border-pink-400/40 bg-pink-400/10 text-pink-100',
  amber: 'border-amber-400/40 bg-amber-400/10 text-amber-100',
  emerald: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100',
} as const

export function StatChip({ label, value, accent = 'cyan' }: StatChipProps) {
  return (
    <div className={`rounded-2xl border px-3 py-2 ${accentTokens[accent]}`}>
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-300">{label}</p>
      <p className="text-lg font-black text-white">{value}</p>
    </div>
  )
}
