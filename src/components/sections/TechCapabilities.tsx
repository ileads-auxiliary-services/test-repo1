import {
  AudioLines,
  BarChart3,
  MessagesSquare,
  Users,
  Sparkles,
  ShieldCheck,
  LineChart,
  Lock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const capabilities = [
  { icon: AudioLines, title: "AI Voice Bots", text: "Conversational voice automation that resolves routine calls and hands off seamlessly to specialists." },
  { icon: BarChart3, title: "Speech Analytics", text: "100% of interactions analyzed for sentiment, compliance, and coaching — never just a sample." },
  { icon: MessagesSquare, title: "Omnichannel Support", text: "Unified voice, chat, email, and social on a single context-aware customer view." },
  { icon: Users, title: "Workforce Management", text: "Forecasting, scheduling, and real-time adherence that match capacity to demand." },
  { icon: Sparkles, title: "Agent Assist", text: "Real-time prompts, knowledge, and next-best-action delivered during live interactions." },
  { icon: ShieldCheck, title: "Quality Monitoring", text: "Automated and human QA driving consistent, compliant delivery at scale." },
  { icon: LineChart, title: "Reporting Dashboards", text: "Live, transparent dashboards on SLAs, CSAT, conversion, and cost-to-serve." },
  { icon: Lock, title: "Security Architecture", text: "ISO 27001-aligned controls across access, data, network, and endpoint." },
];

export function TechCapabilities() {
  return (
    <section className="py-24">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Technology & AI"
          title="An AI-native delivery platform, not a call center"
          description="Every engagement runs on a modern technology stack that makes your operations measurably faster, smarter, and more secure."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.title}>
              <div className="group h-full rounded-2xl border border-slatey-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric-300 hover:shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-slatey-100 text-ink-900 transition-colors group-hover:bg-electric-500 group-hover:text-white">
                  <cap.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-ink-900">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slatey-600">{cap.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
