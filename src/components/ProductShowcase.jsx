// useState allows the component to remember the product selected by the user.
import { useState } from "react";

// Product information is stored as an array of reusable JavaScript objects.
const products = [
  {
    id: "erp",
    shortName: "ERP",
    name: "NexusERP Suite",
    icon: "bi-diagram-3",
    description:
      "Connect finance, procurement, inventory, and operations through one centralized enterprise platform.",
    highlight: "Complete operational visibility",
    metrics: [
      { label: "Monthly Revenue", value: "₱4.8M", change: "+18.4%" },
      { label: "Open Orders", value: "1,248", change: "+7.2%" },
      { label: "Inventory Health", value: "94%", change: "+3.8%" },
    ],
    features: [
      "Financial management",
      "Procurement automation",
      "Inventory monitoring",
      "Business intelligence",
    ],
  },
  {
    id: "hris",
    shortName: "HRIS",
    name: "NexusPeople HRIS",
    icon: "bi-people",
    description:
      "Manage employee records, attendance, payroll, benefits, and performance from one secure workspace.",
    highlight: "Smarter workforce management",
    metrics: [
      { label: "Active Employees", value: "2,840", change: "+4.6%" },
      { label: "Payroll Accuracy", value: "99.8%", change: "+1.2%" },
      { label: "Attendance Rate", value: "96%", change: "+2.5%" },
    ],
    features: [
      "Employee information system",
      "Automated payroll",
      "Attendance tracking",
      "Performance analytics",
    ],
  },
  {
    id: "pos",
    shortName: "POS",
    name: "NexusPOS Cloud",
    icon: "bi-upc-scan",
    description:
      "Process transactions, synchronize branches, and monitor sales and inventory in real time.",
    highlight: "Fast and connected retail",
    metrics: [
      { label: "Today's Sales", value: "₱684K", change: "+12.9%" },
      { label: "Transactions", value: "3,204", change: "+8.7%" },
      { label: "Active Branches", value: "48", change: "+2" },
    ],
    features: [
      "Barcode scanning",
      "Real-time sales tracking",
      "Multi-branch synchronization",
      "Low-stock notifications",
    ],
  },
];

// ProductShowcase provides a small interactive demonstration of each product.
function ProductShowcase() {
  // The ERP product is displayed when the section first loads.
  const [activeProductId, setActiveProductId] = useState("erp");

  // Find the complete product object that matches the selected ID.
  const activeProduct = products.find(
    (product) => product.id === activeProductId,
  );

  return (
    <section id="solutions" className="section-padding product-section">
      <div className="container">
        {/* Section heading */}
        <div className="section-heading text-center mx-auto">
          <span className="section-label">Interactive product showcase</span>

          <h2>
            Software that adapts to{" "}
            <span className="gradient-text">your business</span>
          </h2>

          <p>
            Select a NexusTech solution to explore its capabilities through an
            interactive micro-demo.
          </p>
        </div>

        {/* Product-selection buttons */}
        <div
          className="product-tabs"
          role="tablist"
          aria-label="NexusTech products"
        >
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={activeProductId === product.id}
              className={`product-tab ${
                activeProductId === product.id ? "active" : ""
              }`}
              onClick={() => setActiveProductId(product.id)}
            >
              <i className={`bi ${product.icon}`}></i>
              <span>{product.shortName}</span>
            </button>
          ))}
        </div>

        {/* The content changes when the user selects another product. */}
        <div className="product-demo glass-panel">
          <div className="row g-5 align-items-center">
            {/* Product description */}
            <div className="col-lg-5">
              <div className="product-icon">
                <i className={`bi ${activeProduct.icon}`}></i>
              </div>

              <span className="product-highlight">
                {activeProduct.highlight}
              </span>

              <h3 className="product-name">{activeProduct.name}</h3>

              <p className="product-description">
                {activeProduct.description}
              </p>

              <ul className="product-feature-list">
                {activeProduct.features.map((feature) => (
                  <li key={feature}>
                    <i className="bi bi-check-circle-fill"></i>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#calculator" className="btn btn-outline-neon">
                Estimate Your ROI
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>

            {/* Simulated product dashboard */}
            <div className="col-lg-7">
              <div className="micro-demo">
                <div className="micro-demo-header">
                  <div className="window-controls" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <span>{activeProduct.name} / Live Preview</span>

                  <span className="secure-status">
                    <i className="bi bi-shield-check"></i>
                    Secure
                  </span>
                </div>

                <div className="micro-demo-body">
                  <div className="row g-3">
                    {activeProduct.metrics.map((metric) => (
                      <div className="col-md-4" key={metric.label}>
                        <article className="demo-metric">
                          <span>{metric.label}</span>
                          <strong>{metric.value}</strong>
                          <small>
                            <i className="bi bi-arrow-up-right"></i>
                            {metric.change}
                          </small>
                        </article>
                      </div>
                    ))}
                  </div>

                  <div className="activity-panel">
                    <div className="activity-heading">
                      <div>
                        <span>System activity</span>
                        <strong>Real-time performance</strong>
                      </div>

                      <span className="live-indicator">
                        <span className="status-dot"></span>
                        Live
                      </span>
                    </div>

                    {/* Simulated performance chart */}
                    <div
                      className="activity-chart"
                      role="img"
                      aria-label={`${activeProduct.name} simulated performance chart`}
                    >
                      {[42, 60, 48, 72, 65, 84, 76, 92, 88, 100].map(
                        (height, index) => (
                          <span
                            key={`${activeProduct.id}-${index}`}
                            style={{ height: `${height}%` }}
                          ></span>
                        ),
                      )}
                    </div>

                    <div className="chart-labels">
                      <span>8 AM</span>
                      <span>12 PM</span>
                      <span>4 PM</span>
                      <span>8 PM</span>
                    </div>
                  </div>

                  <div className="demo-notification">
                    <i className="bi bi-lightning-charge-fill"></i>

                    <div>
                      <strong>Automation completed</strong>
                      <span>
                        The latest business records were synchronized
                        successfully.
                      </span>
                    </div>

                    <i className="bi bi-check-circle-fill notification-check"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;