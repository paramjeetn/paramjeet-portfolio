import Link from "next/link";

export default function MultimodalRAGClinical() {
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
          Multimodal RAG over clinical guidelines: what the benchmarks don&apos;t tell you
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: 0 }}>September 2024</p>
      </div>

      <div className="prose">
        <p>
          At Yonata, I built a RAG pipeline over 10,000 clinical guideline chunks for a
          cardiovascular and diabetes pilot. We had 800 synthetic patient profiles that needed
          to be matched against relevant guideline sections. Five physicians would validate the
          output.
        </p>
        <p>
          The system hit 89% retrieval recall in automated eval. The physicians rejected 40% of
          the suggestions. Here&apos;s what the benchmark missed.
        </p>

        <h2>The pipeline</h2>
        <p>
          Clinical guidelines come as PDFs — structured documents with tables, numbered lists,
          and embedded figures. I used Mistral to convert PDFs to markdown before chunking,
          which preserved table structure better than naive text extraction. Chunks were indexed
          in Weaviate with metadata: guideline name, section, condition, evidence grade.
        </p>
        <p>
          The metadata schema separated searchable index from full document storage — a design
          decision that let us filter by condition and evidence grade before doing vector search,
          dramatically reducing the retrieval candidate set.
        </p>

        <h2>What 89% recall actually means</h2>
        <p>
          The automated eval measured whether the relevant guideline chunk appeared in the top-5
          retrieved results. 89% of the time, it did. This felt good.
        </p>
        <p>
          But the physicians weren&apos;t evaluating retrieval. They were evaluating clinical
          appropriateness — whether the retrieved guideline section was the right recommendation
          for this specific patient, not just topically related to their condition.
        </p>
        <p>
          A patient with Type 2 diabetes and chronic kidney disease (CKD) has different
          medication recommendations than a patient with Type 2 diabetes alone. Our retrieval
          would correctly find diabetes guideline chunks (high recall) but often missed the
          comorbidity-specific sections (low clinical precision).
        </p>

        <h2>What we changed</h2>
        <p>
          We added a second retrieval pass specifically for comorbidities. After the primary
          retrieval, a lightweight classifier extracted comorbidities from the patient profile
          and ran a targeted search for sections mentioning those conditions in combination.
          Results from both passes were merged with a weighted score, giving higher weight to
          chunks that matched both the primary condition and the comorbidities.
        </p>
        <p>
          Physician acceptance rate went from 60% to 79% in the next validation round.
        </p>

        <h2>The confidence scoring problem</h2>
        <p>
          The validation platform showed a confidence score alongside each suggestion —
          essentially the cosine similarity from the vector search. Physicians quickly learned
          to distrust it. A high cosine similarity between &quot;patient has hypertension&quot;
          and a guideline chunk about hypertension management means the chunk is topically
          relevant, not that it&apos;s clinically appropriate for this patient.
        </p>
        <p>
          We replaced the raw similarity score with a calibrated confidence: similarity ×
          evidence grade weight × comorbidity match score. Still imperfect, but at least it
          incorporated the clinical structure of the guidelines rather than pure semantic
          distance.
        </p>

        <h2>The lesson</h2>
        <p>
          RAG evals measure retrieval. Users measure usefulness. For general-purpose domains
          these are correlated. For specialized domains — clinical, legal, financial — they
          diverge because domain experts apply implicit filtering rules that aren&apos;t in
          the query and aren&apos;t in the chunk metadata.
        </p>
        <p>
          The right approach is to build your eval set with domain experts from the start,
          not to build a system and then validate it with experts. The gap between automated
          metrics and human judgment is information about what your system is missing.
        </p>
      </div>
    </div>
  );
}
