import { Star } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const testimonials = [
  {
    name: "Rahul Mehta",
    company: "FreshCart Online",
    role: "Founder & CEO",
    avatar: "RM",
    rating: 5,
    content:
      "Dripszy transformed our abandoned cart problem into a revenue engine. The AI automation they built recovered more in a month than we'd seen all quarter. Absolutely exceptional work.",
  },
  {
    name: "Priya Sharma",
    company: "EliteHomes Realty",
    role: "Sales Director",
    avatar: "PS",
    rating: 5,
    content:
      "The AI chatbot they built never sleeps — it qualifies leads, answers property queries, and books viewings. Our sales team now only handles warm, ready-to-buy leads. Game-changer.",
  },
  {
    name: "Arjun Nair",
    company: "Launchify SaaS",
    role: "Co-Founder",
    avatar: "AN",
    rating: 5,
    content:
      "We had an idea and no tech team. Dripszy delivered a full SaaS MVP in 6 weeks flat. The quality was incredible and they guided us through every decision. Couldn't have done it without them.",
  },
  {
    name: "Deepa Krishnan",
    company: "NutriLife Coaching",
    role: "Business Owner",
    avatar: "DK",
    rating: 5,
    content:
      "I was skeptical about AI automation, but Dripszy made it so simple. My entire lead nurturing is now on autopilot. I spend more time coaching clients and less time chasing leads.",
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[#111111] section-fade ${visible ? "visible" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-[#0A0A0A] border border-white/8 rounded-2xl p-6 card-hover-glow"
              data-ocid={`testimonials.card.${i + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star
                    key={`star-${t.name}-${j}`}
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-[#A0A0A0] leading-relaxed mb-6 text-sm">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-heading font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#A0A0A0] text-xs">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
