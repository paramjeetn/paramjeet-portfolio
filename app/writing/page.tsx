import Link from "next/link";

const posts = [
  {
    slug: "tcp-rate-limiting-llms",
    title: "Why I modeled LLM rate limiting on TCP congestion control",
    date: "June 2025",
    summary:
      "Most LLM wrappers hard-code rate limits or use exponential backoff. I built a controller that discovers and saturates the actual provider ceiling automatically.",
  },
  {
    slug: "adversarial-prompt-generation",
    title: "Map-Elites for adversarial prompt generation",
    date: "July 2025",
    summary:
      "How I used a quality-diversity algorithm to generate diverse adversarial test suites for LLM behavioral norms — and why random sampling wasn't enough.",
  },
  {
    slug: "multimodal-rag-clinical",
    title: "Multimodal RAG over clinical guidelines: what the benchmarks don't tell you",
    date: "September 2024",
    summary:
      "Building a RAG system over 10K clinical guideline chunks taught me that retrieval quality metrics and real physician utility are measuring different things.",
  },
];

export default function Writing() {
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
        Writing
      </h1>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 2.5rem" }}>
        Technical posts on the hard parts of what I&apos;ve built.
      </p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            style={{
              display: "block",
              padding: "1.125rem 0",
              borderTop: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "var(--fg)",
                    display: "block",
                    marginBottom: "0.3rem",
                  }}
                >
                  {post.title}
                </span>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {post.summary}
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  flexShrink: 0,
                  paddingTop: "0.125rem",
                }}
              >
                {post.date}
              </span>
            </div>
          </Link>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </div>
  );
}
