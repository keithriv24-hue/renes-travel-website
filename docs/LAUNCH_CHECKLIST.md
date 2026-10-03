# Launch checklist

## Files and assets

- [ ] **PDF forms:** copy the old site’s `/pdf` folder into `public/pdf/`, keeping the same file names and the `amtrak/` subfolder. The paths are linked on the site, but the files were not in the upload:
  `Travel_Booking_Worksheet.pdf`, `Rene_Travel_Cruise_Info.pdf`, `Auth_Form-one-time-payment.pdf`, `Recurring_Auth_Form.pdf`, `ON_LINE_CHECK_IN_FORM.pdf`, `airline.pdf`, `gold_silv_plat.pdf`, `Carnival_Cruise_flyer.pdf`, `Flyer_Azamara.pdf`, `GOGO _Flyer.pdf`, `amtrak/top_selling_rail_vacation.pdf`, `amtrak/top_selling_rail_vacationB.pdf`, `amtrak/us_national_parks.pdf`, `amtrak/us_national_parksB.pdf`
- [ ] **Photos** (`siteConfig.images`): René’s portrait (real), a René group photo (real), the hero ocean shot, a river cruise shot, and Santa Cruz Beach (ask Eugenia). Also a 1200×630 social share image.
- [ ] **René’s signature:** the script “René” is a font stand-in. Swap it for a scan of her real signature if she wants.
- [ ] **Logo:** the old `example/logo.png` was not in the upload. The site uses a text wordmark plus her blue “R” favicon.

## Content René should approve

- [ ] **Still current?** Phone (609) 304-1336, email renes.travel@comcast.net, the Facebook page, and the partner list. The partners come from the 2016 site; remove any she no longer books.
- [ ] **FAQ answers** (`siteConfig.faqs`). They are built only from her old site, but they are new wording.
- [ ] **Trip page copy** (`trips.js`) and **partner summaries** (`partners.js`). These are rewritten in her voice, and the old copied cruise-line text was removed.
- [ ] **Payment schedule:** “Recurring card payments let you spread the cost out.” This comes from her recurring payment form and Felicia’s review. Confirm she offers it.
- [ ] **Text consent line** under the forms.
- [ ] **Testimonials** are unchanged. Felicia’s still mentions the 2015 and 2017 cruises, and newer reviews would help.
- [ ] **Brochure PDFs** on partner pages (Carnival, Azamara, GOGO, Amtrak) are 2016 promotions. Keep them or remove them.
- [ ] **Privacy policy** is unchanged from 2016. It mentions Netscape and Internet Explorer and predates the new form and analytics, so have it reviewed.
- [ ] **Town or service area**, if she wants it shown, for local search.

Small fixes already made to her text: grammar (“has been such a rewarding experience”, “I look forward to creating”), Portuguese accents in Eugenia’s testimonial, “Celebirty” to “Celebrity” (the old URL still redirects), and the broken footer email link. No facts were changed.

## Accounts (later)

- [x] Tally form is live (`44eg4k`). Still to decide: add René as a notification recipient (see `docs/TALLY_FORM_SETUP.md`).
- [ ] Google Business Profile, then Trustindex, then set `reviews.enabled`.
- [ ] GA4 measurement ID and Meta Pixel ID.

## Hosting

- [ ] Connect the repo to Cloudflare Pages (build: `npm run build`, output: `dist`, env `NODE_VERSION=22`).
- [ ] Point renestravelagency.com at it. The bare domain is canonical; redirect www to it, as the old site did.
- [ ] After launch, submit `https://renestravelagency.com/sitemap.xml` in Google Search Console.
