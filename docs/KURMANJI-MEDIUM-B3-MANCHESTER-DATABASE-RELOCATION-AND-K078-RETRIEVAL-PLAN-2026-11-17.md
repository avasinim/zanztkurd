# Manchester Kurdish Dialect Database: Relocation and K-078 Retrieval Route

Date: 2026-11-17  
Type: source-access and retrieval audit; documentation only.

## New finding: the original Manchester database has moved

The legacy University of Manchester project page still describes the database search interface and its criteria (sample code, location, structural tag, English questionnaire phrase, and Kurdish text). It also identifies K-078 as Şemdinli in the Turkey (Kurmanji) sample list.

However, the project lead's current projects page states that the database was accessible on the University of Manchester website from 2016 until August 2022, and has since been made accessible via the Kratylos repository and the Aston University Forensic Linguistics Databank (FOLD).

This changes the retrieval plan: the legacy Manchester map pages are useful for identifying questionnaire item numbers and map context, but should not be treated as the only live route to the underlying speaker-level response records.

## Confirmed evidence sources

1. University of Manchester legacy database landing page:
   https://kurdish.humanities.manchester.ac.uk/database-of-kurdish-dialects/
   - Documents search criteria: sample, location, tag, English phrase, Kurdish text.
   - Lists K-078 Şemdinli among Turkey (Kurmanji) samples.
   - States data derive from transcriptions of recorded interviews.

2. Project lead's current project page:
   https://yaronmatras.org/projects/
   - States the original Manchester-hosted database was disconnected in August 2022.
   - States the database was subsequently made accessible through Kratylos and Aston FOLD.

3. Legacy survey index:
   https://kurdish.humanities.manchester.ac.uk/pilot-extended-surveys/
   - Lists questionnaire items 3.11.1, 3.11.2, and 3.11.3 for future-marker elicitation.

4. Comparative publication:
   https://fis.uni-bamberg.de/server/api/core/bitstreams/1880dfe1-4287-47fe-b603-6c9c174e5085/content
   - Identifies analytical future marking -ê/-dê/-wê as a Kurmanji/Bahdini feature and references maps 3.11.1–3.11.2.
   - Provides comparative interpretation, not the exact K-078 response tokens.

## K-078 retrieval plan

The next retrieval attempt should use the current Kratylos database and/or Aston FOLD, rather than relying on the legacy embedded maps alone.

Search target:
- Sample: K-078
- Locality: Şemdinli / Şemzînan
- Survey items: 3.11.1, 3.11.2, 3.11.3
- Search dimensions: sample code + item/English phrase; then verify exact Kurdish response, recording/transcription link, and source metadata.

For each recovered item, preserve:
- exact Kurdish response as displayed;
- original orthographic/transcription conventions;
- survey item number and English prompt;
- sample code and locality;
- whether the record is elicited questionnaire data or connected free speech;
- stable source URL or record identifier;
- retrieval date.

Do not reconstruct missing response forms from map colours, English prompts, free-speech examples, or regional generalizations.

## Evidence distinction retained

The K-078 free-speech transcript remains independent evidence. It includes multiple dê-marked prospective clauses and the contextually future-oriented negative clause `em ceyranê girê nadeyn`. These observations do not substitute for the missing elicited answers to 3.11.1–3.11.3.

The database's general documentation says free-speech samples are linked to questionnaire entries for the same speakers. This offers a promising way to cross-check once the relocated database records can be accessed, but the exact linkage and responses must be verified at record level.

## Safe conclusion

The K-078 questionnaire response is not yet verified in this audit. The main methodological correction is that the database's current access route is no longer the original Manchester-hosted interface. The next research step is to retrieve the speaker-level records from Kratylos or Aston FOLD, then compare elicited future-marker forms with the independent K-078 free-speech transcript.

## Project boundary

Research documentation only. No lesson text, course inventory, learner-facing content, language-standard decision, dialect policy, CI workflow, deployment, runtime, or production database was changed.

## References

- Matras, Yaron et al. 2016. *The Dialects of Kurdish*, Database of Kurdish Dialects: https://kurdish.humanities.manchester.ac.uk/database-of-kurdish-dialects/
- Matras, Yaron. Projects page, database access update: https://yaronmatras.org/projects/
- University of Manchester, Pilot and extended surveys: https://kurdish.humanities.manchester.ac.uk/pilot-extended-surveys/
- Haig, Geoffrey & Öpengin, Ergin. *Revisiting Kurdish dialect geography: Findings from the Manchester Database*: https://fis.uni-bamberg.de/server/api/core/bitstreams/1880dfe1-4287-47fe-b603-6c9c174e5085/content
