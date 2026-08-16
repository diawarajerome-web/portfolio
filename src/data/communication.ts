/**
 * Modèle de données — Partie Communication.
 *
 * Source : "2 - Portfolio - Contenu final (source de vérité).md" (doc figé, ne pas
 * reformuler le texte). Ce fichier ne fait que structurer ce contenu, verbatim,
 * pour l'affichage (vue par entreprise + filtre compétence, vue résumé CV).
 *
 * Décisions de modélisation actées (lot 4, 16/08/2026) :
 * - Le "poste" est rattaché à l'entreprise, pas à chaque fiche : dans les 18 fiches,
 *   un même poste couvre toujours toutes les fiches d'une même entreprise.
 * - Le corps de chaque fiche ("Ce que j'ai fait", contexte, enjeu, anecdote, etc.)
 *   n'est PAS éclaté en sous-champs : les fiches n'ont pas une structure uniforme
 *   (certaines ont un "Contexte", une "Anecdote", d'autres non). Un champ `corps`
 *   markdown unique préserve le texte et l'ordre validés sans réinterprétation.
 * - Entité "pièce écrite" séparée, reliée aux fiches en n-à-n via `rattachements`.
 *   Statuts : confirme | selection-en-cours | texte-manquant | a-verifier
 *   (voir section 21 du document de contenu pour la définition de chaque statut).
 */

// ---------------------------------------------------------------------------
// Compétences — taxonomie figée le 16/08/2026 (11 compétences)
// ---------------------------------------------------------------------------

export type CompetenceSlug =
  | "evenementiel"
  | "relations-presse"
  | "redactionnel-editorial"
  | "communication-strategique"
  | "communication-institutionnelle"
  | "communication-de-crise"
  | "partenariats-sponsoring"
  | "marketing-digital-acquisition"
  | "marque-employeur-communication-interne"
  | "production-creative"
  | "structuration-outils";

export interface Competence {
  slug: CompetenceSlug;
  label: string;
}

// Ordre = ordre d'affichage validé dans le wireframe v1 (filtre à gauche).
export const COMPETENCES: Competence[] = [
  { slug: "evenementiel", label: "Événementiel" },
  { slug: "relations-presse", label: "Relations presse" },
  { slug: "redactionnel-editorial", label: "Rédactionnel / éditorial" },
  { slug: "communication-strategique", label: "Communication stratégique" },
  { slug: "communication-institutionnelle", label: "Communication institutionnelle" },
  { slug: "communication-de-crise", label: "Communication de crise" },
  { slug: "partenariats-sponsoring", label: "Partenariats / sponsoring" },
  { slug: "marketing-digital-acquisition", label: "Marketing digital / acquisition" },
  { slug: "marque-employeur-communication-interne", label: "Marque employeur / communication interne" },
  { slug: "production-creative", label: "Production créative (vidéo, identité visuelle)" },
  { slug: "structuration-outils", label: "Structuration / outils" },
];

// ---------------------------------------------------------------------------
// Accroche de la partie Communication — verbatim depuis "2 - Portfolio -
// Contenu final (source de vérité).md", section "0. Accroche / positionnement".
// ---------------------------------------------------------------------------

export const ACCROCHE_COMMUNICATION =
  "Dix-sept ans à faire parler des institutions, des marques et des collectifs qui n'avaient pas toujours envie de se laisser raconter. J'ai fait de la communication dans des mondes qui ne se parlent pas beaucoup entre eux : une collectivité territoriale, une fédération agricole, une école qui ferme, un groupe de marques food en pleine expansion. Ce que j'en retiens : la com institutionnelle et le marketing de marque, ce n'est pas deux métiers, c'est le même réflexe appliqué à des enjeux différents, comprendre ce qu'une organisation a vraiment à dire, et trouver la forme qui fait qu'on l'écoute.";

// ---------------------------------------------------------------------------
// Entreprises — 6, ordre antichronologique (= ordre d'affichage par défaut)
// ---------------------------------------------------------------------------

export type CompanySlug =
  | "legumes-de-france"
  | "lea-cfi"
  | "les-bonnes-choses"
  | "anem"
  | "yvelines"
  | "lipton-fit";

export interface Company {
  slug: CompanySlug;
  name: string;
  dateRange: string;
  ongoing: boolean;
  poste: string;
  posteDates: string;
  // Texte de liaison affiché sous le nom de l'entreprise dans la vue par défaut.
  // Verbatim depuis "4 - Communication - Draft narratif (textes de liaison).md",
  // paragraphe "Contexte (texte de liaison)" de chaque entreprise (décision actée :
  // le draft narratif devient le texte de liaison, il ne part pas à la poubelle).
  contexte: string;
}

export const COMPANIES: Company[] = [
  {
    slug: "legumes-de-france",
    name: "Légumes de France",
    // Correction du 16/08/2026 (lot 5) : Jérôme a signalé que le poste a démarré
    // en juillet 2026, pas juillet 2025 (erreur de saisie initiale). Corrigé ici
    // et dans le document de contenu source avec son accord direct.
    dateRange: "2026-2027",
    ongoing: true,
    poste: "Chef de Projet Événementiel (CDD)",
    posteDates: "juillet 2026 à janvier 2027 — mission en cours",
    contexte:
      "Légumes de France, la fédération nationale des producteurs de légumes frais (créée en 1946, 32 000 exploitations, 200 000 emplois), célèbre ses 80 ans en 2026 à travers son congrès national : un événement de 400 personnes, sur le site du marché de Rungis, l'un des plus grands marchés de produits frais au monde, avec un budget de 238 K€. Je reprends cette mission après le départ progressif de la personne qui la portait depuis plusieurs années, devenue entre-temps maire de sa commune.",
  },
  {
    slug: "lea-cfi",
    name: "LEA-CFI",
    dateRange: "2024-2025",
    ongoing: false,
    poste: "Responsable Communication et Marketing, membre du COMEX",
    posteDates: "2024-2025",
    contexte:
      "LEA-CFI, école de la CCI Île-de-France (40 parcours diplômants, 1 700 apprenants, 130 collaborateurs, 3 campus), traversait déjà un risque de fermeture au moment où je suis arrivé. Plusieurs personnes ont été recrutées à cette période dans le cadre d'un plan de redressement global, chacune sur sa propre mission. La mienne, en tant que Responsable Communication et Marketing : retravailler l'identité de l'école, refondre son catalogue, produire des visuels et des contenus qui donnent envie de la choisir plutôt qu'une autre.",
  },
  {
    slug: "les-bonnes-choses",
    name: "Les Bonnes Choses",
    dateRange: "2022-2024",
    ongoing: false,
    poste: "Responsable Marketing et E-commerce / Brand Manager",
    posteDates: "2022-2024",
    contexte:
      "Les Bonnes Choses est un petit groupe multimarques français (food et bien-être : Gourmiz', Luddigekki, Essenciagua, La Sablésienne, 7 M€ de CA), construit autour d'une stratégie D2C et omnicanale. J'y suis arrivé après une formation e-commerce et vente sur Amazon, avec l'objectif de développer une nouvelle corde à mon arc après plusieurs années dans la communication institutionnelle pure.",
  },
  {
    slug: "anem",
    name: "ANEM",
    dateRange: "2019-2022",
    ongoing: false,
    poste: "Responsable Communication et des Partenariats",
    posteDates: "2019-2022",
    contexte:
      "L'Association Nationale des Élus de la Montagne (ANEM) regroupe plus de 5 000 élus des territoires de montagne. La communication avait été tenue par la même personne pendant plus de dix ans : stable, mais qui tournait en rond. On m'a confié la mission implicite de la faire repartir.",
  },
  {
    slug: "yvelines",
    name: "Conseil départemental des Yvelines",
    dateRange: "2013-2019",
    ongoing: false,
    poste: "Chef de Projet Communication",
    posteDates: "2013-2019",
    contexte:
      "Six ans au cabinet du Président du Département des Yvelines (1,4 M d'habitants, budget annuel de 1,5 Md€), en tant que référent communication pour plusieurs directions à la fois (Environnement, Tourisme, Mobilités, Finances, Enfance & Solidarités). C'est l'expérience la plus longue et la plus large de mon parcours.",
  },
  {
    slug: "lipton-fit",
    name: "LIPTON FIT",
    dateRange: "2009-2013",
    ongoing: false,
    poste: "Chargé de Communication",
    posteDates: "2009-2013, et ponctuellement depuis",
    contexte:
      "Mon premier poste, dans un cabinet de conseil en banque, assurance et finance d'une soixantaine de consultants, majoritairement de la communication interne, avec une part d'externe, et souvent en autonomie complète (ma responsable a été deux fois en congé maternité pendant ces quatre ans).",
  },
];

// ---------------------------------------------------------------------------
// Pièces écrites — entité séparée, reliée aux fiches en n-à-n
// ---------------------------------------------------------------------------

export type PieceStatut =
  | "confirme" // texte intégral en main
  | "selection-en-cours" // inventaire de titres/dates existe, sélection de Jérôme à venir
  | "texte-manquant" // pièce identifiée mais texte original introuvable
  | "a-verifier"; // pertinent mais existence même du document non établie

export interface PieceEcrite {
  id: string;
  titre: string;
  date?: string; // format ISO quand connu
  commanditaire: string;
  supportOrigine: string;
  statut: PieceStatut;
  attribution?: string; // note d'attribution spéciale à afficher sur la page (cas Enedis)
  rattachements: number[]; // numéros de fiches projets
  texteDisponibleDansLeRepo: boolean; // true = déjà transcrit dans le doc "Pièces écrites confirmées"
}

export const PIECES_ECRITES: PieceEcrite[] = [
  {
    id: "lea-cfi-hackathon-energie",
    titre:
      "Hackathon énergie : Créons ensemble les solutions formation innovantes pour le recrutement de vos futurs collaborateurs",
    date: "2025-02-07",
    commanditaire: "LEA-CFI",
    supportOrigine: "Communiqué de presse officiel LEA-CFI",
    statut: "confirme",
    rattachements: [4],
    texteDisponibleDansLeRepo: true,
  },
  {
    id: "lea-cfi-titre-professionnel-electricien",
    titre:
      "Nouvelle Formation : Titre professionnel d'électricien d'équipement du bâtiment",
    date: "2024-11-26",
    commanditaire: "LEA-CFI",
    supportOrigine: "Actualité du site LEA-CFI (site aujourd'hui fermé)",
    statut: "confirme",
    rattachements: [4],
    texteDisponibleDansLeRepo: true,
  },
  {
    id: "lea-cfi-inventaire-59-actualites",
    titre: "Inventaire de 59 actualités LEA-CFI (2024-2025)",
    commanditaire: "LEA-CFI",
    supportOrigine: "Site LEA-CFI (fermé) — titres et dates seulement, pas de lien",
    statut: "selection-en-cours",
    rattachements: [4],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "anem-enedis-reseau-thd",
    titre: "Enedis, gestionnaire du réseau public de distribution d'électricité",
    date: "2019-11-13",
    commanditaire: "ANEM (texte rédigé par Jérôme au nom du partenaire Enedis)",
    supportOrigine: "anem.fr",
    statut: "confirme",
    attribution:
      "Rédigé par Jérôme Diawara au nom du partenaire Enedis, publié sur anem.fr. À préciser explicitement sur la page pour ne pas laisser croire à un texte institutionnel de l'ANEM ou fourni tel quel par Enedis (le texte est à la première personne du pluriel côté Enedis : \"notre principale action\", \"Enedis s'est engagée\").",
    rattachements: [11],
    texteDisponibleDansLeRepo: true,
  },
  {
    id: "anem-pour-la-montagne-articles",
    titre: "Articles rédigés pour le mensuel Pour La Montagne",
    commanditaire: "ANEM",
    supportOrigine:
      "Mensuel Pour La Montagne — à créditer explicitement comme publication d'origine, avec la date du numéro",
    statut: "confirme",
    rattachements: [10],
    texteDisponibleDansLeRepo: false,
    // Incohérence à signaler à Jérôme : la fiche 10 du document de contenu marque ces
    // articles [confirmé — Jérôme les a récupérés], mais ils n'apparaissent pas encore
    // dans "5 - Communication - Pièces écrites confirmées (textes intégraux)". Vérifier
    // qu'il s'agit bien de vrais articles parus dans le mensuel imprimé (et pas de
    // simples annonces du site anem.fr type "PLM de mars est disponible") avant intégration.
  },
  {
    id: "anem-cp-elisabeth-borne",
    titre:
      "L'ANEM demande à Elisabeth Borne la prise en compte de la spécificité montagne",
    date: "2019-05-09",
    commanditaire: "ANEM",
    supportOrigine: "anem.fr",
    statut: "texte-manquant",
    rattachements: [12],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "anem-inventaire-93-actualites",
    titre: "Inventaire de 93 actualités anem.fr (2019-2022)",
    commanditaire: "ANEM",
    supportOrigine: "anem.fr — titres, dates et liens",
    statut: "selection-en-cours",
    rattachements: [10, 12],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "lea-cfi-catalogue-extraits",
    titre: "Extraits des textes du catalogue de formation refondu",
    commanditaire: "LEA-CFI",
    supportOrigine: "Catalogue de formation LEA-CFI (parmi 120+ textes réécrits)",
    statut: "a-verifier",
    rattachements: [2],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "anem-dossiers-presse",
    titre: "Dossiers de presse",
    commanditaire: "ANEM",
    supportOrigine: "ANEM",
    statut: "a-verifier",
    rattachements: [12],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "lbc-gourmiz-articles",
    titre: "Articles de contenu et interviews de sportifs pour Gourmiz'",
    commanditaire: "Les Bonnes Choses",
    supportOrigine: "Site Gourmiz' (lien externe si toujours en ligne)",
    statut: "a-verifier",
    rattachements: [6],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "yvelines-elements-langage",
    titre: "Éléments de langage, plaquettes des services sociaux",
    commanditaire: "Conseil départemental des Yvelines",
    supportOrigine: "Conseil départemental des Yvelines",
    statut: "a-verifier",
    rattachements: [13],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "lipton-fit-documents-internes",
    titre: "Documents internes, synthèses",
    commanditaire: "LIPTON FIT",
    supportOrigine: "LIPTON FIT",
    statut: "a-verifier", // probablement non publiable (documents internes)
    rattachements: [18],
    texteDisponibleDansLeRepo: false,
  },
];

// ---------------------------------------------------------------------------
// Fiches projets — 18, numérotées comme dans le document de contenu
// ---------------------------------------------------------------------------

export interface ProjectCard {
  number: number;
  slug: string;
  title: string;
  company: CompanySlug;
  competences: CompetenceSlug[];
  pitch: string;
  corps: string; // markdown, verbatim depuis le document de contenu
  visuelsAPrevoir: string;
  pieceEcriteIds: string[]; // ids référençant PIECES_ECRITES
}

export const PROJECTS: ProjectCard[] = [
  {
    number: 1,
    slug: "congres-80e-anniversaire",
    title: "Congrès du 80e anniversaire",
    company: "legumes-de-france",
    competences: [
      "evenementiel",
      "relations-presse",
      "communication-strategique",
      "communication-institutionnelle",
      "partenariats-sponsoring",
      "structuration-outils",
    ],
    pitch:
      "Organiser le congrès des 80 ans d'une fédération agricole nationale, sur le site de Rungis, avec un objectif d'autofinancement et de bénéfice, dans un contexte agricole tendu.",
    corps: `**Contexte :** Légumes de France, la fédération nationale des producteurs de légumes frais (créée en 1946, 32 000 exploitations, 200 000 emplois), célèbre ses 80 ans en 2026 à travers son congrès national : un événement de 400 personnes, sur le site du marché de Rungis, l'un des plus grands marchés de produits frais au monde, avec un budget de 238 K€. Je reprends cette mission après le départ progressif de la personne qui la portait depuis plusieurs années, devenue entre-temps maire de sa commune.

**L'enjeu :** Ce n'est pas qu'une fête d'anniversaire : le congrès doit s'autofinancer et dégager un bénéfice pour la fédération. Et il tombe dans un contexte agricole tendu (sécheresse, incertitude budgétaire chez les producteurs, élections présidentielles qui approchent) qui rend les sponsors et les invités plus difficiles à mobiliser que d'habitude.

**Ce que j'ai fait :** Je pilote la mission sur trois dimensions. Sur le fond, je travaille directement avec le directeur général et les coprésidents sur le contenu du congrès : construction des tables rondes, sélection et gestion des intervenants. Sur la forme, je pilote la communication de l'événement et la création des visuels, validés par la présidence. Sur la logistique, je m'appuie sur des prestataires externes pour le traiteur, les buffets, la soirée de gala, ainsi que le repérage des lieux. En parallèle, je prospecte les sponsors avec un outil de suivi que j'ai construit moi-même (Airtable + Make, connecté à ma messagerie).

**Où j'en suis :** 25 K€ de sponsoring déjà sécurisés sur un objectif de 80 à 100 K€, avec un deuxième temps de relance prévu à la rentrée. En septembre : nouvelle vague d'invitations, communiqué de presse conjoint avec la Semmaris, et diffusion via ses propres canaux.

**Ce que ça dit de ma méthode :** Reprendre un projet à mi-parcours sans perdre le fil, c'est d'abord une question d'outils : j'ai commencé par structurer avant de communiquer, un budget prévisionnel, un suivi de tâches, un outil de suivi sponsors. Sur un enjeu financier réel (autofinancement + bénéfice), l'improvisation n'a pas sa place. Et c'est aussi une question de posture : être présent sur le fond avec la direction autant que sur la forme et la logistique.`,
    visuelsAPrevoir:
      "Visuel officiel du congrès (une fois finalisé), captures de l'outil de suivi sponsors, photos du site de Rungis, et, après l'événement, photos du congrès et bilan chiffré définitif.",
    pieceEcriteIds: [],
  },
  {
    number: 2,
    slug: "refonte-identite-catalogue",
    title: "Refonte de l'identité et du catalogue de formation",
    company: "lea-cfi",
    competences: [
      "communication-strategique",
      "redactionnel-editorial",
      "structuration-outils",
      "production-creative",
    ],
    pitch:
      "Retravailler l'identité et refondre le catalogue d'une école en risque de fermeture, pour donner envie de la choisir plutôt qu'une autre.",
    corps: `**Contexte :** LEA-CFI, école de la CCI Île-de-France (40 parcours diplômants, 1 700 apprenants, 130 collaborateurs, 3 campus), traversait déjà un risque de fermeture au moment où je suis arrivé. Plusieurs personnes ont été recrutées à cette période dans le cadre d'un plan de redressement global, chacune sur sa propre mission. La mienne, en tant que Responsable Communication et Marketing : retravailler l'identité de l'école, refondre son catalogue, produire des visuels et des contenus qui donnent envie de la choisir plutôt qu'une autre.

**Ce que j'ai fait :**

- **Ligne éditoriale et comité éditorial transverse** : +5 % de trafic web en 6 mois, +2 % de taux d'ouverture des newsletters.
- **Refonte du catalogue de formation** (45 formations restructurées, 120+ textes réécrits) : -70 % de délai de production, -60 % de coûts de mise à jour, grâce à une base de données centralisée et une automatisation Canva/Excel qui a remplacé un processus entièrement manuel sous InDesign. 5 000 fiches formation imprimées chaque année.`,
    visuelsAPrevoir: "Avant/après du catalogue, visuels de la nouvelle identité graphique.",
    pieceEcriteIds: ["lea-cfi-catalogue-extraits"],
  },
  {
    number: 3,
    slug: "reseau-alumni-videos",
    title: "Réseau alumni, formats vidéo et présence terrain",
    company: "lea-cfi",
    competences: ["marque-employeur-communication-interne", "production-creative", "evenementiel"],
    pitch:
      "Construire de toutes pièces une communauté alumni et donner à la communication une présence de terrain, sur les 3 campus d'une école.",
    corps: `**Ce que j'ai fait :**

- **Réseau alumni** créé de toutes pièces : +300 membres sur le groupe LinkedIn en 2 semaines, événement inaugural de 200 personnes (3 tables rondes, 12 intervenants).
- **Formats vidéo créés en interne** : "La Parole aux Anciens" (interviews d'alumni), "Nos Apprentis sur le Terrain" (reportages en entreprise), "Questions Rapides" (format court pour inciter aux Journées Portes Ouvertes), vidéos de présentation des formations.
- **Visibilité et présence terrain du service communication** : déplacements réguliers sur les 3 campus, valorisation des professeurs et des élèves. Un service de com transversal doit être vu et connu pour devenir la référence naturelle vers laquelle on se tourne pour faire circuler l'information.
- **Réseau d'affichage interne et écrans dynamiques sur les 3 campus** : mise en place de panneaux d'affichage physiques pour porter les messages clés (Journées Portes Ouvertes, recrutement, soirée des anciens), complétée par un réseau d'écrans dynamiques diffusant informations et petits formats vidéo, positionnés aux points de passage stratégiques de chaque campus.`,
    visuelsAPrevoir:
      "Extraits des 3 séries vidéo, photo de l'événement alumni, exemple d'affiche du réseau interne.",
    pieceEcriteIds: [],
  },
  {
    number: 4,
    slug: "campagnes-digitales-crm",
    title: "Campagnes digitales, CRM et diffusion territoriale",
    company: "lea-cfi",
    competences: ["marketing-digital-acquisition", "communication-institutionnelle", "structuration-outils"],
    pitch:
      "Faire passer la communication digitale et la diffusion territoriale d'une école d'une logique coup par coup à une stratégie structurée, outillée par un CRM.",
    corps: `**Ce que j'ai fait :**

- **Campagne digitale refondue** : passage d'une logique au coup par coup à une planification sur l'année entière, avec des innovations comme une session de contenu UGC, en collaboration avec une agence spécialisée en marketing digital.
- **Gestion du CRM et des campagnes d'e-mailing** : conception des scénarios d'envoi, création des contenus, et construction de parcours clients pour accompagner chaque profil (prospect, candidat, futur apprenant) selon son étape dans le cycle de décision.
- **Base de données de contacts en mairies**, dans les départements où l'école recrutait ses élèves : diffusion des communiqués de presse, demande de relais, et mise à disposition de kits de communication clé en main pour parler des Journées Portes Ouvertes.
- **Campagnes marketing 360°** (budget annuel 100 K€) : +10 % de participation aux Journées Portes Ouvertes.
- Management d'une équipe de 3 personnes, budget communication annuel de 150 K€.`,
    visuelsAPrevoir: "Captures des campagnes digitales si disponibles.",
    pieceEcriteIds: [
      "lea-cfi-hackathon-energie",
      "lea-cfi-titre-professionnel-electricien",
      "lea-cfi-inventaire-59-actualites",
    ],
  },
  {
    number: 5,
    slug: "communication-de-crise-fermeture",
    title: "Communication de crise — la fermeture de LEA-CFI",
    company: "lea-cfi",
    competences: ["communication-de-crise"],
    pitch:
      "Naviguer, en tant que membre du COMEX, entre direction et équipes pédagogiques pendant la période de confidentialité qui précède l'annonce d'une fermeture d'établissement.",
    corps: `**Le récit :** L'établissement a fermé ses portes à la rentrée 2026, sur décision de la CCI. Membre du COMEX, j'ai été de fait la seule personne à naviguer entre la direction et les équipes pédagogiques pendant la période où l'information ne pouvait pas encore circuler, une position inconfortable, mais qui m'a beaucoup appris sur la communication en contexte de crise et de confidentialité. Dans une structure qui n'a plus rien à développer, la communication est la première fonction sacrifiée : c'est une réalité que j'ai vue de l'intérieur, sans amertume. Elle éclaire à quel point la communication n'a de sens que rattachée à un projet qui avance.`,
    visuelsAPrevoir: "Aucun spécifique (sujet sensible).",
    pieceEcriteIds: [],
  },
  {
    number: 6,
    slug: "pilotage-ecommerce-3-marques",
    title: "Pilotage e-commerce des 3 marques (Essenciagua, La Sablésienne, Gourmiz')",
    company: "les-bonnes-choses",
    competences: ["marketing-digital-acquisition", "structuration-outils", "redactionnel-editorial"],
    pitch:
      "Piloter de bout en bout la vente en ligne de 3 marques : ouverture des comptes marketplace, listings, campagnes PPC, logistique, SAV, sites web, contenu SEO.",
    corps: `**Contexte :** Les Bonnes Choses est un petit groupe multimarques français (food et bien-être : Gourmiz', Luddigekki, Essenciagua, La Sablésienne, 7 M€ de CA), construit autour d'une stratégie D2C et omnicanale. J'y suis arrivé après une formation e-commerce et vente sur Amazon, avec l'objectif de développer une nouvelle corde à mon arc après plusieurs années dans la communication institutionnelle pure.

**Ce que j'ai fait :** Mission principale : piloter la vente en ligne des trois marques Essenciagua, La Sablésienne et Gourmiz', de l'ouverture des comptes Amazon et Ankorstore jusqu'au suivi des performances. Création des listings produits (visuels, rédaction des textes, optimisation SEO), mise en place et gestion des campagnes PPC : choix des mots-clés, structuration des campagnes, gestion des enchères, et reporting hebdomadaire des ventes et des performances. Suivi de la logistique pour Gourmiz' : production et acheminement des marchandises vers les entrepôts Amazon. Gestion du service après-vente, avec remontée et suivi des tickets liés aux problèmes techniques sur Amazon. Refonte des trois sites web de marque et suivi des ventes en ligne, notamment pour Gourmiz' et Essenciagua. Création de contenu éditorial pour Gourmiz' (articles, interviews de sportifs de la communauté) pour travailler le référencement des sites.

**Ce que ça dit de ma méthode :** Cette expérience m'a surtout fait découvrir le monde du retail et une logique proche de la start-up : une culture du reporting et du chiffre bien plus poussée que dans la communication institutionnelle, avec un suivi hebdomadaire et une mesure quasi permanente des résultats de chaque action marketing et communication.`,
    visuelsAPrevoir:
      "Captures des listings produits (3 marques), exemple de campagne PPC ou de tableau de reporting, captures des 3 sites web refaits, exemple d'article de contenu Gourmiz'.",
    pieceEcriteIds: ["lbc-gourmiz-articles"],
  },
  {
    number: 7,
    slug: "lancement-luddigekki-usa",
    title: "Lancement de Luddigekki sur le marché américain",
    company: "les-bonnes-choses",
    competences: ["communication-strategique", "marketing-digital-acquisition", "communication-de-crise"],
    pitch:
      "Créer et lancer une marque de A à Z sur un marché inconnu, jusqu'à encaisser une attaque concurrentielle qui a coupé l'accès à la vente.",
    corps: `**Ce que j'ai fait :** Création et lancement de Luddigekki sur le marché américain, une marque avec 3 lignes de produits : kits de construction type cabanes, jouets antistress et piscines à balles. Positionnement, identité visuelle, co-développement produit avec les usines partenaires, pilotage de la production et d'une logistique internationale conséquente, stratégie D2C (SEO, Search Find Buy, acquisition payante). Recherche et benchmark de nouveaux produits : analyse de la concurrence et méthode de sourcing propre à Amazon. Management d'une personne travaillant à distance sur la marque. Résultat : une marque valorisée jusqu'à 200 K$.

**Le coup dur :** Un concurrent a lancé une attaque groupée contre une centaine de vendeurs de la même niche, en accusant Luddigekki d'avoir utilisé le nom de sa marque dans nos listings produits. Amazon a immédiatement coupé notre accès à la vente : perte du référencement, obligation de rapatrier tout le stock, recréer les listings, faire appel à un avocat pour débloquer la situation. La marque ne s'en est jamais complètement remise.

**Ce que ça dit de ma méthode :** Cette expérience m'a appris à créer une marque de A à Z sur un marché que je ne connaissais pas, et à encaisser un revers qui ne dépendait pas de moi sans perdre le fil du reste. Elle m'a aussi appris quelque chose sur moi : le rythme du e-commerce au quotidien n'est pas celui dans lequel je suis le plus à l'aise. Je préfère construire une stratégie que la piloter heure par heure.`,
    visuelsAPrevoir: "Identité visuelle Luddigekki.",
    pieceEcriteIds: [],
  },
  {
    number: 8,
    slug: "communaute-sportifs-b2b",
    title: "Communauté sportifs Gourmiz' et développement commercial B2B",
    company: "les-bonnes-choses",
    competences: ["partenariats-sponsoring", "production-creative"],
    pitch:
      "Construire une communauté de 15 sportifs de haut niveau et développer les ventes B2B en direct auprès de magasins bio.",
    corps: `**Ce que j'ai fait :** Une communauté de 15 sportifs de haut niveau recrutée et animée pour Gourmiz', avec production de contenus UGC, en binôme avec une autre personne dédiée à la marque. Développement commercial B2B : structuration d'un CRM, prospection directe auprès de magasins bio en Occitanie, 10 contrats de distribution signés.`,
    visuelsAPrevoir: "Visuels des campagnes sponsors sportifs.",
    pieceEcriteIds: [],
  },
  {
    number: 9,
    slug: "congres-annuel-anem",
    title: "Congrès annuel",
    company: "anem",
    competences: ["evenementiel", "communication-institutionnelle"],
    pitch:
      "Piloter de bout en bout un congrès annuel de 500 élus de sensibilités politiques très différentes, avec la diplomatie que ça demande.",
    corps: `**Contexte :** L'Association Nationale des Élus de la Montagne (ANEM) regroupe plus de 5 000 élus des territoires de montagne. La communication avait été tenue par la même personne pendant plus de dix ans : stable, mais qui tournait en rond. On m'a confié la mission implicite de la faire repartir. Le congrès était ma première mission.

**Ce que j'ai fait :** Congrès annuel (budget 200 K€, 500 élus toutes tendances politiques confondues, ministres, maires, députés, présidents de département) : pilotage de bout en bout, supports, protocole, supervision des prestataires.

**Une anecdote qui résume le poste :** Au quotidien, travailler avec des élus, c'est composer avec des problématiques et des comportements très spécifiques, dans un milieu mouvant où les mandats et les priorités changent souvent. Ça pousse à s'adapter en permanence, à proposer plutôt qu'à imposer, dans un environnement exigeant.

Lors du congrès en Corse, la venue du Premier ministre Jean Castex était annoncée. J'ai organisé toute la visite de sécurité avec son service de protection et le régisseur du lieu, préparation complète, jusqu'à ce que sa venue soit finalement annulée. On a basculé sur un message vidéo. C'est souvent à ça que ressemble l'événementiel institutionnel : tout préparer pour un scénario qui peut changer à la dernière minute, et avoir un plan B prêt.

Plus largement, coordonner un événement où se croisent 500 élus de sensibilités très différentes demande une diplomatie de tous les instants. Certains attendaient un accompagnement individualisé que le format collectif ne permettait pas, et il fallait tenir la ligne sans braquer personne.`,
    visuelsAPrevoir: "Photo du congrès annuel.",
    pieceEcriteIds: [],
  },
  {
    number: 10,
    slug: "pour-la-montagne",
    title: "Rédacteur en chef, Pour La Montagne",
    company: "anem",
    competences: ["redactionnel-editorial"],
    pitch:
      "Rédacteur en chef d'un mensuel institutionnel : gestion des pigistes et du maquettiste, fil rouge éditorial, écriture.",
    corps: `**Ce que j'ai fait :** Rédacteur en chef du mensuel *Pour La Montagne* (budget 150 K€) : gestion des pigistes et du maquettiste, construction du fil rouge de chaque numéro, rédaction d'articles.`,
    visuelsAPrevoir: "Une du mensuel Pour La Montagne.",
    pieceEcriteIds: ["anem-pour-la-montagne-articles", "anem-inventaire-93-actualites"],
  },
  {
    number: 11,
    slug: "refonte-digitale-anem",
    title: "Refonte digitale et outils de communication institutionnelle",
    company: "anem",
    competences: ["communication-strategique", "structuration-outils", "production-creative"],
    pitch:
      "Refondre le site et la newsletter, et construire l'ensemble des outils de communication institutionnelle et de gestion de contacts de l'association.",
    corps: `**Ce que j'ai fait :**

- **Refonte complète du site internet et création de la newsletter** : nouvelle architecture, réécriture intégrale des contenus, newsletter de l'ANEM créée de toutes pièces, module d'inscription en ligne pour le congrès.
- **Événementiel institutionnel au-delà du congrès** : organisation des vœux annuels, des réunions départementales (contenus, inscriptions), et mise en place du comité directeur lors de la semaine nationale.
- **Création de l'ensemble des outils de communication institutionnelle** : plaquettes de présentation, carte de vœux, et tous les supports annuels de l'association.
- **Gestion de la base de données de contacts** : intégration des nouveaux contacts, structuration de la partie presse.
- **Gestion des goodies** : recherche et sélection de nouveaux goodies, principalement pour le congrès.
- Management d'apprentis et de stagiaires.`,
    visuelsAPrevoir: "Captures du site refondu (avant/après si possible), plaquette institutionnelle, exemple de goodies.",
    pieceEcriteIds: ["anem-enedis-reseau-thd"],
  },
  {
    number: 12,
    slug: "relations-presse-partenariats-anem",
    title: "Relations presse et partenariats",
    company: "anem",
    competences: ["relations-presse", "partenariats-sponsoring"],
    pitch:
      "Entretenir et développer le portefeuille de partenaires institutionnels de l'association, et organiser la présence presse autour des élus.",
    corps: `**Ce que j'ai fait :**

- **Suivi des partenaires existants et prospection de nouveaux partenariats institutionnels** : SFR, Caisse des Dépôts, EDF, Engie, Citéo, Suez, et deux nouveaux partenariats signés (Médadom et Camping Car Park, 10 K€/an chacun).
- **Relations presse** : communiqués, dossiers de presse, conférences de presse, base de données journalistes, dont la partie presse créée de toutes pièces. Mise en relation des élus avec les journalistes et organisation des interviews (placement presse).

**Ce que ça dit de ma méthode :** Reprendre une communication qui fonctionne mais qui n'avance plus, ce n'est pas pareil que repartir de zéro : il faut convaincre en douceur, pas révolutionner. C'est une compétence à part entière.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: ["anem-cp-elisabeth-borne", "anem-inventaire-93-actualites", "anem-dossiers-presse"],
  },
  {
    number: 13,
    slug: "campagne-c-est-tout-ca-les-yvelines",
    title: "Campagne \"C'est tout ça les Yvelines\"",
    company: "yvelines",
    competences: ["communication-strategique", "production-creative"],
    pitch:
      "Une campagne 360° à 350 K€ pour donner envie aux Franciliens de découvrir le département, avec un vrai défi de hiérarchisation du message.",
    corps: `**Contexte général du poste :** Six ans au cabinet du Président du Département des Yvelines (1,4 M d'habitants, budget annuel de 1,5 Md€), en tant que référent communication pour plusieurs directions à la fois (Environnement, Tourisme, Mobilités, Finances, Enfance & Solidarités). C'est l'expérience la plus longue et la plus large de mon parcours.

**Ce que j'ai fait :** "C'est tout ça les Yvelines" (350 K€) : une campagne 360° pour donner envie aux Franciliens de venir découvrir le département. Le défi n'était pas créatif au sens classique : c'était un défi de hiérarchisation. Le Département voulait tout montrer de ce qu'il fait, ce qui a rendu le film long et la campagne d'affichage complexe à construire pour rester lisible.

**Le quotidien, en toile de fond :** Derrière ces campagnes, six ans de travail de fond : rédaction d'éléments de langage pour les élus (inaugurations de parcs, de chantiers routiers…), conception de plaquettes pour les services sociaux (adoption, protection maternelle et infantile, personnes âgées), communiqués de presse, documents d'information pour les Yvelinois, suivi des marchés publics, conseil éditorial auprès des directions, management d'apprentis.

**Ce que ça dit de ma méthode :** Une collectivité comme celle-là m'a appris à faire cohabiter deux échelles de temps : le temps long des grandes campagnes institutionnelles, et le temps court d'un communiqué à boucler dans la journée. C'est cette polyvalence, plus que tel ou tel projet en particulier, qui définit le poste.`,
    visuelsAPrevoir: "Visuels de la campagne \"C'est tout ça les Yvelines\".",
    pieceEcriteIds: ["yvelines-elements-langage"],
  },
  {
    number: 14,
    slug: "festival-cinema-yvelines",
    title: "Festival \"Les Yvelines font leur cinéma\"",
    company: "yvelines",
    competences: ["evenementiel"],
    pitch: "Un festival de cinéma en plein air, 300 K€/an, jusqu'à 10 000 spectateurs sur une édition.",
    corps: `**Ce que j'ai fait :** Le festival "Les Yvelines font leur cinéma" (300 K€/an, 26 séances) : jusqu'à 10 000 spectateurs sur une édition. Plan de communication, relations avec les communes partenaires, achat média, coordination des prestataires.`,
    visuelsAPrevoir: "Photos du festival de cinéma.",
    pieceEcriteIds: [],
  },
  {
    number: 15,
    slug: "ybox",
    title: "Ybox",
    company: "yvelines",
    competences: ["partenariats-sponsoring"],
    pitch: "Lancer un coffret de promotion touristique du territoire, en partenariat avec Smartbox.",
    corps: `**Ce que j'ai fait :** Ybox (600 K€, en partenariat avec Smartbox) : lancement d'un coffret de promotion touristique du territoire.`,
    visuelsAPrevoir: "Visuel Ybox.",
    pieceEcriteIds: [],
  },
  {
    number: 16,
    slug: "affichage-dynamique-yvelines",
    title: "Réseau d'affichage dynamique du Département",
    company: "yvelines",
    competences: ["structuration-outils", "production-creative"],
    pitch: "Un projet plus technique, entre besoins des directions, coordination DSI et création de contenus.",
    corps: `**Ce que j'ai fait :** Le réseau d'affichage dynamique du Département (60 K€/an) : un projet plus technique, entre besoins des directions, coordination DSI et création de contenus.`,
    visuelsAPrevoir: "Photo du réseau d'affichage.",
    pieceEcriteIds: [],
  },
  {
    number: 17,
    slug: "paris-nice",
    title: "Paris-Nice",
    company: "yvelines",
    competences: ["evenementiel"],
    pitch:
      "Le volet communication d'une étape francilienne de course cycliste internationale, une mission ponctuelle dans le cadre d'un roulement entre chargés de communication.",
    corps: `**Ce que j'ai fait :** Paris-Nice : sur le volet communication de l'étape francilienne de cette course cycliste (budget global de la manifestation : 2 M€), j'ai géré l'affichage, la campagne de communication, l'organisation du stand et la préparation des goodies, en lien avec le service événementiel. Une mission ponctuelle, faite une seule année dans le cadre d'un roulement entre chargés de communication.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: [],
  },
  {
    number: 18,
    slug: "cohesion-interne-lipton-fit",
    title: "Cohésion interne et refonte du site web",
    company: "lipton-fit",
    competences: ["marque-employeur-communication-interne", "redactionnel-editorial", "production-creative"],
    pitch:
      "Premier poste : recréer de la cohésion entre des consultants toujours dispersés sur leurs missions, et refondre le site web du cabinet.",
    corps: `**Contexte :** Mon premier poste, dans un cabinet de conseil en banque, assurance et finance d'une soixantaine de consultants, majoritairement de la communication interne, avec une part d'externe, et souvent en autonomie complète (ma responsable a été deux fois en congé maternité pendant ces quatre ans).

**Ce que j'ai fait :** L'objectif principal de la mission : créer de la cohésion interne dans un cabinet où les consultants, toujours en mission chez leurs clients, finissaient parfois par mieux connaître leurs clients que leur propre cabinet. Concrètement :

- **Refonte du site web du cabinet** : un chantier important, mené avec l'appui de quelques consultants techniques, dont j'ai piloté la conception et rédigé l'ensemble des contenus.
- **Beaucoup de production de contenu** : rédaction de documents internes pour faire circuler l'information, conduite d'interviews de consultants, synthèses et rapports mettant en avant les bonnes pratiques du cabinet.
- **Organisation d'événements de cohésion interne**, pour recréer du lien entre des consultants dispersés sur leurs missions.
- **Quelques événements externes**, pour permettre aux clients de rencontrer les consultants du cabinet.
- **Participation aux réunions du cabinet et rédaction des comptes rendus.**
- **Relations presse** : quelques communiqués de presse.
- Peu d'outils étaient en place à mon arrivée, alors j'ai aussi construit : refonte de la mascotte du cabinet et de l'identité visuelle des documents internes, création d'un format d'intégration pour les nouveaux arrivants (un portrait chinois), production et montage de vidéos d'interview.

Je continue d'ailleurs à travailler ponctuellement pour LIPTON FIT aujourd'hui, leur carte de vœux annuelle, essentiellement (voir aussi la partie Créativité, section Design & illustration).`,
    visuelsAPrevoir:
      "Captures du site web refondu, exemple de document interne, mascotte, extrait d'une vidéo d'interview si disponible.",
    pieceEcriteIds: ["lipton-fit-documents-internes"],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getCompany(slug: CompanySlug): Company {
  const company = COMPANIES.find((c) => c.slug === slug);
  if (!company) throw new Error(`Entreprise inconnue : ${slug}`);
  return company;
}

export function getProjectsByCompany(slug: CompanySlug): ProjectCard[] {
  return PROJECTS.filter((p) => p.company === slug).sort((a, b) => a.number - b.number);
}

export function getProjectBySlug(slug: string): ProjectCard | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCompetence(slug: CompetenceSlug): ProjectCard[] {
  return PROJECTS.filter((p) => p.competences.includes(slug));
}

export function getPiecesForProject(project: ProjectCard): PieceEcrite[] {
  return PIECES_ECRITES.filter((p) => project.pieceEcriteIds.includes(p.id));
}

// Compteurs réels de la taxonomie, calculés à partir de la ligne "Compétences :"
// de chaque fiche (source la plus granulaire). ATTENTION : ces compteurs diffèrent
// sur 4 points de la table résumé "Vue par compétence (index)" du document de
// contenu, sur laquelle les compteurs affichés dans le wireframe v1 (validé le
// 16/08/2026 : 4, 2, 4, 4, 2, 2, 4, 3, 2, 6, 6) avaient été calqués. Incohérence
// signalée à Jérôme, pas corrigée d'autorité — voir le doc de plan technique.
export function competenceCounts(): Record<CompetenceSlug, number> {
  const counts = {} as Record<CompetenceSlug, number>;
  for (const c of COMPETENCES) {
    counts[c.slug] = getProjectsByCompetence(c.slug).length;
  }
  return counts;
}
