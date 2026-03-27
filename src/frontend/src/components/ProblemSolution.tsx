import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const problems = [
  {
    icon: "⏰",
    title: "Manual Work Kills Growth",
    desc: "Your team wastes hours on repetitive tasks that could be automated, slowing down your growth.",
  },
  {
    icon: "📉",
    title: "Low Lead Conversion",
    desc: "Leads fall through the cracks because follow-ups are manual, slow, and inconsistent.",
  },
  {
    icon: "💸",
    title: "Wasted Time & Money",
    desc: "Inefficient processes drain resources and prevent you from focusing on high-value work.",
  },
];

const solutions = [
  {
    icon: "🤖",
    title: "AI Works 24/7 For You",
    desc: "Intelligent systems handle tasks, follow-ups, and client interactions around the clock.",
  },
  {
    icon: "🎯",
    title: "Smart Lead Funnels",
    desc: "AI-powered chatbots qualify leads and book calls automatically with no manual effort.",
  },
  {
    icon: "⚡",
    title: "Full Automation Suite",
    desc: "End-to-end automation connects all your tools, freeing your team to focus on growth.",
  },
];

export default function ProblemSolution() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[#0A0A0A] section-fade ${visible ? "visible" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Why AI?
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            Why Businesses Choose AI Automation
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-8 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={20} className="text-orange-400" />
              <span className="font-heading font-semibold text-lg text-orange-400">
                The Problems
              </span>
            </div>
            {problems.map((p) => (
              <div
                key={p.title}
                className="bg-[#111111] border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{p.icon}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">
                      {p.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex flex-col items-center justify-center gap-4 px-4">
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-primary/50" />
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary font-heading font-bold text-sm glow-blue-sm">
              VS
            </div>
            <div className="w-px h-20 bg-gradient-to-t from-transparent to-primary/50" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 size={20} className="text-primary" />
              <span className="font-heading font-semibold text-lg text-primary">
                The Solutions
              </span>
            </div>
            {solutions.map((s) => (
              <div
                key={s.title}
                className="bg-[#111111] border border-primary/20 rounded-xl p-5 hover:border-primary/50 card-hover-glow"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{s.icon}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">
                      {s.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
