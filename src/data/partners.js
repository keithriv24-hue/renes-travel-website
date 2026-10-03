/*
 * partners.js
 * ─────────────────────────────────────────────────────────────
 * One object per cruise line / travel company René books.
 * Each object creates /partners/<slug>/, a card on /partners/, links from
 * the trip pages listed in `trips`, and a sitemap entry.
 *
 * `oldPath` is the page this partner had on the 2016 site. The build turns
 * it into a 301 redirect (public/_redirects) so old links and rankings carry
 * over. Keep it when editing.
 *
 * Summaries are short rewrites of the old pages. The old pages copied the
 * cruise lines' own marketing text word for word, which is duplicate content
 * for Google and not René's to republish. Dated claims from 2016 (ship
 * counts, "newest ship", event years) were left out on purpose.
 * ─────────────────────────────────────────────────────────────
 */

export const partnerTypes = {
  ocean: "Ocean cruises",
  river: "River cruises",
  rail: "Rail vacations",
  tours: "Tours and vacation packages",
  resorts: "Hotels and resorts",
  parks: "Theme parks",
  sports: "Sports travel",
};

export const partners = [
  {
    slug: "royal-caribbean",
    name: "Royal Caribbean International",
    short: "Royal Caribbean",
    type: "ocean",
    oldPath: "/royal.php",
    website: "https://www.royalcaribbean.com",
    summary:
      "Big, busy ships built for families and groups, with towering lobbies, theaters, shops and workout rooms on board. Every ship is different, so the right one depends on who is sailing.",
    highlights: [
      "René’s first group cruise was on Royal Caribbean’s Explorer of the Seas in 2006, with 32 travelers.",
      "Alaska land and sea packages cover the must-see sights by ship, train and land.",
      "Rock-climbing walls and other onboard extras on many ships.",
    ],
    trips: ["ocean-cruises", "family-vacations"],
    testimonial: "tony-wendy",
  },
  {
    slug: "carnival",
    name: "Carnival Cruise Line",
    short: "Carnival",
    type: "ocean",
    oldPath: "/carnival.php",
    website: "https://www.carnival.com",
    summary:
      "Fun-first ships that make the ship itself part of the destination. Carnival sails to hundreds of ports around the world, from parasailing off the coast of Mexico to snorkeling in clear Bahamian water.",
    highlights: ["Mexico, the Bahamas and the Caribbean", "A lively onboard atmosphere for families and groups"],
    brochures: [{ label: "Carnival flyer", href: "/pdf/Carnival_Cruise_flyer.pdf" }],
    trips: ["ocean-cruises", "family-vacations"],
  },
  {
    slug: "celebrity",
    name: "Celebrity Cruises",
    short: "Celebrity",
    type: "ocean",
    oldPath: "/celebirty.php",
    website: "https://www.celebritycruises.com",
    summary:
      "Modern, upscale ships with spaces designed by well-known architects and interior designers. Itineraries run from Alaska’s glaciers to the Renaissance cities of Italy and well beyond.",
    highlights: ["Alaska, Europe and destinations on every continent", "A more refined feel than the biggest family ships"],
    trips: ["ocean-cruises", "spas-and-luxury-escapes", "weddings-and-honeymoons"],
  },
  {
    slug: "princess",
    name: "Princess Cruises",
    short: "Princess",
    type: "ocean",
    oldPath: "/princ.php",
    website: "https://www.princess.com",
    summary:
      "Large ships that still feel personal, with spacious decks, comfortably elegant public spaces, balcony staterooms, gourmet dining and entertainment to suit your mood.",
    highlights: ["Plenty of room to yourself on board", "Regional food and new ports to explore"],
    trips: ["ocean-cruises"],
  },
  {
    slug: "norwegian",
    name: "Norwegian Cruise Line",
    short: "Norwegian",
    type: "ocean",
    oldPath: "/norwegian.php",
    website: "https://www.ncl.com",
    summary:
      "Freestyle Cruising means you dine whenever, wherever and however you like. Rooms range from standard cabins to suites with their own private deck, and evenings bring Broadway-style shows.",
    highlights: ["No fixed dining times", "Activities from bowling to rock climbing", "A wide choice of room categories"],
    trips: ["ocean-cruises"],
  },
  {
    slug: "disney-cruise-line",
    name: "Disney Cruise Line",
    short: "Disney Cruise Line",
    type: "ocean",
    oldPath: "/disney.php",
    website: "https://disneycruise.disney.go.com",
    summary:
      "Outstanding dining, world-class entertainment, spacious accommodations and Disney’s service at sea. Families are often surprised by how much is included in the fare.",
    highlights: ["Built around families", "Entertainment and characters on board"],
    trips: ["ocean-cruises", "family-vacations"],
  },
  {
    slug: "azamara",
    name: "Azamara",
    short: "Azamara",
    type: "ocean",
    oldPath: "/azamara.php",
    website: "https://www.azamara.com",
    summary:
      "Smaller, club-like ships that dock where larger ships won’t fit, like the heart of Marseille, Amalfi and Crete, and spend more time in port so you can take in the culture, food and people.",
    highlights: ["Longer stays in port", "Many extras included in the fare", "A friendly crew who learn your name"],
    brochures: [{ label: "Azamara flyer", href: "/pdf/Flyer_Azamara.pdf" }],
    trips: ["ocean-cruises", "spas-and-luxury-escapes"],
  },
  {
    slug: "cunard",
    name: "Cunard",
    short: "Cunard",
    type: "ocean",
    oldPath: null,
    website: "https://www.cunard.com",
    summary:
      "Classic ocean liner travel, including Queen Mary 2. Routes take in scenic calls like the fjords into Flåm, St Maarten and Mykonos, and grand cities from Monte Carlo to Venice and Quebec City.",
    highlights: ["Ocean liner style", "Scenic and historic ports"],
    trips: ["ocean-cruises", "spas-and-luxury-escapes"],
  },
  {
    slug: "amawaterways",
    name: "AmaWaterways",
    short: "AmaWaterways",
    type: "river",
    oldPath: "/amawaterways.php",
    website: "https://www.amawaterways.com",
    summary:
      "River cruises through Europe, Asia and Africa, including the Danube, the Rhine, France and Portugal. Explore each town on included tours, then sail on to the next.",
    highlights: [
      "Shore excursions in every port included",
      "All dining on board, plus wine, beer and soft drinks with lunch and dinner",
      "Wi-Fi and bikes for exploring on your own",
    ],
    trips: ["river-cruises"],
  },
  {
    slug: "viking-river-cruises",
    name: "Viking River Cruises",
    short: "Viking",
    type: "river",
    oldPath: null,
    website: "https://www.vikingrivercruises.com",
    summary:
      "A gentle way to reach the heart of a region’s history, culture and attractions, on well-appointed ships sailing the world’s fabled rivers.",
    highlights: ["Europe’s great rivers", "Culture and history at every stop"],
    trips: ["river-cruises"],
  },
  {
    slug: "amtrak-vacations",
    name: "Amtrak Vacations",
    short: "Amtrak Vacations",
    type: "rail",
    oldPath: "/amtrak.php",
    website: "https://www.amtrak.com",
    summary:
      "Train vacations all across America, from the American West and the National Parks to the cities of the East Coast. Choose independent or escorted rail journeys.",
    highlights: ["National Parks by rail", "Independent or escorted", "Weekend getaway packages"],
    brochures: [
      { label: "Top selling rail vacations", href: "/pdf/amtrak/top_selling_rail_vacation.pdf" },
      { label: "Top selling rail vacations (part B)", href: "/pdf/amtrak/top_selling_rail_vacationB.pdf" },
      { label: "Discover U.S. National Parks", href: "/pdf/amtrak/us_national_parks.pdf" },
      { label: "Discover U.S. National Parks (part B)", href: "/pdf/amtrak/us_national_parksB.pdf" },
    ],
    trips: ["rail-vacations"],
  },
  {
    slug: "gate-1-travel",
    name: "Gate 1 Travel",
    short: "Gate 1 Travel",
    type: "tours",
    oldPath: "/gate1.php",
    website: "https://www.gate1travel.com",
    summary:
      "Escorted tours, river cruises and vacation packages known for quality, convenience and price. The Signature Collection adds more comfort and style.",
    highlights: ["Escorted tours", "Good value for the quality"],
    trips: ["escorted-tours"],
  },
  {
    slug: "gogo-vacations",
    name: "GOGO Vacations",
    short: "GOGO Vacations",
    type: "tours",
    oldPath: "/gogo.php",
    website: "https://www.gogowwv.com",
    summary:
      "A long-running vacation package wholesaler that works only with travel agents. Land, sea or air packages, plus a worldwide collection reaching Australia, Fiji, Thailand, Bali, Dubai, Egypt and more.",
    highlights: ["Complete package specialists", "Perks passed along to clients"],
    brochures: [{ label: "GOGO flyer", href: "/pdf/GOGO%20_Flyer.pdf" }],
    trips: ["all-inclusive-resorts", "weddings-and-honeymoons", "ski-holidays", "escorted-tours"],
  },
  {
    slug: "worldwide-traveler",
    name: "Worldwide Traveler",
    short: "Worldwide Traveler",
    type: "resorts",
    oldPath: null,
    website: "https://www.gogowwv.com/wwt",
    summary:
      "A hand-picked group of top hotels and resorts in the world’s most desirable destinations, known for service, amenities and location.",
    highlights: ["Luxury hotels and resorts", "Trips of a lifetime"],
    trips: ["spas-and-luxury-escapes", "weddings-and-honeymoons"],
  },
  {
    slug: "bahia-principe",
    name: "Bahia Principe Hotels & Resorts",
    short: "Bahia Principe",
    type: "resorts",
    oldPath: null,
    website: "http://www.bahia-principe.com/en/",
    summary:
      "All-inclusive holiday packages in the Caribbean, the Canary Islands and Majorca, with resorts in the Dominican Republic, Samaná, Riviera Maya, Jamaica, Costa Adeje and Puerto de la Cruz.",
    highlights: ["All-inclusive", "Caribbean and Spain"],
    trips: ["all-inclusive-resorts", "weddings-and-honeymoons"],
  },
  {
    slug: "barcelo",
    name: "Barceló Hotels & Resorts",
    short: "Barceló",
    type: "resorts",
    oldPath: null,
    website: "https://www.barcelo.com",
    summary:
      "Hotels and resorts for every kind of trip. Pick by the activities you want and René will match the property.",
    highlights: ["Resorts and city hotels", "Choose by activity"],
    trips: ["all-inclusive-resorts"],
  },
  {
    slug: "walt-disney-world",
    name: "Walt Disney World Resort",
    short: "Walt Disney World",
    type: "parks",
    oldPath: null,
    website: "https://disneyworld.disney.go.com",
    summary:
      "Disney’s flagship resort near Orlando, Florida. Magic Kingdom brings classic attractions, fireworks, parades and the Disney characters across six themed lands, from Adventureland to Tomorrowland.",
    highlights: ["Magic Kingdom and more", "Fireworks and parades"],
    trips: ["family-vacations"],
  },
  {
    slug: "sports-traveler",
    name: "Sports Traveler",
    short: "Sports Traveler",
    type: "sports",
    oldPath: "/sportravler.php",
    website: "http://www.sportstraveler.net",
    summary:
      "Sports travel packages and bucket-list trips to the most popular events in the U.S. and around the world, from the Rose Bowl and the Tournament of Roses Parade to the Indianapolis 500.",
    highlights: ["Event tickets and travel together", "U.S. and international events"],
    trips: ["sports-travel"],
  },
];

export const partnerBySlug = (slug) => partners.find((p) => p.slug === slug);
