/*
 * trips.js
 * ─────────────────────────────────────────────────────────────
 * One object per kind of trip René plans (from the services list on her
 * original site). Each object creates /trips/<slug>/, a row on /trips/,
 * cross-links to the partners that list it, and a sitemap entry.
 *
 * Copy rule: describe the kind of trip in plain language and tie René to
 * it only with facts from her own site. No invented prices, awards or
 * numbers. ⚠ René should read these pages before launch.
 * ─────────────────────────────────────────────────────────────
 */

export const trips = [
  {
    slug: "ocean-cruises",
    name: "Ocean cruises",
    h1: "Ocean cruises, planned by René",
    seoTitle: "Cruise Travel Agent in New Jersey | René’s Travel Agency",
    description:
      "Caribbean, Bahamas, Mexico, Alaska and Europe. René Howell has booked cruises since 2006 with Royal Caribbean, Carnival, Celebrity, Princess, Norwegian and more.",
    where: "Caribbean, Bahamas, Mexico, Alaska, Europe",
    intro: [
      "A cruise lets you unpack once and wake up somewhere new. The ship is your hotel, your restaurant and your evening’s entertainment, and the ports change every day.",
      "Cruises are where René started. She has been booking them since 2006, and she matches the line and the ship to the people sailing, whether that is a couple, a family or a group of thirty.",
    ],
    image: "hero",
    testimonial: "tony-wendy",
    faqs: [1, 2, 3, 4],
  },
  {
    slug: "river-cruises",
    name: "River cruises",
    h1: "River cruises through Europe, Asia and Africa",
    seoTitle: "River Cruise Travel Agent | René’s Travel Agency",
    description:
      "River cruises on the Danube, the Rhine, France and Portugal, and through Asia and Africa, with AmaWaterways and Viking. Planned by René Howell.",
    where: "Danube, Rhine, France, Portugal, Asia, Africa",
    intro: [
      "River ships are small enough to dock right in town. You walk ashore into the old quarter, see the sights on a guided tour, then sail on to the next town while you have dinner.",
      "René books river cruises with AmaWaterways and Viking, and helps you choose the river, the season and the itinerary that fit what you want to see.",
    ],
    image: "river",
    faqs: [2, 3, 4],
  },
  {
    slug: "rail-vacations",
    name: "Rail vacations",
    h1: "Rail vacations across America",
    seoTitle: "Amtrak Vacations and Rail Trips | René’s Travel Agency",
    description:
      "Train vacations to the National Parks, the American West and East Coast cities with Amtrak Vacations. Planned by René Howell.",
    where: "National Parks, the American West, East Coast cities",
    intro: [
      "A train trip turns the travel itself into the vacation. Watch the American West roll past the window, stop at the National Parks, or ride into the big cities of the East Coast.",
      "René books rail vacations through Amtrak Vacations, with independent or escorted journeys and weekend getaway packages.",
    ],
    image: null,
    faqs: [3, 4, 5],
  },
  {
    slug: "all-inclusive-resorts",
    name: "All-inclusive resorts",
    h1: "All-inclusive resorts",
    seoTitle: "All-Inclusive Resort Vacations | René’s Travel Agency",
    description:
      "All-inclusive resort vacations in the Caribbean, Mexico and Spain with Bahia Principe, Barceló and GOGO Vacations packages. Planned by René Howell.",
    where: "Caribbean, Riviera Maya, Jamaica, Canary Islands",
    intro: [
      "At an all-inclusive resort, your room, your meals and many drinks and activities are covered before you arrive, so you can relax without watching every receipt.",
      "René books resorts and packages with Bahia Principe, Barceló and GOGO Vacations, and helps you find the one that fits your budget and the way you like to vacation.",
    ],
    image: null,
    faqs: [0, 3, 4],
  },
  {
    slug: "family-vacations",
    name: "Family vacations",
    h1: "Family vacations, including Walt Disney World",
    seoTitle: "Family Vacations and Disney Trips | René’s Travel Agency",
    description:
      "Family vacations to Walt Disney World, on Disney Cruise Line, Royal Caribbean and Carnival, and trips back home to see family. Planned by René Howell.",
    where: "Walt Disney World, family cruises, trips home",
    intro: [
      "Family trips have the most moving parts: ages, schedules, budgets and everyone’s wish list. Getting the details right is what lets everyone enjoy it.",
      "René plans Walt Disney World vacations, Disney Cruise Line and family-friendly cruises with Royal Caribbean and Carnival, and trips home to see family abroad.",
    ],
    image: null,
    testimonial: "eugenia-nigel",
    faqs: [0, 3, 5],
  },
  {
    slug: "weddings-and-honeymoons",
    name: "Weddings and honeymoons",
    h1: "Weddings and honeymoons",
    seoTitle: "Honeymoon and Destination Wedding Travel | René’s Travel Agency",
    description:
      "Honeymoons and destination wedding travel: resorts, cruises and luxury hotels. Planned by René Howell, René’s Travel Agency, New Jersey.",
    where: "Resorts, cruises, luxury hotels",
    intro: [
      "A wedding or honeymoon trip should feel effortless for the two of you, and for any guests traveling to celebrate with you.",
      "René plans honeymoons and wedding travel with resorts, cruise lines and luxury hotel partners, and she is used to coordinating groups when family and friends come along.",
    ],
    image: null,
    faqs: [1, 3, 4],
  },
  {
    slug: "escorted-tours",
    name: "Escorted tours",
    h1: "Escorted tours and vacation packages",
    seoTitle: "Escorted Tours and Vacation Packages | René’s Travel Agency",
    description:
      "Escorted tours and complete vacation packages with Gate 1 Travel and GOGO Vacations. Planned by René Howell, René’s Travel Agency.",
    where: "Europe and worldwide",
    intro: [
      "On an escorted tour, a guide and a set itinerary handle the logistics, so you can see a lot of a country without planning every train and hotel yourself.",
      "René books escorted tours and complete packages with Gate 1 Travel and GOGO Vacations.",
    ],
    image: null,
    faqs: [2, 3, 4],
  },
  {
    slug: "spas-and-luxury-escapes",
    name: "Spas and luxury escapes",
    h1: "Spas and luxury escapes",
    seoTitle: "Luxury Travel and Spa Vacations | René’s Travel Agency",
    description:
      "Luxury escapes and spa vacations: upscale cruises with Celebrity, Azamara and Cunard, and top hotels through Worldwide Traveler. Planned by René Howell.",
    where: "Upscale cruises and top hotels",
    intro: [
      "Sometimes the point of the trip is to slow down: good service, a beautiful room and nothing on the schedule.",
      "René books upscale cruises with Celebrity, Azamara and Cunard, and hand-picked hotels and resorts through Worldwide Traveler.",
    ],
    image: null,
    faqs: [0, 3, 4],
  },
  {
    slug: "ski-holidays",
    name: "Ski holidays",
    h1: "Ski holidays",
    seoTitle: "Ski Vacations | René’s Travel Agency",
    description: "Ski holidays and winter getaways, packaged and booked by René Howell, René’s Travel Agency, New Jersey.",
    where: "Winter getaways",
    intro: [
      "A ski trip has a lot to line up: flights, lodging near the lifts and the right dates for the snow.",
      "René plans ski holidays and winter getaways, including complete packages through GOGO Vacations.",
    ],
    image: null,
    faqs: [0, 3, 5],
  },
  {
    slug: "sports-travel",
    name: "Sports travel",
    h1: "Sports travel and bucket-list events",
    seoTitle: "Sports Travel Packages | René’s Travel Agency",
    description:
      "Sports travel packages and bucket-list trips to major events in the U.S. and abroad through Sports Traveler. Planned by René Howell.",
    where: "Major events in the U.S. and abroad",
    intro: [
      "Seeing the big game in person is a once-in-a-lifetime trip, and the tickets are only part of it.",
      "René books sports travel packages through Sports Traveler, for the most popular events in the U.S. and around the world.",
    ],
    image: null,
    faqs: [0, 3, 5],
  },
];

// Shared list of what René handles on every trip. Each line traces to her
// original site: services copy, testimonials, or the client forms she offers.
export const whatReneHandles = [
  { title: "Options within your budget", detail: "René finds what you want within the budget you set." },
  { title: "Flights and connections", detail: "Flights, connecting transportation and luggage, taken care of." },
  { title: "A payment schedule", detail: "Recurring card payments so you can pay over time before you travel." },
  { title: "The paperwork", detail: "Registration, payment and online check-in forms in one place." },
  { title: "Travel insurance", detail: "Travel Guard plans to protect your vacation." },
  { title: "Problems solved along the way", detail: "Anticipating and resolving issues before they reach you." },
];

export const tripBySlug = (slug) => trips.find((t) => t.slug === slug);
