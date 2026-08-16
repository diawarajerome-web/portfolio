import Link from "next/link";
import {
  COMPANIES,
  COMPETENCES,
  ACCROCHE_COMMUNICATION,
  getProjectsByCompany,
  type CompetenceSlug,
  type ProjectCard as ProjectCardType,
} from "@/data/communication";
import styles from "./communication.module.css";

// Écran réel du lot 5 : remplace l'ancienne page brute de vérification du lot 4.
// Deux vues sur la même donnée (src/data/communication.ts) : par entreprise
// (défaut, filtre compétence en surcouche) et résumé CV.
//
// Choix technique : tout est rendu côté serveur, l'onglet et le filtre sont de
// simples liens qui changent l'URL (?vue=cv, ?competences=slug1,slug2), pas de
// JavaScript côté client. Deux raisons : (1) l'état est persistant dans l'URL
// par construction, donc chaque vue filtrée est un lien partageable en
// candidature (décision actée) ; (2) la page est la plus importante du site
// pour les recruteurs, elle doit être lisible immédiatement (et indexable par
// Google) sans attendre que du JavaScript s'exécute dans le navigateur.
//
// Design neutre (gris + un accent bleu) : pas encore de direction artistique
// validée pour le site, ce sera repris quand la partie visuelle sera tranchée.

export const metadata = {
  title: "Communication — Jérôme Le Rhun",
  description:
    "17 ans d'expérience en communication et marketing, 18 projets classés par entreprise ou par compétence.",
};

type SearchParams = { vue?: string; competences?: string };

export default async function CommunicationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const vue: "entreprise" | "cv" = params.vue === "cv" ? "cv" : "entreprise";
  const selected = (params.competences ? params.competences.split(",") : []).filter(
    Boolean
  ) as CompetenceSlug[];

  function hrefFor(next: { vue?: "entreprise" | "cv"; competences?: CompetenceSlug[] }): string {
    const usp = new URLSearchParams();
    const nextVue = next.vue ?? vue;
    const nextCompetences = next.competences ?? selected;
    if (nextVue === "cv") usp.set("vue", "cv");
    if (nextCompetences.length > 0) usp.set("competences", nextCompetences.join(","));
    const qs = usp.toString();
    return qs ? `/communication?${qs}` : "/communication";
  }

  function matchesFilter(project: ProjectCardType) {
    if (selected.length === 0) return true;
    return project.competences.some((c) => selected.includes(c));
  }

  const noResults = COMPANIES.every(
    (c) => getProjectsByCompany(c.slug).filter(matchesFilter).length === 0
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Communication</p>
        <blockquote className={styles.accroche}>{ACCROCHE_COMMUNICATION}</blockquote>
      </header>

      <div className={styles.tabs} role="tablist">
        <Link
          href={hrefFor({ vue: "entreprise" })}
          role="tab"
          aria-selected={vue === "entreprise"}
          className={vue === "entreprise" ? styles.tabActive : styles.tab}
        >
          Par entreprise
        </Link>
        <Link
          href={hrefFor({ vue: "cv" })}
          role="tab"
          aria-selected={vue === "cv"}
          className={vue === "cv" ? styles.tabActive : styles.tab}
        >
          Résumé CV
        </Link>
      </div>

      {vue === "entreprise" ? (
        <div className={styles.layout}>
          <aside className={styles.filterPanel} aria-label="Filtrer par compétence">
            <div className={styles.filterHeader}>
              <span>Filtrer par compétence</span>
              {selected.length > 0 && (
                <Link href={hrefFor({ competences: [] })} className={styles.clearButton}>
                  Réinitialiser
                </Link>
              )}
            </div>
            <ul className={styles.filterList}>
              {COMPETENCES.map((c) => {
                const active = selected.includes(c.slug);
                const nextCompetences = active
                  ? selected.filter((s) => s !== c.slug)
                  : [...selected, c.slug];
                return (
                  <li key={c.slug}>
                    <Link
                      href={hrefFor({ competences: nextCompetences })}
                      className={active ? styles.filterChipActive : styles.filterChip}
                      aria-pressed={active}
                    >
                      {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className={styles.companies}>
            {COMPANIES.map((company) => {
              const projects = getProjectsByCompany(company.slug).filter(matchesFilter);
              if (projects.length === 0) return null;

              return (
                <section key={company.slug} className={styles.companySection}>
                  <div className={styles.companyHeader}>
                    <h2>
                      {company.name}
                      <span className={styles.dateRange}>
                        {" "}
                        — {company.dateRange}
                        {company.ongoing ? " · mission en cours" : ""}
                      </span>
                    </h2>
                    <p className={styles.poste}>{company.poste}</p>
                    <p className={styles.contexte}>{company.contexte}</p>
                  </div>

                  <div className={projects.length === 1 ? styles.projectGridSingle : styles.projectGrid}>
                    {projects.map((project) => (
                      <ProjectCardTile key={project.number} project={project} />
                    ))}
                  </div>
                </section>
              );
            })}

            {noResults && (
              <p className={styles.empty}>Aucune fiche ne correspond aux compétences sélectionnées.</p>
            )}
          </div>
        </div>
      ) : (
        <ResumeCV />
      )}
    </main>
  );
}

function ProjectCardTile({ project }: { project: ProjectCardType }) {
  const visibleTags = project.competences.slice(0, 3);
  const extra = project.competences.length - visibleTags.length;

  return (
    <Link href={`/communication/${project.slug}`} className={styles.card}>
      <p className={styles.cardNumber}>{project.number}</p>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardPitch}>{project.pitch}</p>
      <div className={styles.cardTags}>
        {visibleTags.map((slug) => (
          <span key={slug} className={styles.tag}>
            {COMPETENCES.find((c) => c.slug === slug)?.label}
          </span>
        ))}
        {extra > 0 && <span className={styles.tagMore}>+{extra}</span>}
      </div>
    </Link>
  );
}

function ResumeCV() {
  return (
    <div className={styles.cv}>
      {COMPANIES.map((company) => {
        const projects = getProjectsByCompany(company.slug);
        return (
          <section key={company.slug} className={styles.cvSection}>
            <div className={styles.cvHeader}>
              <h2>{company.name}</h2>
              <span className={styles.dateRange}>
                {company.dateRange}
                {company.ongoing ? " · en cours" : ""}
              </span>
            </div>
            <p className={styles.poste}>{company.poste}</p>
            <ul className={styles.cvList}>
              {projects.map((project) => (
                <li key={project.number}>
                  <Link href={`/communication/${project.slug}`} className={styles.cvItemLink}>
                    <span className={styles.cvItemTitle}>{project.title}</span>
                    <span className={styles.cvItemPitch}>{project.pitch}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
