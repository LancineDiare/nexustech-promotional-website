import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductShowcase from "./components/ProductShowcase";
import InteractiveROICalculator from "./components/InteractiveROICalculator";
import ModuleConfigurator from "./components/ModuleConfigurator";
import FeatureComparisonMatrix from "./components/FeatureComparisonMatrix";

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
      </main>
    </>
  );
}

export default App;