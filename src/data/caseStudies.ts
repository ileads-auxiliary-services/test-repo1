// Illustrative case studies. Metrics are representative of engagement outcomes and
// should be replaced with client-approved figures before publication.

export type CaseStudy = {
  slug: string;
  client: string; // anonymized client descriptor
  industry: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string[];
  outcome: string;
  metrics: { value: string; label: string }[];
  services: string[];
  accent: string; // tailwind gradient classes
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nbfc-collections-uplift",
    client: "Leading NBFC",
    industry: "BFSI",
    title: "Lifting EMI recovery while protecting customer relationships",
    summary:
      "A fast-growing NBFC needed to improve recovery on a stressed portfolio without resorting to aggressive tactics that would damage its brand.",
    challenge:
      "Rising delinquency across a multi-segment loan book, inconsistent recovery rates, and pressure to remain fully compliant while preserving long-term customer relationships.",
    solution: [
      "Deployed portfolio-wise collections strategy with behavioral segmentation.",
      "Introduced speech analytics to monitor 100% of calls for compliance and tone.",
      "Layered AI agent-assist to guide recovery agents toward the next best action.",
      "Implemented multichannel reminders to reduce roll-forward before delinquency.",
    ],
    outcome:
      "Recovery rates climbed steadily across segments while complaint volumes fell, proving that compliant, relationship-first collections outperform aggressive approaches.",
    metrics: [
      { value: "+28%", label: "Improvement in recovery rate" },
      { value: "-35%", label: "Reduction in escalations" },
      { value: "100%", label: "Calls quality-monitored" },
    ],
    services: ["Collections & Recovery", "AI & Automation Services"],
    accent: "from-electric-500/20 to-navy-600/20",
  },
  {
    slug: "fintech-247-support-scale",
    client: "Digital Lending Fintech",
    industry: "Fintech",
    title: "Scaling 24/7 support 4x without raising cost-to-serve",
    summary:
      "A digital-lending fintech in hyper-growth needed always-on support that could quadruple in volume without a linear rise in cost.",
    challenge:
      "Support volumes were doubling every quarter, response times were slipping, and the lean in-house team could not staff 24/7 coverage sustainably.",
    solution: [
      "Stood up an AI-blended support model: bots deflect routine queries, specialists handle complex cases.",
      "Implemented omnichannel coverage across chat, email, and voice — 24/7.",
      "Used interaction analytics to continuously tune deflection and routing.",
      "Built an elastic staffing model to absorb spikes without quality loss.",
    ],
    outcome:
      "The fintech scaled support volume roughly 4x while holding cost-to-serve flat and improving response times — turning support from a bottleneck into a growth enabler.",
    metrics: [
      { value: "4x", label: "Support volume scaled" },
      { value: "-40%", label: "First-response time" },
      { value: "Flat", label: "Cost-to-serve held" },
    ],
    services: ["Customer Support & Experience", "AI & Automation Services"],
    accent: "from-navy-500/20 to-electric-400/20",
  },
  {
    slug: "ecommerce-peak-season-cx",
    client: "Online Marketplace",
    industry: "E-commerce",
    title: "Protecting CSAT through a 6x peak-season surge",
    summary:
      "An online marketplace needed to absorb a massive festive-season spike without letting customer experience slip.",
    challenge:
      "Festive demand drove contact volumes 6x above baseline, threatening response times, CSAT, and conversion during the most important sales window of the year.",
    solution: [
      "Pre-built and trained an elastic surge team ahead of peak season.",
      "Deployed omnichannel support across chat, voice, email, and social.",
      "Used AI agent-assist to keep handle times low at high volume.",
      "Scaled capacity back down post-peak with zero disruption.",
    ],
    outcome:
      "The marketplace sailed through its biggest season with CSAT intact and conversion protected — capturing peak revenue without experience trade-offs.",
    metrics: [
      { value: "6x", label: "Peak surge absorbed" },
      { value: "Stable", label: "CSAT through peak" },
      { value: "0", label: "Days of disruption" },
    ],
    services: ["Customer Support & Experience", "Back Office Operations"],
    accent: "from-electric-400/20 to-navy-500/20",
  },
  {
    slug: "saas-onboarding-retention",
    client: "B2B SaaS Platform",
    industry: "SaaS & Technology",
    title: "Turning onboarding into a retention engine",
    summary:
      "A B2B SaaS platform was losing customers in the first 90 days due to weak onboarding and slow technical support.",
    challenge:
      "Low activation rates and early churn were eroding ARR, while the in-house team lacked capacity to deliver consistent, product-fluent onboarding at scale.",
    solution: [
      "Built a product-fluent onboarding and activation pod aligned to the customer journey.",
      "Introduced tiered technical support with clear escalation paths.",
      "Layered customer-success operations to monitor health and drive renewals.",
      "Fed interaction insights back into the product and support knowledge base.",
    ],
    outcome:
      "Activation and 90-day retention improved markedly, and expansion conversations increased — turning the support function into a measurable revenue contributor.",
    metrics: [
      { value: "+22%", label: "90-day retention" },
      { value: "+18%", label: "Activation rate" },
      { value: "Higher", label: "Net revenue retention" },
    ],
    services: ["Customer Support & Experience", "Sales & Revenue Operations"],
    accent: "from-navy-600/20 to-electric-500/20",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
