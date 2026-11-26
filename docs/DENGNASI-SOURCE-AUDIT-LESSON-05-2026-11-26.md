# Dengnasi source audit — Lesson 5
Date: 2026-11-26

## Source and page verification
- Lesson: **Rêjeya herfan di nivîsên kurmancî de**
- Book: Husein Muhammed, *Dengnasî di kurdî de*
- Printed source pages: **40–43**
- Physical PDF pages: **48–51** (verified against the printed page labels; physical page 47 is the designed lesson divider)
- The authoring citation and course metadata identify printed pages 40–43.

## Findings
1. The draft follows the book's actual section: a corpus-based count of letters in written Kurmanji, not a claim about phoneme frequency in speech.
2. The complete frequency table has all 31 letter entries plus the total row. The displayed percentages and counts were retained as printed.
3. The method, corpus size (52,705 letters), punctuation removal, sample-size limitation, and the major results (E, I, N, A, Ê, R) are represented.
4. The letter-by-letter explanations are present for the letters for which the author gives a reason; the source's `(?)` status for S, U, Ş, Q and F is retained.
5. The source's warnings about dialect variation, doubled RR, proper-name/repetition effects, final N, plural ezafe variants, and the distinction between written-letter frequency and spoken-sound frequency are present.
6. **Restored omission:** the source's concrete written/spoken contrasts for final N were missing. Added `waN kesaN` versus `wa kesa`, `kitêbêN miN` versus `kitêbê mi`, and the dialectal written examples `kitêbêT mi[N]` / `kitêbêD mi[N]` to the authoring Markdown, JSON payload and HTML preview.
7. **Source arithmetic discrepancy:** the 31 letter counts sum to 53,001, while the printed total is 52,705; the printed percentages sum to 100.43%, while the total row says 100%. The lesson correctly reports this as a source inconsistency and does not silently recalculate or alter the printed values.
8. The source sentence concerning the conjunction `ku` and the frequency of U is preserved as a source claim; the apparent wording issue is not silently emended.

## Verification and status
- The four artifacts (authoring Markdown, JSON payload, HTML preview, validator) were updated consistently.
- Lesson-specific validator assertions cover the restored final-N examples, arithmetic discrepancy and table endpoints.
- This is a source audit and restoration, not a claim of full CI validation. The full Python validator and GitHub Actions have not been run.
- No main-branch merge, production/Supabase change, deployment or course activation was performed.

## Next
Run the repository validator and CI on the isolated branch; retain the lesson as draft-only pending explicit activation approval.
