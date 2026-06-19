export default function PromptForge() {
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
          PromptForge
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 1rem" }}>
          Distributed LLM batch processing platform — GKE, GCS, Firestore, LiteLLM, Pulumi, OTel
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href="https://github.com/paramjeetn/PromptForge-Distributed-LLM-Job-Processing-Platform"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
          >
            Code ↗
          </a>
          <a
            href="https://promptforge-e6183f23.mintlify.app/introduction"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
          >
            API Docs ↗
          </a>
        </div>
      </div>

      <div className="prose">
        <h2>The problem</h2>
        <p>
          Running LLM inference at scale is not just an API problem — it&apos;s a systems problem.
          When you need to process millions of prompts, you hit three walls fast: memory (loading
          large batches), rate limits (provider TPM/RPM ceilings), and fault tolerance (one pod
          crash = lost work).
        </p>
        <p>
          Most solutions are either a naive loop with a sleep, or a queue + worker pattern that
          still fails on large-scale restarts. I wanted something that could handle a 10M-prompt
          job with the same memory footprint as a 100-prompt job, recover from crashes in under
          30 seconds, and push providers exactly as fast as they&apos;ll allow without
          hard-coding limits.
        </p>

        <h2>Architecture</h2>
        <p>
          The pipeline is event-driven:
        </p>
        <ol>
          <li>User uploads a JSONL file to GCS.</li>
          <li>Eventarc triggers a Cloud Run launcher.</li>
          <li>Launcher provisions a dedicated GKE pod for the job.</li>
          <li>Pod streams prompts from GCS one chunk at a time — memory stays constant.</li>
          <li>Results write back to GCS as they complete.</li>
        </ol>
        <p>
          One pod per job means zero cross-job interference. GKE handles pod scheduling; Pulumi
          handles the infrastructure as code.
        </p>

        <h2>The hard part: adaptive rate learning</h2>
        <p>
          Provider rate limits are not static. They vary by tier, model, time of day, and account
          history. Hard-coding RPM values means either leaving throughput on the table or getting
          429s constantly.
        </p>
        <p>
          I modeled the rate controller on TCP congestion control:
        </p>
        <ul>
          <li>
            <strong>Slow start:</strong> Begin at RPM × 1.5 / 30s. Grow aggressively until the
            first 429.
          </li>
          <li>
            <strong>Congestion avoidance:</strong> After a 429, halve the rate and switch to
            additive increase (+1 RPM per 30s window).
          </li>
          <li>
            <strong>TPM ceiling:</strong> A rolling p95 token window caps the effective RPM so we
            never exceed the token-per-minute limit even when request count is low.
          </li>
        </ul>
        <p>
          The system discovers the actual ceiling of the provider account automatically over the
          first few minutes of a job, then sustains that rate indefinitely. OTel gauges expose
          the rate-learning state in real time via Axiom.
        </p>

        <h2>Crash recovery</h2>
        <p>
          Every 30 seconds, the pod checkpoints its progress to GCS using a bitset — one bit per
          prompt, set when the result is written. If the pod dies, a new pod reads the bitset,
          skips completed prompts, and resumes from exactly where the last one left off.
          No duplicate processing, no lost work.
        </p>

        <h2>What I&apos;d do differently</h2>
        <p>
          The current design provisions one pod per job, which means cold-start latency for small
          jobs (~15s). For jobs under ~1000 prompts, a shared worker pool would be faster.
          I&apos;d add a job-size heuristic at the launcher level to route small jobs to a pool
          and large jobs to dedicated pods.
        </p>
        <p>
          The rate-learning algorithm also doesn&apos;t account for provider-side burst capacity.
          Some APIs allow short bursts above the stated RPM. Detecting and exploiting burst windows
          would further improve throughput.
        </p>
      </div>
    </div>
  );
}
