export default function RAGBench() {
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
          RAGBench
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0 0 1rem" }}>
          RAG evaluation platform — FastAPI, Qdrant, PostgreSQL, Next.js, Docker
        </p>
        <a
          href="https://github.com/paramjeetn/RagBench"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none" }}
        >
          Code ↗
        </a>
      </div>

      <div className="prose">
        <h2>The problem</h2>
        <p>
          Every RAG system has the same painful iteration loop: change the chunking strategy,
          re-embed everything, run eval queries, compare results manually. There&apos;s no fast
          way to know whether BM25 or dense retrieval is better for your corpus, or what chunk
          size maximizes recall without hurting precision.
        </p>
        <p>
          RAGBench is a no-code platform for this experimentation loop — upload a corpus, configure
          a pipeline, run it, see the numbers, compare against a previous run.
        </p>

        <h2>Hybrid retrieval</h2>
        <p>
          After benchmarking keyword vs. semantic search on several document types, I found
          neither dominates: keyword search (BM25) is better for precise term lookups, dense
          search is better for semantic paraphrases. The platform implements Reciprocal Rank
          Fusion (RRF) to merge the two result lists, consistently outperforming either alone
          on mixed-query test sets.
        </p>

        <h2>Evaluation</h2>
        <p>
          Integrated DeepEval&apos;s RAG Triad — faithfulness, answer relevancy, context recall —
          run automatically after each pipeline execution. Results are stored in PostgreSQL and
          surfaced in a run-comparison dashboard so you can diff two pipeline configs side by side.
        </p>

        <h2>Dev experience</h2>
        <p>
          The entire stack is Dockerized. <code>make up</code> starts Qdrant, PostgreSQL, the
          FastAPI backend, and the Next.js frontend. No manual setup, no environment drift between
          machines.
        </p>
      </div>
    </div>
  );
}
