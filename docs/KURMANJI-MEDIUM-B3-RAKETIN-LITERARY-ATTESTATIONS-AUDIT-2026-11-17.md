# B3 Kurmanji: Raketin Literary Attestations and Past-Form Audit
Date: 2026-11-17
Branch: fix/kurmanji-ci-current-migration
Scope: research documentation only; no lesson or application changes.

## Executive finding
The past paradigm of intransitive `raketin` is consistently represented as `ez raketim`, `tu raketî`, `ew raket`, and plural `em/hûn/ew raketin`. This pass adds literary evidence for the third-person singular `raket` and plural `raketin`, a literary citation for `raneketin`, and a clearly identified teaching-table cross-check. The first- and second-person singular forms remain supported here by published conjugation references rather than a newly located literary sentence.

## 1. Direct literary and published-text evidence
### `raket` — third-person singular
The Kurmancî Wiktionary entry for `raketin` gives a literary citation from Firat Cewerî, *Girtî* (Weşanên Nûdem, 1986), under the sense 'to sleep'. The entry records the lexical form `raket` as the third-person singular past. This is a source-attributed literary citation, although the full surrounding sentence/page was not available in the accessible extract; treat it as a bibliographic attestation, not a fully contextualized quotation.
Source: https://ku.wiktionary.org/wiki/raketin
### `raketin` — plural, literary context
Cegerxwîn's poem in *Bêbuhar* includes the line `Ehmeq li ser zik raketin dernexûn`. The plural noun `Ehmeq` is the subject and `raketin` is the finite past form. The surrounding phrase suggests a 'lie/sleep' context, but the exact lexical nuance should not be over-translated as simply 'fall asleep' without consulting the full poem and edition.
Source: https://leftkup.com/wp-content/uploads/2018/07/Berbuhar-devkup.pdf
### `raneketin` — negative plural
Nûdem no. 31 (Payîz 1999), p. 95, has the sentence `Wê şevê em her du jî raneketin.` This directly attests the negative past plural with `em her du jî` as the subject. The meaning in context is that the two of them did not sleep / did not fall asleep that night.
Source: https://portal.arsivakurd.org/wp-content/uploads/2021/08/nudem_31.pdf
### Further narrative occurrence
A previously located Hevî issue 2 scan includes `lawik raket`. The phrase is a useful additional token candidate, but the full narrative context and exact page should be rechecked before using it as a teaching quotation.
Source: https://portal.arsivakurd.org/wp-content/uploads/2021/08/hevi_estitu_ya_paris_2.pdf

## 2. Paradigm cross-checks
The Kurmancî Wiktionary entry lists the simple past: `ez raketim`, `tu raketî`, `ew raket`, `em raketin`, `hûn raketin`, `ew raketin`. It also lists the negative past forms `ez raneketim`, `tu raneketî`, `ew raneket`, and plural `em/hûn/ew raneketin`.
Source: https://en.wiktionary.org/wiki/raketin
A Kurmanji grammar teaching PDF (lesson 20, 'Birinci grup geçişsiz bileşik fiiller') independently prints the same six-person past paradigm and gives the stem pair `raket` (past) / `rakev-` (present). This is pedagogical confirmation, not independent literary corpus evidence.
Source: https://www.kurdipedia.org/files/books/2015/66742.PDF?ver=130721388290000000
Xwebûn's Kurmanji grammar lesson gives `Ez raketim`, `Tu raketî`, `Ew raket`, `Em raketin`, and `Hûn raketin` as examples of intransitive compound verbs. Again, this is an instructional reference rather than a primary literary attestation.
Source: https://xwebun1.org/rezedersen-kurmanci-22-raweyen-lekeran/

## 3. Semantic and morphological cautions
1. Keep the verb intransitive in these examples: the subject is in the direct/uninflected case (`ez`, `tu`, `ew`, `em`, `hûn`), unlike a transitive simple-past clause with an oblique agent.
2. The dictionary gloss 'to sleep' is not the only possible contextual rendering. The Cegerxwîn line can carry a 'lie/stay lying' nuance; use it as form evidence while leaving the precise lexical interpretation open.
3. The negative prefix in the cited form is `ra-ne-ket-in` (`raneketin`). Do not confuse it with present `ranakevin` or with the positive past `raketin`.
4. The `rakev-` present stem and `raket-` past stem are explicitly distinguished in the Kurmancî lexicon entry and the teaching table. Do not mechanically derive the past by retaining the present stem.
5. The CCKNT corpus repository exposes a preview of the 1999 corpus. A targeted exact-string search in the accessible preview returned no hits for `raket` or `raneket`. This is only a negative result for those exact search strings in that preview; encoding variation, OCR/transcription conventions, and search limitations mean it is not proof that the corpus contains no forms.

## 4. Corpus access and limits
The University of Bamberg repository identifies the CCKNT as 483 Kurmanji newspaper texts totalling approximately 214,000 words and exposes `ccknt.txt` as a 1.2 MB download. The preview page is accessible, but the direct text download could not be retrieved in a clean, locally searchable form in this pass. Therefore this audit does not claim a complete corpus scan.
Repository record: https://fd-repo.uni-bamberg.de/records/v6rmw-cx940
Accessible preview: https://fd-repo.uni-bamberg.de/records/v6rmw-cx940/preview/ccknt.txt?include_deleted=0

## 5. Evidence matrix
| Form | Evidence | Status |
|---|---|---|
| `raket` | Firat Cewerî, *Girtî* (1986), cited in Kurmancî Wiktionary | Literary citation; full context/page not independently inspected |
| `raketin` | Cegerxwîn, *Bêbuhar*: `Ehmeq li ser zik raketin dernexûn` | Direct literary plural token; lexical nuance requires context |
| `raneketin` | Nûdem 31 (1999), p.95: `Wê şevê em her du jî raneketin` | Direct literary negative plural token |
| `raketim` | Wiktionary and published conjugation tables | Paradigm support; no new literary token found in this pass |
| `raketî` | Wiktionary and published conjugation tables | Paradigm support; no new literary token found in this pass |
| `raneketim`, `raneketî`, `raneket` | Wiktionary negative paradigm | Reference support only in this pass |

## 6. B3 editorial recommendations
1. Use `Em her du jî raneketin` as a sourced negative plural example, preserving its original literary context and citation.
2. Use `Ehmeq ... raketin` only as a literary plural form citation with a note that its precise lexical nuance is context-sensitive.
3. Keep `raket` supported by the Cewerî bibliographic citation, but do not invent a full quotation or page number from the secondary dictionary entry.
4. Teach the six-person simple past as a paradigm supported by two instructional references; mark first- and second-person literary examples as still desirable research targets.
5. Present positive and negative forms separately: `raket-/raketin` versus `raneket-/raneketin`; distinguish both from present `rakev-/ranakev-`.
6. Existing lessons remain unchanged pending explicit approval.

## References
1. Firat Cewerî, *Girtî* (Weşanên Nûdem, 1986), literary citation as recorded in Kurmancî Wiktionary: https://ku.wiktionary.org/wiki/raketin
2. Cegerxwîn, *Bêbuhar*, poem text: https://leftkup.com/wp-content/uploads/2018/07/Berbuhar-devkup.pdf
3. Nûdem, no. 31, Payîz 1999, p. 95: https://portal.arsivakurd.org/wp-content/uploads/2021/08/nudem_31.pdf
4. Hevî, issue 2: https://portal.arsivakurd.org/wp-content/uploads/2021/08/hevi_estitu_ya_paris_2.pdf
5. Kurmancî Wiktionary, `raketin`: https://en.wiktionary.org/wiki/raketin
6. Kurmanji grammar, Lesson 20: https://www.kurdipedia.org/files/books/2015/66742.PDF?ver=130721388290000000
7. Xwebûn, Rêzedersên Kurmancî 22: https://xwebun1.org/rezedersen-kurmanci-22-raweyen-lekeran/
8. Haig, Geoffrey. 2001. CCKNT repository record and preview: https://fd-repo.uni-bamberg.de/records/v6rmw-cx940

## Project boundary
Documentation only on fix/kurmanji-ci-current-migration. Course inventory remains 26 + 12. No lesson text, application code, CI, production Supabase, migrations, deployment, or PR #3 was touched.