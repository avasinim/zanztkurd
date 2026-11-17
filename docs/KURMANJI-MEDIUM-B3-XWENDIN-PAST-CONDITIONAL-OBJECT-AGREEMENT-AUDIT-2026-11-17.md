# B3 Kurmanji-medium audit: transitive object agreement in past conditional and past perfect conditional (2026-11-17)

## Scope and safety
This is a source audit only. It does not alter learner-facing lessons, course inventory, spelling policy, runtime, tests, CI, seed data, migrations, databases, PR #3, or deployment. No Academy dialect or orthographic standard is selected here.

## Core finding
Kurmanji transitive past-domain clauses show ergative alignment: the agent is oblique and the verb agrees with the direct/nominative object. Thackston explicitly states that the past conditional of transitive verbs is ergative (§25.1), and gives a separate ergative paradigm for past perfect conditionals (§25.2). The agreement target is therefore the object, not the agent.

## Keep the two moods distinct

### 1. Past conditional (§25.1)
Thackston forms the past conditional by prefixing **bí-** to the past stem and adding person/number endings. The paradigm differs for consonant-final and vowel-final stems. For transitive verbs the construction is ergative.

Directly attested transitive examples with **dîtin** in Thackston's paradigm:
- `wî bidîtama`
- `wî bidîtayî`
- `wî bidîta`
- `wî bidîtana`

The paradigm aligns the verb ending with the direct object. The oblique agent `wî` remains the agent; it does not control the verb ending.

### 2. Past perfect conditional (§25.2)
Thackston describes two dialectally exclusive varieties:
1. Subjunctive prefix **bí-** (affirmative) or **né-** (negative) + past perfect + `-(y)a`.
2. Subjunctive **bí-** or **né-** + a form with **ba-** replacing **bû** in the past perfect.

Directly attested transitive examples with **dîtin**:
- First variety: `min bídîtibûya`, `te bídîtibûya`, `wî bídîtibûya`, `me bídîtibûya`, `we bídîtibûya`, `wan bídîtibûya`.
- Negative first variety: `min nédîtibûya`, `te nédîtibûya`, `wî nédîtibûya`, `me nédîtibûya`, `we nédîtibûya`, `wan nédîtibûya`.
- Second variety: `min bídîtiba`, `te bídîtiba`, `wî bídîtiba`, `me bídîtiba`, `we bídîtiba`, `wan bídîtiba`; negative examples use `nédîtiba`.

These examples all show a third-person singular direct object, so the verb form remains the same while the oblique agent changes. They establish ergative alignment, but do not by themselves demonstrate the full range of object-person/number endings.

## Implications for xwendin
- The audited sources directly attest the general ergative pattern and the **dîtin** paradigms above.
- They do not provide a directly attested complete **xwendin** paradigm for either past conditional or past perfect conditional.
- Forms such as `bîxwendama`, `bîxwendayî`, `bîxwenda`, `bîxwendana`, `bîxwendibûya`, and negative counterparts must remain explicitly **unverified extrapolations** until checked against a source or a reviewed native-speaker paradigm.
- Do not teach those extrapolations as Academy-standard forms.
- Do not conflate the simple past conditional (§25.1) with the past perfect conditional (§25.2). In particular, a form containing `-ibûya` belongs to the past perfect conditional pattern described in §25.2, not the simple past conditional in §25.1.

## Editorial recommendation
Keep separate reference notes and lesson labels for:
1. past conditional;
2. past perfect conditional, variety 1;
3. past perfect conditional, variety 2;
4. transitive ergative agreement and its object-agreement endings.

Before producing a learner-facing table, verify the target Hawar-based variety and collect directly attested examples covering first-, second-, and third-person singular and plural objects. Keep source-specific dialect variants visible rather than merging them into one paradigm.

## Sources
- W. M. Thackston, *Kurmanji Kurdish: A Reference Grammar with Selected Readings*, §25.1–§25.2, pp. 61–63. The §25.1 paradigm explicitly labels transitive past conditionals as ergative; §25.2 provides two dialectally exclusive past perfect conditional varieties and affirmative/negative transitive examples.
  - https://kurdishcentral.org/wp-content/uploads/2024/06/Thackstons-Grammar.pdf
  - https://www.academia.edu/5485402/Kurmanji_Kurdish_A_Referance_Grammar_with_Selected_Readings_by_W_M_Thackston
- Geoffrey Haig, “Ergative alignment in Kurmanji,” for the broader tense/transitivity-conditioned alignment and object agreement pattern.
  - https://www.hewalname.com/ku/wp-content/uploads/2019/03/get-komprimerad.pdf
- “Negation in Kurmanji,” discussion of the two irrealis varieties and their formation, with reference to Thackston (2006).
  - https://www.academia.edu/3342645/Negation_in_Kurmanji_In_Manova_ed_Affix_Ordering_Across_Languages_and_Frameworks_Oxford_University_Press

## Change record
Documentation-only addition. No lesson or production artifact changed.
