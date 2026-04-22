# training

Ce dépôt contient désormais une base **React + TypeScript** transformée en prototype de web app fitness mobile-first : **RetroFit Quest**.

## Structure

- `react-ts/` : prototype principal React + TypeScript + Tailwind CSS
- `vue-ts/` : base Vue conservée comme alternative

## RetroFit Quest

Le prototype React met en place :

- un onboarding mobile-first ;
- un tableau de bord solo avec objectif quotidien ;
- un générateur de séance Boss et un constructeur de routine custom ;
- un écran de séance avec gros chrono, consignes posture et commandes tactiles massives ;
- une progression positive (XP, niveau, badges, déblocages) ;
- des réglages Telegram et des points d’ancrage pour Firebase / Firestore / fonctions planifiées.

## Lancer le projet React

```bash
cd /home/runner/work/training/training/react-ts
npm install
npm run dev
```

## Vérifications

```bash
cd /home/runner/work/training/training/react-ts
npm run lint
npm run build
```
