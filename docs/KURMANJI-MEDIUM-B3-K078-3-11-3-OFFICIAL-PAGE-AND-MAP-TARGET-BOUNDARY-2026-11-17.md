# K-078 Item 3.11.3: Official Page Instructions and Map-Target Verification Boundary

Date: 2026-11-17  
Type: source-page inspection; documentation only.

## 1. Official item identity

The University of Manchester legacy survey index identifies item 3.11.3 as “Combination: Future tense marker”. Its official page is:

https://kurdish.humanities.manchester.ac.uk/future-tense-marker/

The page's instructions state:
- Expand the map legend/details panel.
- Use “Legend” to inspect displayed types and layers.
- Use “Details” to inspect the phrases used for the map.
- Click a location to see details for that sample.
- Zoom in where multiple samples occupy the same location.

The official map index explains that a marker represents one interviewed speaker and that the marker popup contains the dialect location and exact dialect form recorded.

## 2. What this inspection establishes

Confirmed:
- Item 3.11.3 exists in the official survey index.
- Its official page labels it “Combination: Future tense marker”.
- The page documents the expected map interaction and sample-detail popup.
- The official index presents items 3.11.1, 3.11.2, and 3.11.3 as distinct survey-map items.

Not confirmed:
- A stable ArcGIS webmap item ID for 3.11.3.
- Whether the page's map embed is a distinct ArcGIS webmap, a legacy map service, or a redirecting interactive-map wrapper.
- Whether K-078 appears in the 3.11.3 map.
- Any exact K-078 response for the combined prompt.

The page's text extraction does not expose the embedded map's operational layer metadata or a sample popup. The previously observed general interactive-map destination is insufficient to identify the underlying dataset. No ID or feature layer is inferred from it.

## 3. Combined with the 3.11.1 and 3.11.2 checks

Known webmap IDs from their official page links:
- 3.11.1: `5a62567b94b440829a8e7c3c2c6d3eab`
- 3.11.2: `31b040f4fbe641aaa241d16b36ad7df5`
- 3.11.3: unresolved

The official page instructions describe how to retrieve sample details, but they do not themselves reveal K-078's answer. Do not infer a form from the English prompt or map colour.

## 4. Next exact evidence capture

A browser inspection must expose the map's actual embedded target or popup. For any Şemdinli marker, verify that the popup identifies sample K-078 before recording the response. Capture:
- item number and English prompt;
- sample identifier and locality;
- exact Kurdish transcription as displayed;
- any gloss or metadata shown;
- source URL and retrieval date.

If the map does not expose the sample identifier, retrieve the K078-filtered database export or ask the maintainers for the relevant record.

## 5. Project scope

Documentation only. No lessons, learner-facing material, course counts, dialect policy, CI, runtime, deployment, or production database were changed.

## References

- Official 3.11.3 page: https://kurdish.humanities.manchester.ac.uk/future-tense-marker/
- Official map instructions and survey index: https://kurdish.humanities.manchester.ac.uk/kurdish-dialect-variation-maps/
- Survey index: https://kurdish.humanities.manchester.ac.uk/pilot-extended-surveys/
- Kratylos database index: https://www.kratylos.org/~raphael/kurdish/database-of-kurdish-dialects/index.html
