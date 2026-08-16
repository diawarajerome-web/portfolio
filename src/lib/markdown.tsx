import { Fragment, type ReactNode } from "react";

/**
 * Rendu minimal du markdown utilisé dans les champs de contenu verbatim
 * (src/data/communication.ts, creativite.ts, produit.ts) : gras **, italique *,
 * code `en ligne`, listes à puces "- ". Pas de dépendance externe : le texte
 * source est entièrement maîtrisé (verbatim depuis le document de contenu final),
 * pas besoin d'un vrai parseur markdown pour couvrir ces cas.
 */

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function renderCorps(corps: string): ReactNode {
  const blocks = corps.split(/\n\n+/).filter((b) => b.trim().length > 0);

  return blocks.map((block, i) => {
    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    const isList = lines.length > 0 && lines.every((l) => l.trim().startsWith("- "));

    if (isList) {
      return (
        <ul key={i}>
          {lines.map((line, j) => (
            <li key={j}>{renderInline(line.trim().slice(2))}</li>
          ))}
        </ul>
      );
    }

    return <p key={i}>{renderInline(block)}</p>;
  });
}
