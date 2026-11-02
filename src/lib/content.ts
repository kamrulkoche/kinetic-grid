export const NAV = [
  { label: "Concept", href: "/#concept", id: "concept" },
  { label: "Systems", href: "/#systems", id: "systems" },
  { label: "Output", href: "/#output", id: "output" },
  { label: "Journal", href: "/#journal", id: "journal" },
  { label: "About", href: "/#about", id: "about" },
] as const;

export const LEGAL = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export const HERO = {
  eyebrow: "Human Motion / Real Power",
  title: ["Run the", "Future", "Forward."],
  body: "A fictional energy concept where movement becomes momentum, and momentum becomes power, powering the cities of tomorrow.",
  primary: "Explore the System",
  secondary: "Watch the Loop",
  tags: "Motion / Voltage / Possibility",
};

export const OUTPUTS = {
  eyebrow: "From Movement to a Brighter Tomorrow",
  title: ["Three Outputs.", "One Human Current."],
  body: "Your motion is converted into real electrical power through a closed system — generating voltage, storing energy, and feeding clean power to the city.",
  tags: "Motion / Conversion / Storage / City Supply",
};

export type StepIcon = "zap" | "battery" | "pylon";

export const STEPS: { n: string; title: string; body: string; icon: StepIcon }[] = [
  { n: "01", title: "Voltage Generation", body: "Human motion creates electricity.", icon: "zap" },
  { n: "02", title: "Energy Storage", body: "Power is stabilized and stored.", icon: "battery" },
  { n: "03", title: "City Supply", body: "Clean energy flows to the grid.", icon: "pylon" },
];

export type System = {
  id: string;
  index: string;
  label: string;
  title: [string, string];
  body: string;
  cta: string;
  image: string;
  alt: string;
  step: number;
};

export const SYSTEMS: System[] = [
  {
    id: "motion",
    index: "01",
    label: "Motion",
    title: ["The", "Human Engine"],
    body: "Every step, every stride, every moment of movement becomes electrical energy.",
    cta: "Explore Motion",
    image: "/images/card-motion.jpg",
    alt: "A runner mid-stride inside a glowing orange wheel generator",
    step: 0,
  },
  {
    id: "transfer",
    index: "02",
    label: "Transfer",
    title: ["Current", "in Motion"],
    body: "Generated power is converted, regulated, and transferred through an intelligent system.",
    cta: "Explore Systems",
    image: "/images/card-transfer.jpg",
    alt: "Chrome conduits with streaks of orange energy racing along them",
    step: 1,
  },
  {
    id: "city",
    index: "03",
    label: "City",
    title: ["Power", "After Dark"],
    body: "Clean, human-generated energy flows to the city, helping communities thrive.",
    cta: "Explore Output",
    image: "/images/card-city.jpg",
    alt: "A night skyline glowing across the water",
    step: 2,
  },
];

export const CTA = {
  title: "Turn Effort into Infrastructure.",
  body: "Be the first to get updates on our progress, upcoming locations, and the future of human-powered cities.",
  placeholder: "Your email address",
  button: "Enter the Current",
};

export const FOOTER = {
  tagline: "Human motion turned into urban possibility.",
  copyright: `© ${2026} Kinetic Grid. All rights reserved.`,
};
