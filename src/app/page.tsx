import Link from "next/link";
import styles from "./page.module.css";

// Écran réel du lot 8 : home, carrefour à trois portes (pas de scroll linéaire
// imposé — un recruteur ne doit pas atterrir sur la BD). Les textes de cette
// page (accroche, pitchs des trois portes, bloc contact) sont des propositions
// UX/design de ma part : rien n'est spécifié dans le document de contenu pour
// la home, à ajuster librement.
//
// CTA bleu ("Voir le parcours") réservé à la carte Communication, conformément
// à la décision actée dans le wireframe v1.
//
// CV : lien vers /cv.pdf en attente du fichier — à déposer dans public/cv.pdf
// quand il sera prêt (même logique que les autres placeholders du site).

export const metadata = {
  title: "Jérôme Le Rhun — Portfolio",
  description:
    "Communication, Produit, Créativité — 17 ans d'expérience et une reconversion vers le Product Building augmenté par l'IA.",
};

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Jérôme Le Rhun</p>
        <h1 className={styles.name}>Communication, marketing, et un virage vers le Product Building IA</h1>
        <p className={styles.tagline}>
          17 ans d&rsquo;expérience en communication et marketing. Aujourd&rsquo;hui en formation Product
          Builder No-Code &amp; IA, avec des réalisations concrètes à l&rsquo;appui. Trois entrées ci-dessous
          selon ce que vous cherchez.
        </p>
        <a className={styles.cvLink} href="/cv.pdf">
          Télécharger le CV (PDF)
        </a>
      </header>

      <section className={styles.doors}>
        <Link href="/communication" className={`${styles.door} ${styles.doorPrimary}`}>
          <p className={styles.doorEyebrow}>Communication</p>
          <h2 className={styles.doorTitle}>17 ans d&rsquo;expérience</h2>
          <p className={styles.doorPitch}>
            Communication interne et externe, relations presse, communication de crise, éditorial — le
            parcours complet, entreprise par entreprise.
          </p>
          <span className={`${styles.doorCta} ${styles.doorCtaPrimary}`}>Voir le parcours →</span>
        </Link>

        <Link href="/produit" className={styles.door}>
          <p className={styles.doorEyebrow}>Produit</p>
          <h2 className={styles.doorTitle}>Product Builder No-Code &amp; IA</h2>
          <p className={styles.doorPitch}>
            La formation en cours et trois réalisations concrètes, dont une application complète en
            production.
          </p>
          <span className={`${styles.doorCta} ${styles.doorCtaSecondary}`}>Découvrir →</span>
        </Link>

        <Link href="/creativite" className={styles.door}>
          <p className={styles.doorEyebrow}>Créativité</p>
          <h2 className={styles.doorTitle}>Super-Humains</h2>
          <p className={styles.doorPitch}>
            Une bande dessinée de super-héros en développement depuis huit ans, bientôt en campagne de
            financement participatif.
          </p>
          <span className={`${styles.doorCta} ${styles.doorCtaSecondary}`}>Découvrir →</span>
        </Link>
      </section>

      <section className={styles.contact}>
        <div className={styles.contactBlock}>
          <p className={styles.contactHeading}>Vous recrutez ?</p>
          <p className={styles.contactText}>
            Je suis en recherche active d&rsquo;un poste en communication, marketing ou digital.
          </p>
          <a
            className={styles.contactLink}
            href="mailto:diawara.jerome@gmail.com?subject=Candidature%20—%20poste%20communication%2Fmarketing"
          >
            Me contacter →
          </a>
        </div>

        <div className={styles.contactBlock}>
          <p className={styles.contactHeading}>Vous avez un projet ?</p>
          <p className={styles.contactText}>
            No-Code, IA appliquée, automatisation — parlons de ce que vous cherchez à construire.
          </p>
          <a
            className={styles.contactLink}
            href="mailto:diawara.jerome@gmail.com?subject=Contact%20—%20projet%20No-Code%20%26%20IA"
          >
            Me contacter →
          </a>
        </div>
      </section>
    </main>
  );
}
