import { useReveal } from "../hooks/useReveal";

const services = [
  {
    icon: "🌐",
    title: "Website Development",
    desc: "High-converting websites that attract and close clients on autopilot.",
  },
  {
    icon: "🤖",
    title: "AI Automation Systems",
    desc: "Intelligent systems that handle repetitive tasks while you focus on growth.",
  },
  {
    icon: "💬",
    title: "AI Chatbot Development",
    desc: "Smart chatbots that qualify leads and book calls automatically, 24/7.",
  },
  {
    icon: "⚙️",
    title: "AI Workflow Setup",
    desc: "Seamless workflows connecting all your business tools with AI intelligence.",
  },
  {
    icon: "📱",
    title: "App & Startup MVPs",
    desc: "Custom applications and startup MVPs built fast and designed to scale.",
  },
  {
    icon: "✨",
    title: "Custom AI Solutions",
    desc: "Tailored AI systems engineered for your unique business challenges and goals.",
  },
];

export default function Services() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[#111111] section-fade ${visible ? "visible" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            What We Build For You
          </h2>
          <p className="text-[#A0A0A0] mt-4 max-w-xl mx-auto">
            Outcome-focused AI services designed to automate, scale, and grow
            your business.
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="services.panel"
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              className="bg-[#0A0A0A] border border-white/8 rounded-2xl p-6 card-hover-glow group"
              data-ocid={`services.card.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                {s.title}
              </h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
