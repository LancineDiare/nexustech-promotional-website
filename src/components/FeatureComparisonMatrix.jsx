// useState remembers the comparison category selected by the user.
import { useState } from "react";

// Import the product records from the separate data file.
import comparisonData from "../data/comparisonData";

// Available comparison filters.
const categories = [
  { id: "all", label: "All Solutions", icon: "bi-grid" },
  { id: "erp", label: "ERP", icon: "bi-diagram-3" },
  { id: "hris", label: "HRIS", icon: "bi-people" },
  { id: "pos", label: "POS", icon: "bi-upc-scan" },
];

// Format the monthly prices as Philippine pesos.
function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

function FeatureComparisonMatrix() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Display every product when "all" is selected.
  // Otherwise, only display products in the selected category.
  const filteredProducts =
    activeCategory === "all"
      ? comparisonData
      : comparisonData.filter(
          (product) => product.category === activeCategory,
        );

  return (
    <section id="comparison" className="section-padding comparison-section">
      <div className="container">
        <div className="section-heading text-center mx-auto">
          <span className="section-label">Product comparison</span>

          <h2>
            Compare our enterprise{" "}
            <span className="gradient-text">software solutions</span>
          </h2>

          <p>
            Filter and compare NexusTech products based on deployment,
            scalability, automation, analytics, support, and estimated cost.
          </p>
        </div>

        {/* Category filter buttons */}
        <div
          className="comparison-filters"
          role="tablist"
          aria-label="Filter products by category"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`comparison-filter ${
                  isActive ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <i className={`bi ${category.icon}`}></i>
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="comparison-table-container glass-panel">
          <div className="table-responsive">
            <table className="table comparison-table align-middle">
              <thead>
                <tr>
                  <th scope="col">Solution</th>
                  <th scope="col">Ideal for</th>
                  <th scope="col">Deployment</th>
                  <th scope="col">Users</th>
                  <th scope="col">Automation</th>
                  <th scope="col">Analytics</th>
                  <th scope="col">Support</th>
                  <th scope="col">Starting price</th>
                  <th scope="col">
                    <span className="visually-hidden">Select product</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={product.recommended ? "recommended-row" : ""}
                  >
                    <td>
                      <div className="comparison-product">
                        <span>{product.categoryLabel}</span>

                        <strong>{product.product}</strong>

                        {product.recommended && (
                          <small>
                            <i className="bi bi-stars"></i>
                            Recommended
                          </small>
                        )}
                      </div>
                    </td>

                    <td>{product.idealFor}</td>
                    <td>{product.deployment}</td>
                    <td>{product.users}</td>
                    <td>{product.automation}</td>
                    <td>{product.analytics}</td>
                    <td>{product.support}</td>

                    <td>
                      <div className="comparison-price">
                        <strong>
                          {formatCurrency(product.startingPrice)}
                        </strong>
                        <span>per month</span>
                      </div>
                    </td>

                    <td>
                      <a
                        href="#configurator"
                        className="comparison-action"
                        aria-label={`Configure ${product.product}`}
                      >
                        <i className="bi bi-arrow-up-right"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="comparison-footer">
            <div>
              <i className="bi bi-info-circle"></i>

              <span>
                Prices are estimates and may change based on user count,
                migration, modules, and integrations.
              </span>
            </div>

            <a href="#sandbox">
              Need help choosing?
              <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
        </div>

        {/* Additional feature summary cards */}
        <div className="row g-4 mt-4">
          {filteredProducts.map((product) => (
            <div className="col-md-6 col-xl-3" key={`details-${product.id}`}>
              <article className="comparison-detail-card">
                <div className="comparison-detail-heading">
                  <span>{product.categoryLabel}</span>
                  <i className="bi bi-boxes"></i>
                </div>

                <h3>{product.product}</h3>

                <ul>
                  <li>
                    <span>Integrations</span>
                    <strong>{product.integrations}</strong>
                  </li>

                  <li>
                    <span>Customization</span>
                    <strong>{product.customization}</strong>
                  </li>

                  <li>
                    <span>Deployment</span>
                    <strong>{product.deployment}</strong>
                  </li>
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureComparisonMatrix;