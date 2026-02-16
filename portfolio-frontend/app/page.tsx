import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ROICalculator from "@/components/ROICalculator";
import SkillsSnapshot from "@/components/SkillsSnapshot";

export default function Home() {
  return (
    <div className="bg-brand-bg text-brand-charcoal" id="top">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsSnapshot />
        <CaseStudies />
        <ROICalculator />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
