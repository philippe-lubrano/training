interface PrimaryActionButtonProps {
  label: string
  onClick: () => void
}

export function PrimaryActionButton({ label, onClick }: PrimaryActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pixel-button pixel-button--yellow w-full px-6 py-5 text-[0.85rem]"
    >
      {label}
    </button>
  )
}
