import Link from "next/link";

const featured = [
  {
    href: "/projects/promptforge",
    label: "PromptForge",
    desc: "Distributed LLM batch processing on GKE with TCP-inspired adaptive rate learning.",
  },
  {
    href: "/projects/pr-scrutiny",
    label: "PR Scrutiny",
    desc: "GitHub App running 4 specialist agents in parallel on every pull request.",
  },
  {
    href: "/writing/tcp-rate-limiting-llms",
    label: "Why I modeled LLM rate limiting on TCP",
    desc: "The thinking behind PromptForge's congestion control system.",
  },
];

export default function Home() {
  return (
    <div style={{ paddingTop: "3rem" }}>
      {/* Name + tagline */}
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          margin: "0 0 0.5rem",
          color: "var(--fg)",
        }}
      >
        Paramjeet Pradhan
      </h1>
      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--muted)",
          margin: "0 0 2.5rem",
          lineHeight: 1.6,
        }}
      >
        I build software for people — developers, consumers, anyone with a real
        problem that a well-made tool can quietly fix. The feedback loop that keeps
        me going is talking to users: their frustration, their delight, the moment
        something clicks. That&apos;s what the work is for.
        <br /><br />
        4th-year CS undergrad. I work at the intersection of LLMs and scalable
        infrastructure — agentic pipelines, distributed systems, developer tooling.
      </p>

      {/* Links row */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "3.5rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { href: "mailto:paramjeetpradhan.work@gmail.com", label: "email" },
          { href: "https://github.com/paramjeetn", label: "github" },
          {
            href: "https://www.linkedin.com/in/paramjeetpradhan/",
            label: "linkedin",
          },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              fontSize: "0.875rem",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            {label} ↗
          </a>
        ))}
      </div>

      {/* Featured */}
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          margin: "0 0 1rem",
        }}
      >
        Featured
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {featured.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: "block",
              padding: "0.875rem 0",
              borderTop: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "var(--fg)",
                  }}
                >
                  {label}
                </span>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted)",
                    margin: "0.2rem 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  {desc}
                </p>
              </div>
              <span
                style={{ color: "var(--muted)", fontSize: "0.875rem", flexShrink: 0 }}
              >
                →
              </span>
            </div>
          </Link>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Bottom links */}
      <div
        style={{
          marginTop: "2.5rem",
          display: "flex",
          gap: "1.25rem",
        }}
      >
        <Link
          href="/projects"
          style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
        >
          all projects →
        </Link>
        <Link
          href="/writing"
          style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
        >
          all writing →
        </Link>
      </div>
    </div>
  );
}
