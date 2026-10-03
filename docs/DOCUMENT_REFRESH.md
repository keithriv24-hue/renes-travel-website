# Client document refresh

All 13 PDF links retained their original paths and now resolve to files in `public/pdf`.

- Five client forms were rebuilt with embedded type, navy headings, generous fields, and editable PDF text fields. Handwritten signature labels remain explicit.
- The Carnival flyer and four Amtrak flyers were retyped into readable layouts. Original dates, itineraries and printed prices remain.
- The airline guide, Azamara flyer and Travel Guard document include larger reading panels and document bookmarks. Supplier tables and policy wording were preserved visually rather than reconstructed from unreliable OCR.
- Every replacement includes complete original page images for reference. Current agency headers use the previously confirmed phone number and Owner & Independent Travel Agent title. Historical page images retain original contact details.
- No new prices, refund terms, insurance benefits, eligibility rules, or deadlines were created. Historical offers remain labeled historical; this refresh is not a supplier-information update.
- External passport, Travel Guard and Tally/JotForm resources were inventoried but not modified; these are external services rather than repository-owned PDFs.

Sources were recovered from the old `https://renestravelagency.com/pdf/` URLs on 2026-10-03. Source PDFs were not previously in this repository. The generation script expects the recovered source PDFs, extracted `.txt` companions for client forms, and rendered `stem-page.png` files. The finished PDFs are committed so builds do not need a Python runtime.

Validation: all PDF pages rendered and visually reviewed; fillable field tree, widget appearances, sample value round trips, page counts and all local PDF link targets checked. Production build passed.
