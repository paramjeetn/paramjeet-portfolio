import Link from "next/link";

export default function AdversarialPromptGeneration() {
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
          Map-Elites for adversarial prompt generation
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: 0 }}>July 2025</p>
      </div>

      <div className="prose">
        <p>
          At Novarroh, I was building a system that automatically generates adversarial test
          suites for LLM behavioral norms. Given a system prompt, the system extracts the rules
          the LLM is supposed to follow — and then tries to break them.
        </p>
        <p>
          The first version used random sampling: pick an adversarial technique, pick a norm,
          generate a prompt. It worked, but it had a coverage problem. Random sampling clusters
          around easy cases. You&apos;d get 40 variations of &quot;ignore previous instructions&quot;
          and zero prompts that tested multi-turn persona switching. The test suite looked diverse
          but wasn&apos;t.
        </p>

        <h2>What is Map-Elites?</h2>
        <p>
          Map-Elites is a quality-diversity (QD) algorithm from evolutionary computation. Instead
          of searching for a single best solution, it maintains a map of the best solution found
          for each cell in a behavioral feature space. The goal is to find high-quality solutions
          that are also maximally diverse across behaviors.
        </p>
        <p>
          The canonical example is robot locomotion: instead of finding one fast gait, find the
          best gait for every combination of (number of legs used, symmetry of motion). You end
          up with a map of diverse, high-performing gaits.
        </p>

        <h2>The adaptation</h2>
        <p>
          My behavioral feature space had two axes:
        </p>
        <ul>
          <li>
            <strong>Adversarial technique:</strong> red-team direct, counterfactual framing,
            multi-turn escalation, persona injection, metamorphic, noise injection, etc. — 8
            categories.
          </li>
          <li>
            <strong>Norm dimension:</strong> the 50 behavioral dimensions extracted from the
            system prompt (e.g., &quot;must not discuss competitor products&quot;, &quot;should
            always respond in formal register&quot;).
          </li>
        </ul>
        <p>
          Each cell in the 8×50 map holds the best adversarial prompt found for that
          (technique, norm) pair, scored by a heuristic: does the prompt actually violate the
          norm when run against the LLM?
        </p>

        <h2>The generation loop</h2>
        <p>
          Each iteration:
        </p>
        <ol>
          <li>Pick a random occupied cell from the map (exploitation) or an empty cell
          (exploration), with a 70/30 split.</li>
          <li>Generate a new prompt for that (technique, norm) pair, using the existing cell
          occupant as a seed if one exists.</li>
          <li>Score the new prompt by running it against the LLM and checking for norm
          violation.</li>
          <li>If the new prompt scores better than the current occupant (or the cell is empty),
          replace the occupant.</li>
        </ol>
        <p>
          This runs in parallel — one 4-stage SequentialAgent per dimension, all concurrent.
          Each agent: (1) sieve the norm to confirm it&apos;s testable, (2) cluster it into a
          goal, (3) plan coverage across techniques, (4) generate the prompt.
        </p>

        <h2>Why this beats random sampling</h2>
        <p>
          After 200 iterations on a customer service system prompt, random sampling had covered
          31 of 50 norm dimensions and 6 of 8 adversarial techniques. Map-Elites covered all 50
          dimensions and all 8 techniques — because the algorithm explicitly rewards filling
          empty cells.
        </p>
        <p>
          More importantly, the quality within each cell was higher. The algorithm iterates on
          successful prompts, so the red-team direct prompts for each norm converged on the
          specific phrasing that actually works for that norm, rather than generic templates.
        </p>

        <h2>Prompt structure</h2>
        <p>
          Each generated prompt carries metadata: norm ID, adversarial technique, evaluation
          criteria (what constitutes a violation), and violation behavior (what the LLM should
          have said vs. what it did say). This metadata makes the test suite actionable — you
          don&apos;t just know the LLM failed, you know which norm failed, by what technique,
          and what the correct behavior should have been.
        </p>
      </div>
    </div>
  );
}
