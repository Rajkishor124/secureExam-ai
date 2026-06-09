import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";
import StatsSection from "../components/home/StatsSection";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen">

      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <HowItWorks />

      <StatsSection />

      <Footer />

    </div>
  );
}

export default Home;