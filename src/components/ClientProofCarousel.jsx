// useEffect runs the automatic carousel timer.
// useState remembers the current testimonial and hover status.
import { useEffect, useState } from "react";

// Sample fictional organizations are used for this academic project.
const testimonials = [
  {
    id: 1,
    company: "Apex Manufacturing",
    industry: "Manufacturing",
    companyIcon: "bi-buildings",
    clientName: "Maria Santos",
    clientRole: "Chief Operations Officer",
    initials: "MS",
    quote:
      "NexusTech gave our teams one reliable view of finance, inventory, and production. Our monthly reporting process became much faster and easier to manage.",
    result: "38% faster reporting",
  },
  {
    id: 2,
    company: "Northstar Retail Group",
    industry: "Retail",
    companyIcon: "bi-shop",
    clientName: "Daniel Reyes",
    clientRole: "Regional Retail Director",
    initials: "DR",
    quote:
      "The cloud POS platform helped us connect every branch and monitor sales in real time. We now identify stock issues before they affect our customers.",
    result: "26% fewer stock issues",
  },
  {
    id: 3,
    company: "Vertex Business Services",
    industry: "Professional Services",
    companyIcon: "bi-briefcase",
    clientName: "Angela Lim",
    clientRole: "Human Resources Director",
    initials: "AL",
    quote:
      "Payroll automation and attendance synchronization reduced repetitive work for our HR team while improving the accuracy of employee records.",
    result: "44% less payroll processing time",
  },
];

// High-level social-proof statistics.
const enterpriseStatistics = [
  {
    id: 1,
    value: "250+",
    label: "Enterprise clients",
    icon: "bi-buildings",
  },
  {
    id: 2,
    value: "48K+",
    label: "Active enterprise seats",
    icon: "bi-people",
  },
  {
    id: 3,
    value: "99.99%",
    label: "Platform availability",
    icon: "bi-activity",
  },
  {
    id: 4,
    value: "24/7",
    label: "Technical support",
    icon: "bi-headset",
  },
];

function ClientProofCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically display the next testimonial every five seconds.
  useEffect(() => {
    // Do not create a timer while the user is hovering over the carousel.
    if (isPaused) {
      return undefined;
    }

    const carouselTimer = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % testimonials.length,
      );
    }, 5000);

    // Remove the old timer before creating another one.
    return () => window.clearInterval(carouselTimer);
  }, [isPaused]);

  function showNextTestimonial() {
    setActiveIndex(
      (currentIndex) => (currentIndex + 1) % testimonials.length,
    );
  }

  function showPreviousTestimonial() {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + testimonials.length) % testimonials.length,
    );
  }

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="clients" className="section-padding client-proof-section">
      <div className="container">
        <div className="section-heading text-center mx-auto">
          <span className="section-label">Trusted by growing businesses</span>

          <h2>
            Built for teams that expect{" "}
            <span className="gradient-text">measurable results</span>
          </h2>

          <p>
            NexusTech helps organizations improve visibility, automate routine
            work, and make faster business decisions.
          </p>
        </div>

        {/* Enterprise statistics */}
        <div className="row g-3 mb-5">
          {enterpriseStatistics.map((statistic) => (
            <div className="col-6 col-lg-3" key={statistic.id}>
              <article className="enterprise-stat-card">
                <div className="enterprise-stat-icon">
                  <i className={`bi ${statistic.icon}`}></i>
                </div>

                <strong>{statistic.value}</strong>
                <span>{statistic.label}</span>
              </article>
            </div>
          ))}
        </div>

        {/* Client logo-style cards */}
        <div className="client-logos">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              className={`client-logo ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial from ${testimonial.company}`}
            >
              <i className={`bi ${testimonial.companyIcon}`}></i>

              <span>
                <strong>{testimonial.company}</strong>
                <small>{testimonial.industry}</small>
              </span>
            </button>
          ))}
        </div>

        {/* Testimonial carousel */}
        <div
          className="testimonial-carousel glass-panel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <div className="quote-icon">
                <i className="bi bi-quote"></i>
              </div>

              <blockquote key={activeTestimonial.id}>
                “{activeTestimonial.quote}”
              </blockquote>

              <div className="client-profile">
                <div className="client-avatar">
                  {activeTestimonial.initials}
                </div>

                <div>
                  <strong>{activeTestimonial.clientName}</strong>
                  <span>{activeTestimonial.clientRole}</span>
                  <small>{activeTestimonial.company}</small>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="client-result">
                <span>Reported business impact</span>

                <strong>{activeTestimonial.result}</strong>

                <div className="result-meter">
                  <span></span>
                </div>

                <small>
                  Based on simulated client feedback for this academic
                  promotional website.
                </small>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="carousel-controls">
            <div className="carousel-indicators-custom">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  className={activeIndex === index ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View testimonial ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                ></button>
              ))}
            </div>

            <div className="carousel-buttons">
              <button
                type="button"
                onClick={showPreviousTestimonial}
                aria-label="Show previous testimonial"
              >
                <i className="bi bi-arrow-left"></i>
              </button>

              <button
                type="button"
                onClick={showNextTestimonial}
                aria-label="Show next testimonial"
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Show whether automatic movement is temporarily paused. */}
          {isPaused && (
            <span className="carousel-pause-message">
              <i className="bi bi-pause-circle"></i>
              Auto-play paused
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClientProofCarousel;