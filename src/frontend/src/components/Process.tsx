import { useReveal } from "../hooks/useReveal";

const steps = [
  {
    n: "01",
    title: "Strategy",
    desc: "We deep-dive into your business, identify automation opportunities, and map out your custom AI roadmap.",
  },
  {
    n: "02",
    title: "Build",
    desc: "Our team designs and develops your complete AI system from chatbots to full automation workflows.",
  },
  {
    n: "03",
    title: "Launch",
    desc: "We deploy, test thoroughly, and go live ensuring everything works seamlessly from day one.",
  },
  {
    n: "04",
    title: "Scale",
    desc: "We continuously optimize, add new automations, and help you grow with data-driven insights.",
  },
];

export default function Process() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="process"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[#0A0A0A] section-fade ${visible ? "visible" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Our Approach
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            How We Work
          </h2>
          <p className="text-[#A0A0A0] mt-4 max-w-xl mx-auto">
            A proven 4-step process from idea to scaled AI system.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center"
                data-ocid={`process.card.${i + 1}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center font-heading font-bold text-primary text-lg mb-6 glow-blue-sm relative z-10">
                  {step.n}
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
