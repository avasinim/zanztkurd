# Dengnasî source audit — lesson 27 — 2026-11-27

## Scope and verified source boundary

Source: Husein Muhammed, *Dengnasî di kurdî de*. Printed page numbers were read from the source footer.

- Printed page 418 begins the final chapter, “Cotdengiya Ç, K, P, T û rêgirtin di ser peyvan re”.
- Printed page 432 contains the final paragraph on U/Û becoming W and the standard written forms xesûya wê / rûyê wî.
- The chapter ends on printed page 432. The manifest range 418–432 is correct.
- In the designed PDF, the lesson cover is PDF page 447; source content spans PDF pages 448–462. The payload records designed PDF pages 448–462.

## Main source coverage checked

The lesson payload has 15 numbered sections and covers the two major parts of the chapter: the history of aspirated/unaspirated Ç, K, P, T and the mechanisms used to prevent hiatus. The following coverage was checked against printed pp.418–432:

1. **Historical development of the Ç/K/P/T doublets (p.418):** includes the author's hypothesis that unaspirated variants may be older in Kurmanji and Zazaki, their spread from medial/final positions to word-initial position, the possible Caucasian/Armenian model, and later influence of Persian, Turkish and other neighboring languages. The payload appropriately attributes the scenario to the author and labels the century-scale prediction as a hypothesis.
2. **Definition and examples of hiatus (pp.419–420):** defines two adjacent vowels across syllable boundaries and retains examples such as bêav, biêş, neavêjin, biavêjin, xaîn, îdîa, saet, îdea and teorî.
3. **Where hiatus occurs (pp.419–420):** distinguishes native simple words from Arabic and European loans and from forms created with prefixes/suffixes.
4. **Vowel-combination table (pp.420–422):** the payload reproduces a large combination table and many examples from the source, including prefix forms, Arabic loans and European loans. It retains important qualifications about orthographic hiatus versus pronounced Eyn, alternate spellings, naumêd, EU > EW and the status of several examples.
5. **Two broad hiatus-blocking strategies (p.422):** vowel deletion and insertion of a consonant; identifies Y, H, T, N, W and, in Sorani/Southern Kurdish, R as context-limited strategies.
6. **Vowel deletion (pp.423–424):** includes prefix+stem and stem+suffix cases, identical-vowel deletion, forms such as davêtin, baqil, navêjin, naxift, rojnamê, birê min, najî, li Zaxo, Elî, Almanya/Almanyê and li dinyê.
7. **Y insertion (pp.424–425):** includes stem+suffix examples, its limited role in verb inflection and prefix+stem combinations, and dialectal differences in whether Y is pronounced.
8. **H insertion (pp.426–427):** includes nehanîn, dihavêt, nahavêjî, the history of hanîn/havêtin and hatin, and the limits of H as a general hiatus blocker.
9. **W and T insertion (p.427):** includes bawî, duwem, biratî, pêşmergetî, hevrêtî and hevaltî, with the source's distinction between derivation and inflection.
10. **N insertion / movable N (pp.428–429):** includes çawa/çawan, wisa/wisan, the source's dîsa/dîsan discussion, phrase-boundary conditioning, plural forms and the comparison with Ancient Greek and Turkish.
11. **R insertion in Sorani/Southern Kurdish (p.429):** includes bîde + ê → biderê and correctly limits the claim to those varieties, not Kurmanji.
12. **Possible historical V (pp.429–430):** includes the pîvaz/piyaz comparison and attributes the proposed hiatus-blocking V to Yaron Matras as a hypothesis, noting that V is not productive in this role today.
13. **Hiatus across word boundaries (pp.430–431):** includes the French je + ai → j'ai example, Kurdish bi avê / ji agirî, spoken contractions, copula forms, and birayê min ê mezin / yê mezin.
14. **Vowel-to-consonant conversion (pp.431–432):** includes Î → Y in Sorani and some Kurmanji varieties, xan-y-ê me versus xaniyê me, and U/Û → W in xeswa wê / riwê wî, alongside standard xesûya wê / rûyê wî.
15. **Source's internal irregularities:** the source's printed vowel table repeats OI, OÎ, OO and OU in the extracted sequence after UÊ (p.422); the payload flags this rather than inventing a corrected row. The source also prints dîsa twice in the pair list (p.428), while p.429 explicitly gives dîsa/dîsan; the payload records this inconsistency.

## Fidelity gaps and limitations

- The payload is a structured lesson adaptation, not a diplomatic transcription. The full prose of the chapter is not reproduced word-for-word.
- The vowel table is broadly reconstructed, but the source contains a repeated/irregular sequence around the O/U combinations. The payload notes the issue; the table still needs a visual/source-editorial check before it can be treated as a fully exact facsimile.
- The source has footnotes 303–319. The payload includes some explanatory content from them (e.g. Eyn in apparent written hiatus, alternate forms, the movable-N comparison, Matras attribution), but does not reproduce all footnotes and bibliographic links in full. Exact note-by-note parity is not certified.
- Some long explanations and dialect qualifications are compressed into summary prose and tables. The payload preserves the main strategies, examples and limits, but does not establish that every phrase, example, variant and punctuation detail has been retained.
- The payload appears to include a potentially inconsistent example in its H discussion: “di + axivin → biaxivin/baxivin”. The source p.427 itself prints “di + axivin → biaxivin/baxivin”, while the prefix is transcribed “di” and the resulting form begins “bi”. This is recorded as a source-level inconsistency; it must not be silently normalized without an editorial decision.
- The source's p.428 list repeats dîsa rather than printing dîsa/dîsan; the payload's paired form is supported by the explicit discussion on p.429. This is a contextual reconciliation, not a literal reproduction of the p.428 list.

## Assessment

**Broad chapter coverage: confirmed. Exact source completeness: not certified.** The payload includes the chapter's main argument, the vowel table, major hiatus-prevention strategies, dialectal limits and numerous examples. However, exact preservation of every sentence, footnote, variant and table cell remains unverified. Given the user's strict no-additions/no-deletions requirement, the course should not be marked fully source-faithful until the table and notes 303–319 are reconciled item by item.

## Overall course milestone and safeguards

- This completes the first-pass source audit for all 27 lesson payloads (lessons 1–27).
- This does **not** mean all 27 lesson payloads are approved as exact reproductions. Earlier audits have recorded compression, duplication, source inconsistencies and missing detail that need a consolidated correction register.
- The separate test-database parity issue remains unresolved: the latest direct comparison showed 0/27 exact HTML matches and nine title mismatches against the prepared payload. No resynchronization was performed.
- No Supabase write, migration, production change, deployment, PR merge, student-data access/change, or course activation was performed.
