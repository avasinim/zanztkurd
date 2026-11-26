# Dengnasi source audit — lessons 16–17 (2026-11-26)

## Scope and evidence

The original source file `dengnasi.pdf` (432 PDF pages) was inspected at the relevant printed folios. The course's authored lesson sections and metadata were compared with the source.

- Lesson 16 source range: printed pages 203–232.
- Lesson 17 source range: printed pages 233–250.

## Lesson 16 — Dengên V, W, X, Y û Z

The source sequence is visible in the inspected pages:

- V begins on printed page 203.
- W begins on printed page 210.
- The paired X / [ɣ] discussion begins on printed page 218 and continues through the discussion of whether to represent the voiced sound separately on pages 220–221.
- Y begins on printed page 222.
- Z begins on printed page 227 and its Arabic-letter correspondences continue through page 232.

The authored lesson already contains material for V, W, X/[ɣ], Y and Z, and its source citation/page map already covered 203–232. The discrepancy was the lesson title, which named V, W, Y and Z but omitted X. The title has now been corrected consistently in the authoring outline and heading, manifest, reader map, standalone route title, HTML preview, and generated JSON payload to **Dengên V, W, X, Y û Z**.

The source distinguishes the two sounds written with X in standard Kurmanji Latin spelling; the authored section's use of `Ẍ` is an explanatory notation for the voiced sound, not a proposed change to ordinary orthography.

## Lesson 17 — Eyn û komên konsonantî di kurdî de

The source begins the Eyn discussion on printed page 233, moves to K/G/Q on page 237, and includes consonant-cluster inventories on pages 247–250. The existing lesson title and source-page map match that scope.

A targeted comparison of the source's cluster inventory on printed page 248–249 with the authored lesson found one omitted cluster: **-RŞ**, with the source examples **ferş, merş, marş** (printed page 249). This cluster and its examples have now been restored to the authoring source, the generated payload, and the Lesson 17 HTML preview.

Other source-specific list details, including the duplicate `-XŞ` entry on printed page 249 and the overlap of `-XT` across source categories, have not been silently normalized. They remain noted as source features and are not evidence that the source list is internally error-free.

## Validation guardrails

The course validator now explicitly checks that Lesson 16's title includes X and that Lesson 17 retains `-RŞ` and its three source examples. The existing authoring/manifest/reader/preview parity checks remain in place.

This is a targeted source audit, not a claim that every sentence in Lessons 16–17 has been exhaustively reconciled. No lesson activation, deployment, main-branch change, production database change, Supabase migration, or student-data operation was performed.
