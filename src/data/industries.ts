import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  Coins,
  HeartPulse,
  ShoppingCart,
  Building2,
  Signal,
  Cloud,
  GraduationCap,
  Cpu,
} from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  hero: string;
  challenges: string[];
  solutions: { title: string; description: string }[];
  outcomes: { value: string; label: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const industries: Industry[] = [
  {
    slug: "bfsi",
    name: "BFSI",
    short: "Banking, financial services & insurance",
    icon: Landmark,
    hero: "Secure, compliant, and customer-first operations for banks, NBFCs, and insurers — from onboarding and servicing to collections and recovery.",
    challenges: [
      "Rising cost-to-serve with strict compliance demands",
      "Fraud and identity risk across digital onboarding",
      "Recovery pressure without harming customer relationships",
    ],
    solutions: [
      { title: "Secure Customer Servicing", description: "ISO 27001-aligned voice and digital servicing for accounts, cards, loans, and policies." },
      { title: "Collections & Recovery", description: "Portfolio-wise, compliant EMI and debt recovery that protects the customer relationship." },
      { title: "KYC & Verification", description: "Identity and document verification that reduces fraud and accelerates onboarding." },
    ],
    outcomes: [
      { value: "Compliant", label: "ISO 27001-aligned delivery" },
      { value: "Lower", label: "Cost-to-serve" },
      { value: "Higher", label: "Recovery rates" },
    ],
    seoTitle: "BFSI BPO & Customer Experience Services | iLeads",
    seoDescription:
      "Secure, compliant BPM and CX services for banking, financial services, and insurance — servicing, collections, KYC, and verification by iLeads.",
    keywords: ["BFSI BPO", "banking customer support outsourcing", "insurance BPO India", "financial services outsourcing"],
  },
  {
    slug: "fintech",
    name: "Fintech",
    short: "Digital-first financial platforms",
    icon: Coins,
    hero: "Scale your support and risk operations as fast as you scale users — with AI-blended CX, fraud-aware verification, and 24/7 coverage built for digital-first finance.",
    challenges: [
      "Hyper-growth support volumes with lean teams",
      "Fraud and onboarding risk at digital speed",
      "24/7 expectations from always-on users",
    ],
    solutions: [
      { title: "AI-Blended Support", description: "Bots deflect routine queries while specialists handle high-stakes moments — 24/7." },
      { title: "Onboarding & KYC", description: "Fast, accurate identity and document verification that keeps funnels converting." },
      { title: "Dispute & Chargeback Ops", description: "Structured handling of disputes and transaction queries that retains users." },
    ],
    outcomes: [
      { value: "24/7", label: "Always-on support" },
      { value: "Faster", label: "User onboarding" },
      { value: "Lower", label: "Fraud exposure" },
    ],
    seoTitle: "Fintech Customer Support & Operations Outsourcing | iLeads",
    seoDescription:
      "24/7 AI-blended customer support, KYC, and operations outsourcing for fintech. Scale CX and risk operations with iLeads.",
    keywords: ["fintech BPO", "fintech customer support", "KYC outsourcing fintech", "digital finance operations"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Providers, payers & health platforms",
    icon: HeartPulse,
    hero: "Compassionate, accurate, and confidential support for patients and members — appointment coordination, helplines, and back-office accuracy where it matters most.",
    challenges: [
      "Sensitive interactions requiring empathy and accuracy",
      "Confidentiality and data-protection requirements",
      "High-volume coordination and documentation",
    ],
    solutions: [
      { title: "Patient & Member Support", description: "Empathetic helplines, appointment coordination, and query resolution across channels." },
      { title: "Confidential Back Office", description: "Secure processing of records and documentation with strict confidentiality controls." },
      { title: "Verification & Eligibility", description: "Accurate verification workflows that reduce delays and errors in service delivery." },
    ],
    outcomes: [
      { value: "Confidential", label: "Data-protected delivery" },
      { value: "Empathetic", label: "Patient-first support" },
      { value: "Accurate", label: "Documentation & records" },
    ],
    seoTitle: "Healthcare BPO & Patient Support Services | iLeads",
    seoDescription:
      "Confidential, empathetic healthcare BPM — patient and member support, back office, and verification services by iLeads.",
    keywords: ["healthcare BPO", "patient support outsourcing", "healthcare back office", "medical BPO India"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    short: "Retail & marketplace platforms",
    icon: ShoppingCart,
    hero: "Win and keep customers across the buying journey — omnichannel support, catalog and data services, and seasonal surge capacity that flexes with demand.",
    challenges: [
      "Seasonal demand spikes and surge volumes",
      "Omnichannel expectations across the journey",
      "Catalog and data accuracy at huge scale",
    ],
    solutions: [
      { title: "Omnichannel Support", description: "Voice, chat, email, and social support that keeps shoppers buying and coming back." },
      { title: "Catalog & Data Services", description: "Catalog management, content, and data accuracy that power conversion." },
      { title: "Surge Capacity", description: "Elastic teams that scale up for peak seasons and back down without disruption." },
    ],
    outcomes: [
      { value: "Elastic", label: "Surge capacity" },
      { value: "Omnichannel", label: "Across the journey" },
      { value: "Higher", label: "Conversion & retention" },
    ],
    seoTitle: "E-commerce Customer Support & Catalog Services | iLeads",
    seoDescription:
      "Omnichannel e-commerce support, catalog and data services, and elastic surge capacity. Customer experience outsourcing for retail by iLeads.",
    keywords: ["ecommerce BPO", "ecommerce customer support outsourcing", "catalog management services", "retail CX outsourcing"],
  },
  {
    slug: "government",
    name: "Government & Public Sector",
    short: "Citizen services & public programs",
    icon: Building2,
    hero: "Citizen-centric service delivery at scale — secure helplines, grievance handling, and back-office processing built for accountability, transparency, and trust.",
    challenges: [
      "Massive citizen volumes and accountability needs",
      "Strict security, data-residency, and compliance",
      "Multilingual, inclusive service requirements",
    ],
    solutions: [
      { title: "Citizen Helpdesks", description: "Secure, multilingual helplines and grievance handling for public programs." },
      { title: "Program Back Office", description: "Accurate, auditable processing of applications, records, and documentation." },
      { title: "Verification & Data", description: "Document verification and data services that keep programs trustworthy and efficient." },
    ],
    outcomes: [
      { value: "Secure", label: "ISO 27001-aligned" },
      { value: "Auditable", label: "Transparent process" },
      { value: "Multilingual", label: "Inclusive delivery" },
    ],
    seoTitle: "Government & Citizen Services BPO | iLeads",
    seoDescription:
      "Secure citizen helpdesks, grievance handling, and program back-office services for government and public sector — by iLeads.",
    keywords: ["government BPO", "citizen services outsourcing", "public sector BPO India", "government helpdesk services"],
  },
  {
    slug: "telecom",
    name: "Telecom",
    short: "Operators & connectivity providers",
    icon: Signal,
    hero: "Reduce churn and cost-to-serve across millions of subscribers — high-volume support, retention, and collections powered by AI agent-assist and analytics.",
    challenges: [
      "Massive subscriber bases and contact volumes",
      "Churn pressure and retention economics",
      "Complex billing and collections workflows",
    ],
    solutions: [
      { title: "High-Volume Support", description: "AI-assisted voice and digital support that handles scale without losing quality." },
      { title: "Retention & Winback", description: "Targeted retention campaigns that protect subscriber lifetime value." },
      { title: "Billing & Collections", description: "Billing query resolution and compliant collections that improve cash flow." },
    ],
    outcomes: [
      { value: "Lower", label: "Churn & cost-to-serve" },
      { value: "Scalable", label: "Millions of contacts" },
      { value: "AI-assisted", label: "Every interaction" },
    ],
    seoTitle: "Telecom BPO & Subscriber Support Services | iLeads",
    seoDescription:
      "AI-assisted telecom customer support, retention, billing, and collections at scale. Subscriber experience outsourcing by iLeads.",
    keywords: ["telecom BPO", "telecom customer support outsourcing", "subscriber support", "telecom collections India"],
  },
  {
    slug: "saas",
    name: "SaaS & Technology",
    short: "Software & subscription platforms",
    icon: Cloud,
    hero: "Support that scales with your ARR — technical support, onboarding, and customer success operations that reduce churn and grow expansion revenue.",
    challenges: [
      "Technical support requiring product fluency",
      "Onboarding and activation driving retention",
      "Scaling support without scaling cost linearly",
    ],
    solutions: [
      { title: "Technical Support", description: "Tiered, product-fluent support that resolves issues and protects NPS." },
      { title: "Onboarding & Activation", description: "Guided onboarding that turns trials into activated, retained customers." },
      { title: "Customer Success Ops", description: "Renewal, expansion, and health-monitoring operations that grow net revenue." },
    ],
    outcomes: [
      { value: "Lower", label: "Churn" },
      { value: "Higher", label: "Activation & NPS" },
      { value: "Scalable", label: "With your ARR" },
    ],
    seoTitle: "SaaS Customer Support & Success Outsourcing | iLeads",
    seoDescription:
      "Technical support, onboarding, and customer success operations for SaaS and technology companies. Scale CX with iLeads.",
    keywords: ["SaaS customer support outsourcing", "technical support BPO", "customer success outsourcing", "SaaS BPO India"],
  },
  {
    slug: "education",
    name: "Education & EdTech",
    short: "Institutions & learning platforms",
    icon: GraduationCap,
    hero: "Support learners and institutions across the lifecycle — admissions, learner helplines, and enrollment operations that improve outcomes and reduce drop-off.",
    challenges: [
      "Admissions and enrollment surge cycles",
      "Learner support across channels and languages",
      "Lead generation and counseling at scale",
    ],
    solutions: [
      { title: "Admissions & Counseling", description: "Lead generation, counseling, and appointment setting that fill cohorts." },
      { title: "Learner Support", description: "Multichannel learner helplines that reduce drop-off and improve outcomes." },
      { title: "Enrollment Operations", description: "Accurate back-office processing for applications, records, and verification." },
    ],
    outcomes: [
      { value: "Higher", label: "Enrollment conversion" },
      { value: "Lower", label: "Learner drop-off" },
      { value: "Multilingual", label: "Inclusive support" },
    ],
    seoTitle: "EdTech & Education BPO Services | iLeads",
    seoDescription:
      "Admissions, counseling, learner support, and enrollment operations for education and EdTech. Student experience outsourcing by iLeads.",
    keywords: ["education BPO", "edtech customer support", "admissions outsourcing", "student support services India"],
  },
  {
    slug: "technology",
    name: "Technology & High-Growth",
    short: "Startups & scaling enterprises",
    icon: Cpu,
    hero: "Move fast without breaking experience. We give startups and scaling enterprises an instant, flexible operations team across support, sales, and back office — ready to grow with you.",
    challenges: [
      "Lean teams under hyper-growth pressure",
      "Need for flexible, fast-to-stand-up operations",
      "Balancing speed with quality and security",
    ],
    solutions: [
      { title: "Flexible Support Pods", description: "Right-sized, fast-to-launch support teams that scale with your growth curve." },
      { title: "Sales & Revenue Ops", description: "Lead generation and SDR support that build pipeline while you build product." },
      { title: "Back Office on Demand", description: "Data, verification, and operations support that flexes with your roadmap." },
    ],
    outcomes: [
      { value: "Fast", label: "Time-to-launch" },
      { value: "Flexible", label: "Scales with you" },
      { value: "Secure", label: "ISO-aligned delivery" },
    ],
    seoTitle: "BPO for Startups & High-Growth Technology Companies | iLeads",
    seoDescription:
      "Flexible, fast-to-launch support, sales, and back-office operations for startups and scaling technology companies — by iLeads.",
    keywords: ["startup BPO", "outsourcing for startups", "scalable customer support", "tech operations outsourcing"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
