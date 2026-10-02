// All copy and imagery lives here. The text on the About, Courses and Contact
// pages is placeholder copy: replace it with your own before launch.

export const site = {
  name: "Verdigris",
  url: "https://verdigris.example.com",
  description:
    "Verdigris is a 24-seat tasting room cooking over oak embers and finishing every course in copper. Dinner Wednesday to Sunday.",
  address: ["14 Foundry Lane", "Old Mill Quarter"],
  phone: "+1 (555) 014-2290",
  email: "table@verdigris.example.com",
  hours: [
    { days: "Wednesday to Saturday", time: "6:00 pm – 11:00 pm" },
    { days: "Sunday", time: "1:00 pm – 5:00 pm" },
  ],
  currency: "$",
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

/** Where "Book a table" goes from pages that don't have the booking form. */
export const bookingHref = "/contact#reserve";

export const details = [
  { src: "/images/detail-1.jpg", alt: "Seared scallops with crisp pancetta and herb oil", caption: "Seared to order" },
  { src: "/images/detail-2.jpg", alt: "Sliced duck breast with cherry jus and hazelnuts", caption: "Aged in-house" },
  { src: "/images/detail-3.jpg", alt: "Berry pavlova with vanilla cream and mint", caption: "Finished by hand" },
];

export const courses = [
  {
    name: "Seared scallops",
    note: "Hand-dived scallops, cauliflower purée, crisp pancetta, herb oil",
    src: "/images/course-1.jpg",
    alt: "Three seared scallops on cauliflower purée with pancetta and herb oil",
  },
  {
    name: "Lobster tail",
    note: "Butter-poached lobster, saffron risotto, asparagus, beurre blanc",
    src: "/images/course-2.jpg",
    alt: "Butter-poached lobster tail on saffron risotto with asparagus",
  },
  {
    name: "Duck breast",
    note: "Dry-aged duck, celeriac purée, green beans, toasted hazelnuts, cherry jus",
    src: "/images/course-3.jpg",
    alt: "Sliced duck breast with green beans, hazelnuts and cherry jus",
  },
  {
    name: "Beef tenderloin",
    note: "Oak-grilled fillet, pomme purée, wild mushrooms, red wine jus",
    src: "/images/course-4.jpg",
    alt: "Beef tenderloin with pomme purée, mushrooms and asparagus",
  },
  {
    name: "Berry pavlova",
    note: "Crisp meringue, vanilla cream, summer berries, mint",
    src: "/images/course-5.jpg",
    alt: "Pavlova topped with cream, raspberries, blueberries and blackberries",
  },
];

export const tasting = {
  title: "Autumn tasting menu",
  price: 185,
  wine: 95,
  description:
    "Seven courses served over about two and a half hours. We cook the same menu for every table, so tell us about allergies when you book.",
  seatings: ["6:00 pm", "8:45 pm"],
  tabs: [
    {
      id: "included",
      label: "What's included",
      items: ["Seven courses and two snacks", "Hearth bread with cultured butter", "Still and sparkling water", "Tea or coffee with petit fours"],
    },
    {
      id: "wine",
      label: "Wine pairing",
      items: ["Six glasses from small growers", "A non-alcoholic pairing is available", "Bottles from our cellar list on request"],
    },
    {
      id: "dietary",
      label: "Dietary needs",
      items: ["Vegetarian menu with 48 hours' notice", "We can't cook entirely gluten-free from the hearth", "Note every allergy when you book"],
    },
  ],
  gallery: [
    { src: "/images/gallery-lobster.jpg", alt: "Lobster tail on saffron risotto with asparagus" },
    { src: "/images/gallery-duck.jpg", alt: "Duck breast with cherry jus on a cream plate" },
    { src: "/images/gallery-pavlova.jpg", alt: "Berry pavlova on a glass plate" },
  ],
};

/* ───────────────────────── Courses page ───────────────────────── */

export const fullMenu = [
  { name: "Oyster & ember", note: "Rock oyster warmed over coals, cucumber, dill oil", wine: "Muscadet, Loire 2022", surprise: true },
  { name: courses[0].name, note: courses[0].note, wine: "Chablis Premier Cru 2021", src: courses[0].src },
  { name: courses[1].name, note: courses[1].note, wine: "White Burgundy, Meursault 2020", src: courses[1].src },
  { name: courses[2].name, note: courses[2].note, wine: "Pinot Noir, Central Otago 2019", src: courses[2].src },
  { name: courses[3].name, note: courses[3].note, wine: "Syrah, Northern Rhône 2018", src: courses[3].src },
  { name: "Between courses", note: "Buttermilk sorbet, green apple, sorrel", wine: "—", surprise: true },
  { name: courses[4].name, note: courses[4].note, wine: "Late-harvest Riesling 2017", src: courses[4].src },
];

/* ───────────────────────── About page ───────────────────────── */

export const about = {
  story:
    "We opened in a former foundry with one hearth, twelve chairs and a menu written on the back of a delivery note. Ten years later the hearth is the same.",
  chef: {
    name: "Mara Okafor",
    role: "Chef and co-owner",
    quote: "Fire is honest. You can't hide a bad ingredient from it, so we stopped buying them.",
    bio: [
      "Mara trained in Lyon and spent six years running the wood grill at a coastal restaurant before opening Verdigris with her partner, Theo, in 2016.",
      "She still lights the hearth herself most days, and writes every menu around what the two farms we work with are pulling out of the ground that week.",
    ],
  },
  values: [
    { src: "/images/detail-1.jpg", alt: "Seared scallops with crisp pancetta", caption: "Two farms, one hour away" },
    { src: "/images/detail-2.jpg", alt: "Sliced duck breast with cherry jus", caption: "Whole-animal butchery" },
    { src: "/images/detail-3.jpg", alt: "Berry pavlova with vanilla cream", caption: "Nothing bought in" },
  ],
  milestones: [
    { year: "2016", text: "Opened with twelve seats and a single oak-fired hearth." },
    { year: "2018", text: "Doubled the room and built the eight-seat chef's counter." },
    { year: "2021", text: "Started working exclusively with two farms in the valley." },
    { year: "2024", text: "Opened the cellar and the private dining room downstairs." },
    { year: "2026", text: "Ten years, still the same hearth, still lit at noon." },
  ],
};

/* ───────────────────────── Contact page ───────────────────────── */

export const contact = {
  directions: [
    { label: "By train", text: "Mill Quarter station is a six-minute walk. Leave by the north exit and follow Foundry Lane." },
    { label: "By car", text: "Paid parking on Canal Street, two minutes away. We can't reserve spaces." },
    { label: "Access", text: "Step-free entrance and an accessible restroom on the ground floor." },
  ],
  faqs: [
    {
      q: "Is there a dress code?",
      a: "No. Come as you are. Most guests dress for a nice evening out, but nobody will be turned away for wearing jeans.",
    },
    {
      q: "Can you cater for allergies?",
      a: "Yes, with notice. Tell us about every allergy when you book. We can't cook entirely gluten-free from the hearth, and we'll be honest if we can't serve you safely.",
    },
    {
      q: "Do you take walk-ins?",
      a: "Sometimes, at the counter. Call after 4 pm on the day and we'll tell you if a seat is free.",
    },
    {
      q: "What is your cancellation policy?",
      a: "We hold tables with a card. Cancel at least 48 hours ahead and there's no charge; after that we charge half the menu price per guest.",
    },
    {
      q: "Do you host private events?",
      a: "Our downstairs room seats up to 16 for a private version of the tasting menu. Email us with your date and group size.",
    },
  ],
};
