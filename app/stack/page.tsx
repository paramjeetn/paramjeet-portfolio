const sections = [
  {
    title: "Languages",
    items: [
      { name: "Python", note: "primary — scripts, agents, data pipelines" },
      { name: "TypeScript", note: "everything frontend and Node backend" },
    ],
  },
  {
    title: "Backend & Infra",
    items: [
      { name: "FastAPI", note: "async Python APIs" },
      { name: "Hono", note: "edge-first TypeScript API framework" },
      { name: "Node.js", note: "general server-side TS/JS" },
      { name: "Docker", note: "containerization, local dev parity" },
      { name: "GCP (GKE, GCS, Cloud Run, Firestore, KMS)", note: "primary cloud" },
      { name: "AWS (S3)", note: "object storage" },
      { name: "Pulumi", note: "infra as code — TypeScript" },
    ],
  },
  {
    title: "AI / LLM",
    items: [
      { name: "Google ADK", note: "agent framework for multi-step LLM pipelines" },
      { name: "LangGraph", note: "stateful agent graphs" },
      { name: "LiteLLM", note: "unified LLM proxy, rate limiting" },
      { name: "Vercel AI SDK", note: "streaming LLM responses in Next.js" },
      { name: "MCP", note: "Model Context Protocol for tool-calling" },
      { name: "RAG", note: "retrieval-augmented generation systems" },
    ],
  },
  {
    title: "Databases & Vector Stores",
    items: [
      { name: "PostgreSQL", note: "primary relational DB" },
      { name: "Redis", note: "caching, pub/sub" },
      { name: "Firestore", note: "real-time NoSQL on GCP" },
      { name: "Qdrant", note: "vector search, production RAG" },
      { name: "Weaviate", note: "multimodal vector store" },
      { name: "ChromaDB", note: "local RAG experimentation" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "Next.js", note: "app router, RSC, SSR" },
      { name: "Tailwind CSS", note: "utility-first styling" },
    ],
  },
  {
    title: "Observability",
    items: [
      { name: "OpenTelemetry", note: "traces, metrics, spans" },
      { name: "Axiom", note: "trace ingestion and search" },
      { name: "Sentry", note: "error tracking" },
    ],
  },
  {
    title: "Editor & Terminal",
    items: [
      { name: "VS Code", note: "daily driver" },
      { name: "Claude Code", note: "AI pair programming" },
      { name: "Git", note: "obviously" },
    ],
  },
];

export default function Stack() {
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
        Stack
      </h1>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 2.5rem" }}>
        Tools I reach for and why.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {sections.map((section) => (
          <div key={section.title}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
                margin: "0 0 0.75rem",
              }}
            >
              {section.title}
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {section.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "0.625rem 0",
                    borderTop: "1px solid var(--border)",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--fg)",
                      fontFamily: "var(--font-geist-mono)",
                      flexShrink: 0,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--muted)",
                      textAlign: "right",
                    }}
                  >
                    {item.note}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
