// useState stores the current form step, form values, and submission status.
import { useState } from "react";

// Initial values make it easy to reset the entire form.
const initialFormData = {
  fullName: "",
  workEmail: "",
  companyName: "",
  companyDomain: "",
  role: "",
  currentStack: "",
  employeeCount: "",
  primaryGoal: "",
  consent: false,
};

function SandboxAccess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update text fields, select fields, and the consent checkbox.
  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove an old error after the user changes a field.
    setFormError("");
  }

  // Validate the current step before moving forward.
  function validateCurrentStep() {
    if (
      currentStep === 1 &&
      (!formData.fullName ||
        !formData.workEmail ||
        !formData.companyName ||
        !formData.companyDomain)
    ) {
      setFormError("Please complete all company and contact fields.");
      return false;
    }

    if (
      currentStep === 2 &&
      (!formData.role ||
        !formData.currentStack ||
        !formData.employeeCount)
    ) {
      setFormError("Please complete all business profile fields.");
      return false;
    }

    return true;
  }

  function goToNextStep() {
    if (validateCurrentStep()) {
      setCurrentStep((step) => Math.min(step + 1, 3));
    }
  }

  function goToPreviousStep() {
    setFormError("");
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.primaryGoal) {
      setFormError("Please select your primary business goal.");
      return;
    }

    if (!formData.consent) {
      setFormError(
        "Please provide your consent before requesting sandbox access.",
      );
      return;
    }

    setFormError("");
    setIsSubmitted(true);
  }

  // Restore the form to its initial state.
  function resetForm() {
    setCurrentStep(1);
    setFormData(initialFormData);
    setFormError("");
    setIsSubmitted(false);
  }

  return (
    <section id="sandbox" className="section-padding sandbox-section">
      <div className="container">
        <div className="sandbox-cta glass-panel">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <span className="section-label">VIP sandbox access</span>

              <h2>
                Experience NexusTech with a{" "}
                <span className="gradient-text">14-day guided sandbox</span>
              </h2>

              <p>
                Explore a fully populated enterprise environment with sample
                employees, transactions, inventory records, analytics, and
                automated workflows.
              </p>

              <div className="sandbox-benefits">
                <span>
                  <i className="bi bi-check-circle-fill"></i>
                  No installation required
                </span>

                <span>
                  <i className="bi bi-check-circle-fill"></i>
                  Sample enterprise data
                </span>

                <span>
                  <i className="bi bi-check-circle-fill"></i>
                  Guided product tour
                </span>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end">
              <button
                type="button"
                className="btn btn-neon btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#sandboxModal"
                onClick={resetForm}
              >
                Request Sandbox Access
                <i className="bi bi-box-arrow-up-right ms-2"></i>
              </button>

              <small className="cta-note">
                Intended for qualified business users and decision-makers.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap modal containing the React-controlled multi-step form */}
      <div
        className="modal fade"
        id="sandboxModal"
        tabIndex="-1"
        aria-labelledby="sandboxModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div className="modal-content sandbox-modal">
            <div className="modal-header">
              <div>
                <span className="modal-label">NexusTech VIP access</span>

                <h2 className="modal-title" id="sandboxModalLabel">
                  Request your enterprise sandbox
                </h2>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {!isSubmitted ? (
                <>
                  {/* Form progress indicators */}
                  <div className="form-progress">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`progress-step ${
                          currentStep >= step ? "active" : ""
                        }`}
                      >
                        <span>{step}</span>

                        <small>
                          {step === 1 && "Company"}
                          {step === 2 && "Business"}
                          {step === 3 && "Confirm"}
                        </small>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Contact and company information */}
                    {currentStep === 1 && (
                      <div className="form-step">
                        <div className="form-step-heading">
                          <span>Step 1 of 3</span>
                          <h3>Tell us about you and your company</h3>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <label
                              className="form-label"
                              htmlFor="fullName"
                            >
                              Full name
                            </label>

                            <input
                              id="fullName"
                              name="fullName"
                              type="text"
                              className="form-control custom-input"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Juan Dela Cruz"
                              autoComplete="name"
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label
                              className="form-label"
                              htmlFor="workEmail"
                            >
                              Work email
                            </label>

                            <input
                              id="workEmail"
                              name="workEmail"
                              type="email"
                              className="form-control custom-input"
                              value={formData.workEmail}
                              onChange={handleInputChange}
                              placeholder="juan@company.com"
                              autoComplete="email"
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label
                              className="form-label"
                              htmlFor="companyName"
                            >
                              Company name
                            </label>

                            <input
                              id="companyName"
                              name="companyName"
                              type="text"
                              className="form-control custom-input"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder="Example Corporation"
                              autoComplete="organization"
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label
                              className="form-label"
                              htmlFor="companyDomain"
                            >
                              Company domain
                            </label>

                            <input
                              id="companyDomain"
                              name="companyDomain"
                              type="text"
                              className="form-control custom-input"
                              value={formData.companyDomain}
                              onChange={handleInputChange}
                              placeholder="company.com"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Business profile */}
                    {currentStep === 2 && (
                      <div className="form-step">
                        <div className="form-step-heading">
                          <span>Step 2 of 3</span>
                          <h3>Describe your current environment</h3>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label" htmlFor="role">
                              Your role
                            </label>

                            <select
                              id="role"
                              name="role"
                              className="form-select custom-input"
                              value={formData.role}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select your role</option>
                              <option value="Executive">
                                Executive or business owner
                              </option>
                              <option value="IT Manager">
                                IT manager
                              </option>
                              <option value="Operations Manager">
                                Operations manager
                              </option>
                              <option value="HR Manager">HR manager</option>
                              <option value="Finance Manager">
                                Finance manager
                              </option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label
                              className="form-label"
                              htmlFor="employeeCount"
                            >
                              Number of employees
                            </label>

                            <select
                              id="employeeCount"
                              name="employeeCount"
                              className="form-select custom-input"
                              value={formData.employeeCount}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select a range</option>
                              <option value="1-50">1–50</option>
                              <option value="51-250">51–250</option>
                              <option value="251-1000">251–1,000</option>
                              <option value="1001+">More than 1,000</option>
                            </select>
                          </div>

                          <div className="col-12">
                            <label
                              className="form-label"
                              htmlFor="currentStack"
                            >
                              Current software or technology stack
                            </label>

                            <textarea
                              id="currentStack"
                              name="currentStack"
                              className="form-control custom-input"
                              rows="4"
                              value={formData.currentStack}
                              onChange={handleInputChange}
                              placeholder="Example: Excel, legacy payroll system, standalone POS..."
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Goal and consent */}
                    {currentStep === 3 && (
                      <div className="form-step">
                        <div className="form-step-heading">
                          <span>Step 3 of 3</span>
                          <h3>Confirm your sandbox request</h3>
                        </div>

                        <label
                          className="form-label"
                          htmlFor="primaryGoal"
                        >
                          Primary business goal
                        </label>

                        <select
                          id="primaryGoal"
                          name="primaryGoal"
                          className="form-select custom-input mb-4"
                          value={formData.primaryGoal}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select your primary goal</option>
                          <option value="Process automation">
                            Automate business processes
                          </option>
                          <option value="System integration">
                            Integrate disconnected systems
                          </option>
                          <option value="Analytics">
                            Improve reporting and analytics
                          </option>
                          <option value="Branch management">
                            Manage multiple branches
                          </option>
                          <option value="HR modernization">
                            Modernize HR and payroll
                          </option>
                        </select>

                        <div className="request-summary">
                          <h4>Request summary</h4>

                          <dl>
                            <div>
                              <dt>Name</dt>
                              <dd>{formData.fullName}</dd>
                            </div>

                            <div>
                              <dt>Company</dt>
                              <dd>{formData.companyName}</dd>
                            </div>

                            <div>
                              <dt>Role</dt>
                              <dd>{formData.role}</dd>
                            </div>

                            <div>
                              <dt>Company size</dt>
                              <dd>{formData.employeeCount} employees</dd>
                            </div>
                          </dl>
                        </div>

                        <div className="form-check consent-check">
                          <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.consent}
                            onChange={handleInputChange}
                            required
                          />

                          <label
                            className="form-check-label"
                            htmlFor="consent"
                          >
                            I consent to NexusTech using this information to
                            evaluate my sandbox request and contact me about
                            relevant enterprise solutions.
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Display validation feedback when required fields are missing. */}
                    {formError && (
                      <div className="form-error" role="alert">
                        <i className="bi bi-exclamation-circle"></i>
                        {formError}
                      </div>
                    )}

                    <div className="form-navigation">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          className="btn btn-outline-neon"
                          onClick={goToPreviousStep}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          Back
                        </button>
                      ) : (
                        <span></span>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          className="btn btn-neon"
                          onClick={goToNextStep}
                        >
                          Continue
                          <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-neon">
                          Submit Request
                          <i className="bi bi-send ms-2"></i>
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                /* Submission confirmation */
                <div className="submission-success">
                  <div className="success-icon">
                    <i className="bi bi-check-lg"></i>
                  </div>

                  <span>Request received</span>

                  <h3>Thank you, {formData.fullName}!</h3>

                  <p>
                    Your sandbox request for {formData.companyName} has been
                    recorded successfully. This frontend demonstration does not
                    send information to a real server.
                  </p>

                  <div className="success-reference">
                    <span>Demo reference</span>
                    <strong>
                      NT-{Date.now().toString().slice(-6)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="btn btn-neon"
                    data-bs-dismiss="modal"
                  >
                    Return to Website
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SandboxAccess;