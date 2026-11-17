# K-078 Future Questionnaire Map Identifiers and Retrieval Status

Date: 2026-11-17  
Type: source-retrieval audit; documentation only.

## Newly verified map identifiers

The K-078 free-speech page directly links to the Manchester feature-map pages 3.11.1 and 3.11.2. Each feature page in turn links to a specific ArcGIS web map.

| Manchester feature | Elicitation prompt | ArcGIS web map item ID |
|---|---|---|
| 3.11.1 | Future tense marker: “Tomorrow it will rain” | `5a62567b94b440829a8e7c3c2c6d3eab` |
| 3.11.2 | Future tense marker: “Tomorrow I will go to town” | `31b040f4fbe641aaa241d16b36ad7df5` |

The IDs were read from the exact ArcGIS URLs exposed by the Manchester feature pages, not guessed.

- K-078 page: https://kurdish.humanities.manchester.ac.uk/k-078-semdinli-turkey-2/
- 3.11.1 feature page: https://kurdish.humanities.manchester.ac.uk/future-tense-marker-tomorrow-will-rain/
- 3.11.2 feature page: https://kurdish.humanities.manchester.ac.uk/future-tense-marker-tomorrow-i-will-go-town/
- 3.11.1 ArcGIS map: https://www.arcgis.com/apps/Embed/index.html?active_panel=legend&details=true&disable_scroll=true&extent=23.6793%2C29.6528%2C63.8892%2C44.2161&legend=true&scale=true&theme=light&webmap=5a62567b94b440829a8e7c3c2c6d3eab&zoom=true
- 3.11.2 ArcGIS map: https://www.arcgis.com/apps/Embed/index.html?active_panel=legend&details=true&disable_scroll=true&extent=22.2181%2C29.8054%2C62.428%2C44.342&legend=true&scale=true&theme=light&webmap=31b040f4fbe641aaa241d16b36ad7df5&zoom=true

## Retrieval result and limitation

The Manchester pages confirm the prompt names and explain that users must select a location marker to see the exact recorded form. The ArcGIS embed pages were opened, but the available text retrieval returned no feature attributes. Attempts to open the ArcGIS item metadata endpoints through the available web reader were inaccessible. Therefore:

- The two ArcGIS item IDs are verified.
- The exact Kurdish responses for K-078 on those two map layers are **not yet retrieved**.
- The K-078 free-speech forms must not be substituted for questionnaire answers.
- No claim is made that the map contains or lacks a K-078 marker until its feature layer is inspected directly.

## Why this is still useful

The research target is now exact and reproducible: two map item IDs, two feature prompts, and the K-078 sample identity. This narrows the remaining work to retrieving the web-map operational layers or querying the Manchester database with Sample = K-078 and the relevant future-tense tags/phrases.

The Manchester database documentation says that searches can combine Sample, Location, Tag, Phrase, and Kurdish text criteria, and results can be downloaded as a table/spreadsheet. The index identifies K-078 as Şemdinli in the Turkey (Kurmanji) group.

## Source-method note

The Manchester project describes questionnaire elicitation as orally translated prompts, recorded and transcribed, and distinguishes these entries from the separately published free-speech extracts. Thus questionnaire forms and connected-speech forms should be cross-checked, not conflated.

## Safe conclusion

This audit advances the source trail by recovering both exact ArcGIS web-map item IDs. It does not yet supply the K-078 questionnaire forms. The earlier free-speech evidence remains valid as contextual evidence, while questionnaire corroboration remains pending.

## Project boundary

Research documentation only. No course content, lesson, course count, language standard, dialect policy, CI workflow, deployment, runtime or production database has been changed.

## References

- Matras, Yaron et al. 2016. *The Dialects of Kurdish*, K-078 “Şemdinli, Turkey”: https://kurdish.humanities.manchester.ac.uk/k-078-semdinli-turkey-2/
- University of Manchester, 3.11.1 Future tense marker: https://kurdish.humanities.manchester.ac.uk/future-tense-marker-tomorrow-will-rain/
- University of Manchester, 3.11.2 Future tense marker: https://kurdish.humanities.manchester.ac.uk/future-tense-marker-tomorrow-i-will-go-town/
- University of Manchester, Database of Kurdish Dialects: https://kurdish.humanities.manchester.ac.uk/database-of-kurdish-dialects/
- University of Manchester, Pilot and extended surveys: https://kurdish.humanities.manchester.ac.uk/pilot-extended-surveys/
