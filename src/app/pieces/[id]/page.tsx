import { notFound } from "next/navigation";
import Link from "next/link";
import { PIECES_ECRITES, getPieceById, getProjectsForPiece } from "@/data/communication";
import { renderCorps } from "@/lib/markdown";
import { formatDateFr } from "@/lib/date";
import styles from "./piece.module.css";

// Gabarit de page article — lot 7. Une page par pièce écrite au texte intégral
// confirmé (piece.texteDisponibleDansLeRepo === true). Republication en HTML sur
// le domaine, jamais en PDF téléchargeable (décision actée) : indexable, lisible
// sur mobile, rattachée proprement à la ou les fiches projet concernées.
//
// Seules les pièces avec texte intégral en main génèrent une page. Les pièces en
// sélection en cours / à vérifier / texte manquant n'ont pas de route ici — elles
// restent listées avec leur statut sur la fiche projet (voir /communication/[slug]).

type PieceParams = { id: string };

export function generateStaticParams(): PieceParams[] {
  return PIECES_ECRITES.filter((p) => p.texteDisponibleDansLeRepo).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<PieceParams> }) {
  const { id } = await params;
  const piece = getPieceById(id);
  return {
    title: piece ? `${piece.titre} — Jérôme Le Rhun` : "Pièce introuvable",
  };
}

export default async function PiecePage({ params }: { params: Promise<PieceParams> }) {
  const { id } = await params;
  const piece = getPieceById(id);
  if (!piece || !piece.texteDisponibleDansLeRepo || !piece.texteIntegral) notFound();

  const projets = getProjectsForPiece(piece.id);
  const backHref = projets.length > 0 ? `/communication/${projets[0].slug}` : "/communication";

  return (
    <main className={styles.page}>
      <Link href={backHref} className={styles.back}>
        ← Retour à la fiche projet
      </Link>

      <p className={styles.eyebrow}>{piece.commanditaire}</p>
      <h1 className={styles.title}>{piece.titre}</h1>
      <p className={styles.meta}>
        {piece.date && <>{formatDateFr(piece.date)} — </>}
        {piece.supportOrigine}
      </p>

      {piece.attribution && <div className={styles.attribution}>{piece.attribution}</div>}

      <div className={styles.body}>{renderCorps(piece.texteIntegral)}</div>

      <div className={styles.footer}>
        {piece.sourceUrl && (
          <span>
            Publié à l&rsquo;origine sur{" "}
            <a href={piece.sourceUrl} target="_blank" rel="noopener noreferrer">
              {piece.sourceUrl}
            </a>
          </span>
        )}
        {projets.length > 0 && (
          <span>
            Rattaché à{" "}
            {projets.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && ", "}
                <Link href={`/communication/${p.slug}`}>{p.title}</Link>
              </span>
            ))}
          </span>
        )}
      </div>
    </main>
  );
}
