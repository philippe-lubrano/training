interface PrimaryActionButtonProps {
  label: string
  onClick: () => void
}

export function PrimaryActionButton({ label, onClick }: PrimaryActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[1.75rem] border border-fuchsia-300/70 bg-fuchsia-300 px-6 py-5 text-lg font-black uppercase tracking-[0.2em] text-slate-950 shadow-[0_14px_34px_rgba(244,114,182,0.35)]"
    >
      {label}
    </button>
  )
}
