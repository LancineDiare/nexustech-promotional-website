import { useState } from "react";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductShowcase from "./components/ProductShowcase";
import InteractiveROICalculator from "./components/InteractiveROICalculator";
import ModuleConfigurator from "./components/ModuleConfigurator";
import FeatureComparisonMatrix from "./components/FeatureComparisonMatrix";
import ClientProofCarousel from "./components/ClientProofCarousel";
import ProposalGenerator from "./components/ProposalGenerator";
import SandboxAccess from "./components/SandboxAccess";
import StickyConfiguratorBar from "./components/StickyConfiguratorBar";

// Default configuration used when the website first loads.
const initialConfiguration = {
  planId: "growth",
  planName: "Growth",
  planPrice: 18000,
  modules: [
    {
      id: "biometric",
      name: "Biometric Sync",
      price: 4500,
    },
    {
      id: "analytics",
      name: "Advanced Analytics",
      price: 5500,
    },
  ],
  addOnTotal: 10000,
  monthlyTotal: 28000,
  annualTotal: 336000,
};

function App() {
  // Store the selected plan and modules at the application level.
  const [configuration, setConfiguration] = useState(
    initialConfiguration,
  );

  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <ProductShowcase />

        <InteractiveROICalculator />

        <ModuleConfigurator
          onConfigurationChange={setConfiguration}
        />

        <FeatureComparisonMatrix />

        <ClientProofCarousel />

        <ProposalGenerator configuration={configuration} />

        <SandboxAccess />
      </main>

      {/* Persistent conversion bar controlled by the scroll position */}
      <StickyConfiguratorBar configuration={configuration} />
    </>
  );
}

export default App;