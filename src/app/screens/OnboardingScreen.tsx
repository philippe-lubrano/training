interface OnboardingScreenProps {
  onEnter: () => void
}

export function OnboardingScreen({ onEnter }: OnboardingScreenProps) {
  return (
    <div className="fixed inset-0 z-30 flex items-end bg-slate-950/88 p-4 backdrop-blur sm:items-center sm:justify-center">
      <section className="pixel-card w-full max-w-lg p-6">
        <p className="pixel-font text-[0.55rem] uppercase leading-[1.7] text-[#9dd2ff]">Ready player sweat</p>
        <h2 className="pixel-font mt-3 text-[1rem] uppercase leading-[1.8] text-white pixel-shadow-text">
          Entre dans l’arène
        </h2>
        <p className="mt-4 text-xl text-[#d6e4ff]">
          Une app solo, mobile-first, avec trois mini-jeux, de grosses commandes tactiles et un Bad Cop Telegram pour maintenir la discipline.
        </p>
        <ul className="mt-5 space-y-3 text-xl text-[#d6e4ff]">
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Valide une séance par jour pour garder ta série.</li>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Gagne de l’XP sans jamais perdre de progression.</li>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Active Telegram si tu veux un rappel drôle mais insistant.</li>
        </ul>
        <button
          type="button"
          onClick={onEnter}
          className="pixel-button pixel-button--green mt-6 w-full px-6 py-5 text-[0.72rem]"
        >
          Lancer ma quête
        </button>
      </section>
    </div>
  )
}
