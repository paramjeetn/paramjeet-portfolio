import Link from "next/link";

const projects = [
  {
    slug: "promptforge",
    name: "PromptForge",
    stack: ["GKE", "GCS", "Firestore", "LiteLLM", "Pulumi", "OTel"],
    summary:
      "Distributed LLM batch processing platform. GCS upload → Eventarc → Cloud Run → dedicated GKE pod per job. Memory-constant streaming — a 10M-prompt job uses the same pod memory as 100.",
    links: [
      {
        label: "Code",
        href: "https://github.com/paramjeetn/PromptForge-Distributed-LLM-Job-Processing-Platform",
      },
      { label: "API Docs", href: "https://promptforge-e6183f23.mintlify.app/introduction" },
    ],
  },
  {
    slug: "pr-scrutiny",
    name: "PR Scrutiny",
    stack: ["TypeScript", "Hono", "Vercel AI SDK", "GCP", "Firestore", "KMS"],
    summary:
      "Production GitHub App — 4 specialist agents (Security, Quality, Blast Radius, LLM) run in parallel on every PR, posting structured inline comments on the diff. 222 passing tests.",
    links: [
      { label: "Code", href: "https://github.com/paramjeetn/pr-scrutiny" },
      { label: "App", href: "https://github.com/apps/pr-scrutiny" },
    ],
  },
  {
    slug: "myself-engineer",
    name: "Myself.engineer",
    stack: ["Next.js", "TypeScript", "Gemini AI", "Redis", "AWS S3"],
    summary:
      "AI SaaS converting résumé PDFs into live portfolio sites via structured LLM parsing. 45% latency reduction via Redis caching + S3.",
    links: [
      { label: "Code", href: "https://github.com/paramjeetn/myself.engineer" },
      { label: "Live", href: "https://www.myself.engineer/" },
    ],
  },
  {
    slug: "ragbench",
    name: "RAGBench",
    stack: ["FastAPI", "Qdrant", "PostgreSQL", "Next.js", "Docker"],
    summary:
      "No-code RAG evaluation platform for plug-and-play experimentation across chunking strategies, retrieval modes, and LLM configs. Hybrid retrieval: BM25 + dense + RRF.",
    links: [{ label: "Code", href: "https://github.com/paramjeetn/RagBench" }],
  },
];

export default function Projects() {
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
        Projects
      </h1>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 2.5rem" }}>
        Things I&apos;ve built. Each has its own page with the full story.
      </p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            style={{
              display: "block",
              padding: "1.125rem 0",
              borderTop: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1, paddingRight: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.375rem" }}>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--fg)" }}>
                    {p.name}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted)",
                    margin: "0 0 0.625rem",
                    lineHeight: 1.55,
                  }}
                >
                  {p.summary}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.stack.map((t) => (
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
              <span style={{ color: "var(--muted)", fontSize: "0.875rem", flexShrink: 0 }}>→</span>
            </div>
          </Link>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </div>
  );
}
