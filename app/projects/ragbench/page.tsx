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
          size maximizes recall without hurting precision. Most teams eyeball it or pick defaults
          and never revisit them.
        </p>
        <p>
          RAGBench is a no-code platform for this experimentation loop — upload a corpus, configure
          a pipeline, run it, see the numbers, compare against a previous run. Built it after
          spending too much time on manual eval loops at Yonata.
        </p>

        <h2>What you can configure</h2>
        <p>
          Each pipeline run is a combination of:
        </p>
        <ul>
          <li><strong>Chunking strategy</strong> — fixed-size, recursive, or semantic splitting, with configurable chunk size and overlap.</li>
          <li><strong>Retrieval mode</strong> — BM25 (keyword), dense (vector), or hybrid (BM25 + dense + RRF fusion).</li>
          <li><strong>LLM config</strong> — model, temperature, system prompt.</li>
          <li><strong>Embedding model</strong> — swap the embedding model independently of the retrieval strategy.</li>
        </ul>
        <p>
          Runs are stored in PostgreSQL with their full config. The comparison dashboard diffs
          any two runs side by side — scores, retrieved chunks, generated answers.
        </p>

        <h2>Why hybrid retrieval won</h2>
        <p>
          Before building this, I assumed dense retrieval would dominate — semantics beat keywords.
          It doesn&apos;t. BM25 is better for exact product names, error codes, and domain jargon
          that the embedding model has never seen. Dense is better for paraphrase and concept
          search. Neither alone is robust.
        </p>
        <p>
          Reciprocal Rank Fusion merges the two result lists by rank rather than score — which
          avoids the problem of incomparable similarity scales between BM25 and cosine distance.
          On mixed-query test sets (half exact-match, half semantic), hybrid RRF consistently
          outperformed either alone by 8–15% on context precision.
        </p>

        <h2>Evaluation: the RAG Triad</h2>
        <p>
          Integrated DeepEval&apos;s RAG Triad — three metrics that together catch most RAG failure modes:
        </p>
        <ul>
          <li><strong>Faithfulness</strong> — does the answer contain only claims supported by the retrieved chunks? Catches hallucination.</li>
          <li><strong>Answer relevancy</strong> — does the answer actually address the query? Catches off-topic responses.</li>
          <li><strong>Context recall</strong> — were the right chunks retrieved? Catches retrieval failures.</li>
        </ul>
        <p>
          These run automatically after each pipeline execution. The context recall metric requires
          a ground-truth answer set — RAGBench generates a synthetic one using the LLM itself for
          corpora without labeled data.
        </p>

        <h2>Dev experience</h2>
        <p>
          The entire stack is Dockerized: Qdrant, PostgreSQL, the FastAPI backend, and the
          Next.js frontend all start with <code>make up</code>. No manual setup, no environment
          drift. The async FastAPI backend handles embedding and retrieval concurrently — large
          corpus ingestion doesn&apos;t block the UI.
        </p>
      </div>
    </div>
  );
}
