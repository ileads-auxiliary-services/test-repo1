// Central source of truth for company facts.
// Sourced from ileads.co.in (About, Services, Contact, Careers) and public records.
// NOTE for maintainers: phone/email values marked TODO should be confirmed against
// the live contact page before go-live.

export const company = {
  name: "iLeads",
  legalName: "iLeads Auxiliary Services Pvt. Ltd.",
  tagline: "AI-Powered Business Process Management & Customer Experience",
  positioning:
    "AI-Powered Business Process Management and Customer Experience Transformation Partner",
  founded: 2010,
  domain: "ileads.co.in",
  url: "https://www.ileads.co.in",
  description:
    "iLeads is an AI-powered Business Process Management and Customer Experience transformation partner. We blend human expertise with intelligent automation to run mission-critical customer, sales, and back-office operations for enterprises and government across India and beyond.",
  shortDescription:
    "AI-powered BPM and Customer Experience partner delivering customer support, revenue operations, verification, collections, and back-office services at enterprise scale.",
  recognition: [
    "Recognized by Startup India",
    "Recognized by Startup Uttarakhand",
    "Best Start Up 2020 — Chamber of Commerce & Industry of India",
  ],
  certifications: [
    {
      code: "ISO 9001:2015",
      title: "Quality Management System",
      blurb:
        "Process discipline and continuous improvement embedded across every delivery workflow.",
    },
    {
      code: "ISO 27001:2013",
      title: "Information Security Management",
      blurb:
        "Enterprise-grade controls protecting customer data across people, process, and technology.",
    },
    {
      code: "Startup India",
      title: "DPIIT Recognized",
      blurb:
        "Government of India recognition for innovation-led, technology-driven growth.",
    },
    {
      code: "PAN-India",
      title: "Multi-Region Delivery",
      blurb:
        "Geographically distributed centers enabling resilient, always-on operations.",
    },
  ],
  stats: [
    { value: 10000, suffix: "+", label: "Seats & Employees", detail: "Trained delivery professionals" },
    { value: 15, suffix: "+", label: "Years of Excellence", detail: "Operating since 2010" },
    { value: 9, suffix: "+", label: "Industries Served", detail: "BFSI to Government" },
    { value: 24, suffix: "/7", label: "Always-On Delivery", detail: "Omnichannel coverage" },
  ],
  contact: {
    // Official enquiry address confirmed by iLeads.
    email: "sales@ileads.co.in",
    careersEmail: "sales@ileads.co.in",
    salesEmail: "sales@ileads.co.in",
    phone: "", // Not published here — enquiries routed via email / contact form.
    phoneHref: "",
  },
  locations: [
    {
      city: "Dehradun",
      role: "Head Office",
      state: "Uttarakhand",
      address:
        "Commercial Complex, Behind Kailash Tower, E.C. Road, Dehradun, Uttarakhand 248001",
      hq: true,
    },
    {
      city: "Dehradun",
      role: "Delivery Center",
      state: "Uttarakhand",
      address:
        "3rd Floor, HM Tower, New Road, Opp. MKP College, Dehradun, Uttarakhand 248001",
      hq: false,
    },
    {
      city: "Gurugram",
      role: "Delivery Center",
      state: "Haryana",
      address:
        "3rd Floor, 24C, Phase IV, Udyog Vihar, Sector 1C, Gurugram, Haryana 122022",
      hq: false,
    },
    {
      city: "Panchkula",
      role: "Delivery Center",
      state: "Haryana",
      address:
        "SCO 112, Midtown Business Park, Peer Muchalla, Near Sector 20, Panchkula, Haryana",
      hq: false,
    },
    {
      city: "Noida",
      role: "Delivery Center",
      state: "Uttar Pradesh",
      address:
        "A22, Sector 16, Near Sector 16 Metro Station, Noida, Uttar Pradesh 201301",
      hq: false,
    },
    {
      city: "Bengaluru",
      role: "Delivery Center",
      state: "Karnataka",
      address:
        "Maruthi Chambers, Ground Floor, Silk Board Junction, Bommanahalli, Bengaluru, Karnataka",
      hq: false,
    },
    {
      city: "Trivandrum",
      role: "Delivery Center",
      state: "Kerala",
      address:
        "New Bharath Towers, 2nd Floor, TC No. 86/1424(3), Chakkai Bypass, Trivandrum, Kerala",
      hq: false,
    },
    {
      city: "Puducherry",
      role: "On-Site Delivery",
      state: "Puducherry",
      address:
        "Government of Puducherry Electricity Department, 137 Nethaji Subhash Chandra Bose Salai, Puducherry 605001",
      hq: false,
    },
    {
      city: "Navi Mumbai",
      role: "Delivery Center",
      state: "Maharashtra",
      address:
        "3rd Floor, Allied Digital House, A4, Millennium Business Park, Navi Mumbai, Maharashtra 400710",
      hq: false,
    },
  ],
  leadership: [
    {
      name: "Ankur Sinha",
      role: "Chief Executive Officer",
      bio: "Sets the vision for iLeads as an AI-led CX and BPM transformation partner, scaling delivery while protecting service quality and client outcomes.",
    },
    {
      name: "Anubha Sinha",
      role: "Director",
      bio: "Drives organizational growth, people strategy, and the values that make iLeads a destination employer in the regions it operates.",
    },
    {
      name: "Samuel Mohan",
      role: "Chief Operating Officer",
      bio: "Owns end-to-end operational excellence — workforce management, quality, and the delivery rigor behind every engagement.",
    },
  ],
  social: {
    linkedin: "https://in.linkedin.com/company/ileadsworld",
    facebook: "https://www.facebook.com/ileadsworld/",
  },
  mission:
    "To help enterprises and governments deliver effortless, intelligent customer experiences by uniting world-class people with AI-driven process automation.",
  vision:
    "To be India's most trusted AI-powered BPM and Customer Experience partner — recognized globally for operational excellence, security, and measurable business outcomes.",
  values: [
    {
      title: "Outcomes Over Activity",
      description:
        "We are measured by the business results we create — CSAT, conversion, cost-to-serve — not the hours we bill.",
    },
    {
      title: "Security by Default",
      description:
        "ISO 27001-aligned controls protect every customer interaction and every byte of data we are entrusted with.",
    },
    {
      title: "Human + Machine",
      description:
        "We deploy AI where it amplifies people, freeing experts to handle moments that matter most.",
    },
    {
      title: "Relentless Quality",
      description:
        "ISO 9001 process discipline and continuous coaching keep our delivery consistent at scale.",
    },
    {
      title: "People First",
      description:
        "We invest in careers, learning, and culture — because engaged teams deliver exceptional experiences.",
    },
    {
      title: "Partnership Mindset",
      description:
        "We embed with our clients as an extension of their brand, not a transactional vendor.",
    },
  ],
  timeline: [
    { year: "2010", title: "Founded in Dehradun", text: "iLeads begins as a focused data and call-processing team in Uttarakhand." },
    { year: "2015", title: "Multi-Service BPM", text: "Expands beyond tele-calling into lead generation, back office, and verification services." },
    { year: "2018", title: "Incorporated & Scaled", text: "iLeads Auxiliary Services Pvt. Ltd. formalizes its growth across new delivery centers." },
    { year: "2020", title: "National Recognition", text: "Awarded Best Start Up by the Chamber of Commerce & Industry of India; recognized by Startup India." },
    { year: "2021", title: "Security & Quality", text: "Achieves ISO 9001:2015 and ISO 27001:2013 certification across operations." },
    { year: "2023", title: "PAN-India Footprint", text: "Crosses 10,000+ seats with delivery centers spanning multiple states." },
    { year: "2025", title: "AI-Powered Transformation", text: "Launches AI voice bots, speech analytics, and agent-assist across the delivery platform." },
  ],
} as const;

export type Company = typeof company;
