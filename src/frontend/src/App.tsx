import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  FlaskConical,
  HeartPulse,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ── Types ──────────────────────────────────────────────────────────
type Page = "home" | "booking" | "about" | "services" | "testimonials" | "faq";

// ── Scroll-reveal hook ─────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useChildReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const children = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal-child]"),
    );
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Icons ──────────────────────────────────────────────────────────
function MedCross({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M9 3h6v5h5v6h-5v5H9v-5H4v-6h5V3z" />
    </svg>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].slice(0, count).map((n) => (
        <Star
          key={n}
          size={14}
          className="fill-current"
          style={{ color: "oklch(0.72 0.16 65)" }}
        />
      ))}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────
const services = [
  {
    icon: "🩸",
    title: "Blood Tests",
    desc: "CBC, lipid profile, liver function, and thyroid panels with accurate results.",
    price: "From ₹150",
    details:
      "Comprehensive blood analysis including complete blood count, metabolic panel, lipid profile, thyroid function, and vitamin levels.",
  },
  {
    icon: "🧪",
    title: "Urine Tests",
    desc: "Detailed urinalysis for health monitoring, kidney function, and infection detection.",
    price: "From ₹100",
    details:
      "Routine urinalysis, urine culture, microalbumin, urine protein, and 24-hour urine studies.",
  },
  {
    icon: "🏥",
    title: "Full Body Checkup",
    desc: "Complete health assessment packages covering all major organs and systems.",
    price: "From ₹999",
    details:
      "Comprehensive panel covering CBC, lipid profile, liver and kidney function, thyroid, blood sugar, ECG, and more.",
  },
  {
    icon: "💉",
    title: "Diabetes Testing",
    desc: "HbA1c, fasting glucose, and post-prandial testing for diabetes management.",
    price: "From ₹200",
    details:
      "HbA1c, fasting blood glucose, post-prandial glucose, insulin levels, and glucose tolerance tests.",
  },
  {
    icon: "🏠",
    title: "Home Sample Collection",
    desc: "Convenient and safe sample pickup by trained professionals — no lab visit needed.",
    price: "₹50 visit fee",
    details:
      "Available within city limits. A trained phlebotomist visits your home to collect samples for any test.",
  },
  {
    icon: "❤️",
    title: "ECG",
    desc: "Electrocardiogram to monitor heart rhythm, detect irregularities, and assess cardiac health.",
    price: "From ₹300",
    details:
      "12-lead ECG, Holter monitoring referrals, and stress ECG. Quick results with expert interpretation.",
  },
  {
    icon: "🩻",
    title: "X-Ray",
    desc: "Digital X-ray imaging for chest, joints, and orthopedic assessment with instant digital reports.",
    price: "From ₹400",
    details:
      "Chest X-ray, bone X-ray, abdominal X-ray. High-resolution digital images with radiologist reports.",
  },
  {
    icon: "🫀",
    title: "Liver Function Test",
    desc: "Comprehensive liver panel to assess liver health, enzyme levels, and metabolic function.",
    price: "From ₹350",
    details:
      "ALT, AST, bilirubin, alkaline phosphatase, albumin, and total protein to assess liver performance.",
  },
];

const testTypes = [
  "Blood Tests",
  "Urine Tests",
  "Full Body Checkup",
  "Diabetes Testing",
  "Home Sample Collection",
  "ECG",
  "X-Ray",
  "Liver Function Test",
];

const testimonials = [
  {
    name: "Ramesh P.",
    quote:
      "Very accurate results, got my full body checkup report within 4 hours. Highly recommended!",
    test: "Full Body Checkup",
    stars: 5,
  },
  {
    name: "Sunita D.",
    quote:
      "Home collection service was very convenient. Staff was polite and professional.",
    test: "Home Sample Collection",
    stars: 5,
  },
  {
    name: "Kiran M.",
    quote:
      "Reports are clear and detailed. Doctor appreciated the quality of the reports.",
    test: "Blood Tests",
    stars: 5,
  },
  {
    name: "Anjali R.",
    quote: "Affordable prices with top quality. Best lab in the area!",
    test: "Diabetes Testing",
    stars: 5,
  },
  {
    name: "Suresh K.",
    quote: "Quick appointment booking and fast report delivery via email.",
    test: "Urine Tests",
    stars: 5,
  },
  {
    name: "Meena V.",
    quote:
      "Very clean lab, friendly staff, and excellent service. Will visit again.",
    test: "Full Body Checkup",
    stars: 5,
  },
];

const faqs = [
  {
    q: "How do I book a test?",
    a: "You can book a test using our 'Book a Test' button on this website, or simply call us at 8341982306. Our team will confirm your appointment shortly.",
  },
  {
    q: "How long does it take to get results?",
    a: "Most reports are ready within 4–24 hours depending on the test type. Routine tests like CBC and urine analysis are typically available within 4–6 hours.",
  },
  {
    q: "Do you offer home sample collection?",
    a: "Yes! We offer home sample collection within city limits for a ₹50 visit fee. A trained phlebotomist will visit your location at your scheduled time.",
  },
  {
    q: "Is fasting required for blood tests?",
    a: "Some tests such as fasting glucose, lipid profile, and liver function tests require 8–12 hours of fasting. We will inform you about fasting requirements when you book.",
  },
  {
    q: "Are your reports accepted by all hospitals?",
    a: "Yes, our NABL-certified reports are widely accepted by all hospitals, clinics, and healthcare providers across the region.",
  },
  {
    q: "Can I get reports via WhatsApp or email?",
    a: "Absolutely! We send digital reports via email and WhatsApp for your convenience. Just provide your contact details when booking.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept cash, UPI (Google Pay, PhonePe, Paytm), and card payments for your convenience.",
  },
  {
    q: "Is there a senior citizen discount?",
    a: "Yes, we offer a 10% discount for senior citizens (patients above 60 years). Please carry a valid age proof document when visiting the lab.",
  },
];

// ── Navbar ─────────────────────────────────────────────────────────
interface NavbarProps {
  currentPage: Page;
  navSolid: boolean;
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
  onBookingClick: () => void;
}

function Navbar({
  currentPage,
  navSolid,
  onNavigate,
  onContactClick,
  onBookingClick,
}: NavbarProps) {
  const [navOpen, setNavOpen] = useState(false);

  const links: { label: string; page: Page | "contact" }[] = [
    { label: "Home", page: "home" },
    { label: "About", page: "about" },
    { label: "Services", page: "services" },
    { label: "Testimonials", page: "testimonials" },
    { label: "FAQ", page: "faq" },
    { label: "Contact", page: "contact" },
  ];

  function handleLink(page: Page | "contact") {
    setNavOpen(false);
    if (page === "contact") {
      onContactClick();
    } else {
      onNavigate(page);
    }
  }

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: "white",
        boxShadow: navSolid
          ? "0 2px 16px oklch(0.22 0.058 236 / 0.08)"
          : "0 1px 0 var(--med-card-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleLink("home")}
          className="flex items-center gap-2.5"
          data-ocid="nav.logo.button"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--med-navy)" }}
          >
            <MedCross className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span
              className="font-bold text-base block leading-tight"
              style={{
                color: "var(--med-navy)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.01em",
              }}
            >
              Vijaya Medical Lab
            </span>
            <span
              className="text-xs block"
              style={{
                color: "var(--med-body)",
                fontFamily: "var(--font-body)",
              }}
            >
              NABL Certified
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <button
              type="button"
              key={l.page}
              onClick={() => handleLink(l.page)}
              className={`nav-link-med text-sm ${
                l.page !== "contact" && currentPage === l.page ? "active" : ""
              }`}
              data-ocid={`nav.${l.page}.link`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBookingClick}
            className="hidden md:flex btn-primary text-sm"
            data-ocid="nav.book_test.button"
          >
            Book a Test
          </button>
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "var(--med-navy)" }}
            onClick={() => setNavOpen((p) => !p)}
            aria-label="Toggle menu"
            data-ocid="nav.hamburger.button"
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {navOpen && (
        <div
          className="lg:hidden px-6 py-4 flex flex-col gap-3"
          style={{
            background: "white",
            borderTop: "1px solid var(--med-card-border)",
          }}
        >
          {links.map((l) => (
            <button
              type="button"
              key={l.page}
              onClick={() => handleLink(l.page)}
              className={`text-left text-sm font-medium py-1 ${
                l.page !== "contact" && currentPage === l.page
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
              style={{
                color:
                  l.page !== "contact" && currentPage === l.page
                    ? "var(--med-blue)"
                    : "var(--med-navy)",
              }}
              data-ocid={`nav.mobile.${l.page}.link`}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setNavOpen(false);
              onBookingClick();
            }}
            className="btn-primary w-full justify-center mt-1"
            data-ocid="nav.mobile.book.button"
          >
            Book a Test
          </button>
        </div>
      )}
    </header>
  );
}

// ── Footer ─────────────────────────────────────────────────────────
interface FooterProps {
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
}

function Footer({ onNavigate, onContactClick }: FooterProps) {
  return (
    <footer
      className="pt-14 pb-6"
      style={{ background: "var(--med-navy-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(1 0 0 / 0.15)" }}
              >
                <MedCross className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-bold text-base text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Vijaya Medical Lab
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.75 0.02 220)" }}
            >
              Accurate and timely diagnostic services using advanced technology
              and expert professionals.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--med-blue-light)" }}
            >
              Pages
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", page: "home" as Page },
                { label: "About Us", page: "about" as Page },
                { label: "Our Services", page: "services" as Page },
                { label: "Testimonials", page: "testimonials" as Page },
                { label: "FAQ", page: "faq" as Page },
              ].map((l) => (
                <button
                  type="button"
                  key={l.page}
                  onClick={() => onNavigate(l.page)}
                  className="footer-link-med text-left text-sm"
                  data-ocid={`footer.${l.page}.link`}
                >
                  {l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={onContactClick}
                className="footer-link-med text-left text-sm"
                data-ocid="footer.contact.link"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--med-blue-light)" }}
            >
              Contact Info
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:8341982306"
                className="footer-link-med flex items-center gap-2 text-sm"
              >
                <Phone size={14} /> 8341982306
              </a>
              <a
                href="mailto:govardhan2306@gmail.com"
                className="footer-link-med flex items-center gap-2 text-sm"
              >
                <Mail size={14} /> govardhan2306@gmail.com
              </a>
              <p className="text-sm" style={{ color: "oklch(0.75 0.02 220)" }}>
                🕐 Mon–Sat: 7:00 AM – 8:00 PM
                <br />🕐 Sunday: 8:00 AM – 2:00 PM
              </p>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 0.1)",
            color: "oklch(0.6 0.015 220)",
          }}
        >
          <p>
            © {new Date().getFullYear()} Vijaya Medical Lab. All rights
            reserved.
          </p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--med-blue-light)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Page Hero Banner ───────────────────────────────────────────────
function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="page-hero">
      <div
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-5"
        style={{
          background: "oklch(1 0 0 / 0.12)",
          color: "var(--med-blue-light)",
          border: "1px solid oklch(1 0 0 / 0.2)",
        }}
      >
        <MedCross className="w-3 h-3" />
        Vijaya Medical Lab
      </div>
      <h1
        className="text-white font-bold mb-4"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "oklch(0.88 0.02 220)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Booking Page ───────────────────────────────────────────────────
function BookingPage({
  onBack,
  navSolid,
  onNavigate,
  onContactClick,
}: {
  onBack: () => void;
  navSolid: boolean;
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
}) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    test: "",
    date: "",
    notes: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.test) return;
    setStatus("loading");
    try {
      await actor!.submitBookTest(form.name, form.phone, form.test);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "var(--med-separator)" }}
    >
      <Navbar
        currentPage="booking"
        navSolid={navSolid}
        onNavigate={onNavigate}
        onContactClick={onContactClick}
        onBookingClick={() => {}}
      />

      <PageHero
        title="Book a Diagnostic Test"
        subtitle="Fill in the form below and our team will confirm your appointment shortly."
      />

      <div className="max-w-2xl mx-auto px-5 py-12">
        <div
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
          style={{ border: "1px solid var(--med-card-border)" }}
          data-ocid="booking.panel"
        >
          {status === "success" ? (
            <div className="text-center py-8" data-ocid="booking.success_state">
              <CheckCircle2
                size={52}
                className="mx-auto mb-4"
                style={{ color: "var(--med-blue)" }}
              />
              <h2
                className="font-bold text-xl mb-2"
                style={{ color: "var(--med-navy)" }}
              >
                Booking Confirmed!
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--med-body)" }}>
                Thank you, {form.name}! We&apos;ll contact you on {form.phone}{" "}
                shortly to confirm your appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      name: "",
                      phone: "",
                      test: "",
                      date: "",
                      notes: "",
                    });
                    setStatus("idle");
                  }}
                  className="btn-primary"
                  data-ocid="booking.secondary_button"
                >
                  Book Another
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="btn-secondary"
                  data-ocid="booking.cancel_button"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h2
                className="font-bold text-xl mb-1"
                style={{ color: "var(--med-navy)" }}
              >
                Appointment Details
              </h2>

              <div>
                <label
                  htmlFor="b-name"
                  className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "var(--med-navy)" }}
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="b-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="med-input"
                  data-ocid="booking.input"
                />
              </div>

              <div>
                <label
                  htmlFor="b-phone"
                  className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "var(--med-navy)" }}
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="b-phone"
                  type="tel"
                  placeholder="10-digit phone number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  className="med-input"
                  data-ocid="booking.input"
                />
              </div>

              <div>
                <label
                  htmlFor="b-test"
                  className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "var(--med-navy)" }}
                >
                  Test Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="b-test"
                  value={form.test}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, test: e.target.value }))
                  }
                  required
                  className="med-input"
                  data-ocid="booking.select"
                >
                  <option value="" disabled>
                    Select a test
                  </option>
                  {testTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="b-date"
                  className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "var(--med-navy)" }}
                >
                  Preferred Date
                </label>
                <input
                  id="b-date"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="med-input"
                  min={new Date().toISOString().split("T")[0]}
                  data-ocid="booking.input"
                />
              </div>

              <div>
                <label
                  htmlFor="b-notes"
                  className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "var(--med-navy)" }}
                >
                  Additional Notes
                  <span
                    className="ml-1.5 font-normal normal-case tracking-normal text-xs"
                    style={{ color: "var(--med-body)" }}
                  >
                    (optional)
                  </span>
                </label>
                <textarea
                  id="b-notes"
                  rows={3}
                  placeholder="Any special instructions or medical conditions..."
                  value={form.notes}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, notes: e.target.value }))
                  }
                  className="med-input resize-none"
                  data-ocid="booking.textarea"
                />
              </div>

              {status === "error" && (
                <p
                  className="text-sm text-red-500"
                  data-ocid="booking.error_state"
                >
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full justify-center mt-1"
                style={{ fontSize: "1rem", padding: "0.85rem 1.5rem" }}
                data-ocid="booking.submit_button"
              >
                {status === "loading"
                  ? "Confirming Booking..."
                  : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>

        <div
          className="mt-6 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm"
          style={{
            background: "var(--med-blue-pale)",
            border: "1px solid var(--med-card-border)",
          }}
        >
          <Phone
            size={16}
            style={{ color: "var(--med-blue)", flexShrink: 0 }}
          />
          <span style={{ color: "var(--med-navy)" }}>
            Need help?{" "}
            <a
              href="tel:8341982306"
              className="font-semibold hover:underline"
              style={{ color: "var(--med-blue)" }}
            >
              Call 8341982306
            </a>
            {" or email "}
            <a
              href="mailto:govardhan2306@gmail.com"
              className="font-semibold hover:underline"
              style={{ color: "var(--med-blue)" }}
            >
              govardhan2306@gmail.com
            </a>
          </span>
        </div>
      </div>

      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </div>
  );
}

// ── About Page ─────────────────────────────────────────────────────
function AboutPage({
  navSolid,
  onNavigate,
  onContactClick,
  onBookingClick,
}: {
  navSolid: boolean;
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
  onBookingClick: () => void;
}) {
  const statsRef = useChildReveal();
  const teamRef = useChildReveal();
  const highlightsRef = useChildReveal();

  return (
    <div className="min-h-screen" style={{ background: "var(--med-bg)" }}>
      <Navbar
        currentPage="about"
        navSolid={navSolid}
        onNavigate={onNavigate}
        onContactClick={onContactClick}
        onBookingClick={onBookingClick}
      />

      <PageHero
        title="About Vijaya Medical Lab"
        subtitle="Trusted diagnostics for over a decade — combining advanced technology with compassionate care."
      />

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--med-blue)" }}
          >
            Our Story
          </p>
          <h2
            className="font-bold mb-6"
            style={{
              fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
              color: "var(--med-navy)",
            }}
          >
            A Mission Built on Trust
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{
              color: "var(--med-body)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Founded with a mission to bring accurate, affordable diagnostics to
            every family, Vijaya Medical Lab combines modern technology with
            compassionate care. Since our founding, we have served thousands of
            patients with precision, integrity, and dedication — because your
            health is our highest priority.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: "var(--med-navy)" }}>
        <div ref={statsRef} className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10,000+", label: "Tests Conducted" },
              { value: "15+", label: "Years Experience" },
              { value: "50+", label: "Diagnostic Services" },
              { value: "NABL", label: "Certified Lab" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card reveal"
                data-reveal-child
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-ocid={`about.stat.${i + 1}`}
              >
                <p
                  className="font-bold mb-1"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                    color: "var(--med-blue-light)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.78 0.025 220)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--med-blue)" }}
            >
              Our Experts
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
                color: "var(--med-navy)",
              }}
            >
              Meet the Team
            </h2>
          </div>
          <div ref={teamRef} className="grid sm:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Ravi Kumar",
                role: "Chief Pathologist",
                bio: "MBBS, MD Pathology. 18+ years of experience in clinical pathology and hematology.",
                initials: "RK",
              },
              {
                name: "Dr. Priya Sharma",
                role: "Hematologist",
                bio: "DM Hematology specialist with expertise in complex blood disorders and coagulation studies.",
                initials: "PS",
              },
              {
                name: "Mr. Govardhan",
                role: "Lab Director",
                bio: "MSc Medical Lab Technology. Oversees quality control, accreditation, and lab operations.",
                initials: "GV",
              },
            ].map((member, i) => (
              <div
                key={member.name}
                className="text-center reveal service-card"
                data-reveal-child
                style={{ transitionDelay: `${i * 0.12}s` }}
                data-ocid={`about.team.${i + 1}`}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
                  style={{
                    background: "var(--med-navy)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {member.initials}
                </div>
                <h3
                  className="font-bold text-base mb-1"
                  style={{ color: "var(--med-navy)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "var(--med-blue)" }}
                >
                  {member.role}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--med-body)" }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20" style={{ background: "var(--med-separator)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
                color: "var(--med-navy)",
              }}
            >
              Why Choose Us
            </h2>
          </div>
          <div ref={highlightsRef} className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <FlaskConical size={28} />,
                title: "State-of-the-Art Equipment",
                desc: "Fully automated analyzers and cutting-edge diagnostic instruments ensure precise, reproducible results every time.",
              },
              {
                icon: <Award size={28} />,
                title: "ISO Certified Processes",
                desc: "Our lab follows strict quality management systems, NABL accreditation standards, and ISO 15189 certification protocols.",
              },
              {
                icon: <Clock size={28} />,
                title: "24-Hour Report Delivery",
                desc: "Routine reports within 4–6 hours, complex tests within 24 hours. Digital delivery via email and WhatsApp.",
              },
            ].map((h, i) => (
              <div
                key={h.title}
                className="service-card reveal text-center"
                data-reveal-child
                style={{ transitionDelay: `${i * 0.12}s` }}
                data-ocid={`about.highlight.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "var(--med-blue-pale)",
                    color: "var(--med-blue)",
                  }}
                >
                  {h.icon}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "var(--med-navy)" }}
                >
                  {h.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--med-body)" }}
                >
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </div>
  );
}

// ── Services Page ──────────────────────────────────────────────────
function ServicesPage({
  navSolid,
  onNavigate,
  onContactClick,
  onBookingClick,
}: {
  navSolid: boolean;
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
  onBookingClick: () => void;
}) {
  const cardsRef = useChildReveal();

  return (
    <div className="min-h-screen" style={{ background: "var(--med-bg)" }}>
      <Navbar
        currentPage="services"
        navSolid={navSolid}
        onNavigate={onNavigate}
        onContactClick={onContactClick}
        onBookingClick={onBookingClick}
      />

      <PageHero
        title="Our Diagnostic Services"
        subtitle="Comprehensive testing solutions with accurate results and fast turnaround — all under one roof."
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="reveal service-card flex flex-col"
                data-reveal-child
                style={{ transitionDelay: `${i * 0.07}s` }}
                data-ocid={`services.item.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
                  style={{ background: "var(--med-blue-pale)" }}
                >
                  {svc.icon}
                </div>
                <h3
                  className="font-bold text-base mb-1"
                  style={{ color: "var(--med-navy)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--med-blue)" }}
                >
                  {svc.price}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: "var(--med-body)" }}
                >
                  {svc.details}
                </p>
                <button
                  type="button"
                  onClick={onBookingClick}
                  className="btn-primary w-full justify-center text-sm mt-auto"
                  data-ocid={`services.book.${i + 1}`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-16 text-center"
        style={{ background: "var(--med-navy)" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <HeartPulse
            size={40}
            className="mx-auto mb-4"
            style={{ color: "var(--med-blue-light)" }}
          />
          <h2
            className="text-white font-bold mb-3"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            Not sure which test you need?
          </h2>
          <p className="mb-6" style={{ color: "oklch(0.85 0.025 220)" }}>
            Our experts will guide you to the right tests for your health needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:8341982306"
              className="btn-primary"
              style={{
                background: "white",
                color: "var(--med-navy)",
                border: "2px solid white",
              }}
              data-ocid="services.cta.button"
            >
              <Phone size={16} /> Call 8341982306
            </a>
            <button
              type="button"
              onClick={onBookingClick}
              className="btn-secondary"
              style={{
                border: "2px solid var(--med-blue-light)",
                color: "var(--med-blue-light)",
              }}
              data-ocid="services.book_primary.button"
            >
              Book a Test Online
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </div>
  );
}

// ── Testimonials Page ──────────────────────────────────────────────
function TestimonialsPage({
  navSolid,
  onNavigate,
  onContactClick,
  onBookingClick,
}: {
  navSolid: boolean;
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
  onBookingClick: () => void;
}) {
  const cardsRef = useChildReveal();

  return (
    <div className="min-h-screen" style={{ background: "var(--med-bg)" }}>
      <Navbar
        currentPage="testimonials"
        navSolid={navSolid}
        onNavigate={onNavigate}
        onContactClick={onContactClick}
        onBookingClick={onBookingClick}
      />

      <PageHero
        title="What Our Patients Say"
        subtitle="Real experiences from real patients. We're proud to have served thousands of families."
      />

      {/* Rating Banner */}
      <div
        className="py-8 text-center"
        style={{
          background: "var(--med-blue-pale)",
          borderBottom: "1px solid var(--med-card-border)",
        }}
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={20}
                className="fill-current"
                style={{ color: "oklch(0.72 0.16 65)" }}
              />
            ))}
          </div>
          <span
            className="font-bold text-lg"
            style={{
              color: "var(--med-navy)",
              fontFamily: "var(--font-heading)",
            }}
          >
            4.9/5 Average Rating
          </span>
          <span style={{ color: "var(--med-body)" }}>·</span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--med-body)" }}
          >
            500+ Happy Patients
          </span>
        </div>
      </div>

      {/* Reviews Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="review-card reveal"
                data-reveal-child
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <StarRating count={t.stars} />
                <p
                  className="mt-4 mb-5 text-sm leading-relaxed italic"
                  style={{ color: "var(--med-body)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{
                      background: "var(--med-navy)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--med-navy)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--med-blue)" }}>
                      {t.test}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-center"
        style={{ background: "var(--med-navy)" }}
      >
        <div className="max-w-xl mx-auto px-6">
          <h2
            className="text-white font-bold mb-3"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            Join Our Happy Patients
          </h2>
          <p className="mb-6" style={{ color: "oklch(0.85 0.025 220)" }}>
            Book your test today and experience the Vijaya Medical Lab
            difference.
          </p>
          <button
            type="button"
            onClick={onBookingClick}
            className="btn-primary"
            style={{
              background: "white",
              color: "var(--med-navy)",
              border: "2px solid white",
            }}
            data-ocid="testimonials.book.button"
          >
            Book a Test
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </div>
  );
}

// ── FAQ Page ───────────────────────────────────────────────────────
function FAQPage({
  navSolid,
  onNavigate,
  onContactClick,
  onBookingClick,
}: {
  navSolid: boolean;
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
  onBookingClick: () => void;
}) {
  const sectionRef = useScrollReveal();

  return (
    <div className="min-h-screen" style={{ background: "var(--med-bg)" }}>
      <Navbar
        currentPage="faq"
        navSolid={navSolid}
        onNavigate={onNavigate}
        onContactClick={onContactClick}
        onBookingClick={onBookingClick}
      />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our services, reports, and booking process."
      />

      <section className="py-20">
        <div ref={sectionRef} className="reveal max-w-3xl mx-auto px-6">
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-3"
            data-ocid="faq.panel"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="bg-white rounded-xl border px-6"
                style={{ borderColor: "var(--med-card-border)" }}
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger
                  className="text-sm font-semibold text-left py-4 hover:no-underline"
                  style={{
                    color: "var(--med-navy)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm pb-4 leading-relaxed"
                  style={{ color: "var(--med-body)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still need help */}
          <div
            className="mt-12 rounded-2xl p-8 text-center"
            style={{
              background: "var(--med-blue-pale)",
              border: "1px solid var(--med-card-border)",
            }}
          >
            <MessageCircle
              size={36}
              className="mx-auto mb-3"
              style={{ color: "var(--med-blue)" }}
            />
            <h3
              className="font-bold text-lg mb-2"
              style={{ color: "var(--med-navy)" }}
            >
              Still have questions?
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--med-body)" }}>
              Our team is ready to help. Call or email us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:8341982306"
                className="btn-primary"
                data-ocid="faq.call.button"
              >
                <Phone size={15} /> Call 8341982306
              </a>
              <button
                type="button"
                onClick={onBookingClick}
                className="btn-secondary"
                data-ocid="faq.book.button"
              >
                Book a Test
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </div>
  );
}

// ── Home Page ──────────────────────────────────────────────────────
function HomePage({
  navSolid,
  onNavigate,
  onContactClick,
  onBookingClick,
  actor,
}: {
  navSolid: boolean;
  onNavigate: (page: Page) => void;
  onContactClick: () => void;
  onBookingClick: () => void;
  actor: ReturnType<typeof useActor>["actor"];
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatMode, setChatMode] = useState<"options" | "typing" | "answer">(
    "options",
  );
  const [userQuery, setUserQuery] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [contactState, setContactState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const aboutRef = useScrollReveal();
  const servicesRef = useChildReveal();
  const contactRef = useScrollReveal();

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) return;
    setContactState("loading");
    try {
      await actor!.submitContact(
        contactForm.name,
        contactForm.phone,
        contactForm.message,
      );
      setContactState("success");
      setContactForm({ name: "", phone: "", message: "" });
    } catch {
      setContactState("error");
    }
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "8341982306",
      href: "tel:8341982306",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "govardhan2306@gmail.com",
      href: "mailto:govardhan2306@gmail.com",
    },
    {
      icon: <Clock size={20} />,
      label: "Hours",
      value: "Mon–Sat 7AM–8PM, Sun 8AM–2PM",
      href: null,
    },
  ];

  return (
    <div className="bg-med-bg min-h-screen">
      <Navbar
        currentPage="home"
        navSolid={navSolid}
        onNavigate={onNavigate}
        onContactClick={onContactClick}
        onBookingClick={onBookingClick}
      />

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('/assets/generated/vijaya-lab-hero.dim_1400x600.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.15 0.06 236 / 0.7) 0%, oklch(0.22 0.058 236 / 0.85) 100%)",
          }}
        />
        <div
          className="absolute right-10 top-1/3 -translate-y-1/2 z-10 float-anim opacity-20 hidden lg:block"
          style={{
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            border: "1px solid var(--med-blue-light)",
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="max-w-2xl">
            <p
              className="hero-line-1 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6"
              style={{
                background: "oklch(1 0 0 / 0.12)",
                color: "var(--med-blue-light)",
                border: "1px solid oklch(1 0 0 / 0.2)",
              }}
            >
              <MedCross className="w-3 h-3" />
              Trusted Diagnostic Center
            </p>
            <h1
              className="hero-line-2 text-white font-bold mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
              }}
            >
              Accurate Diagnostics.
              <br />
              <span style={{ color: "var(--med-blue-light)" }}>
                Trusted Care.
              </span>
            </h1>
            <p
              className="hero-line-3 text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "oklch(0.88 0.02 220)" }}
            >
              Reliable lab testing with fast and precise results. Advanced
              technology. Expert professionals. Your health, our priority.
            </p>
            <div className="hero-line-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onBookingClick}
                className="btn-primary"
                style={{
                  background: "white",
                  color: "var(--med-navy)",
                  border: "2px solid white",
                }}
                data-ocid="hero.book_test.button"
              >
                Book a Test
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="btn-secondary"
                style={{
                  background: "transparent",
                  border: "2px solid var(--med-blue-light)",
                  color: "var(--med-blue-light)",
                }}
                data-ocid="hero.contact.button"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section id="about" className="py-24 bg-white">
        <div ref={aboutRef} className="reveal max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/assets/generated/vijaya-lab-about.dim_800x600.jpg"
                alt="Vijaya Medical Lab diagnostic center"
                className="w-full h-72 md:h-96 object-cover img-zoom"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--med-navy) 0%, transparent 55%)",
                  opacity: 0.5,
                }}
              />
              <div className="absolute bottom-6 left-6">
                <p
                  className="text-white font-bold text-3xl"
                  style={{
                    fontFamily: "var(--font-heading)",
                    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  Est. 2015
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "var(--med-blue-light)" }}
                >
                  A decade of trusted diagnostics
                </p>
              </div>
            </div>

            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--med-blue)" }}
              >
                About Us
              </p>
              <h2
                className="font-bold mb-5"
                style={{
                  fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
                  color: "var(--med-navy)",
                }}
              >
                Your Health, Our Mission
              </h2>
              <p
                className="text-sm leading-relaxed mb-7"
                style={{ color: "var(--med-body)" }}
              >
                Vijaya Medical Lab provides accurate and timely diagnostic
                services using advanced technology and expert professionals. We
                are committed to delivering precision, speed, and care to every
                patient.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  {
                    icon: <Shield size={18} />,
                    label: "NABL Certified Lab",
                    desc: "Internationally accredited quality standards",
                  },
                  {
                    icon: <Users size={18} />,
                    label: "Experienced Staff",
                    desc: "Qualified pathologists and trained technicians",
                  },
                  {
                    icon: <Zap size={18} />,
                    label: "Fast Reports",
                    desc: "Most results within 4–24 hours",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "var(--med-blue-pale)",
                        color: "var(--med-blue)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--med-navy)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--med-body)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onNavigate("about")}
                className="btn-secondary"
                data-ocid="about.learn_more.button"
              >
                Learn More About Us <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SNIPPET ── */}
      <section
        id="services"
        className="py-24"
        style={{ background: "var(--med-separator)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--med-blue)" }}
            >
              What We Offer
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                color: "var(--med-navy)",
              }}
            >
              Our Services
            </h2>
            <p
              className="mt-3 max-w-lg mx-auto text-sm"
              style={{ color: "var(--med-body)" }}
            >
              Comprehensive diagnostic services to support your health journey
            </p>
          </div>

          <div
            ref={servicesRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.slice(0, 5).map((svc, i) => (
              <div
                key={svc.title}
                className="reveal service-card"
                data-reveal-child
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-ocid={`home.services.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4"
                  style={{ background: "var(--med-blue-pale)" }}
                >
                  {svc.icon}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "var(--med-navy)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--med-body)" }}
                >
                  {svc.desc}
                </p>
                <button
                  type="button"
                  onClick={onBookingClick}
                  className="book-link text-sm font-semibold flex items-center gap-1"
                  data-ocid={`home.services.book.${i + 1}`}
                >
                  Book Now →
                </button>
              </div>
            ))}
            {/* View All card */}
            <button
              type="button"
              className="service-card flex flex-col items-center justify-center text-center gap-4 cursor-pointer w-full"
              onClick={() => onNavigate("services")}
              data-ocid="home.services.view_all.button"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "var(--med-navy)", color: "white" }}
              >
                <ChevronRight size={22} />
              </div>
              <div>
                <p
                  className="font-bold text-base"
                  style={{ color: "var(--med-navy)" }}
                >
                  View All Services
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--med-body)" }}
                >
                  8 services available
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SNIPPET ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--med-blue)" }}
            >
              Patient Reviews
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                color: "var(--med-navy)",
              }}
            >
              What Patients Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={t.name}
                className="review-card"
                data-ocid={`home.reviews.item.${i + 1}`}
              >
                <StarRating count={t.stars} />
                <p
                  className="mt-3 mb-4 text-sm leading-relaxed italic"
                  style={{ color: "var(--med-body)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{
                      background: "var(--med-navy)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--med-navy)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--med-blue)" }}>
                      {t.test}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => onNavigate("testimonials")}
              className="btn-secondary"
              data-ocid="home.reviews.all.button"
            >
              Read All Reviews <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-24"
        style={{ background: "var(--med-separator)" }}
      >
        <div ref={contactRef} className="reveal max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--med-blue)" }}
            >
              Reach Out
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                color: "var(--med-navy)",
              }}
            >
              Get in Touch
            </h2>
            <p
              className="mt-3 max-w-md mx-auto text-sm"
              style={{ color: "var(--med-body)" }}
            >
              Have questions? We&apos;re here to help. Send us a message or call
              us directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div
              className="bg-white rounded-2xl p-8 shadow-sm"
              style={{ border: "1px solid var(--med-card-border)" }}
            >
              {contactState === "success" ? (
                <div
                  className="text-center py-8"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2
                    size={48}
                    className="mx-auto mb-3"
                    style={{ color: "var(--med-blue)" }}
                  />
                  <h4
                    className="font-bold text-lg mb-1"
                    style={{ color: "var(--med-navy)" }}
                  >
                    Message Sent!
                  </h4>
                  <p
                    className="text-sm mb-5"
                    style={{ color: "var(--med-body)" }}
                  >
                    We&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactState("idle")}
                    className="btn-primary"
                    data-ocid="contact.cancel_button"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleContact}
                  className="flex flex-col gap-4"
                  data-ocid="contact.modal"
                >
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "var(--med-navy)" }}
                  >
                    Send a Message
                  </h3>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "var(--med-navy)" }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="med-input"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "var(--med-navy)" }}
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="10-digit phone number"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                      className="med-input"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-msg"
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "var(--med-navy)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-msg"
                      placeholder="How can we help you?"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      required
                      className="med-input resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>
                  {contactState === "error" && (
                    <p
                      className="text-sm text-red-500"
                      data-ocid="contact.error_state"
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={contactState === "loading"}
                    className="btn-primary w-full justify-center"
                    data-ocid="contact.submit_button"
                  >
                    {contactState === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div
              className="rounded-2xl p-8 flex flex-col justify-between"
              style={{ background: "var(--med-navy)" }}
            >
              <div>
                <h3 className="font-bold text-xl text-white mb-6">
                  Contact Information
                </h3>
                <div className="flex flex-col gap-6">
                  {contactInfo.map((c) => (
                    <div key={c.label} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "oklch(1 0 0 / 0.1)",
                          color: "var(--med-blue-light)",
                        }}
                      >
                        {c.icon}
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wide mb-1"
                          style={{ color: "var(--med-blue-light)" }}
                        >
                          {c.label}
                        </p>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="text-white font-medium hover:underline text-sm"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium text-sm">
                            {c.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="mt-8 pt-6"
                style={{ borderTop: "1px solid oklch(1 0 0 / 0.15)" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.88 0.02 220)" }}
                >
                  🕐 Mon – Sat: 7:00 AM – 8:00 PM
                  <br />🕐 Sunday: 8:00 AM – 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />

      {/* ── CHATBOT WIDGET ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div
          className={`chat-panel bg-white rounded-2xl shadow-2xl w-80 overflow-hidden ${
            chatOpen ? "open" : "closed"
          }`}
          style={{
            border: "1px solid var(--med-card-border)",
            maxHeight: "440px",
          }}
          data-ocid="chatbot.panel"
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: "var(--med-navy)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "oklch(1 0 0 / 0.2)" }}
              >
                <MedCross className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  Vijaya Medical Lab
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--med-blue-light)" }}
                >
                  Support Assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
              data-ocid="chatbot.close_button"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5">
            <div
              className="rounded-xl px-4 py-3 mb-4 text-sm"
              style={{
                background: "var(--med-blue-pale)",
                color: "var(--med-navy)",
              }}
            >
              Hi! How can I help you today? 👋
            </div>

            {chatMode === "options" && !chatMsg && (
              <div className="flex flex-col gap-2">
                {[
                  { label: "📋 Book a Test", action: "book" },
                  { label: "📄 Check Reports", action: "reports" },
                  { label: "📞 Contact Lab", action: "contact" },
                  { label: "💬 Ask a Question", action: "ask" },
                ].map((opt) => (
                  <button
                    key={opt.action}
                    type="button"
                    onClick={() => {
                      if (opt.action === "book") {
                        setChatOpen(false);
                        onBookingClick();
                      } else if (opt.action === "contact") {
                        setChatOpen(false);
                        scrollToSection("contact");
                      } else if (opt.action === "ask") {
                        setChatMode("typing");
                      } else {
                        setChatMsg(
                          "Please call 8341982306 or email govardhan2306@gmail.com to check your reports.",
                        );
                      }
                    }}
                    className="chat-opt-btn w-full text-left text-sm px-4 py-2.5 rounded-lg font-medium"
                    data-ocid={`chatbot.${opt.action}.button`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {chatMsg && (
              <div className="flex flex-col gap-3">
                <div
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: "var(--med-blue-pale)",
                    color: "var(--med-navy)",
                  }}
                >
                  {chatMsg}
                </div>
                <button
                  type="button"
                  onClick={() => setChatMsg("")}
                  className="chat-opt-btn text-sm px-4 py-2.5 rounded-lg font-medium"
                  data-ocid="chatbot.back.button"
                >
                  ← Back
                </button>
              </div>
            )}

            {chatMode === "typing" && (
              <div className="flex flex-col gap-3">
                <p className="text-sm" style={{ color: "var(--med-navy)" }}>
                  What would you like to know?
                </p>
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && userQuery.trim()) {
                      const q = userQuery.toLowerCase();
                      let answer =
                        "Thank you for your query! Please call us at 8341982306 or email govardhan2306@gmail.com and our team will assist you.";
                      if (/timing|time|hours|open/.test(q))
                        answer =
                          "We are open Monday to Saturday, 7:00 AM – 9:00 PM and Sunday 8:00 AM – 2:00 PM.";
                      else if (/price|cost|fee|charge|rate/.test(q))
                        answer =
                          "Test prices vary. Please call 8341982306 or visit our Services page for detailed pricing.";
                      else if (/report|result|ready|when/.test(q))
                        answer =
                          "Most reports are ready within 24 hours. Call 8341982306 or email govardhan2306@gmail.com to check.";
                      else if (/book|appointment|test|sample/.test(q))
                        answer =
                          "You can book a test online using the 'Book a Test' button, or call us at 8341982306.";
                      else if (/location|address|where|place/.test(q))
                        answer =
                          "Please contact us at 8341982306 or govardhan2306@gmail.com for our location details.";
                      else if (/doctor|specialist|staff/.test(q))
                        answer =
                          "Our qualified medical team is here to help. Contact us at 8341982306 for specialist queries.";
                      setChatAnswer(answer);
                      setChatMode("answer");
                    }
                  }}
                  placeholder="Type your question..."
                  className="w-full text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--med-blue)",
                    color: "var(--med-navy)",
                    fontFamily: "Inter, sans-serif",
                  }}
                  data-ocid="chatbot.query.input"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const q = userQuery.toLowerCase();
                      if (!userQuery.trim()) return;
                      let answer =
                        "Thank you for your query! Please call us at 8341982306 or email govardhan2306@gmail.com and our team will assist you.";
                      if (/timing|time|hours|open/.test(q))
                        answer =
                          "We are open Monday to Saturday, 7:00 AM – 9:00 PM and Sunday 8:00 AM – 2:00 PM.";
                      else if (/price|cost|fee|charge|rate/.test(q))
                        answer =
                          "Test prices vary. Please call 8341982306 or visit our Services page for detailed pricing.";
                      else if (/report|result|ready|when/.test(q))
                        answer =
                          "Most reports are ready within 24 hours. Call 8341982306 or email govardhan2306@gmail.com to check.";
                      else if (/book|appointment|test|sample/.test(q))
                        answer =
                          "You can book a test online using the 'Book a Test' button, or call us at 8341982306.";
                      else if (/location|address|where|place/.test(q))
                        answer =
                          "Please contact us at 8341982306 or govardhan2306@gmail.com for our location details.";
                      else if (/doctor|specialist|staff/.test(q))
                        answer =
                          "Our qualified medical team is here to help. Contact us at 8341982306 for specialist queries.";
                      setChatAnswer(answer);
                      setChatMode("answer");
                    }}
                    className="flex-1 text-sm px-4 py-2 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--med-navy)" }}
                    data-ocid="chatbot.send.button"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChatMode("options");
                      setUserQuery("");
                    }}
                    className="chat-opt-btn text-sm px-4 py-2 rounded-lg font-medium"
                    data-ocid="chatbot.back.button"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )}

            {chatMode === "answer" && (
              <div className="flex flex-col gap-3">
                <div
                  className="rounded-xl px-4 py-3 text-sm italic"
                  style={{
                    background: "#f0f4ff",
                    color: "var(--med-navy)",
                    borderLeft: "3px solid var(--med-blue)",
                  }}
                >
                  <span className="font-medium not-italic block mb-1 text-xs uppercase tracking-wide opacity-60">
                    Your question
                  </span>
                  {userQuery}
                </div>
                <div
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: "var(--med-blue-pale)",
                    color: "var(--med-navy)",
                  }}
                >
                  {chatAnswer}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setChatMode("options");
                    setUserQuery("");
                    setChatAnswer("");
                  }}
                  className="chat-opt-btn text-sm px-4 py-2.5 rounded-lg font-medium"
                  data-ocid="chatbot.back.button"
                >
                  ← Back to Menu
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setChatOpen((p) => !p);
            setChatMsg("");
            setChatMode("options");
            setUserQuery("");
            setChatAnswer("");
          }}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: "var(--med-navy)", color: "white" }}
          aria-label="Open chat support"
          data-ocid="chatbot.open_modal_button"
        >
          {chatOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>
    </div>
  );
}

// ── App Root ───────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [navSolid, setNavSolid] = useState(false);
  const { actor } = useActor();

  useEffect(() => {
    document.title = "Vijaya Medical Lab | Accurate Diagnostics. Trusted Care.";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      "description",
      "Vijaya Medical Lab provides accurate and timely diagnostic services. Book blood tests, full body checkups, diabetes testing, and home sample collection.",
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToBooking() {
    navigate("booking");
  }

  function goToContact() {
    if (currentPage === "home") {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("home");
      setTimeout(() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }

  const sharedProps = {
    navSolid,
    onNavigate: navigate,
    onContactClick: goToContact,
    onBookingClick: goToBooking,
  };

  if (currentPage === "booking") {
    return <BookingPage onBack={() => navigate("home")} {...sharedProps} />;
  }
  if (currentPage === "about") {
    return <AboutPage {...sharedProps} />;
  }
  if (currentPage === "services") {
    return <ServicesPage {...sharedProps} />;
  }
  if (currentPage === "testimonials") {
    return <TestimonialsPage {...sharedProps} />;
  }
  if (currentPage === "faq") {
    return <FAQPage {...sharedProps} />;
  }

  return (
    <HomePage
      navSolid={navSolid}
      onNavigate={navigate}
      onContactClick={goToContact}
      onBookingClick={goToBooking}
      actor={actor}
    />
  );
}
