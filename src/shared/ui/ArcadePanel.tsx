import type { PropsWithChildren, ReactNode } from 'react'

const accentStyles = {
  cyan: 'before:bg-[#3b82f6]',
  pink: 'before:bg-[#8b5cf6]',
  amber: 'before:bg-[#f59e0b]',
  emerald: 'before:bg-[#22c55e]',
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
      className={`pixel-card relative overflow-hidden p-4 before:absolute before:left-0 before:right-0 before:top-0 before:h-1 ${accentStyles[accent]} ${className}`.trim()}
    >
      {(title ?? eyebrow ?? headerAction) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {eyebrow && (
              <p className="pixel-font text-[0.48rem] uppercase leading-[1.6] text-[#89a4c6]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="pixel-font mt-2 text-[0.78rem] uppercase leading-[1.7] text-white pixel-shadow-text">
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
