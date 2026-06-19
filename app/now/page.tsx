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
        What I&apos;m focused on. Updated June 2026.
      </p>

      <div className="prose">
        <h2>Building</h2>
        <p>
          Actively improving <strong>PR Scrutiny</strong> — specifically making the non-AI static
          analysis layer more robust. The LLM agent is the easy part; the hard part is building
          deterministic, fast analysis that catches real issues without false positives. Researching
          better approaches to import graph traversal, entropy-based secret detection, and
          complexity heuristics.
        </p>

        <h2>Learning</h2>
        <p>
          Going deep on how LLMs actually work — not the math, but the systems and design
          decisions. How attention patterns form, why certain prompting strategies work, what
          actually happens at inference time. Understanding the tool well enough to build on top
          of it without guessing.
        </p>
        <p>
          Alongside that: large-scale system design. How systems stay fast and cheap under load —
          caching strategies, database tradeoffs, the cost of every extra network hop. This
          directly feeds the goal: more users, lower costs, better experience.
        </p>

        <h2>Looking for</h2>
        <p>
          Full-time role — remote. Building products that real people use, on a team that cares
          about the craft. AI infra, developer tooling, or any product-focused engineering role
          where I can talk to users and ship things that matter to them.
        </p>
        <p>
          If something I&apos;ve built is relevant to what you&apos;re working on, reach out.
        </p>
      </div>
    </div>
  );
}
