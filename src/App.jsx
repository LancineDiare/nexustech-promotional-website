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

// Default configuration shown before the configurator sends its first update.
const initialConfiguration = {
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
  monthlyTotal: 28000,
  annualTotal: 336000,
};

function App() {
  // Store the selected configuration so multiple components can use it.
  const [configuration, setConfiguration] = useState(initialConfiguration);

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
    </>
  );
}

export default App;