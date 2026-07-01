export default function Now() {
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
        Now
      </h1>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 2.5rem" }}>
        What I&apos;m focused on. Updated July 2026.
      </p>

      <div className="prose">
        <h2>Open source</h2>
        <p>
          Contributing to AI/agent infrastructure repos — working through a prioritized list of
          real bugs in projects I actually use: <strong>mem0</strong>, <strong>pydantic-ai</strong>,{" "}
          <strong>instructor</strong>, <strong>vercel/ai</strong>, and the Google ADK JS SDK.
          The goal is merged PRs on things that matter, not doc typos.
        </p>
        <p>
          My approach: find unassigned bugs with reproduction steps, confirm locally, fix with a
          test, open PR. Targeting repos where maintainers review outside contributions within a
          week — low crowd, fast feedback loop.
        </p>

        <h2>Job search</h2>
        <p>
          Looking for a remote role — full-time or contract. I work across the stack: AI
          integrations, RAG pipelines, agent systems, backend infra, fullstack product. Open to
          any team building something real where I can own meaningful parts of it.
        </p>
        <p>
          If something I&apos;ve built is relevant to what you&apos;re working on,{" "}
          <a href="mailto:paramjeetpradhan.work@gmail.com">reach out</a>.
        </p>

        <h2>Reading</h2>
        <p>
          Working through codebases more than papers right now. Understanding how production
          agent frameworks handle state, tool calls, and failure recovery at the implementation
          level — not just the API surface.
        </p>
      </div>
    </div>
  );
}
