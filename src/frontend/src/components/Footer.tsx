import { useNavigate } from "@tanstack/react-router";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="font-heading font-bold text-2xl text-white">
                Dripszy
              </span>
              <span className="w-2 h-2 rounded-full bg-primary glow-blue-sm mb-3 inline-block" />
            </div>
            <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-xs">
              We build intelligent AI systems that grow your business while you
              sleep. Automation. Results. Scale.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "#services",
                "#portfolio",
                "#process",
                "#pricing",
                "#contact",
              ].map((href) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector(href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-[#A0A0A0] hover:text-primary transition-colors capitalize"
                    data-ocid="footer.link"
                  >
                    {href.replace("#", "")}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#111111] border border-white/10 flex items-center justify-center text-[#A0A0A0] hover:text-primary hover:border-primary/40 transition-all"
                data-ocid="footer.link"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#111111] border border-white/10 flex items-center justify-center text-[#A0A0A0] hover:text-primary hover:border-primary/40 transition-all"
                data-ocid="footer.link"
              >
                <SiLinkedin size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#111111] border border-white/10 flex items-center justify-center text-[#A0A0A0] hover:text-primary hover:border-primary/40 transition-all"
                data-ocid="footer.link"
              >
                <SiX size={16} />
              </a>
            </div>
            <p className="text-[#A0A0A0] text-xs">
              govardhan2306@gmail.com
              <br />
              +91 8341982306
            </p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-sm">
            © {year} Dripszy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#555] text-sm">
            <button
              type="button"
              onClick={() => navigate({ to: "/admin" })}
              className="hover:text-primary transition-colors"
              data-ocid="footer.link"
            >
              Admin Login
            </button>
            <span>·</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
