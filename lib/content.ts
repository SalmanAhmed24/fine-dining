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
