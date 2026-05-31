import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "display-heading mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className={cn("mt-5 text-lg leading-relaxed text-pretty", dark ? "text-slatey-300" : "text-slatey-600")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
