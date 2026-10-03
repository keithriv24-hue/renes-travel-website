/*
 * routes.js — one table of every page, its <head> and its structured data.
 * ─────────────────────────────────────────────────────────────
 * Used in two places:
 *   • scripts/prerender.mjs writes each route to static HTML, puts these
 *     tags in its <head>, and builds sitemap.xml and _redirects from it.
 *   • src/lib/useHead.js applies the same tags on client-side navigation.
 * Trip and partner routes come straight from the data files, so adding a
 * trip or partner adds its page, head tags and sitemap entry here too.
 * ─────────────────────────────────────────────────────────────
 */
import siteConfig from "../data/siteConfig";
import { trips } from "../data/trips";
import { partners, partnerTypes } from "../data/partners";

const BASE = siteConfig.business.baseUrl;
const BIZ = siteConfig.business.shortName;
const BUSINESS_ID = `${BASE}/#business`;
const abs = (path) => `${BASE}${path}`;

export function businessJsonLd() {
  const address = { "@type": "PostalAddress", addressRegion: "NJ", addressCountry: "US" };
  if (siteConfig.business.town) address.addressLocality = siteConfig.business.town;
  const entity = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": BUSINESS_ID,
    name: siteConfig.business.name,
    alternateName: BIZ,
    slogan: siteConfig.business.tagline,
    url: `${BASE}/`,
    telephone: siteConfig.contact.phoneTel,
    email: siteConfig.contact.email,
    logo: abs("/apple-touch-icon.png"),
    founder: { "@type": "Person", name: siteConfig.business.owner, jobTitle: siteConfig.business.ownerTitle },
    address,
    areaServed: siteConfig.business.state,
    memberOf: { "@type": "Organization", name: "Cruise Lines International Association (CLIA)" },
    sameAs: Object.values(siteConfig.socialProfiles).filter(Boolean),
  };
  if (siteConfig.images.ogImage.src) entity.image = abs(siteConfig.images.ogImage.src);
  return entity;
}

const faqJsonLd = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const breadcrumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

const service = (name, description, path) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  name,
  description,
  url: abs(path),
  areaServed: siteConfig.business.state,
  provider: { "@type": "TravelAgency", "@id": BUSINESS_ID, name: siteConfig.business.name, telephone: siteConfig.contact.phoneTel },
});

export const tripFaqs = (trip) => (trip.faqs || []).map((i) => siteConfig.faqs[i]).filter(Boolean);

export function buildRoutes() {
  const r = [];
  const add = (route) => r.push({ ogType: "website", sitemap: { priority: "0.6", changefreq: "monthly" }, ...route, canonical: route.noindex ? "" : abs(route.path) });

  add({
    path: "/",
    title: "René’s Travel Agency | Cruises, Group Trips & Vacations in New Jersey",
    description:
      "René Howell plans cruises, river cruises, rail vacations, all-inclusive resorts, reunions, weddings and honeymoons. Group cruise leader since 2006. Call (609) 304-1336.",
    jsonLd: [
      businessJsonLd(),
      { "@context": "https://schema.org", "@type": "WebSite", name: BIZ, url: `${BASE}/` },
      faqJsonLd(siteConfig.faqs),
    ],
    sitemap: { priority: "1.0", changefreq: "weekly" },
  });
  add({
    path: "/about/",
    title: `About René Howell | ${BIZ}`,
    description:
      "René’s Travel Agency was started for the love of travel. René Howell began as a group leader with Liberty Travel in 2006. CLIA, New Jersey registered business.",
    jsonLd: [breadcrumbs([{ name: "About René", path: "/about/" }])],
    sitemap: { priority: "0.7", changefreq: "monthly" },
  });
  add({
    path: "/trips/",
    title: `Trips René Plans | Cruises, Resorts, Tours | ${BIZ}`,
    description:
      "Cruises, river cruises, rail vacations, all-inclusive resorts, family vacations, weddings and honeymoons, escorted tours, ski and sports travel. Planned by René Howell.",
    jsonLd: [breadcrumbs([{ name: "Trips", path: "/trips/" }])],
    sitemap: { priority: "0.8", changefreq: "monthly" },
  });
  trips.forEach((t) => {
    const path = `/trips/${t.slug}/`;
    add({
      path,
      title: t.seoTitle,
      description: t.description,
      jsonLd: [service(t.name, t.description, path), breadcrumbs([{ name: "Trips", path: "/trips/" }, { name: t.name, path }]), faqJsonLd(tripFaqs(t))],
      sitemap: { priority: "0.8", changefreq: "monthly" },
    });
  });
  add({
    path: "/group-cruises/",
    title: `Group Cruises, Reunions & Retirement Cruises | ${BIZ}`,
    description:
      "René Howell has led group cruises since 2006, starting with 32 travelers on Royal Caribbean’s Explorer of the Seas. Family reunions, class reunions and retirement cruises.",
    jsonLd: [
      service("Group cruises", "Group cruises, family and class reunions, and retirement cruises organized by René Howell.", "/group-cruises/"),
      breadcrumbs([{ name: "Group cruises", path: "/group-cruises/" }]),
      faqJsonLd([siteConfig.faqs[1], siteConfig.faqs[3], siteConfig.faqs[5]]),
    ],
    sitemap: { priority: "0.9", changefreq: "monthly" },
  });
  add({
    path: "/partners/",
    title: `Cruise Lines & Travel Partners | ${BIZ}`,
    description:
      "Royal Caribbean, Carnival, Celebrity, Princess, Norwegian, Disney, Azamara, Cunard, AmaWaterways, Viking, Amtrak Vacations, Gate 1 and more, booked by René.",
    jsonLd: [breadcrumbs([{ name: "Partners", path: "/partners/" }])],
    sitemap: { priority: "0.7", changefreq: "monthly" },
  });
  partners.forEach((p) => {
    const path = `/partners/${p.slug}/`;
    add({
      path,
      title: `${p.name} | Book with ${BIZ}`,
      description: `${p.summary.split(". ")[0]}. ${partnerTypes[p.type]} booked by René Howell, René’s Travel Agency, New Jersey.`.slice(0, 300),
      jsonLd: [breadcrumbs([{ name: "Partners", path: "/partners/" }, { name: p.name, path }])],
      sitemap: { priority: "0.6", changefreq: "monthly" },
    });
  });
  add({
    path: "/forms/",
    title: `Client Forms & Safe Travel Checklist | ${BIZ}`,
    description:
      "Travel booking worksheet, registration, payment authorization, recurring payments, online check-in, airline fees guide, Travel Guard insurance and René’s safe travel tips.",
    jsonLd: [breadcrumbs([{ name: "Client forms", path: "/forms/" }])],
    sitemap: { priority: "0.6", changefreq: "monthly" },
  });
  add({
    path: "/plan-my-trip/",
    title: `Plan My Trip | Contact René Howell | ${BIZ}`,
    description:
      "Tell René where you want to go. Call or text (609) 304-1336, email renes.travel@comcast.net, or send the short trip form to get the ball rolling.",
    jsonLd: [breadcrumbs([{ name: "Plan my trip", path: "/plan-my-trip/" }])],
    sitemap: { priority: "0.8", changefreq: "monthly" },
  });
  add({
    path: "/privacy-policy/",
    title: `Privacy Policy | ${BIZ}`,
    description: "How René’s Travel collects, uses and protects your information.",
    jsonLd: [],
    sitemap: { priority: "0.2", changefreq: "yearly" },
  });
  add({
    path: "/thank-you/",
    title: `Thank you | ${BIZ}`,
    description: "Your trip request is in. René will be in touch.",
    robots: "noindex, nofollow",
    noindex: true,
    jsonLd: [],
    sitemap: null,
  });
  return r;
}

const NOT_FOUND = {
  path: "/404",
  title: `Page not found | ${BIZ}`,
  description: "This page moved or no longer exists.",
  robots: "noindex",
  canonical: "",
  jsonLd: [],
  sitemap: null,
};

let cache = null;
export function metaForPath(pathname) {
  if (!cache) cache = buildRoutes();
  const norm = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return cache.find((x) => x.path === norm) || NOT_FOUND;
}

export const notFoundMeta = NOT_FOUND;

// Old 2016 URLs → new pages (301). Written to public/_redirects at build.
export function legacyRedirects() {
  const fixed = [
    ["/history.php", "/about/"],
    ["/vision.php", "/about/"],
    ["/services.php", "/trips/"],
    ["/affiliates.php", "/partners/"],
    ["/privacypolicy.php", "/privacy-policy/"],
  ];
  const fromPartners = partners.filter((p) => p.oldPath).map((p) => [p.oldPath, `/partners/${p.slug}/`]);
  return [...fixed, ...fromPartners];
}
