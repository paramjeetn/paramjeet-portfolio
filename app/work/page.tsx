const roles = [
  {
    company: "Novarroh Technologies",
    title: "AI Engineer Intern",
    period: "July 2025 – Sept 2025",
    location: "Remote",
    stack: ["Google ADK", "Python", "LiteLLM", "GCP"],
    sections: [
      {
        heading: "What I built",
        body: `The problem: LLM system prompts encode behavioral rules — "never discuss competitors", "always respond formally", "must not reveal pricing". Testing whether an LLM actually follows those rules at inference time is tedious manual work. My job was to automate it.

I built a pipeline that takes a system prompt as input and outputs a complete adversarial test suite — hundreds of prompts designed to break each rule, across every angle of attack.`,
      },
      {
        heading: "Pipeline architecture",
        body: `The pipeline runs in two stages. First, a parser extracts typed behavioral norms from the system prompt — classifying each rule as MUST/SHOULD/MAY with actor, condition, and action fields. A 50-norm system prompt typically yields 40–55 extracted rules after deduplication.

Second, for each norm, a 4-stage SequentialAgent generates adversarial prompts: (1) sieve — confirm the norm is testable, (2) goal cluster — group related norms, (3) coverage plan — decide which adversarial techniques to apply, (4) prompt generation. All 50 dimensions run in parallel — one SequentialAgent per dimension, spawned dynamically at runtime.`,
      },
      {
        heading: "Map-Elites for coverage",
        body: `The naive approach — random sampling across adversarial techniques — clustered around easy cases. You'd get 40 variations of "ignore previous instructions" and zero prompts testing multi-turn persona switching.

I adapted Map-Elites, a quality-diversity algorithm, to maintain a coverage map across 8 adversarial techniques × 50 norm dimensions. The algorithm explicitly rewards filling empty cells, ensuring every (technique, norm) pair gets tested. After 200 iterations on a customer service prompt, Map-Elites covered all 50 dimensions vs 31 for random sampling.`,
      },
      {
        heading: "Scale",
        body: `A single test run against a 50-norm system prompt generates hundreds of LLM calls in parallel. Each generated prompt carries metadata: norm ID, adversarial technique used, evaluation criteria, and violation behavior. This makes the test suite actionable — not just "the LLM failed" but "norm #14 failed under persona injection, expected X, got Y".`,
      },
    ],
  },
  {
    company: "Yonata Software Pvt Ltd",
    title: "Software Engineer Intern",
    period: "July 2024 – Sept 2024",
    location: "Remote",
    stack: ["Python", "Weaviate", "Mistral", "FastAPI", "Next.js"],
    sections: [
      {
        heading: "What I built",
        body: `A clinical RAG pipeline for a cardiovascular and diabetes pilot. The system matched 800 synthetic patient profiles against 10,000 chunks of clinical guidelines, and surfaced recommendations through a validation platform used by five physicians.`,
      },
      {
        heading: "Ingestion pipeline",
        body: `Clinical guidelines come as PDFs with tables, numbered lists, and embedded figures. I used Mistral to convert PDFs to markdown before chunking — this preserved table structure better than naive text extraction, which matters for dose tables and diagnostic criteria.

Chunks were indexed in Weaviate with a metadata schema separating searchable index from full document storage: guideline name, section, condition, evidence grade. This allowed filtering by condition and evidence grade before vector search, dramatically reducing the candidate set.`,
      },
      {
        heading: "The 89% recall problem",
        body: `Automated eval showed 89% retrieval recall — the relevant chunk appeared in the top-5 results 89% of the time. Felt good. Then the physicians rejected 40% of suggestions.

The gap: automated eval measured topical relevance, physicians measured clinical appropriateness. A patient with Type 2 diabetes and chronic kidney disease has different medication guidelines than one without CKD. Our retrieval found diabetes chunks (high recall) but missed comorbidity-specific sections (low clinical precision).

I added a second retrieval pass for comorbidities: a lightweight classifier extracted comorbidities from the patient profile, then ran a targeted search for sections mentioning those conditions in combination. Physician acceptance went from 60% to 79%.`,
      },
      {
        heading: "Validation platform",
        body: `Built a 5-physician review interface with per-section review, inline editing, and confidence scoring. The initial confidence score was raw cosine similarity — physicians learned to distrust it fast. We replaced it with a calibrated score: similarity × evidence grade weight × comorbidity match score. Still imperfect, but it incorporated clinical structure rather than pure semantic distance.`,
      },
    ],
  },
];

export default function Work() {
  return (
    <div style={{ paddingTop: "2rem" }}>
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          margin: "0 0 0.375rem",
          color: "var(--fg)",
        }}
      >
        Work
      </h1>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 2.5rem" }}>
        Internships — what I built and what I learned.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {roles.map((role) => (
          <div key={role.company}>
            {/* Role header */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  marginBottom: "0.375rem",
                }}
              >
                <span
                  style={{ fontSize: "1rem", fontWeight: 600, color: "var(--fg)" }}
                >
                  {role.company}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--muted)",
                    flexShrink: 0,
                  }}
                >
                  {role.period}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--accent)",
                    fontStyle: "italic",
                  }}
                >
                  {role.title} · {role.location}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {role.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.6875rem",
                      padding: "0.15em 0.5em",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      color: "var(--muted)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Role content */}
            <div className="prose">
              {role.sections.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
