/*
 * siteConfig.js
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for René's business details, contact info,
 * integrations and shared copy. Pattern borrowed from the Haul Yeah site.
 *
 * • Trip pages live in ./trips.js and partner pages in ./partners.js.
 *   Add one object there and the page, its links and its sitemap entry
 *   appear automatically (the sitemap is generated at build time).
 *
 * • Everything a visitor reads about René (history, credentials,
 *   testimonials, forms, privacy policy) is copied from her original site.
 *   Do not reword business facts here without René's approval.
 *
 * • Integrations are OFF until their IDs are filled in. An empty string
 *   means "not set up yet" and nothing loads.
 * ─────────────────────────────────────────────────────────────
 */

const siteConfig = {
  business: {
    name: "René’s Travel Agency, LLC",
    shortName: "René’s Travel Agency",
    owner: "René Howell",
    ownerTitle: "Owner & Independent Travel Agent",
    tagline: "Where your dream vacation becomes a reality!",
    // From the old site: "by land, sea, air or rail".
    scope: "By land, sea, air or rail",
    state: "New Jersey",
    // The old .htaccess redirected www → bare domain, so the bare domain is canonical.
    baseUrl: "https://renestravelagency.com",
    // Fill in when René confirms it. Rendered in schema.org data only when set.
    town: "",
  },

  contact: {
    phoneDisplay: "(609) 304-1530",
    phoneTel: "+16093041530", // tel: and sms: links
    email: "renes.travel@comcast.net",
    // Keith confirmed René takes texts on this number.
    acceptsTexts: true,
  },

  socialProfiles: {
    facebook: "https://www.facebook.com/renestravelagency",
  },

  /* ─────────────────────────────────────────────────────────────
   * QUOTE FORM
   * Tally form "Plan my trip with René" (https://tally.so/r/44eg4k),
   * same setup as Haul Yeah. Set formId to "" to fall back to René's old
   * JotForm below (buttons then go to /plan-my-trip/, which embeds it).
   * See docs/TALLY_FORM_SETUP.md.
   * ───────────────────────────────────────────────────────────── */
  tally: {
    formId: "44eg4k",
    scriptUrl: "https://tally.so/widgets/embed.js",
  },
  jotform: {
    formId: "61078489232158",
    url: "https://form.jotform.com/61078489232158",
  },

  analytics: {
    // GA4 measurement ID, e.g. "G-XXXXXXX". Empty = Google Analytics never loads.
    measurementId: "",
    // Meta Pixel ID. Empty = the pixel never loads.
    metaPixelId: "",
  },

  reviews: {
    // false = show René's own testimonials. true = Trustindex Google reviews widget.
    enabled: false,
    trustindexWidgetId: "",
    googleReviewLink: "",
  },

  credentials: [
    { title: "CLIA", detail: "Licensed with Cruise Lines International Association (CLIA), 2016" },
    { title: "New Jersey", detail: "State of New Jersey registered business" },
    { title: "Certified", detail: "Penn Foster Career School Travel & Tourism Certificate" },
  ],

  // Additional travel partners.
  alsoPartneredWith: ["European Vacations", "Vax Vacations", "Gate 1 Travel", "Rail"],

  history: {
    heading: "Our History",
    paragraphs: [
      "René’s Travel Agency was started for the love of travel. René Howell began her travel experience as a group leader with Liberty Travel in 2006, booking her first cruise on the cruise line Royal Caribbean’s The Explorer of the Seas for 32 people.",
      "She continued to book cruises through Liberty Travel as the group leader every two years for a group of people who have sailed with her faithfully each time for the past 10 years.",
    ],
    reneQuote:
      "Through my years of travel, having the opportunity to see different cultures has been such a rewarding experience! The vacationing experience I’ve gotten and loved, I wanted to share with others. And through René’s Travel Agency I now have that tool!",
  },

  vision: {
    heading: "Our Vision",
    lead: "Great service combined with great creativity is what we are all about.",
    paragraphs: [
      "Our vision is to be YOUR preferred travel agency by land, sea or air, making your journey a lifetime experience. Our customers come first and we work to the highest operational standards in order to exceed their expectations. Personalized service that never stops working for you.",
      "Embrace life by exploring the world. Whether you start small with a trip close to home or venture abroad to a far-off corner of the globe, we will help you discover the beauty of the world and joy of travel.",
    ],
  },

  services: {
    paragraphs: [
      "A one-stop enterprise, we offer a complete range of travel related services. Superior knowledge, efficient planning and the ability to anticipate and resolve potential problems along the way are the reasons our customers return.",
      "René’s Travel Agency has the industry relationships to provide you with the best options, at the best prices, with the greatest added value to help you reach your final destination.",
      "Cruises, Spas, Ski Holidays, All-Inclusive Resorts, Family Vacations, Luxury Escapes, Family & Class Reunions, Weddings and Honeymoons: these are only some of the many adventures we can help you plan. Our Travel Consultants have the professional expertise and the experience necessary to make your next vacation the unique and unforgettable experience you deserve.",
    ],
  },

  about: {
    intro:
      "Travel is not about how you reach your destinations; it’s all about the memories you bring back with you. We are a fast growing travel agency, offering exciting destinations, great journeys and fascinating places. Welcome, come join the rest of our satisfied vacationers!",
  },

  contactNote: {
    heading: "What is your ideal vacation getaway?",
    body: "There’s no doubt you have thoughts and ideas about your vacation. No website contact form can convey the memories you want to create when you dream about your getaway. That is why this is just a brief form. It’s a chance to get the ball rolling and let us know that you have a journey in mind and are ready to start making plans.",
    signoff: "I look forward to creating an amazing adventure together!",
  },

  // Full testimonials exactly as they appeared on the old site. `short` is the
  // excerpt used where space is tight; it only trims, never rewords.
  testimonials: [
    {
      id: "tony-wendy",
      name: "Tony & Wendy",
      context: "Royal Caribbean, Quantum of the Seas",
      short: "We never had to worry about flights, connecting transportation or our luggage. It was all taken care of.",
      full: "We wish to send you a sincere “thank you” for all of your assistance during our vacation on Royal Caribbean’s Quantum of the Seas cruise. It was invaluable to us and we appreciate it greatly. As usual, your arrangements services were exceptional and everything perfect. We never had to worry about flights, connecting transportation or our luggage. It was all taken care of. We were able to enjoy the best vacation we’ve ever been on, all thanks to you. We highly recommend Rene’s Travel Agency to our family and friends and deservingly so!",
    },
    {
      id: "felicia",
      name: "Felicia",
      context: "René’s group cruise traveler",
      short: "René will find what you want within your budget. She will work with you from the time you contact her until the day of your trip.",
      full: "5 Stars! René’s Travel Agency, awesome! She’s good at what she does. René will find what you want within your budget. She will work with you from the time you contact her until the day of your trip. She also gives group cruises and yes, I went on her cruise she gave in 2015 and can hardly wait to go on her 2017 cruise. Check out her 2017 The Howell’s Retirement Cruise. You still have plenty of time to pay. See you on board 2017!",
    },
    {
      id: "eugenia-nigel",
      name: "Eugenia & Nigel",
      context: "Santa Cruz Beach, Torres Vedras, Portugal",
      short: "We had a wonderful time on Santa Cruz Beach, Torres Vedras, Portugal. Calm and peaceful.",
      full: "Born in Portugal, I always love bringing my son Nigel back to my homeland. We had a wonderful time on Santa Cruz Beach, Torres Vedras, Portugal. Calm and peaceful. One of the many beautiful attractions Portugal has to offer. Experience it for yourself by contacting René’s Travel Agency.",
      fullPt: "Nascida em Portugal, sempre que volto à minha terra natal adoro levar o meu filho Nigel comigo. Foram muito agradáveis os momentos que passamos na Praia de Santa Cruz, Torres Vedras, Portugal. Muita calma e serenidade. Um dos muitos locais maravilhosos que Portugal tem para oferecer. Não deixe de visitar, contacte René’s Travel Agency.",
    },
  ],

  // Client forms. Paths are unchanged from the old site so existing links keep
  // working. ⚠ The PDF files were not in the upload: copy the old /pdf folder
  // into /public/pdf before launch (see public/pdf/README.md).
  forms: [
    { group: "To book", items: [
      { label: "Travel booking form worksheet", href: "/pdf/Travel_Booking_Worksheet.pdf", kind: "PDF", fillable: true },
      { label: "Registration form", href: "/pdf/Rene_Travel_Cruise_Info.pdf", kind: "PDF", fillable: true },
    ] },
    { group: "To pay", items: [
      { label: "Payment authorization form", href: "/pdf/Auth_Form-one-time-payment.pdf", kind: "PDF", fillable: true },
      { label: "Credit card recurring payments", href: "/pdf/Recurring_Auth_Form.pdf", kind: "PDF", fillable: true },
    ] },
    { group: "Before you leave", items: [
      { label: "Online check-in form", href: "/pdf/ON_LINE_CHECK_IN_FORM.pdf", kind: "PDF", fillable: true },
      { label: "Guide to airline fees", href: "/pdf/airline.pdf", kind: "PDF" },
      { label: "Passport info", href: "https://travel.state.gov/content/passports/en/passports.html", kind: "Link" },
    ] },
    { group: "Protect your trip", items: [
      { label: "Travel Guard insurance info", href: "/pdf/gold_silv_plat.pdf", kind: "PDF" },
      { label: "Protect your vacation (Travel Guard)", href: "http://www.travelguard.com/agentlink.asp?ta_arc=00438510&pcode=PAA&agencyemail=renes.travel@comcast.net", kind: "Link" },
    ] },
  ],

  // Safe travel tips and checklist, from the old homepage.
  safeTravelTips: [
    "It is natural to let your guard down on vacation, especially on a cruise ship. Life is good, the water is warm, the food is scrumptious, the ship seems like Paradise Island. You are living large, but do stay aware!",
    "Keep your distance when tempers flare; don’t accept drinks from strangers. If your gut tells you something is wrong, it probably is. And don’t keep it a secret, either; notify the Purser’s Office the minute you suspect trouble.",
    "Leave the Rolex watch and the Gucci handbag at home. No one is looking and you’re on vacation, so you don’t need to worry about the time. Keep most of your cash and valuables (especially your jewelry, return tickets and passports) in the safe. Make a copy of your passport and put a copy in your wallet and the original in the safe, just in case it is lost or stolen.",
  ],
  checklist: [
    "At least two sources of identification, such as your passport and driver’s license",
    "A copy of your passport in your wallet, the original in the safe",
    "A small carry-on with your important documents, a small garment and any medications",
    "Cash, jewelry and return tickets kept in the safe",
    "Your luggage, never left unattended at the airport",
  ],

  // FAQ answers are built only from facts on René's original site.
  // ⚠ Have René read these before launch.
  faqs: [
    {
      q: "What kinds of trips does René plan?",
      a: "Cruises, river cruises, rail vacations, all-inclusive resorts, family vacations, spas and luxury escapes, ski holidays, family and class reunions, weddings and honeymoons, escorted tours and sports travel. By land, sea, air or rail, close to home or far away.",
    },
    {
      q: "Does René organize group cruises?",
      a: "Yes. René started as a group leader in 2006, booking her first cruise on Royal Caribbean’s Explorer of the Seas for 32 people, and her group has kept sailing with her ever since. Family reunions, class reunions and retirement cruises are all a good fit.",
    },
    {
      q: "Which cruise lines and travel companies does René book?",
      a: "Royal Caribbean, Carnival, Celebrity, Princess, Norwegian, Disney Cruise Line, Azamara, Cunard, AmaWaterways, Viking River Cruises, Amtrak Vacations, Gate 1 Travel, Walt Disney World and Sports Traveler, among others.",
    },
    {
      q: "Can I pay for my trip over time?",
      a: "René offers a recurring credit card payment form, so you can set up scheduled payments before you travel. Ask her about the payment schedule for your trip.",
    },
    {
      q: "Should I buy travel insurance?",
      a: "René offers Travel Guard plans. You can read the plan details and get coverage from the Client forms page, or ask René which plan fits your trip.",
    },
    {
      q: "How do I get started?",
      a: "Call or text René at (609) 304-1530, email renes.travel@comcast.net, or send the short trip form. A rough idea of where and when is plenty to get the ball rolling.",
    },
  ],

  /* ─────────────────────────────────────────────────────────────
   * PHOTOS
   * Photos are stored in public/images; stock photo sources and licenses are
   * documented in docs/IMAGE_CREDITS.md. Each empty slot renders a sized
   * placeholder showing its brief until `src` is set. Drop the file in
   * /public/images and put its path here, e.g. "/images/rene-portrait.jpg".
   * Width/height are the intrinsic size of the file you supply (prevents
   * layout shift). René's portrait is her supplied photo; the group slot uses scenic cruise imagery.
   * ───────────────────────────────────────────────────────────── */
  images: {
    hero: { src: "/images/quantum-of-the-seas.jpg", width: 1800, height: 1035, alt: "Royal Caribbean’s Quantum of the Seas sailing in open blue ocean", brief: "Royal Caribbean — Quantum of the Seas" },
    portrait: { src: "/images/rene-portrait.jpeg", width: 1845, height: 2420, alt: "René Howell, owner of René’s Travel Agency", brief: "René, natural light, looking at the camera. Real photo from René" },
    group: { src: "/images/explorer-of-the-seas.jpg", width: 1920, height: 1280, alt: "Royal Caribbean’s Explorer of the Seas pool deck and waterslides above the blue ocean", brief: "Royal Caribbean — Explorer of the Seas" },
    river: { src: "/images/amamagna.jpg", width: 1600, height: 1341, alt: "AmaWaterways’ AmaMagna river cruise ship sailing between cliffs on the Danube", brief: "AmaWaterways — AmaMagna" },
    postcard: { src: "/images/santa-cruz-portugal.jpeg", width: 1200, height: 1600, alt: "Penedo do Guincho rock formation at Santa Cruz Beach, Torres Vedras, Portugal", brief: "Stock destination photograph of Santa Cruz Beach" },
    ogImage: { src: "/images/quantum-of-the-seas.jpg", width: 1800, height: 1035 },
  },

  nav: [
    { label: "Trips", href: "/trips/" },
    { label: "Group cruises", href: "/group-cruises/" },
    { label: "Partners", href: "/partners/" },
    { label: "Forms", href: "/forms/" },
    { label: "About René", href: "/about/" },
  ],

  privacyPolicy: {
    updated: "04/04/2016",
  },
};

export default siteConfig;

