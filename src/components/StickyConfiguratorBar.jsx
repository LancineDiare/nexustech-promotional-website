// useEffect manages the browser scroll listener.
// useState remembers whether the sticky bar should be visible.
import { useEffect, useState } from "react";

// Format the subscription cost using Philippine currency.
function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

function StickyConfiguratorBar({ configuration }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the bar after the visitor scrolls 650 pixels from the top.
    function handleScroll() {
      setIsVisible(window.scrollY > 650);
    }

    // Check the current scroll position when the component loads.
    handleScroll();

    // Listen for changes in the browser's scroll position.
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Remove the listener when the component is no longer displayed.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside
      className={`sticky-configurator-bar ${
        isVisible ? "visible" : ""
      }`}
      aria-label="Current software configuration"
      aria-hidden={!isVisible}
    >
      <div className="container">
        <div className="sticky-configurator-content">
          {/* Current plan */}
          <div className="sticky-plan">
            <div className="sticky-plan-icon">
              <i className="bi bi-sliders"></i>
            </div>

            <div>
              <span>Current configuration</span>
              <strong>{configuration.planName} Plan</strong>
            </div>
          </div>

          {/* Number of selected modules */}
          <div className="sticky-detail">
            <i className="bi bi-boxes"></i>

            <div>
              <span>Optional modules</span>
              <strong>{configuration.modules.length} selected</strong>
            </div>
          </div>

          {/* Current monthly price */}
          <div className="sticky-detail sticky-price">
            <i className="bi bi-wallet2"></i>

            <div>
              <span>Estimated monthly cost</span>
              <strong>
                {formatCurrency(configuration.monthlyTotal)}
              </strong>
            </div>
          </div>

          {/* Conversion buttons */}
          <div className="sticky-actions">
            <a
              href="#configurator"
              className="btn btn-outline-neon"
            >
              Modify
            </a>

            <a href="#proposal" className="btn btn-neon">
              Export Proposal
              <i className="bi bi-file-earmark-pdf ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default StickyConfiguratorBar;