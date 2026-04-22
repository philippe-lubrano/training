function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
          React + TypeScript + Tailwind CSS
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">Projet initialisé</h1>
        <p className="max-w-xl text-slate-300">
          Ce socle utilise Vite, React et TypeScript avec Tailwind prêt à l’emploi.
        </p>
      </section>
    </main>
  )
}

export default App
