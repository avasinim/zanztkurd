# Dengnasî lesson source audit — lesson 05 — 2026-11-27

## Scope

Focused source-fidelity and arithmetic check for lesson 05 against Husein Muhammed, *Dengnasî di kurdî de*, printed pages 40–43.

## Source coverage observed

The source describes a frequency count of Kurdish letters in a written corpus:
- corpus size: 52,705 letters;
- punctuation removed before counting;
- author explicitly cautions that a much larger corpus would be needed for exact frequencies;
- the source gives counts and percentages for the individual letters;
- it discusses factors that may inflate particular letter frequencies and differences between written and spoken language.

## Payload comparison

The payload preserves the source's methodology, the corpus size, the ranked letter frequencies, the explanations for selected letters, and the cautions about dialect, spelling, repeated words, and written versus spoken forms. It explicitly frames the result as frequency in the sampled written material, not phoneme frequency or spoken-language frequency.

## Arithmetic anomaly confirmed

A separate calculation over the 31 individual letter counts printed in the source gives:

- Sum of listed individual counts: **53,001**.
- Source's stated total: **52,705**.
- Difference: **296**.
- Sum of the listed rounded percentages: **100.43%**.
- Sum of the listed counts as a percentage of 52,705: approximately **100.56%**.

The source itself prints a total row of 100% and 52,705, which does not reconcile with the listed individual rows. The payload correctly flags this as a source-level arithmetic inconsistency and does not silently alter any individual count or invent corrected figures.

**Assessment:** the payload is faithful to the source's data and caveats, and its arithmetic warning is justified. The original table should remain unchanged unless the author or a verified corrected edition supplies corrected values.

## Limits and next work

- This check confirms the sum of the published values, not the original underlying corpus or counting process.
- The table's raw counts and percentages should remain attributed to the source.
- Lesson 05 page range (40–43) matches the authoring map.
- Test database parity remains unresolved (0/27 exact HTML matches; nine title mismatches).
- No Supabase write, migration, production change, deployment, PR merge, or activation was performed.
