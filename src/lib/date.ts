const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** Formate une date ISO ("2025-02-07") en "7 février 2025". */
export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MOIS[m - 1]} ${y}`;
}
