import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">
          Let's Work Together
        </span>
        <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-4 text-white leading-tight">
          Ready to Automate Your{" "}
          <span className="text-gradient-blue">Business Growth?</span>
        </h2>
        <p className="text-[#A0A0A0] mt-6 text-lg max-w-xl mx-auto leading-relaxed">
          Book a free 30-minute strategy call with Gowtham. We'll map out
          exactly how AI automation can grow your revenue — no commitment
          required.
        </p>
        <a
          href="https://wa.me/918341982306"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-semibold glow-blue hover:glow-blue-lg hover:scale-105 transition-all gap-3"
            data-ocid="cta.primary_button"
          >
            <MessageCircle size={20} />
            Book Your Free Strategy Call
          </Button>
        </a>
        <p className="text-[#A0A0A0] text-sm mt-4">
          ✓ Free consultation &nbsp; ✓ No pressure &nbsp; ✓ Reply within 24
          hours
        </p>
      </div>
    </section>
  );
}
