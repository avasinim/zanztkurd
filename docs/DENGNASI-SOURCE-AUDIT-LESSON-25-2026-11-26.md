# Dengnasî source audit — Lesson 25 (2026-11-26)

## Scope and source evidence

Source: Husein Muhammed, *Dengnasî di kurdî de*, printed pages 394–401. In the supplied PDF, these correspond to physical PDF pages 405–412. The eight source pages were compared with the Lesson 25 authoring section and its generated HTML and JSON previews.

## Findings

The existing 12-section lesson already covered the main topic sequence and most comparison tables. The source comparison identified several examples, qualifications and footnotes that were not present in the lesson body. They have now been restored in a dedicated supplementary section, rather than replacing or rewriting the lesson's main structure.

### Source details restored

1. Sorani ST- examples and exceptions: *stêr/estêre*, *stûr/estûr*, *sto, stu/esto*, *Stembol/Estemboł*; *standin/stendin/sendin*; word-final T loss in *dest/des*; loanword examples *stran* and *studyo*; *şkeft/eşkewt*; and examples where the change does not occur: *spî*, *şkandin*, *şkestin/şkan*.
2. Kurmanji aspirated/unaspirated contrasts in *çar/çav*, Sorani aspirated Ç in *çaw/çwar*, and the source note on emphatic P/S/T/Z.
3. The distinction between the H in *heval* and the separate H in words such as *Hesen*, including word-final examples and Sorani correspondences *deh/de*, *neh/no*, *guh/gwê*, *reh/rih–reg/rîş*.
4. EH/A examples *pehn/pan*, *tehl/tał*, *mehr/mare*, *bêhn/bon*; initial-H examples; and converse cases where Sorani has H/HE, including *war/hewar*, *jar/hejar*, *ewr/hewr*, *erd/herd/’erz*.
5. Source footnotes on *gehandin/gehiştin*, the *t-* present-continuous forms *ez têm/tînim*, dialect distribution of Sorani *de-/e-*, and inflected *kî/kê*.
6. The EÛÊ third-person singular suffix contrast and examples: *diçîne/deçênê*, *distîne/desênê*, *dixwîne/dexwênê*, *dinivîse/denûsê*.
7. The source's light/dark L examples, Sorani L/Ł spellings, comparison pairs, and dialectal Ł→R examples.
8. The non-universal Sorani XO- correspondence, including *xwedî, xwedan/xudan, xweyî/xawen* and *xwendin, xwandin/xwêndin*.
9. The source's cross-language G/K examples and the proto-Indo-European root note for *çi/çî* and *kî/kê*.

The supplementary section is present in the authoring source, JSON payload and standalone HTML preview. The course validator has been extended to check these source details and the source-internal K/H inconsistency note.

## Source inconsistency preserved

The source's section 12 heading and examples indicate Kurmanji K versus Zazaki H (*ker/her*, *kanî/henî*), while a historical explanatory sentence mistakenly repeats the preceding H/Ş wording. The lesson flags this inconsistency rather than silently rewriting the source claim.

## Limits

This is a targeted audit of the printed pages 394–401, not a claim that every historical interpretation in the book has been independently peer-reviewed. The validator was edited but has not yet been executed locally or by a newly observed GitHub Actions run. No merge to main, deployment, production database change, migration, or course activation was performed.
