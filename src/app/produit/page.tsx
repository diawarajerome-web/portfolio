import {
  PRODUIT_ACCROCHE,
  PRODUIT_INTRO,
  PRODUIT_PROJETS,
  PRODUIT_SYNTHESE,
  PRODUIT_A_VENIR,
  PRODUIT_OUTILS,
  PRODUIT_OUTILS_IA,
  PRODUIT_VISUELS,
} from "@/data/produit";
import { renderCorps } from "@/lib/markdown";
import styles from "@/styles/narrative.module.css";

// Écran réel du lot 6 : partie Produit (formation Product Builder No-Code & IA
// + 3 réalisations). Même gabarit narratif simple que Créativité.

export const metadata = {
  title: "Produit — Jérôme Le Rhun",
  description: "Formation Product Builder No-Code & IA, et trois réalisations concrètes.",
};

export default function ProduitPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Produit</p>
        <blockquote className={styles.accroche}>{PRODUIT_ACCROCHE}</blockquote>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{PRODUIT_INTRO.heading}</h2>
        <div className={styles.body}>{renderCorps(PRODUIT_INTRO.body)}</div>
      </section>

      {PRODUIT_PROJETS.map((projet) => (
        <div key={projet.heading} className={styles.projectCard}>
          <h2 className={styles.sectionHeading}>{projet.heading}</h2>
          <div className={styles.body}>{renderCorps(projet.body)}</div>
        </div>
      ))}

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{PRODUIT_SYNTHESE.heading}</h2>
        <div className={styles.body}>{renderCorps(PRODUIT_SYNTHESE.body)}</div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Outils maîtrisés</h2>
        <div className={styles.pillGroup}>
          <p className={styles.pillGroupLabel}>No-code & produit</p>
          <div className={styles.pills}>
            {PRODUIT_OUTILS.map((outil) => (
              <span key={outil} className={styles.pill}>
                {outil}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.pillGroup}>
          <p className={styles.pillGroupLabel}>IA générative</p>
          <div className={styles.pills}>
            {PRODUIT_OUTILS_IA.map((outil) => (
              <span key={outil} className={styles.pill}>
                {outil}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{PRODUIT_A_VENIR.heading}</h2>
        <div className={styles.body}>{renderCorps(PRODUIT_A_VENIR.body)}</div>
      </section>

      <div className={styles.placeholder}>
        <p className={styles.placeholderTitle}>Visuels à prévoir</p>
        <ul>
          {PRODUIT_VISUELS.map((visuel) => (
            <li key={visuel}>{visuel}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
