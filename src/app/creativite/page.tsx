import { CREATIVITE_ACCROCHE, CREATIVITE_SECTIONS, CREATIVITE_VISUELS } from "@/data/creativite";
import { renderCorps } from "@/lib/markdown";
import styles from "@/styles/narrative.module.css";

// Écran réel du lot 6 : partie Créativité (Super-Humains). Gabarit narratif
// simple, décision actée — pas de base de données ni de filtres comme la partie
// Communication, un enchaînement de sections dans l'ordre validé du document de
// contenu. Design neutre, cohérent avec le reste du site, pas encore la
// direction artistique finale.

export const metadata = {
  title: "Créativité — Jérôme Le Rhun",
  description: "Super-Humains, une bande dessinée de super-héros en développement depuis huit ans.",
};

export default function CreativitePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Créativité</p>
        <blockquote className={styles.accroche}>{CREATIVITE_ACCROCHE}</blockquote>
      </header>

      {CREATIVITE_SECTIONS.map((section) => (
        <section key={section.heading} className={section.secondary ? styles.sectionSecondary : styles.section}>
          <h2 className={styles.sectionHeading}>{section.heading}</h2>
          <div className={styles.body}>{renderCorps(section.body)}</div>
        </section>
      ))}

      <div className={styles.placeholder}>
        <p className={styles.placeholderTitle}>Visuels à prévoir</p>
        <ul>
          {CREATIVITE_VISUELS.map((visuel) => (
            <li key={visuel}>{visuel}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
