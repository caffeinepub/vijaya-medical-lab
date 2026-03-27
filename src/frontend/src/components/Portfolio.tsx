import { useReveal } from "../hooks/useReveal";

const projects = [
  {
    emoji: "🛒",
    title: "E-Commerce Revenue Automation",
    industry: "E-Commerce",
    color: "from-blue-600/20 to-blue-900/10",
    problem:
      "Losing ₹40L+/month to abandoned carts with no automated recovery system in place.",
    solution:
      "Built an AI automation engine with personalized email sequences, WhatsApp follow-ups, and dynamic discount triggers.",
    result: "+340% cart recovery rate",
    metric: "₹8L revenue recovered in 30 days",
  },
  {
    emoji: "🏠",
    title: "AI Lead Gen Chatbot — Real Estate",
    industry: "Real Estate",
    color: "from-purple-600/20 to-purple-900/10",
    problem:
      "Missing qualified leads after business hours — salespeople couldn’t respond in time.",
    solution:
      "Deployed a 24/7 AI chatbot that qualifies visitors, captures details, and books property viewings automatically.",
    result: "3x more qualified leads",
    metric: "60% reduction in manual follow-up work",
  },
  {
    emoji: "🚀",
    title: "SaaS Startup MVP Launch",
    industry: "SaaS / Tech",
    color: "from-emerald-600/20 to-emerald-900/10",
    problem:
      "Big idea, no tech team — founder needed a full-stack product built fast without hiring.",
    solution:
      "Designed and shipped a complete SaaS MVP with authentication, dashboard, and payment integration in 6 weeks.",
    result: "200 beta users in month 1",
    metric: "₹2L in pre-orders before launch",
  },
];

export default function Portfolio() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="portfolio"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[#0A0A0A] section-fade ${visible ? "visible" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Case Studies
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            Our Work
          </h2>
          <p className="text-[#A0A0A0] mt-4 max-w-xl mx-auto">
            Real results for real businesses. Here's what we've built.
          </p>
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          data-ocid="portfolio.panel"
        >
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`bg-gradient-to-br ${p.color} border border-white/8 rounded-2xl p-6 card-hover-glow flex flex-col gap-4`}
              data-ocid={`portfolio.card.${i + 1}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{p.emoji}</span>
                <span className="text-xs font-medium bg-white/10 rounded-full px-3 py-1 text-[#A0A0A0]">
                  {p.industry}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                {p.title}
              </h3>
              <div className="space-y-3 flex-1">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">
                    Problem
                  </span>
                  <p className="text-sm text-[#A0A0A0] mt-1">{p.problem}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                    Solution
                  </span>
                  <p className="text-sm text-[#A0A0A0] mt-1">{p.solution}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">
                    Result
                  </span>
                  <p className="text-sm font-semibold text-green-400 mt-1">
                    {p.result}
                  </p>
                  <p className="text-xs text-[#A0A0A0]">{p.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
