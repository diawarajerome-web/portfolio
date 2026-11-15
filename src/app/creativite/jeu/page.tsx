import Link from "next/link";
import narrative from "@/styles/narrative.module.css";
import styles from "./jeu.module.css";

export const metadata = {
  title: "Le jeu Super-Humains — Jérôme Le Rhun",
  description: "Une démo jouable de baston dans l'univers des Super-Humains, à jouer au clavier ou sur mobile.",
};

export default function JeuPage() {
  return (
    <main className={narrative.page}>
      <header className={narrative.header}>
        <p className={narrative.eyebrow}>Créativité · Super-Humains</p>
        <blockquote className={narrative.accroche}>
          Un petit jeu de baston pour tester les personnages de l&apos;univers en action.
        </blockquote>
      </header>

      <section className={narrative.section}>
        <iframe
          className={styles.frame}
          src="/super-humains-jeu/index.html"
          title="Super-Humains — démo de baston"
          allow="fullscreen; autoplay"
          loading="lazy"
        />
        <div className={styles.actions}>
          <a href="/super-humains-jeu/index.html" target="_blank" rel="noopener">
            Ouvrir en plein écran
          </a>
          <Link href="/creativite">← Retour à la Créativité</Link>
        </div>
        <p className={styles.note}>
          Prototype jouable. Clavier : flèches pour bouger (reculer = garde), Z ou ↑ pour sauter, J poing, L pied, E
          spécial. Uppercut : avancer + poing. Spécial 2 : avancer + spécial. Sur mobile, la croix et les trois
          boutons s&apos;affichent à l&apos;écran (le mode paysage est plus confortable).
        </p>
      </section>
    </main>
  );
}
