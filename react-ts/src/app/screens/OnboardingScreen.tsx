interface OnboardingScreenProps {
  onEnter: () => void
}

export function OnboardingScreen({ onEnter }: OnboardingScreenProps) {
  return (
    <div className="fixed inset-0 z-30 flex items-end bg-slate-950/90 p-4 backdrop-blur sm:items-center sm:justify-center">
      <section className="w-full max-w-lg rounded-[2rem] border border-cyan-400/30 bg-slate-900 p-6 shadow-[0_0_60px_rgba(34,211,238,0.15)]">
        <p className="text-[0.7rem] font-black uppercase tracking-[0.35em] text-cyan-300">Ready player sweat</p>
        <h2 className="mt-3 font-mono text-3xl font-black uppercase tracking-[0.15em] text-white">
          Entre dans l’arène
        </h2>
        <p className="mt-4 text-sm text-slate-200">
          Une app solo, mobile-first, avec trois mini-jeux, de grosses commandes tactiles et un Bad Cop Telegram pour maintenir la discipline.
        </p>
        <ul className="mt-5 space-y-3 text-sm text-slate-200">
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Valide une séance par jour pour garder ta série.</li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Gagne de l’XP sans jamais perdre de progression.</li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Active Telegram si tu veux un rappel drôle mais insistant.</li>
        </ul>
        <button
          type="button"
          onClick={onEnter}
          className="mt-6 w-full rounded-[1.75rem] border border-cyan-300/70 bg-cyan-300 px-6 py-5 text-base font-black uppercase tracking-[0.2em] text-slate-950"
        >
          Lancer ma quête
        </button>
      </section>
    </div>
  )
}
