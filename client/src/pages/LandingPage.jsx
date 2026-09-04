import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Benefits from "../components/landing/Benefits";
import About from "../components/landing/About";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";


    const LandingPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950">

      <Navbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <About />
        <Contact />
        <Footer />
      </main>
      
      

    </div>
  );
};

export default LandingPage;