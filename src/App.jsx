// Import the reusable page components.
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

// App controls the main structure of the website.
function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
      </main>
    </>
  );
}

export default App;