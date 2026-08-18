/**
 * Modèle de données — Partie Communication.
 *
 * Source : "2 - Portfolio - Contenu final (source de vérité).md" (doc figé, ne pas
 * reformuler le texte) et "6 - Communication - Base de données par projet v2 (35
 * fiches).md" pour le détail fiche par fiche. Ce fichier ne fait que structurer ce
 * contenu, verbatim, pour l'affichage (vue par entreprise + filtre compétence, vue
 * résumé CV).
 *
 * Décisions de modélisation actées (lot 4, 16/08/2026, inchangées au lot 4 bis) :
 * - Le "poste" est rattaché à l'entreprise, pas à chaque fiche : un même poste
 *   couvre toujours toutes les fiches d'une même entreprise.
 * - Le corps de chaque fiche ("Ce que j'ai fait", contexte, enjeu, anecdote, etc.)
 *   n'est PAS éclaté en sous-champs : les fiches n'ont pas une structure uniforme
 *   (certaines ont un "Contexte", une "Anecdote", d'autres non). Un champ `corps`
 *   markdown unique préserve le texte et l'ordre validés sans réinterprétation.
 * - Entité "pièce écrite" séparée, reliée aux fiches en n-à-n via `rattachements`.
 *   Statuts : confirme | selection-en-cours | texte-manquant | a-verifier
 *   (voir section 38 de la base de données v2 pour la définition de chaque statut).
 *
 * Lot 4 bis (17/08/2026) : redécoupage de 18 à 35 fiches, taxonomie de 11 à 12
 * compétences, à l'issue d'une revue complète action par action avec Jérôme (voir
 * "Communication - Taxonomie et structure base de données.md" côté contenu). Pas de
 * changement de structure de données — uniquement du volume et deux slugs de
 * compétence en plus, deux renommages/fusions. Détail des changements de slug dans
 * le commentaire au-dessus de CompetenceSlug ci-dessous.
 *
 * IMPORTANT — 6 fiches pas encore relues mot à mot par Jérôme (10, 11, 16, 18, 28,
 * 29) : texte narratif complet mais rédigé à partir de notes de session, pas encore
 * validé verbatim. Intégrées ici à la demande de Jérôme (17/08/2026, pour avancer
 * techniquement) — à ne pas considérer comme définitivement figées avant sa
 * relecture. Repérables ci-dessous par le commentaire "[NOUVELLE FICHE]".
 */

// ---------------------------------------------------------------------------
// Compétences — taxonomie révisée le 17/08/2026 (12 compétences, ex-11)
//
// Correspondance avec l'ancienne taxonomie (11, verrouillée le 16/08/2026) :
// - "communication-strategique" + "communication-institutionnelle" FUSIONNENT
//   en "strategie-communication-institutionnelle"
// - "marque-employeur-communication-interne" SE SCINDE en
//   "communication-interne-cohesion-equipe" (public interne captif) et
//   "animation-communaute" (collectif externe volontaire) — l'angle "marque
//   employeur" disparaît, aucune fiche ne le démontrant réellement
// - "partenariats-sponsoring" RENOMMÉ ET ÉLARGI en "partenariats-relais"
// - NOUVEAU : "veille-et-analyse"
// - evenementiel, relations-presse, redactionnel-editorial, communication-de-crise,
//   marketing-digital-acquisition, production-creative, structuration-outils :
//   inchangés
// ---------------------------------------------------------------------------

export type CompetenceSlug =
  | "evenementiel"
  | "relations-presse"
  | "redactionnel-editorial"
  | "strategie-communication-institutionnelle"
  | "communication-de-crise"
  | "partenariats-relais"
  | "marketing-digital-acquisition"
  | "communication-interne-cohesion-equipe"
  | "animation-communaute"
  | "production-creative"
  | "structuration-outils"
  | "veille-et-analyse";

export interface Competence {
  slug: CompetenceSlug;
  label: string;
}

// Ordre = ordre des 12 compétences dans le document de contenu (section
// "Liste des 12 compétences" de la partie Communication).
export const COMPETENCES: Competence[] = [
  { slug: "evenementiel", label: "Événementiel" },
  { slug: "relations-presse", label: "Relations presse" },
  { slug: "redactionnel-editorial", label: "Rédactionnel / éditorial" },
  { slug: "strategie-communication-institutionnelle", label: "Stratégie et communication institutionnelle" },
  { slug: "communication-de-crise", label: "Communication de crise" },
  { slug: "partenariats-relais", label: "Partenariats et relais" },
  { slug: "marketing-digital-acquisition", label: "Marketing digital et acquisition" },
  { slug: "communication-interne-cohesion-equipe", label: "Communication interne et cohésion d'équipe" },
  { slug: "animation-communaute", label: "Animation de communauté" },
  { slug: "production-creative", label: "Production créative" },
  { slug: "structuration-outils", label: "Structuration et outils" },
  { slug: "veille-et-analyse", label: "Veille et analyse" },
];

// ---------------------------------------------------------------------------
// Accroche de la partie Communication — verbatim depuis "2 - Portfolio -
// Contenu final (source de vérité).md", section "0. Accroche / positionnement".
// ---------------------------------------------------------------------------

export const ACCROCHE_COMMUNICATION =
  "Dix-sept ans à faire parler des institutions, des marques et des collectifs qui n'avaient pas toujours envie de se laisser raconter. J'ai fait de la communication dans des mondes qui ne se parlent pas beaucoup entre eux : une collectivité territoriale, une fédération agricole, une école qui ferme, un groupe de marques food en pleine expansion. Ce que j'en retiens : la com institutionnelle et le marketing de marque, ce n'est pas deux métiers, c'est le même réflexe appliqué à des enjeux différents, comprendre ce qu'une organisation a vraiment à dire, et trouver la forme qui fait qu'on l'écoute.";

// ---------------------------------------------------------------------------
// Entreprises — 6, ordre antichronologique (= ordre d'affichage par défaut)
//
// Inchangé au lot 4 bis : le regroupement par entreprise n'a pas bougé avec le
// redécoupage à 35 fiches, seule leur répartition à l'intérieur de chaque
// entreprise a changé. Textes de liaison (`contexte`) donc a priori toujours
// valides tels quels.
//
// Divergence "5 000" (draft narratif) vs "6 000" (base de données v2, fiche 17)
// signalée le 18/08/2026 puis tranchée par Jérôme le jour même : 5 000 est le bon
// chiffre, repris partout ci-dessous (COMPANIES, fiche 17, fiche 23).
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
      "L'Association Nationale des Élus de la Montagne (ANEM) regroupe plus de 5 000 élus adhérents des territoires de montagne. La communication avait été tenue par la même personne pendant plus de dix ans : stable, mais qui tournait en rond. On m'a confié la mission implicite de la faire repartir.",
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
//
// Rattachements corrigés le 17/08/2026 suite au redécoupage 18→35 fiches (voir
// "5 - Communication - Pièces écrites confirmées (textes intégraux)" côté
// contenu). Seule la correspondance vers les fiches change ; aucun texte n'est
// modifié.
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
  rattachements: number[]; // numéros de fiches projets (v2, 1-35)
  texteDisponibleDansLeRepo: boolean; // true = déjà transcrit dans le doc "Pièces écrites confirmées"
  // Texte intégral verbatim (lot 7), présent uniquement quand texteDisponibleDansLeRepo
  // est true. Source : "5 - Communication - Pièces écrites confirmées (textes
  // intégraux)". Markdown minimal (gras, listes), rendu via renderCorps.
  texteIntegral?: string;
  // Lien vers le document d'origine quand il est encore en ligne (référence, pas un
  // téléchargement proposé au visiteur — cf. décision "HTML, pas de PDF").
  sourceUrl?: string;
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
    rattachements: [3],
    texteDisponibleDansLeRepo: true,
    texteIntegral: `**COMMUNIQUE DE PRESSE DU 07/02/2025**

**Hackathon énergie : Créons ensemble les solutions formation innovantes pour le recrutement de vos futurs collaborateurs**

LEA-CFI organise un Hackathon sur le thème du recrutement le 13 février 2025, de 8h30 à 13h30 sur son campus de Gambetta. L'objectif est de coconstruire avec ses partenaires des solutions innovantes pour la formation et l'intégration de futurs collaborateurs.

Cet événement vise à relever les défis de recrutement des entreprises en élaborant conjointement des solutions novatrices pour la formation et l'intégration des talents de demain. Sous le thème principal « Créons ensemble les solutions formation innovantes pour le recrutement de vos futurs collaborateurs », les discussions porteront sur les questions suivantes : Quel public cibler ? Quels dispositifs de financement mobiliser ? Quelle pédagogie adopter ? Quel accompagnement proposer aux apprenants et aux entreprises ?

Les participants auront l'opportunité de participer à des ateliers de réflexion collaborative, visiter les plateaux techniques pour découvrir les infrastructures de pointe du campus, échanger avec les apprenants sur leur expérience et leurs projets, partager un moment convivial autour d'un déjeuner.

Les discussions seront animées par des membres de la direction et de l'équipe enseignante de LEA-CFI : Caroline FORTIER, Directrice Générale de LEA-CFI, Anne BITEAU, Directrice des programmes académiques Raphaël FAUCQUEMBERGUE, Responsable du Département Développement Grands Comptes Entreprises, Brigitte COUMANNE, Responsable Grands Comptes, Jaime ROCHA et Frédéric CLABAUX.

De nombreux partenaires de LEA-CFI ont confirmé leur participation, parmi lesquels : MITSUBISHI ELECTRIC, REOLIAN, SYNERGIE ROUGNON, ATLANTIC, VINCI ENERGIE, RANDSTAD, IDEX, SE3M, CARRIER, SPIE FACILITIES et CONSTRUCTYS. Leur présence témoigne de leur engagement à accompagner les évolutions des métiers et de la formation.

Nous comptons sur votre participation pour coconstruire des solutions adaptées aux enjeux actuels et anticiper les besoins futurs de votre secteur. Ensemble, faisons avancer la formation et le recrutement vers un avenir durable et performant.

**Informations pratiques :**

- Date : Jeudi 13 février 2025
- Horaires : 8h30 à 13h30
- Lieu : Campus de Gambetta, LEA-CFI

**À propos de LÉA-CFI :** LÉA-CFI, école de la Chambre de Commerce et d'Industrie Paris Île-de-France, accueille chaque année près de 1 400 apprenants sur 3 campus spécialisés. À Paris, l'école forme aux métiers de la performance des bâtiments et de l'efficacité énergétique. À Orly, les formations se concentrent sur le froid industriel et commercial, les mobilités et la maintenance des véhicules. À Jouy-en-Josas, l'école propose des cursus en travaux publics en valorisation des espaces naturels, paysagers et sportifs et en gestion d'affaires dans l'agrobusiness et le paysage. La mission de LEA-CFI : accompagner les talents et les experts de demain tout au long de leur parcours, afin qu'ils soient prêts à relever les défis de la transition écologique et industrielle. L'école s'engage à soutenir le développement responsable des entreprises et des territoires en formant des professionnels qualifiés, innovants et conscients des enjeux environnementaux et sociétaux. Chaque année, plus de 500 élèves sont diplômés.

Contact Presse | Jérôme Le Rhun Diawara | Jlerhun@lea-cfi.fr`,
  },
  {
    id: "lea-cfi-titre-professionnel-electricien",
    titre:
      "Nouvelle Formation : Titre professionnel d'électricien d'équipement du bâtiment",
    date: "2024-11-26",
    commanditaire: "LEA-CFI",
    supportOrigine: "Actualité du site LEA-CFI (site aujourd'hui fermé)",
    statut: "confirme",
    rattachements: [3],
    texteDisponibleDansLeRepo: true,
    texteIntegral: `Ce lundi 25 novembre, nous avons eu le plaisir d'accueillir le premier groupe d'électriciens d'équipement du bâtiment sur notre campus de Paris.

Grâce à un appel d'offre remporté dans le cadre du programme SPOTT EEB, et au financement de l'OPCO AKTO, cette formation qualifiante de 525 heures permettra de valider le titre professionnel d'électricien d'équipement du bâtiment.

Ce projet ambitieux regroupe des intérimaires issus de 4 grands réseaux de travail temporaire : Adecco, Groupe Actual, Randstad, Synergie.

Nous souhaitons bienvenue à Samantha, José, Nazim, Mohammed, Sylla, Mouhamed, Kenneth, Milaï et Hamath !

Un grand merci à nos partenaires qui rendent cette initiative possible : Joëlle MAGNE (AKTO), Catherine SCHLOSSER et Fabrice MAZOYER (RANDSTAD), Pascale JAQUAND (ACTUAL/ERGOS), Hong VO BA et Milène SOARES (SYNERGIE), Pierre-Laurent JOUBERTON (SYNERGIE INSERTION), Sophie CHAROY (ADECCO).

Merci également à nos équipes : Thierry Langevin, Huseyin Tanık, Cécile GEORJON et Brigitte Coumanne pour leur investissement.`,
  },
  {
    id: "lea-cfi-inventaire-59-actualites",
    titre: "Inventaire de 59 actualités LEA-CFI (2024-2025)",
    commanditaire: "LEA-CFI",
    supportOrigine: "Site LEA-CFI (fermé) — titres et dates seulement, pas de lien",
    statut: "selection-en-cours",
    rattachements: [3, 4, 10],
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
    rattachements: [20],
    texteDisponibleDansLeRepo: true,
    sourceUrl: "https://www.anem.fr/5138-2/",
    texteIntegral: `En tant que gestionnaire du réseau public de distribution d'électricité sur 95 % du territoire national, Enedis s'est engagée auprès des collectivités territoriales, des opérateurs, des entreprises de télécommunications, de l'Autorité de régulation des communications électroniques et des postes (Arcep), ainsi que des administrations afin de contribuer activement à l'aménagement numérique du territoire.

Très concrètement, notre principale action consiste, dans le cadre du plan France très haut débit (THD), à faciliter le déploiement de la fibre optique sur les poteaux électriques du réseau que nous exploitons.

Cette possibilité est ouverte dès la signature par l'opérateur concerné et Enedis d'une convention, et la transmission d'études mécaniques valides.

Enedis met en œuvre plusieurs engagements forts dans chacun des départements français afin de favoriser le déploiement du THD et le déploiement de la fibre dans les délais :

Enedis a simplifié les études en dispensant l'opérateur des études mécaniques dans certaines configurations ou en les forfaitisant dans d'autres configurations.

La cartographie du réseau électrique est désormais fournie aux opérateurs en une seule fois pour l'ensemble du territoire couvert par la convention.

Enedis accompagne les opérateurs et leurs bureaux d'études sur le plan de la technique et de la maîtrise des spécificités des appuis communs. À ce jour, plus de 30 sessions de formation ont été organisées.

Enedis prépare la montée en puissance des déploiements en permettant dans certaines conditions de passer d'un contrôle a priori des études à un contrôle a posteriori.

Enedis a contribué au travail mené par la Direction générale de l'énergie et du climat (DGEC) pour réviser l'arrêté technique de 2001 qui fixe les règles de tenue mécanique des ouvrages électriques. Avec la mise en place d'un nouvel outil informatique de suivi partagé de l'utilisation des Appuis communs, l'écosystème du THD peut mesurer en temps réel l'efficacité des déploiements et de notre action.

L'ensemble de ces travaux a conduit à une simplification des règles et des processus qui permet d'accélérer le déploiement du THD en France. À chaque étape, les équipes d'Enedis dédiées au THD sur l'ensemble du territoire national accompagnent localement les porteurs de projets.

En complément, pour les réseaux souterrains, Enedis a développé une offre de mutualisation du génie civil, principalement des tranchées. Moyennant une participation financière, Enedis pose des fourreaux télécoms dans les tranchées ouvertes lors de ses travaux.

Un pilotage national est assuré afin de prioriser et d'homogénéiser l'action d'Enedis sur l'ensemble du territoire, en lien avec les directions régionales d'Enedis. Cette organisation permet de répondre à l'enjeu d'accélération et d'industrialisation du projet, aux sollicitations croissantes des opérateurs et au partage des meilleures pratiques observées sur le territoire, avec la volonté permanente d'être au plus proche de ceux qui font avancer le plan France THD dans les territoires.

Enfin, notre implication dans le THD porte également sur la sensibilisation des acteurs autour du risque électrique. La sécurité des opérateurs et des intervenants sur nos ouvrages ou à proximité est une priorité absolue d'Enedis. S'agissant du THD, les maîtres d'ouvrage jouent un rôle essentiel, notamment par le contrôle qu'ils peuvent exercer auprès de leurs sous-traitants.

En lien avec les professionnels du secteur, Enedis est en recherche continue de simplifications supplémentaires. Enedis est à l'écoute de nouvelles propositions si elles garantissent les exigences fortes de sécurité pour les interventions, la tenue mécanique des ouvrages électriques et la couverture de ses coûts, conformément aux exigences du régulateur.

Ainsi Enedis est très engagée et va poursuivre son action pour favoriser le déploiement du THD sur 100 % du territoire, au bénéfice de nos concitoyens et de tous les territoires.`,
  },
  {
    id: "anem-pour-la-montagne-articles",
    titre: "Articles rédigés pour le mensuel Pour La Montagne",
    commanditaire: "ANEM",
    supportOrigine:
      "Mensuel Pour La Montagne — à créditer explicitement comme publication d'origine, avec la date du numéro",
    statut: "confirme",
    rattachements: [19],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "anem-cp-elisabeth-borne",
    titre:
      "L'ANEM demande à Elisabeth Borne la prise en compte de la spécificité montagne",
    date: "2019-05-09",
    commanditaire: "ANEM",
    supportOrigine: "anem.fr",
    statut: "texte-manquant",
    rattachements: [25],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "anem-inventaire-93-actualites",
    titre: "Inventaire de 93 actualités anem.fr (2019-2022)",
    commanditaire: "ANEM",
    supportOrigine: "anem.fr — titres, dates et liens",
    statut: "selection-en-cours",
    rattachements: [18, 19, 25],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "lea-cfi-catalogue-extraits",
    titre: "Extraits des textes du catalogue de formation refondu",
    commanditaire: "LEA-CFI",
    supportOrigine: "Catalogue de formation LEA-CFI (parmi 120+ textes réécrits)",
    statut: "a-verifier",
    rattachements: [3],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "anem-dossiers-presse",
    titre: "Dossiers de presse",
    commanditaire: "ANEM",
    supportOrigine: "ANEM",
    statut: "a-verifier",
    rattachements: [25],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "lbc-gourmiz-articles",
    titre: "Articles de contenu et interviews de sportifs pour Gourmiz'",
    commanditaire: "Les Bonnes Choses",
    supportOrigine: "Site Gourmiz' (lien externe si toujours en ligne)",
    statut: "a-verifier",
    rattachements: [12],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "yvelines-elements-langage",
    titre: "Éléments de langage, plaquettes des services sociaux",
    commanditaire: "Conseil départemental des Yvelines",
    supportOrigine: "Conseil départemental des Yvelines",
    statut: "a-verifier",
    rattachements: [27],
    texteDisponibleDansLeRepo: false,
  },
  {
    id: "lipton-fit-documents-internes",
    titre: "Documents internes, synthèses",
    commanditaire: "LIPTON FIT",
    supportOrigine: "LIPTON FIT",
    statut: "a-verifier", // probablement non publiable (documents internes)
    rattachements: [35],
    texteDisponibleDansLeRepo: false,
  },
];

// ---------------------------------------------------------------------------
// Fiches projets — 35, numérotées comme dans le document de contenu v2
// (redécoupage du 17/08/2026, remplace les 18 fiches v1)
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
      "strategie-communication-institutionnelle",
      "partenariats-relais",
      "structuration-outils",
      "production-creative",
      "marketing-digital-acquisition",
    ],
    pitch:
      "Organiser le congrès des 80 ans d'une fédération agricole nationale, sur le site de Rungis, avec un objectif d'autofinancement et de bénéfice, dans un contexte agricole tendu.",
    corps: `**Contexte :** Légumes de France, la fédération nationale des producteurs de légumes frais (créée en 1946, 32 000 exploitations, 200 000 emplois), célèbre ses 80 ans en 2026 à travers son congrès national : un événement de 400 personnes, sur le site du marché de Rungis, l'un des plus grands marchés de produits frais au monde, avec un budget de 238 K€. Je reprends cette mission après le départ progressif de la personne qui la portait depuis plusieurs années, devenue entre-temps maire de sa commune.

**L'enjeu :** Ce n'est pas qu'une fête d'anniversaire : le congrès doit s'autofinancer et dégager un bénéfice pour la fédération. Et il tombe dans un contexte agricole tendu (sécheresse, incertitude budgétaire chez les producteurs, élections présidentielles qui approchent) qui rend les sponsors et les invités plus difficiles à mobiliser que d'habitude.

**Ce que j'ai fait :** Je pilote la mission sur trois dimensions. Sur le fond, je travaille directement avec le directeur général et les coprésidents sur le contenu du congrès : construction des tables rondes, sélection et gestion des intervenants. Sur la forme, je pilote la communication de l'événement et la création des visuels, validés par la présidence — avec un volet digital dédié : un site web spécifique au congrès, des publications LinkedIn régulières et la production de contenus vidéo. Sur la logistique, je m'appuie sur des prestataires externes pour le traiteur, les buffets, la soirée de gala, ainsi que le repérage des lieux. En parallèle, je prospecte les sponsors avec un outil de suivi que j'ai construit moi-même (Airtable + Make, connecté à ma messagerie).

**Où j'en suis :** 25 K€ de sponsoring déjà sécurisés sur un objectif de 80 à 100 K€, avec un deuxième temps de relance prévu à la rentrée. En septembre : nouvelle vague d'invitations, communiqué de presse conjoint avec la Semmaris, et diffusion via ses propres canaux.

**Ce que ça dit de ma méthode :** Reprendre un projet à mi-parcours sans perdre le fil, c'est d'abord une question d'outils : j'ai commencé par structurer avant de communiquer, un budget prévisionnel, un suivi de tâches, un outil de suivi sponsors. Sur un enjeu financier réel (autofinancement + bénéfice), l'improvisation n'a pas sa place. Et c'est aussi une question de posture : être présent sur le fond avec la direction autant que sur la forme et la logistique.`,
    visuelsAPrevoir:
      "Visuel officiel du congrès, captures de l'outil de suivi sponsors et du site dédié, photos du site de Rungis, et, après l'événement, photos du congrès et bilan chiffré définitif.",
    pieceEcriteIds: [],
  },
  {
    number: 2,
    slug: "identite-graphique-lea-cfi",
    title: "Identité graphique",
    company: "lea-cfi",
    competences: ["production-creative"],
    pitch:
      "Retravailler l'identité visuelle d'une école en risque de fermeture, pour donner envie de la choisir plutôt qu'une autre.",
    corps: `**Contexte :** LEA-CFI, école de la CCI Île-de-France (40 parcours diplômants, 1 700 apprenants, 130 collaborateurs, 3 campus), traversait déjà un risque de fermeture au moment où je suis arrivé. Ma mission, en tant que Responsable Communication et Marketing, incluait de retravailler l'identité visuelle de l'école pour produire des visuels qui donnent envie de la choisir plutôt qu'une autre.

**Ce que j'ai fait :** Conception d'une nouvelle identité graphique pour l'école : nouvelles affiches, nouveaux visuels, en concertation avec les élèves.`,
    visuelsAPrevoir: "Avant/après de l'identité graphique, exemples d'affiches.",
    pieceEcriteIds: [],
  },
  {
    number: 3,
    slug: "catalogue-formation-lea-cfi",
    title: "Catalogue de formation",
    company: "lea-cfi",
    competences: ["redactionnel-editorial", "structuration-outils", "relations-presse"],
    pitch:
      "Refondre le contenu du catalogue de formation d'une école en risque de fermeture — architecture, textes, données — distinct du travail sur son identité visuelle (fiche 2).",
    corps: `**Ce que j'ai fait :** Refonte du catalogue de formation (45 formations restructurées, 120+ textes réécrits) : -70 % de délai de production, -60 % de coûts de mise à jour, grâce à une base de données centralisée et une automatisation Canva/Excel qui a remplacé un processus entièrement manuel sous InDesign. 5 000 fiches formation imprimées chaque année. Participation à la rédaction des communiqués de presse liés aux nouvelles offres de formation — notamment sur les métiers de l'énergie — et aux partenariats entreprises associés (SPIE Facilities, IDEX, Transilien, ENGIE) négociés par d'autres services.`,
    visuelsAPrevoir: "Avant/après du catalogue.",
    pieceEcriteIds: ["lea-cfi-hackathon-energie", "lea-cfi-titre-professionnel-electricien", "lea-cfi-catalogue-extraits", "lea-cfi-inventaire-59-actualites"],
  },
  {
    number: 4,
    slug: "ligne-editoriale-lea-cfi",
    title: "Ligne éditoriale du site et contenus rédactionnels réguliers",
    company: "lea-cfi",
    competences: ["redactionnel-editorial"],
    pitch:
      "Faire vivre la ligne éditoriale et le fil d'actualité d'une école sur 3 campus, au-delà du catalogue de formation.",
    corps: `**Ce que j'ai fait :** Ligne éditoriale et comité éditorial transverse animés : +5 % de trafic web en 6 mois, +2 % de taux d'ouverture des newsletters. Rédaction d'articles portraits et d'interviews écrites d'alumni et d'apprentis — parcours inspirants, retours d'expérience — distincts des interviews vidéo de la fiche 6.`,
    visuelsAPrevoir: "Captures d'articles publiés.",
    pieceEcriteIds: ["lea-cfi-inventaire-59-actualites"],
  },
  {
    number: 5,
    slug: "reseau-alumni-lea-cfi",
    title: "Réseau alumni",
    company: "lea-cfi",
    competences: ["animation-communaute", "evenementiel"],
    pitch:
      "Construire de toutes pièces une communauté alumni sur les 3 campus d'une école — le seul projet LEA-CFI que j'ai piloté seul, de bout en bout.",
    corps: `**Ce que j'ai fait :** Réseau alumni créé de toutes pièces : +300 membres sur le groupe LinkedIn en 2 semaines, événement inaugural de 200 personnes (3 tables rondes, 12 intervenants), suivi d'une seconde soirée de retrouvailles.`,
    visuelsAPrevoir: "Photo de l'événement alumni.",
    pieceEcriteIds: [],
  },
  {
    number: 6,
    slug: "formats-video-lea-cfi",
    title: "Formats vidéo",
    company: "lea-cfi",
    competences: ["production-creative"],
    pitch: "Créer, en interne, plusieurs séries vidéo pour donner à voir la vie de l'école.",
    corps: `**Ce que j'ai fait :** "La Parole aux Anciens" (interviews vidéo d'alumni), "Nos Apprentis sur le Terrain" (reportages en entreprise), "Questions Rapides" (format court pour inciter aux Journées Portes Ouvertes), vidéos de présentation des formations.`,
    visuelsAPrevoir: "Extraits des 4 séries vidéo.",
    pieceEcriteIds: [],
  },
  {
    number: 7,
    slug: "presence-terrain-lea-cfi",
    title: "Présence terrain, affichage et goodies",
    company: "lea-cfi",
    competences: ["communication-interne-cohesion-equipe", "structuration-outils", "production-creative"],
    pitch: "Rendre la fonction communication visible et identifiée sur les 3 campus d'une école.",
    corps: `**Ce que j'ai fait :** Présence régulière sur les 3 campus, déplacements, valorisation des professeurs et des élèves — un service de com transversal doit être vu et connu pour devenir la référence naturelle vers laquelle on se tourne pour faire circuler l'information. Déploiement d'un réseau d'affichage physique portant les messages clés (Journées Portes Ouvertes, recrutement, soirée des anciens), complété par un réseau d'écrans dynamiques diffusant informations et petits formats vidéo aux points de passage stratégiques de chaque campus. Gestion des goodies, dont une collection de tee-shirts.`,
    visuelsAPrevoir: "Exemple d'affiche du réseau interne, photo des écrans dynamiques, visuel des tee-shirts.",
    pieceEcriteIds: [],
  },
  {
    number: 8,
    slug: "campagnes-digitales-crm-lea-cfi",
    title: "Campagnes digitales, CRM et diffusion territoriale",
    company: "lea-cfi",
    competences: ["marketing-digital-acquisition", "partenariats-relais", "structuration-outils"],
    pitch:
      "Faire passer la communication digitale et la diffusion territoriale d'une école d'une logique coup par coup à une stratégie structurée, outillée par un CRM.",
    corps: `**Ce que j'ai fait :** Campagne digitale refondue : passage d'une logique au coup par coup à une planification sur l'année entière, avec des innovations comme une session de contenu UGC — dont le concours interne "Rejoins mon école", donnant la parole à des étudiants-ambassadeurs et dont les contenus ont été réutilisés sur les réseaux sociaux — en collaboration avec une agence spécialisée en marketing digital. Gestion du CRM et des campagnes d'e-mailing : conception des scénarios d'envoi, création des contenus, et construction de parcours clients pour accompagner chaque profil (prospect, candidat, futur apprenant) selon son étape dans le cycle de décision. Base de données de contacts en mairies, dans les départements où l'école recrutait ses élèves : diffusion des communiqués de presse, demande de relais, et mise à disposition de kits de communication clé en main pour parler des Journées Portes Ouvertes. Campagnes marketing 360° (budget annuel 100 K€) : +10 % de participation aux Journées Portes Ouvertes. Management d'une équipe de 3 personnes, budget communication annuel de 150 K€.`,
    visuelsAPrevoir: "Captures des campagnes digitales si disponibles, extrait du concours \"Rejoins mon école\".",
    pieceEcriteIds: [],
  },
  {
    number: 9,
    slug: "communication-crise-fermeture-lea-cfi",
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
    number: 10,
    slug: "appui-evenementiel-lea-cfi",
    title: "Communication et appui événementiel",
    company: "lea-cfi",
    competences: ["evenementiel", "redactionnel-editorial"],
    pitch:
      "Assurer la communication et un appui logistique ponctuel sur les nombreux événements de la vie d'une école, sans en être le pilote.",
    corps: `**Ce que j'ai fait :** Communication (invitations, supports) de plusieurs événements internes organisés par d'autres services : Journées Portes Ouvertes, Hackathon Énergie, Concours d'éloquence, concours technique AICVF, Job Dating. Appui logistique ponctuel sur ces événements — achat de goodies, envoi d'invitations. Représentation de l'école sur des salons étudiants externes (Studyrama, Salon de l'Apprentissage).

**Ce que ça dit de ma méthode :** Contrairement au réseau alumni (fiche 5), que j'ai piloté seul de bout en bout, mon rôle ici était celui d'un appui communication et logistique sur des événements pilotés par d'autres services — savoir jouer les deux partitions, porter un projet seul et soutenir un collectif, fait aussi partie du métier.`,
    visuelsAPrevoir: "Photos des Journées Portes Ouvertes, du Hackathon Énergie.",
    pieceEcriteIds: ["lea-cfi-inventaire-59-actualites"],
  },
  {
    number: 11,
    slug: "engagement-rse-lea-cfi",
    title: "Engagement RSE",
    company: "lea-cfi",
    competences: ["strategie-communication-institutionnelle", "redactionnel-editorial"],
    pitch: "Porter, en plus de mes missions de communication, un rôle de gouvernance au sein du comité RSE de l'école.",
    corps: `**Ce que j'ai fait :** Membre du comité RSE de l'école, co-responsable RSE avec d'autres membres du comité, en plus de mes missions de communication. Pilotage de la communication autour des actions RSE, dont le Challenge Energic, un mois d'engagement collectif pour la transition énergétique.`,
    visuelsAPrevoir: "Visuels du Challenge Energic.",
    pieceEcriteIds: [],
  },
  {
    number: 12,
    slug: "ecommerce-3-marques-lbc",
    title: "E-commerce des 3 marques (Essenciagua, La Sablésienne, Gourmiz')",
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
    number: 13,
    slug: "lancement-luddigekki-usa",
    title: "Lancement de Luddigekki sur le marché américain",
    company: "les-bonnes-choses",
    competences: ["strategie-communication-institutionnelle", "marketing-digital-acquisition", "communication-de-crise", "redactionnel-editorial", "production-creative"],
    pitch:
      "Créer et lancer une marque de A à Z sur un marché inconnu, jusqu'à encaisser une attaque concurrentielle qui a coupé l'accès à la vente.",
    corps: `**Ce que j'ai fait :** Création et lancement de Luddigekki sur le marché américain, une marque avec 3 lignes de produits : kits de construction type cabanes, jouets antistress et piscines à balles. Positionnement, identité visuelle, co-développement produit avec les usines partenaires, pilotage de la production et d'une logistique internationale conséquente, stratégie D2C (SEO, Search Find Buy, acquisition payante). Recherche et benchmark de nouveaux produits : analyse de la concurrence et méthode de sourcing propre à Amazon. Management d'une personne travaillant à distance sur la marque. Un blog alimenté d'articles pour la marque, et un compte Instagram ouvert et géré (création de contenu, planification des publications). Résultat : une marque valorisée jusqu'à 200 K$.

**Le coup dur :** Un concurrent a lancé une attaque groupée contre une centaine de vendeurs de la même niche, en accusant Luddigekki d'avoir utilisé le nom de sa marque dans nos listings produits. Amazon a immédiatement coupé notre accès à la vente : perte du référencement, obligation de rapatrier tout le stock, recréer les listings, faire appel à un avocat pour débloquer la situation. La marque ne s'en est jamais complètement remise. La gestion de cette crise est restée opérationnelle et juridique, sans volet de communication externe dédié.

**Ce que ça dit de ma méthode :** Cette expérience m'a appris à créer une marque de A à Z sur un marché que je ne connaissais pas, et à encaisser un revers qui ne dépendait pas de moi sans perdre le fil du reste. Elle m'a aussi appris quelque chose sur moi : le rythme du e-commerce au quotidien n'est pas celui dans lequel je suis le plus à l'aise. Je préfère construire une stratégie que la piloter heure par heure.`,
    visuelsAPrevoir: "Identité visuelle Luddigekki, captures du blog et du compte Instagram.",
    pieceEcriteIds: [],
  },
  {
    number: 14,
    slug: "communaute-sportifs-gourmiz",
    title: "Communauté sportifs Gourmiz'",
    company: "les-bonnes-choses",
    competences: ["animation-communaute", "partenariats-relais", "production-creative"],
    pitch:
      "Construire une communauté de 15 sportifs de haut niveau pour Gourmiz', recrutés principalement via les réseaux sociaux.",
    corps: `**Ce que j'ai fait :** Communauté de 15 sportifs de haut niveau recrutée — majoritairement via les réseaux sociaux — et animée pour Gourmiz', avec production de contenus UGC, en binôme avec une autre personne dédiée à la marque.`,
    visuelsAPrevoir: "Visuels des campagnes sponsors sportifs.",
    pieceEcriteIds: [],
  },
  {
    number: 15,
    slug: "developpement-commercial-b2b-lbc",
    title: "Développement commercial B2B",
    company: "les-bonnes-choses",
    competences: ["structuration-outils", "partenariats-relais"],
    pitch:
      "Développer les ventes B2B en direct auprès de magasins bio, de la prospection à la structuration d'un CRM — un sujet sans lien avec la communauté de sportifs (fiche 14), malgré la marque commune.",
    corps: `**Ce que j'ai fait :** Démarchage direct de magasins bio en Occitanie. Structuration d'un CRM : collecte et saisie des contacts. 10 contrats de distribution signés.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: [],
  },
  {
    number: 16,
    slug: "veille-analyse-marche-lbc",
    title: "Veille et analyse marché",
    company: "les-bonnes-choses",
    competences: ["veille-et-analyse"],
    pitch: "Nourrir les décisions produit et acquisition des 3 marques par une veille marché et concurrentielle continue.",
    corps: `**Ce que j'ai fait :** Benchmarks et veille pour comprendre les niches de vente de Gourmiz', Luddigekki et Essenciagua. Analyse des tendances marché et des mots-clés en vue de la création de nouveaux produits. Détermination de l'ordre de mise en ligne des produits à partir de cette analyse.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: [],
  },
  {
    number: 17,
    slug: "congres-annuel-anem",
    title: "Congrès annuel",
    company: "anem",
    competences: ["evenementiel", "strategie-communication-institutionnelle"],
    pitch:
      "Piloter de bout en bout un congrès annuel de 500 élus de sensibilités politiques très différentes, avec la diplomatie que ça demande.",
    corps: `**Contexte :** L'Association Nationale des Élus de la Montagne (ANEM) regroupe plus de 5 000 élus adhérents des territoires de montagne. La communication avait été tenue par la même personne pendant plus de dix ans : stable, mais qui tournait en rond. On m'a confié la mission implicite de la faire repartir. Le congrès était ma première mission.

**Ce que j'ai fait :** Congrès annuel (budget 200 K€, 500 élus toutes tendances politiques confondues, ministres, maires, députés, présidents de département) : pilotage de bout en bout, supports, protocole, supervision des prestataires.

**Une anecdote qui résume le poste :** Au quotidien, travailler avec des élus, c'est composer avec des problématiques et des comportements très spécifiques, dans un milieu mouvant où les mandats et les priorités changent souvent. Ça pousse à s'adapter en permanence, à proposer plutôt qu'à imposer, dans un environnement exigeant.

Lors du congrès en Corse, la venue du Premier ministre Jean Castex était annoncée. J'ai organisé toute la visite de sécurité avec son service de protection et le régisseur du lieu, préparation complète, jusqu'à ce que sa venue soit finalement annulée. On a basculé sur un message vidéo. C'est souvent à ça que ressemble l'événementiel institutionnel : tout préparer pour un scénario qui peut changer à la dernière minute, et avoir un plan B prêt.

Plus largement, coordonner un événement où se croisent 500 élus de sensibilités très différentes demande une diplomatie de tous les instants. Certains attendaient un accompagnement individualisé que le format collectif ne permettait pas, et il fallait tenir la ligne sans braquer personne.`,
    visuelsAPrevoir: "Photo du congrès annuel.",
    pieceEcriteIds: [],
  },
  {
    number: 18,
    slug: "reseaux-sociaux-videos-anem",
    title: "Réseaux sociaux et vidéos institutionnelles",
    company: "anem",
    competences: ["production-creative", "strategie-communication-institutionnelle", "structuration-outils"],
    pitch: "Faire entrer une association d'élus dans l'ère des réseaux sociaux et de la vidéo institutionnelle.",
    corps: `**Ce que j'ai fait :** Pilotage de la stratégie de présence de l'ANEM sur les réseaux sociaux. Pilotage d'une série de vidéos institutionnelles et de témoignages d'élus ("Les élus ont la parole", "Les élus de la montagne témoignent en vidéo", vidéo de présentation "L'ANEM : qu'est-ce que c'est ?"). Pilotage des résumés vidéo du congrès et de la présence de l'association sur YouTube.`,
    visuelsAPrevoir: "Extraits vidéo, captures des réseaux sociaux.",
    pieceEcriteIds: ["anem-inventaire-93-actualites"],
  },
  {
    number: 19,
    slug: "pour-la-montagne",
    title: "Rédacteur en chef, Pour La Montagne",
    company: "anem",
    competences: ["redactionnel-editorial"],
    pitch:
      "Rédacteur en chef d'un mensuel institutionnel : gestion des pigistes et du maquettiste, fil rouge éditorial, écriture.",
    corps: `**Ce que j'ai fait :** Rédacteur en chef du mensuel *Pour La Montagne* (budget 150 K€) : gestion des pigistes et du maquettiste, construction du fil rouge de chaque numéro. Rôle majoritairement éditorial — commande, relecture, fil rouge — complété par la rédaction de quelques articles à chaque numéro, souvent liés à l'actualité de la communication.`,
    visuelsAPrevoir: "Une du mensuel Pour La Montagne.",
    pieceEcriteIds: ["anem-pour-la-montagne-articles", "anem-inventaire-93-actualites"],
  },
  {
    number: 20,
    slug: "refonte-site-newsletter-anem",
    title: "Refonte du site et création de la newsletter",
    company: "anem",
    competences: ["structuration-outils", "redactionnel-editorial"],
    pitch: "Refondre le site internet de l'association et créer sa newsletter, qui n'existait pas avant.",
    corps: `**Ce que j'ai fait :** Refonte complète du site internet : nouvelle architecture, réécriture intégrale des contenus. Création de la newsletter de l'ANEM de toutes pièces — elle n'existait pas avant mon arrivée. Création d'un module d'inscription en ligne pour le congrès.`,
    visuelsAPrevoir: "Captures du site refondu (avant/après si possible).",
    pieceEcriteIds: ["anem-enedis-reseau-thd"],
  },
  {
    number: 21,
    slug: "temps-institutionnels-anem",
    title: "Organisation des temps institutionnels récurrents",
    company: "anem",
    competences: ["evenementiel", "strategie-communication-institutionnelle"],
    pitch: "Organiser, au-delà du congrès annuel (fiche 17), les temps institutionnels récurrents de la vie de l'association.",
    corps: `**Ce que j'ai fait :** Organisation des vœux annuels et des réunions départementales (contenus, inscriptions). Mise en place du comité directeur lors de la semaine nationale.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: [],
  },
  {
    number: 22,
    slug: "outils-imprimes-anem",
    title: "Outils imprimés de communication institutionnelle",
    company: "anem",
    competences: ["production-creative"],
    pitch: "Concevoir l'ensemble des supports imprimés officiels d'une association d'élus.",
    corps: `**Ce que j'ai fait :** Création de l'ensemble des outils de communication institutionnelle : plaquettes de présentation, carte de vœux, et tous les supports annuels de l'association. Sélection des goodies, principalement pour le congrès.`,
    visuelsAPrevoir: "Plaquette institutionnelle, exemple de goodies.",
    pieceEcriteIds: [],
  },
  {
    number: 23,
    slug: "base-donnees-contacts-anem",
    title: "Gestion de la base de données de contacts",
    company: "anem",
    competences: ["structuration-outils"],
    pitch: "Structurer et faire vivre la base de contacts d'une association de plus de 5 000 élus adhérents.",
    corps: `**Ce que j'ai fait :** Gestion de la base de données de contacts : intégration des nouveaux contacts, structuration de la partie presse. Management d'apprentis et de stagiaires.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: [],
  },
  {
    number: 24,
    slug: "partenariats-institutionnels-anem",
    title: "Partenariats institutionnels",
    company: "anem",
    competences: ["partenariats-relais", "evenementiel"],
    pitch:
      "Entretenir et développer le portefeuille de partenaires institutionnels et financiers d'une association d'élus, distinct des relations presse (fiche 25).",
    corps: `**Ce que j'ai fait :** Entretien des partenariats historiques (SFR, Caisse des Dépôts, EDF, Engie, Citéo, Suez) et prospection de nouveaux partenaires — recherche en ligne, salons — deux nouveaux partenariats signés (Médadom et Camping Car Park, 10 K€/an chacun). Rédaction des conventions de partenariat et organisation d'un événement autour de chaque signature. Suivi à l'année du respect des contreparties : publications en magazine, stands au congrès, mise en avant du dirigeant du partenaire.

**Ce que ça dit de ma méthode :** Reprendre une communication qui fonctionne mais qui n'avance plus, ce n'est pas pareil que repartir de zéro : il faut convaincre en douceur, pas révolutionner. C'est une compétence à part entière.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: [],
  },
  {
    number: 25,
    slug: "relations-presse-anem",
    title: "Relations presse",
    company: "anem",
    competences: ["relations-presse"],
    pitch: "Organiser la présence presse autour des élus d'une association nationale.",
    corps: `**Ce que j'ai fait :** Relations presse : communiqués, dossiers de presse, conférences de presse, base de données journalistes créée de toutes pièces. Mise en relation des élus avec les journalistes et organisation des interviews (placement presse), essentiellement en presse écrite.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: ["anem-cp-elisabeth-borne", "anem-inventaire-93-actualites", "anem-dossiers-presse"],
  },
  {
    number: 26,
    slug: "campagne-c-est-tout-ca-les-yvelines",
    title: "Campagne \"C'est tout ça les Yvelines\"",
    company: "yvelines",
    competences: ["strategie-communication-institutionnelle", "production-creative"],
    pitch:
      "Une campagne 360° de 6 mois, à 350 K€, pour donner envie aux Franciliens de découvrir le département, avec un vrai défi de hiérarchisation du message.",
    corps: `**Contexte général du poste :** Six ans au cabinet du Président du Département des Yvelines (1,4 M d'habitants, budget annuel de 1,5 Md€), en tant que référent communication pour plusieurs directions à la fois (Environnement, Tourisme, Mobilités, Finances, Enfance & Solidarités). C'est l'expérience la plus longue et la plus large de mon parcours.

**Ce que j'ai fait :** "C'est tout ça les Yvelines" (350 K€, 6 mois) : une campagne 360° pour donner envie aux Franciliens de venir découvrir le département. Le défi n'était pas créatif au sens classique : c'était un défi de hiérarchisation. Le Département voulait tout montrer de ce qu'il fait, ce qui a rendu le film long et la campagne d'affichage complexe à construire pour rester lisible.`,
    visuelsAPrevoir: "Visuels de la campagne \"C'est tout ça les Yvelines\".",
    pieceEcriteIds: [],
  },
  {
    number: 27,
    slug: "missions-transverses-yvelines",
    title: "Missions transverses du poste",
    company: "yvelines",
    competences: ["redactionnel-editorial", "relations-presse", "strategie-communication-institutionnelle"],
    pitch: "Le quotidien de 6 ans au cabinet du Président du Département, en toile de fond des grandes campagnes (fiche 26) et projets ponctuels (fiches 28 à 32).",
    corps: `**Ce que j'ai fait :** Rédaction d'éléments de langage pour les élus (inaugurations de parcs, de chantiers routiers). Conception de plaquettes pour les services sociaux (adoption, protection maternelle et infantile, personnes âgées). Rédaction de communiqués de presse et de documents d'information pour les Yvelinois. Suivi des marchés publics. Conseil éditorial auprès des directions. Management d'apprentis.

**Ce que ça dit de ma méthode :** Une collectivité comme celle-là m'a appris à faire cohabiter deux échelles de temps : le temps long des grandes campagnes institutionnelles, et le temps court d'un communiqué à boucler dans la journée. C'est cette polyvalence, plus que tel ou tel projet en particulier, qui définit le poste.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: ["yvelines-elements-langage"],
  },
  {
    number: 28,
    slug: "inauguration-parc-peuple-herbe",
    title: "Inauguration du Parc du Peuple de l'Herbe",
    company: "yvelines",
    competences: ["evenementiel"],
    pitch: "Organiser l'inauguration d'un parc écologique, en pilote communication d'un projet porté par la direction de l'Environnement.",
    corps: `**Contexte :** Le Parc du Peuple de l'Herbe, un parc dédié à la préservation d'un milieu naturel sur une ancienne carrière, porté par la direction de l'Environnement du Département.

**Ce que j'ai fait :** Organisation de l'événement d'inauguration du parc : sécurité, communication, attractions sur le lieu. Coordination de la direction de l'Environnement, de la commune, des intervenants, des partenaires et des prestataires. Budget d'environ 100 K€.`,
    visuelsAPrevoir: "Photos du parc et de l'inauguration.",
    pieceEcriteIds: [],
  },
  {
    number: 29,
    slug: "carte-voeux-departement-yvelines",
    title: "Carte de vœux annuelle du Département",
    company: "yvelines",
    competences: ["production-creative", "structuration-outils"],
    pitch: "Concevoir, chaque année, la carte de vœux du Département — de l'idée créative à la distribution.",
    corps: `**Ce que j'ai fait :** Recherche de concepts créatifs et brief à l'agence. Pilotage de la production, validation par les élus. Gestion des imprimeurs, de la signature du Président et des élus, et de la distribution. Préparation et diffusion d'une version numérique, mise à disposition des agents du Département.`,
    visuelsAPrevoir: "Exemples de cartes de vœux (versions print et numérique).",
    pieceEcriteIds: [],
  },
  {
    number: 30,
    slug: "festival-cinema-yvelines",
    title: "Festival \"Les Yvelines font leur cinéma\"",
    company: "yvelines",
    competences: ["evenementiel", "partenariats-relais", "production-creative", "marketing-digital-acquisition"],
    pitch: "Un festival de cinéma en plein air, 300 K€/an, jusqu'à 10 000 spectateurs sur une édition — avec tout un travail en amont invisible au public.",
    corps: `**Ce que j'ai fait :** Plan de communication du festival (26 séances). Prise de contact avec les mairies pour définir les subventions du département et sélection des communes hôtes. Sélection des films diffusés et obtention des droits de diffusion. Création de spots de promotion du département, projetés en début de chaque séance. Achat média, coordination des prestataires. Coordination avec la community manager pour l'animation de la page Facebook du festival.`,
    visuelsAPrevoir: "Photos du festival, extrait d'un spot de promotion.",
    pieceEcriteIds: [],
  },
  {
    number: 31,
    slug: "ybox",
    title: "Ybox",
    company: "yvelines",
    competences: ["partenariats-relais", "structuration-outils", "evenementiel", "production-creative", "marketing-digital-acquisition", "strategie-communication-institutionnelle"],
    pitch: "Lancer un coffret de promotion touristique du territoire, en partenariat avec Smartbox — un projet complet, de la stratégie à la soirée de lancement.",
    corps: `**Ce que j'ai fait :** Définition de la stratégie de lancement du coffret (600 K€, en partenariat avec Smartbox). Coordination avec la direction du Tourisme, notamment sur la distribution du coffret. Gestion des marchés publics du projet. Gestion du partenariat avec Smartbox et suivi des entreprises partenaires intégrées dans le coffret. Relais d'information et de communication autour du lancement. Organisation d'une soirée de lancement pour présenter le projet. Pilotage d'une campagne de communication (affichage, digital) et du graphisme/visuel avec les créatifs.`,
    visuelsAPrevoir: "Visuel Ybox.",
    pieceEcriteIds: [],
  },
  {
    number: 32,
    slug: "affichage-dynamique-yvelines",
    title: "Réseau d'affichage dynamique du Département",
    company: "yvelines",
    competences: ["structuration-outils", "production-creative"],
    pitch: "Déployer et faire vivre un réseau d'écrans dynamiques dans les lieux d'accueil du public du Département.",
    corps: `**Ce que j'ai fait :** Montage du marché public et choix du prestataire (60 K€/an). Création des spots et boucles vidéo diffusés, avec le prestataire. Repérage des lieux d'installation des écrans. Gestion et suivi du budget. Sélection des sujets affichés selon les demandes remontées par les directions. Gestion de la diffusion et de la programmation dans chaque lieu — essentiellement les lieux d'accueil du public type SAS, PMI.`,
    visuelsAPrevoir: "Photo du réseau d'affichage.",
    pieceEcriteIds: [],
  },
  {
    number: 33,
    slug: "paris-nice",
    title: "Paris-Nice",
    company: "yvelines",
    competences: ["evenementiel"],
    pitch:
      "Le volet communication d'une étape francilienne de course cycliste internationale, une mission ponctuelle dans le cadre d'un roulement entre chargés de communication.",
    corps: `**Ce que j'ai fait :** Sur le volet communication de l'étape francilienne de cette course cycliste (budget global de la manifestation : 2 M€), j'ai géré l'affichage, la campagne de communication, l'organisation du stand et la préparation des goodies, en lien avec le service événementiel. Une mission ponctuelle, faite une seule année dans le cadre d'un roulement entre chargés de communication. Périmètre volontairement réduit — pas d'éléments supplémentaires à ajouter.`,
    visuelsAPrevoir: "Aucun spécifique.",
    pieceEcriteIds: [],
  },
  {
    number: 34,
    slug: "communication-externe-lipton-fit",
    title: "Communication externe",
    company: "lipton-fit",
    competences: ["structuration-outils", "redactionnel-editorial", "relations-presse", "evenementiel", "production-creative"],
    pitch: "Porter la voix externe d'un cabinet de conseil d'une soixantaine de consultants, en quasi-autonomie complète.",
    corps: `**Contexte :** Mon premier poste, dans un cabinet de conseil en banque, assurance et finance d'une soixantaine de consultants, majoritairement de la communication interne avec une part d'externe, et souvent en autonomie complète (ma responsable a été deux fois en congé maternité pendant ces quatre ans).

**Ce que j'ai fait :** Pilotage de la refonte du site web du cabinet, conception et rédaction intégrale des contenus, avec l'appui de quelques consultants techniques. Gestion des réseaux sociaux du cabinet (LinkedIn, Facebook). Rédaction de quelques communiqués de presse. Organisation de quelques événements externes, pour permettre aux clients de rencontrer les consultants du cabinet. Conception de la carte de vœux annuelle du cabinet — une collaboration freelance toujours active aujourd'hui (voir aussi la partie Créativité, section Design & illustration).`,
    visuelsAPrevoir: "Captures du site web refondu, exemples de cartes de vœux.",
    pieceEcriteIds: [],
  },
  {
    number: 35,
    slug: "communication-interne-lipton-fit",
    title: "Communication interne",
    company: "lipton-fit",
    competences: ["communication-interne-cohesion-equipe", "redactionnel-editorial", "production-creative", "veille-et-analyse"],
    pitch:
      "Créer de la cohésion dans un cabinet où les consultants, toujours en mission chez leurs clients, finissaient parfois par mieux connaître leurs clients que leur propre cabinet.",
    corps: `**Ce que j'ai fait :** Rédaction de documents internes pour faire circuler l'information. Conduite d'interviews de consultants, synthèses et rapports mettant en avant les bonnes pratiques du cabinet. Rédaction des comptes rendus de réunions. Veille presse. Animation d'un forum interne. Organisation d'événements de cohésion interne, pour recréer du lien entre des consultants dispersés sur leurs missions. Refonte de la mascotte du cabinet et de l'identité visuelle des documents internes. Conception de plusieurs nouveaux formats de documents internes — peu d'outils étaient en place à mon arrivée —, dont un format d'intégration pour les nouveaux arrivants (un portrait chinois). Production et montage de vidéos d'interview.`,
    visuelsAPrevoir: "Mascotte, extrait d'une vidéo d'interview si disponible, exemple de document interne.",
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

export function getPieceById(id: string): PieceEcrite | undefined {
  return PIECES_ECRITES.find((p) => p.id === id);
}

// Sens inverse de ProjectCard.pieceEcriteIds — une pièce peut être rattachée à
// plusieurs fiches (cas des inventaires ANEM/LEA-CFI une fois répartis). Calculé
// depuis pieceEcriteIds (la relation réellement utilisée par l'affichage), pas
// depuis PieceEcrite.rattachements (conservé à titre documentaire, non consommé
// par le rendu — voir commentaire sur l'interface).
export function getProjectsForPiece(pieceId: string): ProjectCard[] {
  return PROJECTS.filter((p) => p.pieceEcriteIds.includes(pieceId)).sort((a, b) => a.number - b.number);
}

// Libellé affiché en regard d'une pièce écrite dans la liste "Pièces écrites
// liées" d'une fiche projet. Distingue les 4 statuts (voir PieceStatut) et le
// cas confirmé-mais-pas-encore-transcrit (ex. articles Pour La Montagne : statut
// confirmé côté contenu, texte pas encore recopié dans le repo).
export function pieceStatusLabel(piece: PieceEcrite): string {
  if (piece.texteDisponibleDansLeRepo) return "texte disponible";
  switch (piece.statut) {
    case "confirme":
      return "confirmé — pas encore mis en page";
    case "selection-en-cours":
      return "sélection en cours";
    case "texte-manquant":
      return "texte original introuvable";
    case "a-verifier":
      return "à vérifier";
  }
}

// Compteurs réels de la taxonomie, calculés à partir de la ligne "Compétences :"
// de chaque fiche (source la plus granulaire, cf. lot 4 : incohérence trouvée et
// corrigée entre le tableau résumé et les fiches elles-mêmes le 16/08/2026).
export function competenceCounts(): Record<CompetenceSlug, number> {
  const counts = {} as Record<CompetenceSlug, number>;
  for (const c of COMPETENCES) {
    counts[c.slug] = getProjectsByCompetence(c.slug).length;
  }
  return counts;
}
