# K-078 Future-Map Cross-check: Newly Identified 3.11.2 Webmap

Date: 2026-11-17  
Type: source-index cross-check; documentation only.

## 1. New confirmed map identifier

The University of Manchester's own maps index links item 3.11.2, “Future tense marker: ‘Tomorrow I will go to town’”, to this page:

https://kurdish.humanities.manchester.ac.uk/future-tense-marker-tomorrow-i-will-go-town/

The page's ArcGIS link resolves to an embedded webmap with ID:

`31b040f4fbe641aaa241d16b36ad7df5`

This is distinct from the previously recorded 3.11.1 webmap ID:

`5a62567b94b440829a8e7c3c2c6d3eab`

The 3.11.2 page explicitly instructs the reader to click a location to see the details for that sample. The Manchester map index explains that one marker represents one interviewed speaker and that the popup contains the dialect location and exact recorded dialect form.

## 2. Retrieval result

The ArcGIS item metadata and item-data REST endpoints were attempted for the newly confirmed 3.11.2 ID. The web retrieval interface again returned an internal/access error. Therefore:
- The 3.11.2 webmap ID is confirmed from the official Manchester page's outbound ArcGIS link.
- Its operational layers and field schema remain unretrieved.
- No exact K-078 response for the “go to town” prompt has been recovered.
- Do not infer a response from map colours, regional distributions, or the English elicitation prompt.

## 3. 3.11.3 page status

The official index lists 3.11.3 as “Combination: Future tense marker” and its page is reachable. However, the link exposed by the page extraction redirected to a general University of Manchester interactive map, not to a verifiable Kurdish dialect ArcGIS webmap. Treat the 3.11.3 map target as unresolved until inspected in a normal browser or from page source.

## 4. Exact next retrieval procedure

For the 3.11.2 webmap, open the official map page in a normal browser, expand the legend/details panel, zoom to Şemdinli, and inspect the sample popup. Record the exact phrase and metadata only if the popup visibly identifies K-078. If the map has multiple Şemdinli markers, verify sample ID before transcribing.

If the popup does not expose the sample code, use the Kratylos database's sample filter `K078` and its Download Results function, or contact the dataset maintainers for the K-078 response to item 3.11.2.

## 5. Scope and safety

Documentation only. No learner-facing lesson content, course inventory, existing lesson, dialect standard, CI, runtime, deployment, or production database was changed.

## References

- Official Manchester 3.11.2 map page: https://kurdish.humanities.manchester.ac.uk/future-tense-marker-tomorrow-i-will-go-town/
- Official Manchester map index and map-use instructions: https://kurdish.humanities.manchester.ac.uk/kurdish-dialect-variation-maps/
- Kratylos map index: https://www.kratylos.org/~raphael/kurdish/kurdish-dialect-variation-maps/index.html
- Esri item resource: https://developers.arcgis.com/rest/users-groups-and-items/item/
- Esri item-data resource: https://developers.arcgis.com/rest/users-groups-and-items/item-data/
