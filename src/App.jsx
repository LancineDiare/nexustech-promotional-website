import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductShowcase from "./components/ProductShowcase";
import InteractiveROICalculator from "./components/InteractiveROICalculator";
import ModuleConfigurator from "./components/ModuleConfigurator";

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
      </main>
    </>
  );
}

export default App;