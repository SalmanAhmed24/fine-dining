// All copy and imagery lives here. Swap the stand-in images in /public/images
// for real photography (keep the same file names, or update the paths below).

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
  { label: "Menu", href: "#menu" },
  { label: "The room", href: "#room" },
  { label: "Courses", href: "#courses" },
];

export const details = [
  { src: "/images/detail-1.jpg", alt: "Duck breast resting in a copper-handled pan", caption: "Oak-fired hearth" },
  { src: "/images/detail-2.jpg", alt: "Brioche with cultured butter on stoneware", caption: "Stoneware thrown nearby" },
  { src: "/images/detail-3.jpg", alt: "Spring greens finished with herb oil", caption: "Finished in copper at the pass" },
];

export const courses = [
  {
    name: "Garden ash",
    note: "Charred leek, buttermilk, smoked trout roe",
    src: "/images/course-1.jpg",
    alt: "Charred leek with buttermilk and trout roe",
  },
  {
    name: "Ember beet",
    note: "Beetroot baked in coals, blackcurrant, aged sheep's cheese",
    src: "/images/course-2.jpg",
    alt: "Coal-baked beetroot with blackcurrant",
  },
  {
    name: "Hearth bread",
    note: "Sourdough from the oven's last heat, brown butter, honeycomb",
    src: "/images/course-3.jpg",
    alt: "Sourdough with brown butter and honeycomb",
  },
  {
    name: "Copper duck",
    note: "Dry-aged duck, cherry jus, roasted chicory",
    src: "/images/course-4.jpg",
    alt: "Dry-aged duck with cherry jus",
  },
  {
    name: "Last embers",
    note: "Burnt honey custard, pear cooked overnight in the ash",
    src: "/images/course-5.jpg",
    alt: "Burnt honey custard with ash-cooked pear",
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
    { src: "/images/table.jpg", alt: "The dining room table set for four" },
    { src: "/images/signature.jpg", alt: "A finished plate under warm light" },
    { src: "/images/pass.jpg", alt: "Plates waiting at the pass" },
  ],
};
