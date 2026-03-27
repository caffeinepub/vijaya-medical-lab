import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const plans = [
  {
    name: "Starter",
    price: "₹5,000",
    tagline: "Perfect for getting started",
    highlight: false,
    features: [
      "AI Chatbot OR Landing Page",
      "1 Automation Workflow",
      "7-Day Delivery",
      "Basic Email Support",
      "1 Revision Round",
    ],
  },
  {
    name: "Growth",
    price: "₹15,000",
    tagline: "Most popular for scaling businesses",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Full AI Workflow + Chatbot",
      "3 Automation Workflows",
      "Custom Website Design",
      "Priority Support",
      "3 Revision Rounds",
      "Strategy Call Included",
    ],
  },
  {
    name: "Scale",
    price: "₹35,000",
    tagline: "Complete AI transformation",
    highlight: false,
    features: [
      "Complete AI System",
      "App / Startup MVP",
      "Unlimited Automations",
      "Dedicated Support Channel",
      "Monthly Strategy Calls",
      "Ongoing Optimization",
    ],
  },
];

export default function Pricing() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="pricing"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[#0A0A0A] section-fade ${visible ? "visible" : ""}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#A0A0A0] mt-4 max-w-xl mx-auto">
            No hidden fees. No surprises. Just results.
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          data-ocid="pricing.panel"
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col gap-5 transition-all ${
                plan.highlight
                  ? "bg-primary/5 border-2 border-primary glow-blue-border md:scale-105"
                  : "bg-[#111111] border border-white/8 card-hover-glow"
              }`}
              data-ocid={`pricing.card.${i + 1}`}
            >
              {"badge" in plan && plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full glow-blue-sm">
                  {plan.badge}
                </span>
              )}
              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  {plan.name}
                </h3>
                <p className="text-[#A0A0A0] text-sm mt-1">{plan.tagline}</p>
              </div>
              <div>
                <span className="font-heading font-bold text-4xl text-white">
                  {plan.price}
                </span>
                <span className="text-[#A0A0A0] text-sm ml-1">/ project</span>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-[#A0A0A0]">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/918341982306"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className={`w-full font-semibold ${
                    plan.highlight
                      ? "bg-primary hover:bg-primary/90 text-white glow-blue-sm"
                      : "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-primary/50"
                  }`}
                  data-ocid={`pricing.button.${i + 1}`}
                >
                  Get Started
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
