import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductShowcase from "./components/ProductShowcase";
import InteractiveROICalculator from "./components/InteractiveROICalculator";
import ModuleConfigurator from "./components/ModuleConfigurator";
import FeatureComparisonMatrix from "./components/FeatureComparisonMatrix";
import ClientProofCarousel from "./components/ClientProofCarousel";
import SandboxAccess from "./components/SandboxAccess";

// App determines the order of the promotional website sections.
function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <ProductShowcase />
        <InteractiveROICalculator />
        <ModuleConfigurator />
        <FeatureComparisonMatrix />
        <ClientProofCarousel />
        <SandboxAccess />
      </main>
    </>
  );
}

export default App;