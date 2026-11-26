# Dengnasî source audit — Lesson 22 (2026-11-26)

## Scope and source evidence

Lesson 22, **Nasandina KL û KE û cudahiyên herdu alfabeyan**, covers printed pages 348–372 of Husein Muhammed, *Dengnasî di kurdî de*.

The targeted source checks used the supplied PDF:
- Printed page 353 (PDF physical page 378): heterographic homographs, including the two pronunciations and meanings of **ker**.
- Printed page 369 (PDF physical page 394): dark/light L, examples and proposed orthographic distinctions.
- Printed page 371 (PDF physical page 396): the optional spelling **kerr** to distinguish the “deaf” meaning from the animal meaning in ambiguous context.

## Findings

The current Lesson 22 authoring already contains the source-backed points checked in this pass:

1. Dark L is reported in **welat** and **sal**, especially inflected **wê salê** and **sala 2013**.
2. **milet** and **mela** are reported as dark-L examples only in some dialects; most Kurmanji dialects have light L in these words.
3. The source's optional Latin-script notation proposals are represented: adding **ł** or writing double **LL**.
4. The author's preference for a single L is retained with the stated aim of shared spelling across Kurdish varieties.
5. The two **ker** entries are distinguished by both meaning and pronunciation: the animal has aspirated K and a soft R; “deaf” has unaspirated K and a strong R.
6. The source's optional disambiguating spelling **kerr** is preserved for the “deaf” meaning in a context such as “Ew ker e”.

No additional examples or phonetic claims were introduced. The current authoring text, JSON payload, and standalone HTML preview contain the same Lesson 22 material; the existing preview/payload body parity check covers their synchronization.

## Validation added

The course validator now asserts the presence of the source-specific L examples, the **ł/LL** alternatives, the single-L editorial preference, both meanings/pronunciations of **ker**, and the optional **kerr** spelling.

## Limits

This pass was a targeted audit of the cited pages and the corresponding Lesson 22 content. It is not a claim that every detail on all pages 348–372 has been independently re-audited. The validator was edited but has **not** been executed in this environment or by a newly observed GitHub Actions run. No merge, deployment, production database operation, or course activation was performed.
