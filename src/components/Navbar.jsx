// Navbar displays the brand, navigation links, and primary call-to-action.
function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar"
      aria-label="Main navigation"
    >
      <div className="container">
        {/* Website logo and brand name */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="#home">
          <span className="brand-icon">
            <i className="bi bi-cpu-fill"></i>
          </span>

          <span className="fw-bold">
            Nexus<span className="text-cyan">Tech</span>
          </span>
        </a>

        {/* Mobile navigation button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="mainNavigation">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#solutions">
                Solutions
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#calculator">
                ROI Calculator
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#comparison">
                Compare
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#clients">
                Clients
              </a>
            </li>
          </ul>

          {/* Important conversion button */}
          <a className="btn btn-neon navbar-cta ms-lg-3" href="#sandbox">
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;