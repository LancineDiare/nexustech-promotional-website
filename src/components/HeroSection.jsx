// Import Framer Motion for smooth entrance animations.
import { motion } from "framer-motion";

// HeroSection introduces the company and presents the main actions.
function HeroSection() {
  return (
    <section id="home" className="hero-section">
      {/* Decorative background grid */}
      <div className="hero-grid" aria-hidden="true"></div>

      {/* Decorative glowing objects */}
      <div className="glow-orb glow-orb-one" aria-hidden="true"></div>
      <div className="glow-orb glow-orb-two" aria-hidden="true"></div>

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* Left side: promotional content */}
          <motion.div
            className="col-lg-7"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-badge mb-4">
              <span className="status-dot"></span>
              Enterprise systems built for growth
            </div>

            <h1 className="hero-title mb-4">
              Power every part of your business with{" "}
              <span className="gradient-text">one intelligent platform.</span>
            </h1>

            <p className="hero-description mb-4">
              Connect your finance, human resources, sales, inventory, and
              analytics through secure and scalable enterprise software.
            </p>

            {/* Main conversion actions */}
            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
              <a className="btn btn-neon btn-lg" href="#solutions">
                Explore Solutions
                <i className="bi bi-arrow-right ms-2"></i>
              </a>

              <a className="btn btn-outline-neon btn-lg" href="#calculator">
                <i className="bi bi-calculator me-2"></i>
                Calculate ROI
              </a>
            </div>

            {/* Quick trust indicators */}
            <div className="row g-3 hero-statistics">
              <div className="col-4">
                <strong>250+</strong>
                <span>Enterprise clients</span>
              </div>

              <div className="col-4">
                <strong>99.99%</strong>
                <span>System availability</span>
              </div>

              <div className="col-4">
                <strong>24/7</strong>
                <span>Technical support</span>
              </div>
            </div>
          </motion.div>

          {/* Right side: simulated analytics dashboard */}
          <motion.div
            className="col-lg-5"
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="dashboard-preview glass-panel">
              <div className="dashboard-header">
                <div>
                  <span className="dashboard-label">Business overview</span>
                  <h2>Command Center</h2>
                </div>

                <span className="live-badge">
                  <span className="status-dot"></span>
                  Live
                </span>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="metric-card">
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>Revenue growth</span>
                    <strong>+24.8%</strong>
                  </div>
                </div>

                <div className="col-6">
                  <div className="metric-card">
                    <i className="bi bi-people"></i>
                    <span>Active users</span>
                    <strong>12,840</strong>
                  </div>
                </div>
              </div>

              {/* Decorative chart bars */}
              <div className="chart-card">
                <div className="chart-heading">
                  <span>Operational performance</span>
                  <strong>87%</strong>
                </div>

                <div
                  className="chart-bars"
                  role="img"
                  aria-label="Decorative chart showing increasing performance"
                >
                  <span style={{ height: "35%" }}></span>
                  <span style={{ height: "50%" }}></span>
                  <span style={{ height: "42%" }}></span>
                  <span style={{ height: "68%" }}></span>
                  <span style={{ height: "60%" }}></span>
                  <span style={{ height: "82%" }}></span>
                  <span style={{ height: "95%" }}></span>
                </div>
              </div>

              <div className="dashboard-footer">
                <span>
                  <i className="bi bi-shield-check me-2"></i>
                  All systems operational
                </span>
                <span>Updated now</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;