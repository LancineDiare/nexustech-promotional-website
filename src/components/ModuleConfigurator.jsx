// useState stores the plan and modules selected by the user.
import { useState } from "react";

// Base software plans.
const plans = [
  {
    id: "growth",
    name: "Growth",
    price: 18000,
    description: "For growing companies with up to 250 employees.",
    features: [
      "Core ERP",
      "Employee records",
      "Sales dashboard",
      "Standard support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 35000,
    description: "For multi-branch organizations with advanced requirements.",
    features: [
      "Advanced ERP",
      "Complete HRIS",
      "Cloud POS",
      "Priority support",
    ],
  },
];

// Optional modules that can be added to the selected plan.
const addOnModules = [
  {
    id: "biometric",
    name: "Biometric Sync",
    price: 4500,
    icon: "bi-fingerprint",
    badge: "Popular",
    description:
      "Synchronize employee attendance with supported biometric devices.",
    features: ["Device integration", "Live attendance", "Shift verification"],
  },
  {
    id: "cloud-relay",
    name: "Multi-Branch Cloud Relay",
    price: 7500,
    icon: "bi-cloud-arrow-up",
    badge: "High demand",
    description:
      "Synchronize sales, inventory, and operational data across branches.",
    features: ["Branch sync", "Central reporting", "Offline recovery"],
  },
  {
    id: "tax-automation",
    name: "AI Tax Automation",
    price: 6000,
    icon: "bi-robot",
    badge: "AI-powered",
    description:
      "Assist finance teams with tax preparation and compliance checking.",
    features: ["Tax calculations", "Compliance alerts", "Report preparation"],
  },
  {
    id: "analytics",
    name: "Advanced Analytics",
    price: 5500,
    icon: "bi-bar-chart-line",
    badge: "Recommended",
    description:
      "Access forecasting, executive dashboards, and operational insights.",
    features: ["Forecasting", "KPI dashboards", "Data export"],
  },
];

// Format numbers using Philippine currency.
function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

function ModuleConfigurator() {
  // Growth is selected as the default plan.
  const [selectedPlanId, setSelectedPlanId] = useState("growth");

  // Store the IDs of the selected optional modules.
  const [selectedModules, setSelectedModules] = useState([
    "biometric",
    "analytics",
  ]);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  // Add or remove a module when its checkbox changes.
  function toggleModule(moduleId) {
    setSelectedModules((currentModules) => {
      const moduleIsSelected = currentModules.includes(moduleId);

      if (moduleIsSelected) {
        return currentModules.filter((id) => id !== moduleId);
      }

      return [...currentModules, moduleId];
    });
  }

  // Find the complete objects for all selected modules.
  const activeModules = addOnModules.filter((module) =>
    selectedModules.includes(module.id),
  );

  // Calculate the combined monthly cost of all optional modules.
  const addOnTotal = activeModules.reduce(
    (total, module) => total + module.price,
    0,
  );

  const monthlyTotal = selectedPlan.price + addOnTotal;
  const annualTotal = monthlyTotal * 12;

  // Return the configurator to its initial settings.
  function resetConfiguration() {
    setSelectedPlanId("growth");
    setSelectedModules(["biometric", "analytics"]);
  }

  return (
    <section id="configurator" className="section-padding configurator-section">
      <div className="container">
        <div className="section-heading text-center mx-auto">
          <span className="section-label">Solution configurator</span>

          <h2>
            Build the right platform for{" "}
            <span className="gradient-text">your organization</span>
          </h2>

          <p>
            Select a base plan and optional modules. Your feature configuration
            and estimated subscription cost will update instantly.
          </p>
        </div>

        <div className="row g-4">
          {/* Left side: plans and optional modules */}
          <div className="col-lg-8">
            <div className="configurator-panel glass-panel">
              <div className="configurator-header">
                <div>
                  <span>Step 1</span>
                  <h3>Select your base plan</h3>
                </div>

                <button
                  type="button"
                  className="reset-button"
                  onClick={resetConfiguration}
                >
                  <i className="bi bi-arrow-counterclockwise"></i>
                  Reset
                </button>
              </div>

              {/* Base-plan selection */}
              <div className="row g-3 mb-5">
                {plans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;

                  return (
                    <div className="col-md-6" key={plan.id}>
                      <button
                        type="button"
                        className={`plan-card ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => setSelectedPlanId(plan.id)}
                        aria-pressed={isSelected}
                      >
                        <div className="plan-card-heading">
                          <div>
                            <span>Base platform</span>
                            <h4>{plan.name}</h4>
                          </div>

                          <i
                            className={`bi ${
                              isSelected
                                ? "bi-check-circle-fill"
                                : "bi-circle"
                            }`}
                          ></i>
                        </div>

                        <p>{plan.description}</p>

                        <strong>
                          {formatCurrency(plan.price)}
                          <small>/month</small>
                        </strong>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="configurator-subheading">
                <span>Step 2</span>
                <h3>Select optional modules</h3>
              </div>

              {/* Optional module cards */}
              <div className="row g-3">
                {addOnModules.map((module) => {
                  const isSelected = selectedModules.includes(module.id);

                  return (
                    <div className="col-md-6" key={module.id}>
                      <article
                        className={`module-card ${
                          isSelected ? "selected" : ""
                        }`}
                      >
                        <div className="module-card-top">
                          <div className="module-icon">
                            <i className={`bi ${module.icon}`}></i>
                          </div>

                          <label className="module-switch">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleModule(module.id)}
                              aria-label={`Select ${module.name}`}
                            />

                            <span className="switch-slider"></span>
                          </label>
                        </div>

                        <span className="module-badge">{module.badge}</span>

                        <h4>{module.name}</h4>
                        <p>{module.description}</p>

                        <div className="module-price">
                          <strong>{formatCurrency(module.price)}</strong>
                          <span>/month</span>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side: live configuration summary */}
          <div className="col-lg-4">
            <aside className="configuration-summary">
              <div className="summary-heading">
                <span>Live configuration</span>
                <h3>Your NexusTech solution</h3>
              </div>

              <div className="selected-plan-summary">
                <div>
                  <span>Base plan</span>
                  <strong>{selectedPlan.name}</strong>
                </div>

                <strong>{formatCurrency(selectedPlan.price)}</strong>
              </div>

              <div className="summary-modules">
                <span className="summary-label">
                  Selected modules ({activeModules.length})
                </span>

                {activeModules.length > 0 ? (
                  activeModules.map((module) => (
                    <div className="summary-module" key={module.id}>
                      <div>
                        <i className={`bi ${module.icon}`}></i>
                        <span>{module.name}</span>
                      </div>

                      <strong>{formatCurrency(module.price)}</strong>
                    </div>
                  ))
                ) : (
                  <p className="empty-selection">
                    No optional modules selected.
                  </p>
                )}
              </div>

              {/* Dynamic feature matrix */}
              <div className="feature-matrix">
                <span className="summary-label">Included capabilities</span>

                <ul>
                  {selectedPlan.features.map((feature) => (
                    <li key={feature}>
                      <i className="bi bi-check-circle-fill"></i>
                      {feature}
                    </li>
                  ))}

                  {activeModules.flatMap((module) =>
                    module.features.map((feature) => (
                      <li key={`${module.id}-${feature}`}>
                        <i className="bi bi-check-circle-fill"></i>
                        {feature}
                      </li>
                    )),
                  )}
                </ul>
              </div>

              <div className="configuration-total">
                <div>
                  <span>Estimated monthly cost</span>
                  <strong>{formatCurrency(monthlyTotal)}</strong>
                </div>

                <div>
                  <span>Estimated annual cost</span>
                  <strong>{formatCurrency(annualTotal)}</strong>
                </div>
              </div>

              <a href="#comparison" className="btn btn-neon w-100">
                Continue to Comparison
                <i className="bi bi-arrow-right ms-2"></i>
              </a>

              <small className="price-disclaimer">
                Estimates exclude setup, migration, taxes, and custom
                integrations.
              </small>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModuleConfigurator;