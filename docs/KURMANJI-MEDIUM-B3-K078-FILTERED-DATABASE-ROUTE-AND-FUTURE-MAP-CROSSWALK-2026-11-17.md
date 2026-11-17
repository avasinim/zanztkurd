# K-078 Filtered Database Route and Future-Map Crosswalk

Date: 2026-11-17  
Type: source retrieval audit; documentation only.

## 1. Verified sample-filter route

The current public database index links the sample label **K-078 Şemdinli** to a filtered database page. Following that actual link produces this URL pattern (the sample value is K078, without a hyphen):

https://www.kratylos.org/~raphael/kurdish/database-of-kurdish-dialects/index0c8e.html?criteria%5B0%5D%5Blocation%5D=&criteria%5B0%5D%5Bphrase%5D=&criteria%5B0%5D%5Bphrase_text%5D=&criteria%5B0%5D%5Bsample%5D=K078&criteria%5B0%5D%5Btag%5D=

This is a more reliable route than manually constructing a guessed URL with K-078. The sample page is publicly reachable and confirms the exact database filter syntax. The web text extraction did not expose the dynamic result rows, so this pass still does not verify any individual Kurdish response.

## 2. Future-marker map crosswalk verified

The database index links directly to all three future-marker map pages:
- 3.11.1 — “Tomorrow it will rain”
- 3.11.2 — “Tomorrow I will go to town”
- 3.11.3 — “Combination: Future tense marker”

The 3.11.1 page explicitly instructs users to expand the ArcGIS legend/details and click a location to see details for that sample. Its embedded ArcGIS webmap identifier is:

`5a62567b94b440829a8e7c3c2c6d3eab`

The map page and ArcGIS embed are confirmed, but the web retrieval channel did not expose the interactive map's location pop-ups or feature attributes. The 3.11.2 map page is also linked from the index; its page retrieval timed out in this pass. The 3.11.3 page is linked and its title/combination status are confirmed, but the map's feature details were not extracted.

## 3. What this establishes—and what it does not

Established:
- K-078 is explicitly listed as Şemdinli in the database sample index.
- Clicking its sample entry generates a live filtered database URL using `sample=K078`.
- The database index links to the three relevant future-marker map pages.
- The 3.11.1 map is an ArcGIS webmap with a documented click-for-sample-details workflow.

Not established:
- The exact Kurdish response for K-078 to 3.11.1, 3.11.2, or 3.11.3.
- Whether each map has a distinct K-078 feature, or what its displayed category/response is.
- Any full future paradigm for the speaker.

Do not infer a response from the map's general regional shading, the map title, or the speaker's separate free-speech transcript.

## 4. Recommended next technical retrieval

The remaining barrier is the dynamic data layer, not the identity of the sample or questionnaire items. The next step is to inspect the ArcGIS webmap's operational layers / feature-service references and query the relevant feature layer for the K-078 point or sample attribute. Any resulting feature must be checked for its item number, exact Kurdish phrase, and sample identifier before being cited as direct elicitation evidence.

If the ArcGIS service does not expose a stable public feature query, use the database's own Download Results export for the K078 filter, or request the relevant data from the project maintainers. No guessed ArcGIS layer number or response token should be used.

## 5. Project boundary

Documentation only. No lesson content, course inventory, learner-facing material, dialect-standard decision, CI workflow, deployment, runtime, or production database was changed.

## References

- Database index and sample list: https://www.kratylos.org/~raphael/kurdish/database-of-kurdish-dialects/index.html
- K-078 filtered database route: https://www.kratylos.org/~raphael/kurdish/database-of-kurdish-dialects/index0c8e.html?criteria%5B0%5D%5Blocation%5D=&criteria%5B0%5D%5Bphrase%5D=&criteria%5B0%5D%5Bphrase_text%5D=&criteria%5B0%5D%5Bsample%5D=K078&criteria%5B0%5D%5Btag%5D=
- Map 3.11.1: https://www.kratylos.org/~raphael/kurdish/future-tense-marker-tomorrow-will-rain/index.html
- Map 3.11.2: https://www.kratylos.org/~raphael/kurdish/future-tense-marker-tomorrow-i-will-go-town/index.html
- Map 3.11.3: https://www.kratylos.org/~raphael/kurdish/future-tense-marker/index.html
- ArcGIS 3.11.1 webmap: https://www.arcgis.com/apps/Embed/index.html?active_panel=legend&details=true&disable_scroll=true&extent=23.6793%2C29.6528%2C63.8892%2C44.2161&legend=true&scale=true&theme=light&webmap=5a62567b94b440829a8e7c3c2c6d3eab&zoom=true
