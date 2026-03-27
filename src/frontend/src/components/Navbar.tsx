import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
      data-ocid="nav.panel"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-1">
          <span className="font-heading font-bold text-2xl text-white tracking-tight">
            Dripszy
          </span>
          <span className="w-2 h-2 rounded-full bg-primary glow-blue-sm mb-3 inline-block" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-[#A0A0A0] hover:text-white transition-colors font-medium"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="hidden md:flex">
          <a
            href="https://wa.me/918341982306"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-primary hover:bg-primary/90 text-white glow-blue-sm font-semibold px-5"
              data-ocid="nav.primary_button"
            >
              Book a Call
            </Button>
          </a>
        </div>
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 border-b border-white/5 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-[#A0A0A0] hover:text-white transition-colors py-2 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://wa.me/918341982306"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-primary text-white glow-blue-sm mt-2">
              Book a Call
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
