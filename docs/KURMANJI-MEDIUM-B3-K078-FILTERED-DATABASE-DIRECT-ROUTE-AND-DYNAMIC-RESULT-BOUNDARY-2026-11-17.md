# K-078 Filtered Database Route: Direct Link and Rendered-Data Boundary

Date: 2026-11-17  
Type: source retrieval audit; documentation only.

## 1. Direct sample route confirmed

The Kratylos database index identifies `K-078 Şemdinli` under Turkey (Kurmanji). Its sample link generates the filtered route with the exact parameter:

`criteria[0][sample]=K078`

This confirms the database's sample-code spelling is `K078` in the query parameter, even though the visible index label is `K-078`.

The database documentation states that records derive from transcriptions of recorded interviews, and that a sample link opens that sample's data. It also describes filtering by sample, location, structural tag, English questionnaire phrase, and Kurdish text, with Download Results available after a search.

## 2. What the direct route returned

Opening the exact K078 link through the available text retrieval returned the database page shell and its index/navigation text, not the dynamically rendered result rows. The result did not expose the K-078 questionnaire transcriptions or the requested 3.11.1–3.11.3 fields.

This is a rendering/retrieval limitation of the current interface. It does not mean the filtered database is empty or that K-078 lacks those records.

## 3. Evidence boundary

Confirmed:
- K-078 is indexed as Şemdinli, Turkey, Kurmanji.
- The actual filter token is `K078`.
- The database is based on transcribed recorded interviews.
- The database's documented workflow supports downloading filtered results.

Still not recovered:
- The actual K078 result rows from the dynamic table.
- The precise K-078 forms for items 3.11.1, 3.11.2, and 3.11.3.
- The exact speaker-to-map-popup match for those items.

The previously recovered Manchester free-speech excerpt is not a substitute for the three elicited questionnaire responses. In particular, a contextually future negative clause must not be treated as the answer to a positive future elicitation prompt.

## 4. Next machine-readable retrieval options

Continue by investigating the database's own page source and script/API endpoints, or by locating an openly downloadable database export. Only use an endpoint after confirming its request parameters and response schema. If no public machine-readable route exists, use a maintainer request as the evidence-preserving route.

Do not ask the project owner to manually operate the site. Do not infer missing forms from dialect geography or questionnaire translations.

## 5. Project boundary

Documentation only. No lessons, course counts, learner-facing content, dialect policy, CI, runtime, deployment, or production database changed.

## References

- Kratylos database index and K-078 sample link: https://www.kratylos.org/~raphael/kurdish/database-of-kurdish-dialects/index.html
- Exact filtered K078 route: https://www.kratylos.org/~raphael/kurdish/database-of-kurdish-dialects/index0c8e.html?criteria%5B0%5D%5Blocation%5D=&criteria%5B0%5D%5Bphrase%5D=&criteria%5B0%5D%5Bphrase_text%5D=&criteria%5B0%5D%5Bsample%5D=K078&criteria%5B0%5D%5Btag%5D=
- Manchester survey maps instructions: https://kurdish.humanities.manchester.ac.uk/pilot-project-dialect-variation-maps/
