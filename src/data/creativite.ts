/**
 * Modèle de contenu — Partie Créativité.
 *
 * Source : "2 - Portfolio - Contenu final (source de vérité).md", PARTIE 1 — CRÉATIVITÉ.
 * Texte verbatim, aucune reformulation. Les notes éditoriales entre crochets du
 * document source (ex. "[point ouvert : ...]") ne sont pas reprises ici : ce sont
 * des remarques internes au projet de contenu, pas du texte destiné au site.
 *
 * Gabarit "plus simple, plus narratif" que la partie Communication (lot 6, décision
 * actée) : pas de base de données ni de filtres, un enchaînement de sections dans
 * l'ordre validé du document de contenu.
 */

export const CREATIVITE_ACCROCHE =
  "Je lis des comics depuis toujours et je ne me lasse jamais d'un super-héros qui balance une punchline bien too much à l'écran. Les Super-Humains sont nés de cet amour-là, et de l'envie de le titiller un peu. Pas une parodie qui se moque de loin, mais un hommage qui connaît le genre assez bien pour en pointer les absurdités : pourquoi personne ne s'installe ailleurs qu'à New Town ? Pourquoi le majordome ne s'étonne jamais de rien ? Ce qui devait être un prétexte pour tester une tablette graphique est devenu, huit ans et deux versions plus tard, un vrai projet éditorial.";

export interface NarrativeSection {
  heading: string;
  body: string; // markdown : paragraphes, **gras**, *italique*, listes "- "
  secondary?: boolean; // traitement visuel atténué (section volontairement courte)
}

export const CREATIVITE_SECTIONS: NarrativeSection[] = [
  {
    heading: "Super-Humains, le concept et l'univers",
    body: `Les Super-Humains détournent les archétypes des grandes écuries de comics (Marvel, DC) pour en révéler les incohérences, avec un ton qui mélange comédie noire, humour méta et, par endroits, de vrais moments dramatiques joués sans ironie. L'univers se déroule à New Town, ville qui concentre une part disproportionnée des super-humains de la planète, sous la surveillance d'une agence de contrôle international. Un fil rouge inspiré de la saga de l'Infini (Thanos) relie l'ensemble des histoires sur deux cycles de trois tomes.

Parmi les personnages principaux : un inventeur milliardaire sans pouvoir qui multiplie les gaffes, un être tout-puissant blasé de sa propre perfection, un vengeur solitaire construit sur les codes du justicier milliardaire, et un quatrième, au ton plus sombre, qui mène une double vie de justicier et de père de famille.

Choix éditorial validé : les personnages ne sont pas nommés comme des clones explicites de héros connus, pour rester du bon côté de la parodie/hommage plutôt que de la copie.`,
  },
  {
    heading: "L'histoire du projet",
    body: `Tout a commencé par l'achat d'une tablette graphique à écran intégré : la première histoire des Super-Humains n'était au départ qu'un prétexte pour apprendre à s'en servir. Le prétexte est devenu un projet à part entière, une histoire en a appelé une autre, jusqu'à la décision de construire une vraie bande dessinée, avec une trame commune pour lier toutes les histoires entre elles.

Deux ans de travail plus tard, une campagne de financement participatif sur Ulule (une soixantaine de contributeurs) et un soutien extérieur ont permis d'imprimer 500 exemplaires du premier tome, un tirage ambitieux pour un coup d'essai. La soirée de lancement, dans une librairie de Montparnasse, reste un des bons souvenirs du projet : dédicaces, échanges avec les contributeurs, remise des contreparties.

La suite a été une leçon d'humilité assumée avec le sourire : sans ISBN, la diffusion en librairie s'est vite heurtée au mur des 5 000 bandes dessinées publiées chaque année en France. Salons, dédicaces, démarchage de maisons d'édition (avec son lot de refus polis), dons en bibliothèques, la diffusion d'une BD auto-éditée est un métier à part entière, découvert sur le tas. Petite anecdote qui résume bien l'expérience : sur le premier tirage, mon nom avait bien été mis sur la couverture au départ, mais le calque a sauté quelque part dans les allers-retours de maquette, et je ne suis pas revenu vérifier à chaque étape. Je m'en suis rendu compte seulement à la fin. Corrigé depuis, au tampon.

Les retours d'un ami graphiste (composition de couverture, détails de dessin) ont nourri une refonte complète, reprise sur tablette plusieurs années plus tard : plutôt que de tout refaire, le choix a été de compléter et de redécouper le récit en deux cycles de trois tomes.`,
  },
  {
    heading: "Où en est le projet aujourd'hui",
    body: `Le tome 1 du premier cycle, dans sa version 2.0, est aujourd'hui **en phase finale de relecture et de correction**. Cette nouvelle version conserve environ 20 % des planches du tome original et ajoute 80 % d'histoires inédites.

Une nouvelle campagne de financement participatif sur Ulule est prévue à la rentrée 2026, pour financer l'impression de cette version 2.0.`,
  },
  {
    heading: "Design & illustration, au-delà de la BD",
    secondary: true,
    body: `Le réflexe créatif ne s'arrête pas à la bande dessinée. Il traverse aussi mon parcours professionnel : refonte de mascotte et d'identité visuelle pour LIPTON FIT (où je continue, aujourd'hui encore, à concevoir leur carte de vœux annuelle), création des identités graphiques de plusieurs projets côté communication. Outils maîtrisés : Photoshop, Illustrator, Procreate, Canva.`,
  },
  {
    heading: "Ce que ce projet démontre",
    body: `- Aller au bout d'un projet long, malgré les interruptions : plus de huit ans, deux enfants, plusieurs changements professionnels, une refonte complète plutôt qu'un abandon.
- Apprendre de l'échec sans se braquer : une diffusion ratée, des retours critiques mal digérés sur le moment puis intégrés, une erreur grossière (le nom absent de la couverture) transformée en anecdote plutôt qu'en blocage.
- Comprendre le financement participatif et la construction d'une communauté : de l'intérieur, avec ses limites (difficile d'attirer un public qui ne le connaît pas déjà) autant que ses réussites.
- Un vrai geste créatif, pas seulement un outil de gestion de projet : la maîtrise du dessin et du design visuel vient compléter, pas remplacer, les compétences de structuration et de pilotage démontrées dans les deux autres parties.`,
  },
];

export const CREATIVITE_VISUELS: string[] = [
  "Couverture actuelle et/ou couverture V2.0 (une fois finalisée).",
  "Planches représentatives du tome 1 (à sélectionner avec Jérôme).",
  "Visuels des personnages principaux.",
  "Photo de la soirée de dédicace à Montparnasse, si disponible.",
  "Visuel de la campagne Ulule à venir (une fois prête).",
  "Exemples de cartes de vœux LIPTON FIT et de la mascotte, pour la section Design & illustration.",
];
