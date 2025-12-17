import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarketContext from "@/components/MarketContext";
import FounderPath from "@/components/FounderPath";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import Accelerators from "@/components/Accelerators";
import Community from "@/components/Community";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import FounderProfile from "@/components/FounderProfile";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <MarketContext />
        <section id="trilha">
          <FounderPath />
        </section>
        <section id="arsenal">
          <TechnicalArsenal />
        </section>
        <Accelerators />
        <section id="comunidade">
          <Community />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <FinalCTA />
        <FounderProfile />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
