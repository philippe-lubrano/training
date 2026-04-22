import type { PropsWithChildren, ReactNode } from 'react'

const accentStyles = {
  cyan: 'border-cyan-400/40 bg-slate-950/80 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]',
  pink: 'border-pink-400/40 bg-slate-950/80 shadow-[0_0_0_1px_rgba(244,114,182,0.15)]',
  amber: 'border-amber-400/40 bg-slate-950/80 shadow-[0_0_0_1px_rgba(251,191,36,0.15)]',
  emerald: 'border-emerald-400/40 bg-slate-950/80 shadow-[0_0_0_1px_rgba(52,211,153,0.15)]',
} as const

interface ArcadePanelProps extends PropsWithChildren {
  accent?: keyof typeof accentStyles
  title?: string
  eyebrow?: string
  headerAction?: ReactNode
  className?: string
}

export function ArcadePanel({
  accent = 'cyan',
  title,
  eyebrow,
  headerAction,
  className = '',
  children,
}: ArcadePanelProps) {
  return (
    <section
      className={`rounded-[1.75rem] border p-5 backdrop-blur ${accentStyles[accent]} ${className}`.trim()}
    >
      {(title ?? eyebrow ?? headerAction) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {eyebrow && (
              <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-400">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-mono text-lg font-black uppercase tracking-[0.16em] text-white">
                {title}
              </h2>
            )}
          </div>
          {headerAction}
        </header>
      )}
      {children}
    </section>
  )
}
