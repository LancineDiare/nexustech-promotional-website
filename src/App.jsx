// Import the reusable website components.
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductShowcase from "./components/ProductShowcase";

// App controls the order of the website sections.
function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <ProductShowcase />
      </main>
    </>
  );
}

export default App;