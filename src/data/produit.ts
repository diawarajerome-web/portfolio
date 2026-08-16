/**
 * Modèle de contenu — Partie Produit.
 *
 * Source : "2 - Portfolio - Contenu final (source de vérité).md", PARTIE 2 — PRODUIT.
 * Texte verbatim, aucune reformulation. Les notes éditoriales entre crochets du
 * document source ne sont pas reprises ici (remarques internes, pas du contenu
 * destiné au site).
 *
 * Même gabarit narratif simple que la partie Créativité (lot 6).
 */

import type { NarrativeSection } from "./creativite";

export const PRODUIT_ACCROCHE =
  "Je fonctionne comme ça depuis longtemps : chaque fois qu'un chapitre professionnel se ferme, j'en profite pour ajouter une corde à mon arc plutôt que de reprendre le même poste ailleurs. C'est ce qui m'a conduit chez Les Bonnes Choses, pour apprendre l'e-commerce et le marketing digital. C'est la même logique qui m'amène aujourd'hui au No-Code et à l'IA : c'est là-bas, au contact du e-commerce, que j'ai vu à quel point l'intelligence artificielle prenait de la place dans les métiers de la communication. Le marché de la communication s'est refermé un temps, et j'ai profité de cette période pour me consacrer pleinement à mon projet de bande dessinée et me former à ces nouveaux outils : pas pour changer de métier, mais pour me donner les moyens de construire moi-même les outils qui me rendent plus efficace.";

export const PRODUIT_INTRO: NarrativeSection = {
  heading: "La formation — cadre et contexte",
  body: `Formation **Product Builder No-Code & IA**, dispensée par DataSuits et certifiée par la Formation Continue de l'Université Paris 1 Panthéon-Sorbonne. Format Bootcamp intensif, démarré le 11 mai 2026 : six semaines de cours (cadrage produit, bases de données avec Airtable, automatisations avec Make, intégrations API, interfaces et sites web avec Figma/Webflow/Softr/Lovable), puis un projet final mené en conditions réelles d'entreprise.

Ce projet final, le **Cockpit d'Appel & CRM** construit pour Légumes de France (voir plus bas), se conclut par une soutenance devant jury pour valider la certification **RNCP41480BC03 : « Développer un produit numérique avec des outils no-code »**, prévue en septembre 2026.`,
};

export const PRODUIT_PROJETS: NarrativeSection[] = [
  {
    heading: "Cockpit d'Appel & CRM — Reprendre en main la prospection sponsors d'un congrès national",
    body: `**Contexte :** Légumes de France (chef de projet événementiel, mission en cours), voir aussi la partie Communication. Une petite structure de 6 personnes, sans service dédié, où la prospection de sponsors pour le congrès reposait sur un Excel à 4 onglets déconnectés : contacts inexploitables, aucune protection contre la vente en double d'une offre unique, aucun historique visible pendant un appel.

**Ce que j'ai construit :** une base Airtable relationnelle à 6 tables (partenaires, contacts, offres, interactions, engagements, et une table de jonction pour gérer les offres prises en plusieurs exemplaires), pilotée par quatre interfaces dédiées : deux cockpits d'appel (un pour moi, un pour Manuel, qui passe les appels au quotidien) pour gérer les appels et suivre l'historique de chaque sponsor, une interface pour la personne qui établit les devis et les factures afin qu'elle ait une vision d'ensemble, et un dashboard de pilotage donnant une vue globale de l'avancement du sponsoring de l'événement. Pendant un appel : historique du sponsor, statut de facturation, catalogue d'offres disponibles en temps réel, calcul automatique de la prochaine relance. Une automatisation Make génère même l'email de relance à partir des notes d'appel, grâce à Claude, avec ouverture directe dans Outlook.

**Résultats (au 27/07/2026, en cours de mission) :** 87 partenaires suivis, 77 appels loggés, 21 engagements représentant 32 600 € suivis dans l'outil, dont 6 100 € déjà réglés.

**Statut :** ce projet est le support de ma soutenance **RNCP41480BC03**, prévue en septembre 2026. La mission Légumes de France elle-même se poursuit jusqu'en janvier 2027 (voir la partie Communication).

**Ce que ça démontre :** diagnostiquer un existant avant de construire (l'audit de l'Excel a précédé toute décision technique), concevoir un modèle de données relationnel en autonomie complète, et piloter un copilote IA sans lui déléguer le jugement métier. Chaque proposition de l'IA a été validée ou refusée, jamais acceptée par défaut.`,
  },
  {
    heading: "Pépettes en famille — Une application de suivi budgétaire, du besoin réel au produit en production",
    body: `**Contexte :** un classeur Excel géré en couple depuis plusieurs années : transactions importées à la main depuis les relevés bancaires, prévisionnel hebdomadaire sur 21 catégories, catégorisation via une formule \`SEARCH()\` géante, complétée manuellement à chaque nouvelle enseigne. Ça fonctionnait, mais impossible de savoir si le compte allait passer dans le rouge dans trois semaines, rien de partagé en temps réel entre les deux, aucun accès mobile. L'objectif : reprendre exactement la logique du classeur, mais interactive, partagée, et capable de répondre à la question qui compte vraiment, tenir jusqu'à la fin de l'année.

**Ce que j'ai construit :** une application web privée (Next.js, TypeScript, Supabase/Postgres), à deux comptes, sans inscription publique, hébergée sur Vercel, avec Claude Code comme partenaire de développement.

Les données entrent par trois voies : synchronisation bancaire automatique via un agrégateur open banking connecté au Crédit Agricole, import CSV avec détection automatique du format selon la banque, ou import PDF de relevé avec extraction de texte côté navigateur. Dans les trois cas, catégorisation automatique par une centaine de règles de mots-clés reprises de l'Excel d'origine, détection des doublons, et un écran de revue obligatoire avant toute écriture en base : rien n'est jamais inséré sans validation humaine.

Le tableau de bord donne le solde, le reste à vivre du mois, et surtout une projection du solde semaine par semaine jusqu'à fin d'année, avec alerte automatique si le prévisionnel passe sous 0 €. Le budget se pilote sur une grille hebdomadaire par catégorie, avec un assistant qui propose un montant prévisionnel (moyenne des mois actifs ou lissage sur 12 mois), et un calcul automatique de la clé de répartition du compte commun : à partir du salaire renseigné par chacun, l'application détermine combien chaque membre du couple doit y verser, avec suivi des versements réels. Une vue comparaison confronte prévisionnel et réel semaine par semaine, et une année sur l'autre.

La pièce la plus originale : le Compagnon, un assistant budgétaire à trois personnalités possibles, qui commente la situation financière avec un ton réellement différent selon le profil choisi, pas un simple habillage graphique : la génération de texte adapte le vocabulaire et l'attitude.

Sécurité soignée sur un sujet sensible : authentification à deux facteurs (TOTP, QR code), verrouillage de compte après tentatives répétées, chiffrement, Row Level Security activé sur toutes les tables Postgres (la clé publique de l'application n'a accès à rien, seul le serveur peut lire et écrire). Interface pensée mobile d'abord, le couple l'utilisant autant sur téléphone que sur ordinateur.

**En chiffres :** 43 commits, 84 tests automatisés sur la logique métier, 12 migrations de base de données versionnées, ~120 règles de catégorisation migrées de l'Excel d'origine. En production, utilisée quotidiennement par le couple depuis plusieurs mois ; les fonctionnalités les plus riches (synchronisation bancaire, assistant de personnalité, répartition du capital, double authentification) sont arrivées par itérations successives après la mise en production initiale, au fil des besoins identifiés dans l'usage réel.

**Ce que ça démontre :** je ne suis pas resté sur le strict No-Code, j'ai piloté un développement complet (authentification, sécurité des données financières, tests automatisés) sans formation de développeur, brique par brique, chaque étape validée avant la suivante : projet vide déployé et connecté à la base, puis authentification, puis import et catégorisation, puis budget, puis tableau de bord. Je garde la main sur toutes les décisions produit et je teste chaque brique en conditions réelles avant de la valider ; Claude Code s'occupe de l'implémentation et de la sécurité, jamais de génération de code à l'aveugle.`,
  },
  {
    heading: "Stage MODE 83 — Auditer, cadrer et sécuriser l'automatisation IA d'un organisme de formation",
    body: `**Contexte :** MODE 83, organisme de formation certifié Qualiopi, lance sa toute première formation en digital learning. Sa responsable pédagogique s'appuyait déjà sur un écosystème No-Code/IA fait maison (ChatGPT, Airtable, Make), construit au fil de l'eau, sans architecture pensée en amont. Stage réalisé en binôme avec **Fethi Bouzina**, chacun sur son propre parcours de certification.

**Ce que nous avons fait :** un audit complet de l'existant (4 bases Airtable, incohérences de données, écrans fantômes), puis un cadrage serré du projet : la vision initiale prévoyait d'automatiser de bout en bout la production d'une formation, du script à la vidéo montée. Mon rôle a été de confronter cette ambition à la réalité (coûts, fiabilité, risques d'hallucination IA) pour proposer un MVP réaliste. Résultat : le retrait du montage vidéo du périmètre a fait passer le budget horaire de 82 à 107h à 47 à 62h. Trois automatisations Make ont ensuite été construites en collaboration, chacune avec une porte de validation humaine obligatoire, la dernière (génération des visuels) prise en main directement par Fethi.

Un chiffrage concret a aussi pesé sur les décisions : une version « tout IA avec avatars vidéo » tournait autour de 1000 €/mois, contre 100 à 110 €/mois pour la version raisonnable. Ce chiffrage a directement influencé le choix de MODE 83 de repousser les avatars vidéo.

**Statut :** projet terminé, documentation de passation comprise (réalisée par Fethi, avec mon appui).

**Ce que ça démontre :** une vraie posture de consultant, capable de remettre en question une ambition trop large sans la rejeter, de documenter chaque décision pour qu'une autre personne puisse reprendre le projet, et d'arbitrer entre vision cible et MVP réaliste sous contrainte de temps réelle. Et une capacité à travailler en binôme sur un projet technique commun, chacun apportant sa contribution sur des blocs identifiés.`,
  },
];

export const PRODUIT_SYNTHESE: NarrativeSection = {
  heading: "Ce que ces projets démontrent",
  body: `- Je pars toujours d'un problème réel, jamais d'un exercice : un Excel qui ne tient plus la route, une organisation sans architecture de données, un budget de couple géré à la main.
- Je pilote l'IA, je ne la subis pas : chaque proposition d'un copilote IA (Claude, ChatGPT) est validée ou refusée avec un argument métier, jamais acceptée par défaut.
- Je documente en pensant transmission : un projet que je construis doit pouvoir être repris par quelqu'un qui ne l'a jamais vu.
- Je sais dire non à une ambition trop grande : arbitrer un MVP réaliste plutôt que foncer sur une vision séduisante mais fragile, ça fait aussi partie du métier.
- Je ne transige pas sur la rigueur des données, surtout quand elles sont sensibles (finances d'un foyer, données réelles d'un partenaire commercial).`,
};

export const PRODUIT_A_VENIR: NarrativeSection = {
  heading: "À venir : le site portfolio lui-même",
  body: `Une fois construit, ce site sera lui-même un projet Product Builder à part entière, à documenter comme 4e réalisation une fois en ligne (contexte, choix techniques, résultat).`,
};

export const PRODUIT_OUTILS: string[] = [
  "Notion",
  "Airtable",
  "Make",
  "n8n",
  "Postman / API REST",
  "Figma",
  "Softr",
  "Webflow",
  "Lovable",
  "Supabase",
  "Vercel",
  "ElevenLabs",
  "Google Flow",
];

export const PRODUIT_OUTILS_IA: string[] = ["Claude (Cowork/Desktop)", "Claude Code", "Claude in Chrome", "ChatGPT"];

export const PRODUIT_VISUELS: string[] = [
  "Cockpit d'Appel : capture des interfaces (cockpits d'appel, interface facturation, dashboard de pilotage), schéma de la base de données à 6 tables, capture du scénario Make.",
  "Pépettes en famille : capture du tableau de bord et du Compagnon (données anonymisées/fictives), schéma d'architecture technique. Pas de capture brute de l'application en l'état, elle contient des données financières réelles du foyer.",
  "MODE 83 : schéma d'architecture Airtable/Make (anonymisé), extrait du document de cadrage, logo MODE 83 si autorisation obtenue.",
  "Formation : logo DataSuits x Panthéon-Sorbonne, certificat de réussite une fois obtenu.",
  "Site portfolio : capture d'écran une fois en ligne.",
];
