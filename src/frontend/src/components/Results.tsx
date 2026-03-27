import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  {
    value: 2,
    prefix: "₹",
    suffix: "Cr+",
    label: "Revenue Generated for Clients",
  },
  { value: 95, suffix: "%", label: "Client Retention Rate" },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  active,
}: { value: number; prefix?: string; suffix?: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [active, value]);
  return (
    <span className="font-heading font-bold text-5xl sm:text-6xl text-gradient-blue">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Results() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className="py-24 px-4 bg-[#111111] relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Our Impact
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            Numbers That Speak
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center p-6 bg-[#0A0A0A] rounded-2xl border border-white/8 card-hover-glow"
              data-ocid={`results.card.${i + 1}`}
            >
              <AnimatedCounter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                active={visible}
              />
              <p className="text-[#A0A0A0] mt-3 text-sm font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
