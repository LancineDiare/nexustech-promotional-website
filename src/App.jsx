import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductShowcase from "./components/ProductShowcase";
import InteractiveROICalculator from "./components/InteractiveROICalculator";

// App determines the order of the promotional website sections.
function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <ProductShowcase />
        <InteractiveROICalculator />
      </main>
    </>
  );
}

export default App;