import Link from "next/link";

export default function TCPRateLimiting() {
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Link
        href="/writing"
        style={{ fontSize: "0.8125rem", color: "var(--muted)", textDecoration: "none" }}
      >
        ← Writing
      </Link>

      <div style={{ marginTop: "1.5rem", marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "1.375rem",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            margin: "0 0 0.5rem",
            color: "var(--fg)",
            lineHeight: 1.3,
          }}
        >
          Why I modeled LLM rate limiting on TCP congestion control
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: 0 }}>June 2025</p>
      </div>

      <div className="prose">
        <p>
          When I built PromptForge, I needed to push LLM API providers as fast as they would allow
          without getting rate limited into silence. The naive approach — read the docs, hard-code
          the RPM limit, add a sleep — has an obvious failure mode: the stated limit is often wrong.
          Providers throttle differently by tier, by model, by account age, and sometimes by time
          of day. The limit in the docs is a ceiling, not a guarantee.
        </p>
        <p>
          I wanted a system that would discover the real limit automatically and then sustain it
          indefinitely. The more I thought about this, the more it sounded like a problem the
          networking community had already solved — in 1988, with TCP congestion control.
        </p>

        <h2>The TCP analogy</h2>
        <p>
          TCP&apos;s job is to saturate a network link without overwhelming it. It doesn&apos;t
          know the link&apos;s capacity in advance — it discovers it by sending data and watching
          what happens. When packets get through, it sends more. When packets drop, it backs off.
          Over time it converges on the actual throughput ceiling of the link.
        </p>
        <p>
          LLM rate limiting is the same problem. The &quot;link&quot; is the provider&apos;s API.
          The &quot;packets&quot; are requests. &quot;Packet drop&quot; is a 429 response. The
          goal is to saturate the provider without tripping the rate limiter.
        </p>

        <h2>Slow start</h2>
        <p>
          TCP slow start begins at a small congestion window and doubles it every round-trip time
          until the first loss event. I adapted this for LLM requests:
        </p>
        <ul>
          <li>Start at <code>RPM_stated × 1.5 / 30s</code> — slightly above the stated limit
          to probe whether the actual ceiling is higher.</li>
          <li>Every 30 seconds without a 429: increase the rate by 50%.</li>
          <li>First 429: record the current rate as the ceiling estimate, halve it, switch to
          congestion avoidance.</li>
        </ul>
        <p>
          The 30-second window is important. LLM providers bucket their rate limits per minute
          (sometimes per 10 seconds), so probing faster than 30s gives noisy signal — you might
          hit a bucket boundary rather than a real limit.
        </p>

        <h2>Congestion avoidance</h2>
        <p>
          Once we&apos;ve had a 429, we know roughly where the ceiling is. TCP switches to
          additive increase / multiplicative decrease (AIMD): increase the window by 1 per RTT
          (additive), halve it on loss (multiplicative).
        </p>
        <p>
          My adaptation: after the rate halves, increase by +1 RPM per 30s window. This is more
          conservative than TCP&apos;s AIMD because provider 429s have a backoff penalty — hitting
          one again within a short window often results in a longer cooldown than the first. So I
          want to approach the ceiling slowly the second time.
        </p>

        <h2>The TPM ceiling problem</h2>
        <p>
          RPM is only half the story. Providers also impose tokens-per-minute (TPM) limits, and
          a request that sends a 4000-token prompt counts much more than a 50-token one. You can
          stay under RPM and still get rate-limited on TPM.
        </p>
        <p>
          I added a rolling p95 token window: every outgoing request records its token count with
          a timestamp. Every 30 seconds, the controller computes the p95 token count per request
          in the last window and estimates the effective RPM ceiling implied by the TPM limit:
        </p>
        <pre><code>{`effective_rpm = TPM_limit / p95_tokens_per_request`}</code></pre>
        <p>
          The actual rate is capped at <code>min(rpm_ceiling_estimate, effective_rpm)</code>.
          This means the controller self-adjusts for heavy prompts — if you switch from short
          prompts to long ones mid-job, the TPM ceiling kicks in automatically.
        </p>

        <h2>OTel observability</h2>
        <p>
          The rate-learning state is exposed as OTel gauges: current rate, ceiling estimate,
          slow-start vs. congestion-avoidance mode, p95 token count, 429 count per window.
          These feed into Axiom dashboards so you can watch the controller converge on the
          ceiling in real time. The first few minutes of a big job look like a sawtooth — rate
          climbs, hits a 429, drops, climbs again — and then it plateaus at the actual ceiling
          and stays there.
        </p>

        <h2>Results</h2>
        <p>
          On a job with 50K prompts against a tier-1 OpenAI account, the controller converged
          on the actual ceiling (about 3,400 RPM, not the stated 3,500) within 4 minutes and
          sustained it for the rest of the job with a 429 rate under 0.3%. A hard-coded 3,500 RPM
          would have produced roughly 15-20% 429s and constant retry overhead.
        </p>

        <h2>What I got wrong first</h2>
        <p>
          My first version used exponential backoff on 429s — standard stuff. It worked but it was
          too conservative. After a 429, exponential backoff would back off to something like
          60% of the current rate, then 30%, then 15%, and the job would crawl for minutes before
          recovering. The TCP model is more aggressive about recovery, which is the right call
          when the 429 penalty is known and bounded.
        </p>
        <p>
          I also initially used per-request timers instead of 30-second windows. This was wrong —
          individual request latency varies too much (streaming responses, network jitter) to give
          a clean signal. Windowed aggregation is the right abstraction.
        </p>
      </div>
    </div>
  );
}
