export default function MyselfEngineer() {
  return (
    <div style={{ paddingTop: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: "0 0 0.375rem" }}>
          Project
        </p>
        <h1
          style={{
            fontSize: "1.375rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: "0 0 0.5rem",
            color: "var(--fg)",
          }}
        >
          Myself.engineer
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 1rem" }}>
          AI SaaS — Next.js, TypeScript, Gemini AI, Redis, AWS S3
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href="https://github.com/paramjeetn/myself.engineer"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
          >
            Code ↗
          </a>
          <a
            href="https://www.myself.engineer/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
          >
            Live ↗
          </a>
        </div>
      </div>

      <div className="prose">
        <h2>The idea</h2>
        <p>
          Most developers don&apos;t have a portfolio site. Building one from scratch takes time,
          and using a template means everyone&apos;s site looks the same. The idea: upload your
          résumé PDF, and the system generates a live, personalized portfolio site from it.
        </p>

        <h2>Pipeline</h2>
        <p>
          PDF → S3 → LLM parsing → structured JSON → Redis cache → SSR portfolio page.
        </p>
        <p>
          The LLM parsing step is the interesting part. A raw PDF is unstructured — headers,
          bullets, tables, and formatting all collapse into text. Getting the LLM to output clean,
          typed JSON (with section names, date ranges, bullet content) required careful prompt
          engineering and a validation layer that re-requests malformed outputs.
        </p>

        <h2>Latency</h2>
        <p>
          The first load after PDF parsing is slow — LLM calls take a few seconds. After that,
          the structured JSON is cached in Redis with a long TTL. Subsequent page loads serve
          from cache via SSR, which dropped p50 response time by 45%.
        </p>
        <p>
          S3 handles the PDF storage so the API servers stay stateless. The portfolio page is
          server-rendered on each request using the cached JSON, which means good SEO and no
          client-side loading states.
        </p>
      </div>
    </div>
  );
}
