# K-078 Future Map: ArcGIS REST Inspection and Remaining Retrieval Blocker

Date: 2026-11-17  
Type: read-only source inspection; documentation only.

## 1. Known map item

The 3.11.1 future-marker map page embeds ArcGIS webmap item:

`5a62567b94b440829a8e7c3c2c6d3eab`

The map page says users can click a location to see details for that sample. The map index separately identifies:
- 3.11.1 — “Tomorrow it will rain”
- 3.11.2 — “Tomorrow I will go to town”
- 3.11.3 — “Combination: Future tense marker”

## 2. REST inspection performed

The standard ArcGIS Online public item endpoints were attempted for the exact webmap item:
- `/sharing/rest/content/items/{itemID}?f=pjson`
- `/sharing/rest/content/items/{itemID}/data?f=pjson`

The available web retrieval interface returned an access/internal error for both exact endpoints. A direct runtime network attempt also failed before reaching ArcGIS because DNS resolution was unavailable in that execution environment.

This is an access/tooling limitation. It does not establish that the ArcGIS item is private, deleted, or missing. No operational layer names, feature-service URLs, layer IDs, or feature attributes were recovered in this pass.

Esri's official REST documentation confirms that a web map item has an item resource and a separate `/data` endpoint; the data endpoint is where the web-map JSON and its operational layer definitions can be inspected. This supports the next technical step but does not supply this map's own layer metadata.

## 3. What remains unverified

- Whether the 3.11.1 webmap has an operational feature layer that exposes K-078.
- The feature-service URL and layer ID, if any.
- Exact K-078 response strings for items 3.11.1, 3.11.2, and 3.11.3.
- Whether 3.11.2 and 3.11.3 use separate webmap item IDs or share a data source.

Do not guess layer IDs, build unverified query URLs, or infer a speaker response from regional map shading.

## 4. Safe next route

A human browser session can open the public ArcGIS item page and inspect its Details / Data / Layers metadata, or open the map and use its documented location pop-up at Şemdinli. If an operational layer URL is visible, its public REST layer resource can be queried using the sample identifier only after the field names and layer schema are confirmed.

The alternative remains the Kratylos K078 filter's Download Results export or a request to the dataset maintainers. The exact response must be preserved with item number, sample code, locality, prompt, transcription, and record provenance.

## 5. Evidence status

Confirmed:
- 3.11.1 ArcGIS item ID as embedded in the map page.
- The map page's click-for-sample-details instruction.
- The three questionnaire item labels in the map index.
- Esri's documented distinction between an item metadata endpoint and its item-data endpoint.

Not confirmed:
- Any K-078 feature attribute or elicited response for these items.

## 6. Project boundary

Read-only source research and documentation only. No lesson content, course inventory, learner-facing materials, dialect policy, CI, deployment, runtime, or production database was changed.

## References

- Legacy future-marker map 3.11.1: https://kurdish.humanities.manchester.ac.uk/future-tense-marker-tomorrow-will-rain/
- Map index: https://www.kratylos.org/~raphael/kurdish/kurdish-dialect-variation-maps/index.html
- Esri item resource documentation: https://developers.arcgis.com/rest/users-groups-and-items/item/
- Esri item-data documentation: https://developers.arcgis.com/rest/users-groups-and-items/item-data/
- Esri guide to retrieving web-map JSON: https://developers.arcgis.com/documentation/mapping-and-location-services/mapping/tutorials/tools/create-a-web-scene/
