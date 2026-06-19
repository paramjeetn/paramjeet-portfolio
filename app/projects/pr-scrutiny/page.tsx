export default function PRScrutiny() {
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
          PR Scrutiny
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 1rem" }}>
          GitHub App — TypeScript, Hono, Vercel AI SDK, GCP, Firestore, KMS
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href="https://github.com/paramjeetn/pr-scrutiny"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
          >
            Code ↗
          </a>
          <a
            href="https://github.com/apps/pr-scrutiny"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
          >
            App ↗
          </a>
        </div>
      </div>

      <div className="prose">
        <h2>The problem</h2>
        <p>
          Code review is the bottleneck of most small teams. Junior devs merge PRs that introduce
          N+1 queries, leak secrets in env var comments, or silently break 6 downstream services.
          Senior devs spend half their review time on mechanical checks that a tool should catch.
        </p>
        <p>
          I wanted a GitHub App that runs on every PR, catches the mechanical stuff automatically,
          and posts actionable inline comments directly on the diff — not a summary at the bottom,
          but a comment on the exact line that&apos;s wrong.
        </p>

        <h2>Architecture: 4 agents in parallel</h2>
        <p>
          On each PR webhook, the orchestrator spawns 4 specialist agents that run concurrently:
        </p>
        <ul>
          <li>
            <strong>Security agent:</strong> Regex + entropy analysis for secrets, hardcoded
            credentials, dangerous patterns (eval, shell injection).
          </li>
          <li>
            <strong>Quality agent:</strong> N+1 detection, cyclomatic complexity heuristics,
            dead code patterns.
          </li>
          <li>
            <strong>Blast Radius agent:</strong> Import graph traversal to find how many modules
            depend on changed files. Flags PRs that touch high-fan-out code.
          </li>
          <li>
            <strong>LLM agent:</strong> Sends the diff to an LLM for logical review — things
            no static analysis catches, like wrong business logic or missing edge cases.
          </li>
        </ul>
        <p>
          Each agent is independently time-boxed. If any agent times out, the others still
          complete and post their comments. The orchestrator collects results and maps each
          finding to a file path + line number for the GitHub inline comment API.
        </p>

        <h2>Zero-LLM static analysis</h2>
        <p>
          The Security and Quality agents do not call any LLM. They run pure static analysis —
          fast, deterministic, and free. This matters for two reasons:
        </p>
        <ul>
          <li>Latency: static analysis finishes in milliseconds, LLM calls take seconds.</li>
          <li>
            Cost: most PRs have obvious issues (hardcoded API key, missing null check) that don&apos;t
            need LLM reasoning. Only the LLM agent incurs API cost.
          </li>
        </ul>

        <h2>Security: customer key management</h2>
        <p>
          Users bring their own LLM API keys. Storing them plaintext in Firestore is a
          non-starter. Keys are encrypted with GCP KMS (AES-256) before storage and decrypted
          at request time in the worker. The KMS key is never accessible to the application
          at rest — only the encrypted ciphertext is stored.
        </p>

        <h2>Testing</h2>
        <p>
          222 passing tests across all four agents, the orchestrator, and webhook deduplication.
          Each agent has unit tests against known-bad code patterns. The orchestrator has
          integration tests with mocked GitHub webhooks. Webhook dedup has fuzz tests to verify
          idempotency under repeated delivery.
        </p>

        <h2>What I&apos;d improve</h2>
        <p>
          The blast radius agent currently only traverses one level of the import graph. Deep
          transitive dependencies (A imports B imports C — you changed C) aren&apos;t flagged.
          Full transitive traversal is the obvious next step, though it requires caching the
          dependency graph between PRs to stay fast.
        </p>
      </div>
    </div>
  );
}
