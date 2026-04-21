export type SpecialCard = {
  title: string;
  body: string;
  image: string;
};

export const specialProjects: SpecialCard[] = [
  {
    title: "Designed to Feel Like Care, Not Clinical",
    body: "Healthcare brands optimize for trust signals. I optimized for emotion, warmth, calm, the feeling of being looked after. Because the user isn't in a hospital, they're at home with family.",
    image: "/images/health-first/1-healthfirst.png",
  },
  {
    title: "A Dashboard for Caregivers, Not Just Patients",
    body: "Most health apps assume you're the patient. You're managing a parent, a child, a partner. I reframed the home screen as a command center: twelve alert types, one tap to act.",
    image: "/images/health-first/2-onboarding.png",
  },
  {
    title: "Conversational Booking, with a Safety Net",
    body: "Most healthcare apps trap users in 8-field forms. I designed a hybrid: AI chat for users who know what they need, guided steps for those who don't, same component layer.",
    image: "/images/health-first/3-ai-chat.png",
  },
  {
    title: "One Entity, Six Jobs to Be Done",
    body: "An appointment isn't one thing, it's a booking, reschedule, cancellation, share, follow-up, or jump to lab results. Six contextual sheets, one shared foundation.",
    image: "/images/health-first/4-appointment.png",
  },
  {
    title: "Designed for Relational Users",
    body: "People manage their family's health, not just their own. Each member is a first-class citizen with their own profile, alerts, and care plan, shared and personal.",
    image: "/images/health-first/5-family-member.png",
  },
  {
    title: "AI That Reads the Room",
    body: "The AI knows your doctors, family, history. Open it and three suggestions wait, book a follow-up, schedule a home test, add an appointment for mom. Anticipation, not automation.",
    image: "/images/health-first/6-ai-and-guidedsteps.png",
  },
  {
    title: "B2B Workflows, B2C Experience",
    body: "Insurance pre-auth is hospital-grade: five steps, conditional logic, document uploads. See coverage, sum insured, and expiry at a glance, complex made approachable.",
    image: "/images/health-first/7-insurance.png",
  },
  {
    title: "One Search, Four Data Sources",
    body: "Health data lives in silos, appointments, doctors, records, bills. I designed one search that crosses all of them. Tabs are an admission that your IA failed.",
    image: "/images/health-first/8-search.png",
  },
  {
    title: "A System That Scales With the Product",
    body: "Fifty-five components, semantic tokens, four sheet patterns with documented rules. I didn't just design components, I wrote the governance for when to use which.",
    image: "/images/health-first/9-design-system.png",
  },
  {
    title: "Accessibility, by Default",
    body: "High-contrast mode, text scaling, ARIA roles, focus management, skeleton loaders with minimum display times. Accessibility was a constraint from the first component.",
    image: "/images/health-first/10-accessibility.png",
  },
];
