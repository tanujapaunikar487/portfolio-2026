import type { SpecialCard } from "./special";
import { specialProjects } from "./special";
import { orimeCards } from "./orime";
import { aioseoCards } from "./aioseo";

export type ProjectCase = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  stack: { name: string; src: string }[];
  cards: SpecialCard[];
};

export const projectCases: ProjectCase[] = [
  {
    id: "healthfirst",
    title: "HealthFirst",
    description:
      "A healthcare platform for the people who manage their family's health, not just their own.",
    ctaLabel: "Open HealthFirst",
    ctaHref: "https://healthfirst-1xsy.onrender.com/",
    stack: [
      { name: "React", src: "/images/react.svg" },
      { name: "Laravel", src: "/images/laravel.svg" },
      { name: "Claude", src: "/images/claude.svg" },
    ],
    cards: specialProjects,
  },
  {
    id: "orime",
    title: "Orime",
    description:
      "Rewards intelligence for Indian cardholders, because using your own points shouldn't be this hard.",
    ctaLabel: "Open Orime",
    ctaHref: "#",
    stack: [
      { name: "Swift", src: "/images/swift.svg" },
      { name: "Firebase", src: "/images/firebase.svg" },
      { name: "Claude", src: "/images/claude.svg" },
    ],
    cards: orimeCards,
  },
  {
    id: "aioseo",
    title: "AIOSEO, 4.5 years of shaping search",
    description:
      "WordPress's most-used SEO plugin, product, marketing, design system, and two sub-brand refreshes.",
    ctaLabel: "Open AIOSEO",
    ctaHref: "https://wordpress.org/plugins/all-in-one-seo-pack/",
    stack: [
      { name: "AIOSEO", src: "/images/aioseo.svg" },
      { name: "LowFruits", src: "/images/lowfruits.svg" },
      { name: "SEOBoost", src: "/images/seoboost.svg" },
    ],
    cards: aioseoCards,
  },
];
