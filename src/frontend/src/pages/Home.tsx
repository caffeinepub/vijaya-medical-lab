import Contact from "../components/Contact";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Pricing from "../components/Pricing";
import ProblemSolution from "../components/ProblemSolution";
import Process from "../components/Process";
import Results from "../components/Results";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Services />
      <Portfolio />
      <Results />
      <Process />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
