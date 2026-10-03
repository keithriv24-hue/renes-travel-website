# Tally trip form setup

This form replaces René’s JotForm (`61078489232158`). If `siteConfig.tally.formId` is ever set back to `""`, the site falls back to the JotForm.

**Status:** live. Form “Plan my trip with René”, ID `44eg4k` (https://tally.so/r/44eg4k), in Keith’s Tally workspace. Everything below is already set up; this file records how, so it can be rebuilt or checked.

- Submission emails go to Keith’s Tally account email, with Reply-to set to the traveler’s email. To also send them to René, open the form → Settings → Self email notifications → **+** next to “To”, and add `renes.travel@comcast.net`.
- The redirect goes to `https://renestravelagency.com/thank-you/`. Until the domain points at Cloudflare, a test submission made from the `*.pages.dev` preview lands on the old site and shows its “not found” page. The submission itself is still saved in Tally.

## 1. Create the form in Tally

Title: **Plan my trip with René**

| # | Field | Type | Required |
| --- | --- | --- | --- |
| 1 | Your name | Short answer | Yes |
| 2 | Email | Email | Yes |
| 3 | Phone | Phone number | Yes |
| 4 | Where would you like to go? | Short answer | No |
| 5 | What kind of trip? | Multiple choice (allow several): Ocean cruise, River cruise, All-inclusive resort, Family vacation / Disney, Group cruise or reunion, Wedding or honeymoon, Rail vacation, Escorted tour, Sports travel, Ski holiday, Spa or luxury escape, Not sure yet | No |
| 6 | When are you thinking of traveling? | Short answer (e.g. “June 2027” or “flexible”) | No |
| 7 | How many travelers? | Number | No |
| 8 | Budget (optional) | Short answer | No |
| 9 | Anything else René should know? | Long answer | No |
| 10 | Best way to reach you | Multiple choice: Call, Text, Email | No |

**Consent text** goes under the submit button. It is the same line the site shows; have René approve it:

> By sending the form, you agree to receive a call or text from René’s Travel Agency about your trip. Message and data rates may apply. Reply STOP to opt out.

## 2. Hidden fields (exact names)

The site fills these in automatically. Use Tally’s **Hidden fields** block:

`fbclid`, `fbp`, `fbc`, `event_source_url`, `source`

`source` tells you which button opened the form, for example `hero`, `header`, `mobile-bar` or `trip-ocean-cruises`.

## 3. Settings

- **After submission → Redirect to:** `https://renestravelagency.com/thank-you/` (turn on “Redirect immediately”). This is what fires the Lead event. Without it, completed forms can’t be tracked.
- **Notifications → Email:** `renes.travel@comcast.net`.

## 4. Turn it on

Copy the form ID from its share link (`https://tally.so/r/<FORM_ID>`). Put it in `src/data/siteConfig.js` → `tally.formId`. Then rebuild and deploy.
