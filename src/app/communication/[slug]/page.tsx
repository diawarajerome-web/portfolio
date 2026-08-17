import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PROJECTS,
  COMPETENCES,
  getProjectBySlug,
  getCompany,
  getPiecesForProject,
  pieceStatusLabel,
} from "@/data/communication";
import { renderCorps } from "@/lib/markdown";
import styles from "./fiche.module.css";

// Fiche projet complète — lot 5. Ouverte depuis une carte ou un tag "+N" de
// /communication. Liste toutes les compétences (pas seulement les 3 affichées
// sur la carte) et les pièces écrites rattachées : titre cliquable vers
// /pieces/[id] quand le texte intégral est disponible (lot 7), sinon statut
// affiché (sélection en cours / à vérifier / texte introuvable).

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
      <h1 className={styles.title}>{project.title}</h1>
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
                {piece.texteDisponibleDansLeRepo ? (
                  <Link href={`/pieces/${piece.id}`} className={styles.pieceTitre}>
                    {piece.titre}
                  </Link>
                ) : (
                  <span className={styles.pieceTitre}>{piece.titre}</span>
                )}
                <span className={styles.pieceStatut}>{pieceStatusLabel(piece)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
