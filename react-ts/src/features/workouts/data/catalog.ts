import type { BadgeDefinition, Exercise, Unlockable } from '../../../shared/types/models'

export const exerciseCatalog: Exercise[] = [
  {
    id: 'abdos',
    title: 'Abdos',
    emoji: '🌀',
    difficulty: 'modéré',
    defaultDurationSec: 45,
    repGoal: '20 crunchs contrôlés',
    flavorText: 'Le noyau du héros. Garde le bas du dos collé au sol.',
    postureCue: 'Menton décollé, nuque longue, souffle sur la montée.',
    instructions: [
      'Allonge-toi, genoux pliés et pieds ancrés au sol.',
      'Monte le buste en gardant le regard vers le plafond.',
      'Redescends lentement pour protéger le bas du dos.',
    ],
    pixelHint: ['  ██  ', ' ████ ', '██  ██', '  ██  '],
  },
  {
    id: 'pompes',
    title: 'Pompes',
    emoji: '💥',
    difficulty: 'tonique',
    defaultDurationSec: 40,
    repGoal: '12 répétitions solides',
    flavorText: 'Le classique arcade. Corps gainé, poitrine fière.',
    postureCue: 'Poignets sous les épaules, tronc aligné, coude à 45°.',
    instructions: [
      'Place les mains un peu plus larges que les épaules.',
      'Descends en bloc jusqu’à frôler le sol avec la poitrine.',
      'Pousse fort dans les paumes sans casser les hanches.',
    ],
    pixelHint: ['██████', '  ██  ', '██████', '██  ██'],
  },
  {
    id: 'gainage',
    title: 'Gainage',
    emoji: '🛡️',
    difficulty: 'endurant',
    defaultDurationSec: 60,
    repGoal: '1 minute de planche',
    flavorText: 'Bouclier anti-abandon. Respire et verrouille la ligne.',
    postureCue: 'Épaules loin des oreilles, nombril rentré, fessiers serrés.',
    instructions: [
      'Pose les avant-bras sous les épaules.',
      'Aligne tête, bassin et talons sur une même ligne.',
      'Respire court et régulier sans laisser tomber le bassin.',
    ],
    pixelHint: ['██████', '██    ', '██████', '    ██'],
  },
]

export const exerciseMap = Object.fromEntries(
  exerciseCatalog.map((exercise) => [exercise.id, exercise]),
) as Record<Exercise['id'], Exercise>

export const badgeCatalog: BadgeDefinition[] = [
  {
    id: 'first-sweat',
    title: 'Première goutte de sueur',
    description: 'Termine ta toute première séance.',
    icon: '💧',
  },
  {
    id: 'three-sessions',
    title: 'Combo x3',
    description: 'Enchaîne trois séances au total.',
    icon: '🎮',
  },
  {
    id: 'streak-3',
    title: 'Série de 3 jours',
    description: 'Reste fidèle à ta quête pendant 3 jours.',
    icon: '🔥',
  },
  {
    id: 'streak-7',
    title: 'Série de 7 jours',
    description: 'Tiens une semaine sans rompre la chaîne.',
    icon: '👑',
  },
  {
    id: 'custom-routine',
    title: 'Architecte de routine',
    description: 'Termine une routine créée par tes soins.',
    icon: '🧱',
  },
  {
    id: 'boss-clear',
    title: 'Boss terrassé',
    description: 'Viens à bout d’une séance Boss de 15 minutes.',
    icon: '🏆',
  },
]

export const unlockCatalog: Unlockable[] = [
  {
    id: 'theme-neon-grid',
    title: 'Thème Neon Grid',
    description: 'Une ambiance synthwave encore plus intense.',
    levelRequired: 2,
  },
  {
    id: 'avatar-captain-crunch',
    title: 'Avatar Captain Crunch',
    description: 'Un portrait rétro pour afficher ton niveau.',
    levelRequired: 3,
  },
  {
    id: 'frame-boss-mode',
    title: 'Cadre Boss Mode',
    description: 'Un encadrement pixel art réservé aux assidus.',
    levelRequired: 4,
  },
]
