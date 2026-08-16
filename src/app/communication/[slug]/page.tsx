import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PROJECTS,
  COMPETENCES,
  getProjectBySlug,
  getCompany,
  getPiecesForProject,
} from "@/data/communication";
import { renderCorps } from "@/lib/markdown";
import styles from "./fiche.module.css";

// Fiche projet complète — lot 5. Ouverte depuis une carte ou un tag "+N" de
// /communication. Liste toutes les compétences (pas seulement les 3 affichées
// sur la carte) et les pièces écrites rattachées (liens vers leur page à venir
// au lot 7 — pour l'instant, juste le titre et le statut).

type FicheParams = { slug: string };

export function generateStaticParams(): FicheParams[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<FicheParams> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: project ? `${project.title} — Jérôme Le Rhun` : "Fiche introuvable",
  };
}

export default async function FichePage({ params }: { params: Promise<FicheParams> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const company = getCompany(project.company);
  const pieces = getPiecesForProject(project);

  return (
    <main className={styles.page}>
      <Link href="/communication" className={styles.back}>
        ← Retour à Communication
      </Link>

      <p className={styles.company}>
        {company.name} — {company.poste}
      </p>
      <h1 className={styles.title}>
        {project.number}. {project.title}
      </h1>
      <p className={styles.pitch}>{project.pitch}</p>

      <div className={styles.tags}>
        {project.competences.map((competenceSlug) => (
          <span key={competenceSlug} className={styles.tag}>
            {COMPETENCES.find((c) => c.slug === competenceSlug)?.label}
          </span>
        ))}
      </div>

      <div className={styles.corps}>{renderCorps(project.corps)}</div>

      <div className={styles.placeholder}>
        <strong>Visuels à prévoir :</strong> {project.visuelsAPrevoir}
      </div>

      {pieces.length > 0 && (
        <div className={styles.pieces}>
          <h2>Pièces écrites liées</h2>
          <ul>
            {pieces.map((piece) => (
              <li key={piece.id}>
                <span className={styles.pieceTitre}>{piece.titre}</span>
                <span className={styles.pieceStatut}>
                  {piece.statut === "confirme"
                    ? "texte disponible — page à venir (lot 7)"
                    : "sélection en cours"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
