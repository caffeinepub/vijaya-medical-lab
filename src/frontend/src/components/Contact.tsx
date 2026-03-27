import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  const { ref, visible } = useReveal();
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Not connected. Please refresh.");
      return;
    }
    setLoading(true);
    try {
      await actor.submitContact(
        form.name,
        form.phone,
        form.email,
        form.message,
      );
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
    } catch {
      toast.error("Failed to send. Please try via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[#0A0A0A] section-fade ${visible ? "visible" : ""}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Contact
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl mt-3 text-white">
            Get In Touch
          </h2>
          <p className="text-[#A0A0A0] mt-4 max-w-xl mx-auto">
            Have a project in mind? Let's talk about how we can automate your
            business growth.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">
                Contact Dripszy
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Ready to transform your business with AI? Reach out to Gowtham
                directly — we typically respond within a few hours.
              </p>
            </div>
            <div className="space-y-4">
              <a
                href="mailto:govardhan2306@gmail.com"
                className="flex items-center gap-4 p-4 bg-[#111111] border border-white/8 rounded-xl hover:border-primary/40 card-hover-glow group transition-all"
                data-ocid="contact.link"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Email</p>
                  <p className="text-[#A0A0A0] text-sm">
                    govardhan2306@gmail.com
                  </p>
                </div>
              </a>
              <a
                href="https://wa.me/918341982306"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#111111] border border-white/8 rounded-xl hover:border-primary/40 card-hover-glow group transition-all"
                data-ocid="contact.link"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">WhatsApp</p>
                  <p className="text-[#A0A0A0] text-sm">+91 8341982306</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 bg-[#111111] border border-white/8 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Owner</p>
                  <p className="text-[#A0A0A0] text-sm">
                    Gowtham — AI Agency Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full gap-4 bg-[#111111] border border-primary/30 rounded-2xl p-10 text-center"
                data-ocid="contact.success_state"
              >
                <CheckCircle2 size={48} className="text-primary glow-blue-sm" />
                <h3 className="font-heading font-bold text-xl text-white">
                  Message Sent!
                </h3>
                <p className="text-[#A0A0A0] text-sm">
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#111111] border border-white/8 rounded-2xl p-6 space-y-4"
                data-ocid="contact.panel"
              >
                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#555] focus:border-primary"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#555] focus:border-primary"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Phone / WhatsApp
                  </Label>
                  <Input
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                    className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#555] focus:border-primary"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#555] focus:border-primary resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold glow-blue-sm hover:glow-blue"
                  data-ocid="contact.submit_button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
