// Footer contains the final navigation, contact, and project information.
function Footer() {
  // Automatically use the current year instead of hard-coding it.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-5">
          {/* Company information */}
          <div className="col-lg-5">
            <a
              className="footer-brand d-inline-flex align-items-center gap-2"
              href="#home"
            >
              <span className="brand-icon">
                <i className="bi bi-cpu-fill"></i>
              </span>

              <span>
                Nexus<span className="text-cyan">Tech</span>
              </span>
            </a>

            <p className="footer-description">
              NexusTech provides modular enterprise software for finance,
              human resources, sales, inventory, analytics, and multi-branch
              operations.
            </p>

            <div className="footer-socials">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="NexusTech on LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>

              <a
                href="https://github.com/LancineDiare/nexustech-promotional-website"
                target="_blank"
                rel="noreferrer"
                aria-label="View the NexusTech project on GitHub"
              >
                <i className="bi bi-github"></i>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="NexusTech on Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>

          {/* Website navigation */}
          <div className="col-6 col-lg-2">
            <h2 className="footer-heading">Explore</h2>

            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>

              <li>
                <a href="#solutions">Solutions</a>
              </li>

              <li>
                <a href="#calculator">ROI Calculator</a>
              </li>

              <li>
                <a href="#configurator">Configurator</a>
              </li>

              <li>
                <a href="#comparison">Comparison</a>
              </li>
            </ul>
          </div>

          {/* Conversion links */}
          <div className="col-6 col-lg-2">
            <h2 className="footer-heading">Resources</h2>

            <ul className="footer-links">
              <li>
                <a href="#clients">Client Results</a>
              </li>

              <li>
                <a href="#proposal">Custom Proposal</a>
              </li>

              <li>
                <a href="#sandbox">Sandbox Access</a>
              </li>

              <li>
                <a href="#calculator">Cost Estimate</a>
              </li>

              <li>
                <a href="#comparison">Product Guide</a>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div className="col-lg-3">
            <h2 className="footer-heading">Contact</h2>

            <address className="footer-contact">
              <a href="mailto:solutions@nexustech.example">
                <i className="bi bi-envelope"></i>
                solutions@nexustech.example
              </a>

              <a href="tel:+63280001234">
                <i className="bi bi-telephone"></i>
                +63 2 8000 1234
              </a>

              <span>
                <i className="bi bi-geo-alt"></i>
                Metro Manila, Philippines
              </span>

              <span>
                <i className="bi bi-clock"></i>
                Monday–Friday, 8:00 AM–6:00 PM
              </span>
            </address>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="footer-bottom">
          <p>
            © {currentYear} NexusTech B2B Solutions. Academic demonstration
            project.
          </p>

          <div>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>

            <a href="#home" className="back-to-top">
              Back to top
              <i className="bi bi-arrow-up"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;