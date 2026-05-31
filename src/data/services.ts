import type { LucideIcon } from "lucide-react";
import {
  Headset,
  TrendingUp,
  ShieldCheck,
  Layers,
  Database,
  Bot,
  Phone,
  Mail,
  MessageSquare,
  Share2,
  Target,
  CalendarCheck,
  Megaphone,
  LifeBuoy,
  Banknote,
  FileCheck2,
  ClipboardList,
  FileSpreadsheet,
  Workflow,
  AudioLines,
  BarChart3,
  Sparkles,
} from "lucide-react";

export type SubService = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export type Service = {
  slug: string;
  title: string;
  short: string; // card subtitle
  icon: LucideIcon;
  hero: string; // page hero paragraph
  outcomes: string[]; // bullet outcomes
  capabilities: SubService[];
  metrics: { value: string; label: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "customer-support",
    title: "Customer Support & Experience",
    short: "Omnichannel CX across voice, email, chat, and social — 24/7.",
    icon: Headset,
    hero: "Deliver effortless, on-brand support across every channel your customers choose. Our AI-assisted agents resolve issues faster, escalate intelligently, and turn service moments into loyalty — around the clock, at enterprise scale.",
    outcomes: [
      "Higher CSAT and first-contact resolution",
      "Lower average handle time with AI agent-assist",
      "24/7 omnichannel coverage across time zones",
      "Reduced cost-to-serve without sacrificing quality",
    ],
    capabilities: [
      { name: "Voice Support", description: "Inbound and outbound voice handled by trained specialists with real-time AI agent-assist and live quality monitoring.", icon: Phone },
      { name: "Email Support", description: "Structured, SLA-bound email resolution with templated accuracy and tone consistency across high volumes.", icon: Mail },
      { name: "Chat Support", description: "Live chat and AI-blended messaging that resolves routine queries instantly and routes complex cases to experts.", icon: MessageSquare },
      { name: "Social & ORM", description: "Social listening, response management, and online reputation management to protect and grow your brand.", icon: Share2 },
    ],
    metrics: [
      { value: "24/7", label: "Always-on coverage" },
      { value: "Omnichannel", label: "Voice · Email · Chat · Social" },
      { value: "AI-assist", label: "On every interaction" },
    ],
    seoTitle: "Customer Support Outsourcing & CX Services | iLeads",
    seoDescription:
      "AI-powered omnichannel customer support outsourcing — voice, email, chat, and social. 24/7 enterprise-grade customer experience services from iLeads.",
    keywords: ["customer support outsourcing", "customer experience solutions", "omnichannel support", "24/7 contact center India"],
  },
  {
    slug: "sales-revenue-operations",
    title: "Sales & Revenue Operations",
    short: "Pipeline generation, qualification, and conversion that compounds revenue.",
    icon: TrendingUp,
    hero: "Turn outreach into revenue. From data-driven lead generation to appointment setting and full-funnel sales support, our teams build qualified pipeline and accelerate conversion — backed by analytics that prove the ROI.",
    outcomes: [
      "More qualified pipeline at a lower cost per lead",
      "Higher connect-to-conversion rates",
      "Predictable, measurable revenue contribution",
      "Faster speed-to-lead with always-on coverage",
    ],
    capabilities: [
      { name: "Lead Generation", description: "Targeted prospecting and qualification that feeds your sales team a steady flow of sales-ready opportunities.", icon: Target },
      { name: "Appointment Setting", description: "Calendar-ready meetings with decision-makers, booked and confirmed by trained SDRs.", icon: CalendarCheck },
      { name: "Telemarketing", description: "Inbound and outbound campaigns with professional tele-callers, team leaders, and managers driving outcomes.", icon: Megaphone },
      { name: "Sales Support", description: "Onboarding journeys, buyer–seller matchmaking, and post-sale support that protect lifetime value.", icon: LifeBuoy },
    ],
    metrics: [
      { value: "Full-funnel", label: "Prospect to close" },
      { value: "Data-driven", label: "Targeting & scoring" },
      { value: "Speed-to-lead", label: "Always-on outreach" },
    ],
    seoTitle: "Lead Generation & Sales Outsourcing Services | iLeads",
    seoDescription:
      "B2B and B2C lead generation, appointment setting, telemarketing, and sales support. Data-driven revenue operations that build qualified pipeline — by iLeads.",
    keywords: ["lead generation services", "appointment setting", "telemarketing services India", "sales outsourcing"],
  },
  {
    slug: "collections",
    title: "Collections & Recovery",
    short: "Compliant, customer-centric EMI and debt recovery that preserves relationships.",
    icon: Banknote,
    hero: "Recover more, faster — without damaging customer relationships. Our portfolio-wise collections specialists combine disciplined process, behavioral analytics, and a relationship-first tone to improve recovery while protecting your brand.",
    outcomes: [
      "Improved recovery and roll-rate reduction",
      "Compliance-first, professionally handled contact",
      "Behavioral segmentation for smarter outreach",
      "Preserved customer relationships post-recovery",
    ],
    capabilities: [
      { name: "EMI Collections", description: "Outbound, portfolio-wise EMI collection campaigns run by trained, professional recovery teams.", icon: Banknote },
      { name: "Debt Recovery", description: "Early and late-stage debt recovery with disciplined, compliant, relationship-first engagement.", icon: TrendingUp },
      { name: "Payment Reminders", description: "Proactive, multichannel reminders that reduce delinquency before it starts.", icon: CalendarCheck },
      { name: "Dispute Handling", description: "Structured resolution of disputes and queries that keeps customers engaged and paying.", icon: LifeBuoy },
    ],
    metrics: [
      { value: "Portfolio-wise", label: "Segmented strategy" },
      { value: "Compliant", label: "Process-driven contact" },
      { value: "Relationship-first", label: "Brand protected" },
    ],
    seoTitle: "Collections & Debt Recovery Services | iLeads",
    seoDescription:
      "Compliant EMI collections and debt recovery outsourcing. Portfolio-wise, customer-centric collections services that improve recovery rates — by iLeads.",
    keywords: ["collections services", "debt recovery outsourcing", "EMI collection services", "BPO collections India"],
  },
  {
    slug: "verification-services",
    title: "Verification Services",
    short: "Identity, document, and business verification that builds trust.",
    icon: ShieldCheck,
    hero: "Validate with confidence. Our verification teams confirm identities, documents, and business credentials with accuracy and speed — reducing fraud, accelerating onboarding, and strengthening trust across your customer base.",
    outcomes: [
      "Reduced fraud and onboarding risk",
      "Faster, more accurate verification cycles",
      "Higher trust and credibility with end customers",
      "Audit-ready process and documentation",
    ],
    capabilities: [
      { name: "Identity Verification", description: "KYC-style identity checks executed accurately and at volume to keep onboarding fast and safe.", icon: FileCheck2 },
      { name: "Document Verification", description: "Validation of submitted documents for authenticity, completeness, and compliance.", icon: ClipboardList },
      { name: "Business Verification", description: "Confirmation of business legitimacy and credentials to build trust between buyers and sellers.", icon: ShieldCheck },
      { name: "Address & Tele-Verification", description: "Tele and field-assisted verification to confirm details before high-value decisions.", icon: Phone },
    ],
    metrics: [
      { value: "Accuracy-first", label: "Quality assured" },
      { value: "Fraud-reduction", label: "Risk controlled" },
      { value: "Audit-ready", label: "Documented trail" },
    ],
    seoTitle: "Verification Services Outsourcing | iLeads",
    seoDescription:
      "Identity, document, and business verification outsourcing. Accurate, fraud-reducing verification services that accelerate onboarding — by iLeads.",
    keywords: ["verification services", "KYC verification outsourcing", "document verification", "business verification India"],
  },
  {
    slug: "back-office-operations",
    title: "Back Office Operations",
    short: "The operational engine behind your business — accurate and scalable.",
    icon: Layers,
    hero: "Free your teams to focus on what matters. We run the high-volume, accuracy-critical back-office processes — from order management to payroll support — with the discipline, security, and scalability of an enterprise operations partner.",
    outcomes: [
      "Lower operational cost with higher accuracy",
      "Scalable capacity that flexes with demand",
      "Standardized, SLA-bound process execution",
      "More time for your team to focus on core work",
    ],
    capabilities: [
      { name: "Order & Transaction Processing", description: "Accurate, SLA-bound processing of orders, transactions, and records at scale.", icon: Workflow },
      { name: "Finance & Accounting Support", description: "Financial accounting, reconciliation, and payroll support handled with precision and confidentiality.", icon: FileSpreadsheet },
      { name: "Project & Operations Support", description: "Project coordination and operational support that keeps your business running seamlessly.", icon: ClipboardList },
      { name: "Document Management", description: "Indexing, processing, and management of high-volume documents with security and accuracy.", icon: Database },
    ],
    metrics: [
      { value: "SLA-bound", label: "Predictable delivery" },
      { value: "Scalable", label: "Flex with demand" },
      { value: "Secure", label: "ISO 27001-aligned" },
    ],
    seoTitle: "Back Office Outsourcing Services | iLeads",
    seoDescription:
      "Back office outsourcing — order processing, finance & accounting support, payroll, and document management. Accurate, scalable operations by iLeads.",
    keywords: ["back office outsourcing", "back office support services", "data processing outsourcing", "finance and accounting BPO"],
  },
  {
    slug: "data-services",
    title: "Data Services",
    short: "Clean, structured, decision-ready data at any volume.",
    icon: Database,
    hero: "Data is only valuable when it is accurate, structured, and ready to act on. Our data services teams capture, cleanse, enrich, and manage data at scale — turning raw information into a dependable foundation for decisions and automation.",
    outcomes: [
      "Higher data accuracy and completeness",
      "Faster turnaround on large data volumes",
      "Enriched, decision-ready datasets",
      "Secure handling of sensitive information",
    ],
    capabilities: [
      { name: "Data Entry & Processing", description: "High-accuracy data entry and processing across formats, languages, and volumes.", icon: FileSpreadsheet },
      { name: "Data Cleansing & Enrichment", description: "De-duplication, validation, and enrichment that make your databases trustworthy.", icon: Sparkles },
      { name: "Data Mining & Harvesting", description: "Structured collection and harvesting of data to fuel research, marketing, and analytics.", icon: Database },
      { name: "Content & Catalog Support", description: "Content writing, catalog management, and data seeding for digital commerce and platforms.", icon: ClipboardList },
    ],
    metrics: [
      { value: "High-accuracy", label: "QA at every step" },
      { value: "Any-volume", label: "Scales on demand" },
      { value: "Secure", label: "Confidential by design" },
    ],
    seoTitle: "Data Entry & Data Processing Outsourcing | iLeads",
    seoDescription:
      "Data entry, data processing, cleansing, enrichment, and catalog support. Accurate, scalable, secure data services outsourcing — by iLeads.",
    keywords: ["data entry outsourcing", "data processing services", "data services BPO", "data cleansing outsourcing"],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation Services",
    short: "Intelligent automation that amplifies people and outcomes.",
    icon: Bot,
    hero: "We embed AI where it creates measurable value — deflecting routine contacts, coaching agents in real time, and surfacing insight from every interaction. Our AI and automation layer makes every other service faster, smarter, and more cost-efficient.",
    outcomes: [
      "Automated deflection of routine contacts",
      "Real-time agent-assist and coaching",
      "100% interaction analytics, not sampling",
      "Lower cost-to-serve with maintained quality",
    ],
    capabilities: [
      { name: "AI Voice Bots", description: "Conversational voice bots that handle high-volume routine calls and hand off seamlessly to humans.", icon: AudioLines },
      { name: "Speech & Interaction Analytics", description: "100% analysis of calls and chats to surface compliance, sentiment, and coaching opportunities.", icon: BarChart3 },
      { name: "Agent Assist", description: "Real-time prompts, knowledge, and next-best-action delivered to agents during live interactions.", icon: Sparkles },
      { name: "Process Automation", description: "Workflow and robotic automation that removes manual effort from repetitive back-office tasks.", icon: Workflow },
    ],
    metrics: [
      { value: "100%", label: "Interaction analytics" },
      { value: "Real-time", label: "Agent-assist" },
      { value: "Human + AI", label: "Blended delivery" },
    ],
    seoTitle: "AI-Powered Contact Center & Automation Services | iLeads",
    seoDescription:
      "AI voice bots, speech analytics, agent assist, and process automation. AI-powered contact center and intelligent automation services — by iLeads.",
    keywords: ["AI powered contact center", "speech analytics", "AI voice bots", "intelligent automation BPO", "agent assist"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
