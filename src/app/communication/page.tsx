import { COMPANIES, PROJECTS, PIECES_ECRITES, getProjectsByCompany } from "@/data/communication";

// Page de verification brute du lot 4 -- pas de design, juste pour confirmer que
// les donnees (6 entreprises, 18 fiches, pieces ecrites) s'affichent correctement
// avant de construire le vrai ecran du lot 5 (vue par entreprise + filtre + resume CV).

export default function CommunicationPreview() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial, Helvetica, sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h1>Communication -- apercu brut des donnees (lot 4)</h1>
      <p style={{ color: "#666" }}>
        {PROJECTS.length} fiches, {COMPANIES.length} entreprises, {PIECES_ECRITES.length} pieces ecrites referencees.
        Page de verification uniquement, sans design -- le vrai ecran (filtres, vue resume CV) arrive au lot 5.
      </p>

      {COMPANIES.map((company) => (
        <section key={company.slug} style={{ marginBottom: 40, borderTop: "1px solid #ddd", paddingTop: 20 }}>
          <h2>
            {company.name} ({company.dateRange}
            {company.ongoing ? ", mission en cours" : ""})
          </h2>
          <p style={{ color: "#555" }}>
            {company.poste} -- {company.posteDates}
          </p>

          {getProjectsByCompany(company.slug).map((project) => (
            <div key={project.number} style={{ marginBottom: 20, paddingLeft: 16, borderLeft: "3px solid #eee" }}>
              <h3>
                {project.number}. {project.title}
              </h3>
              <p style={{ fontStyle: "italic" }}>{project.pitch}</p>
              <p>
                <strong>Competences :</strong> {project.competences.join(", ")}
              </p>
              <p>
                <strong>Visuels a prevoir :</strong> {project.visuelsAPrevoir}
              </p>
              {project.pieceEcriteIds.length > 0 && (
                <p>
                  <strong>Pieces ecrites :</strong>{" "}
                  {project.pieceEcriteIds
                    .map((id) => PIECES_ECRITES.find((p) => p.id === id)?.titre ?? id)
                    .join(" - ")}
                </p>
              )}
              <details>
                <summary>Corps complet</summary>
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{project.corps}</pre>
              </details>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
