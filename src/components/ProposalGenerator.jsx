// useState manages the proposal form and generation status.
import { useState } from "react";

// jsPDF creates and downloads the proposal directly in the browser.
import { jsPDF } from "jspdf";

const initialProposalData = {
  companyName: "",
  contactName: "",
  workEmail: "",
  industry: "",
  implementationGoal: "",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Use a filename-safe version of the company name.
function createSafeFileName(companyName) {
  return companyName
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function ProposalGenerator({ configuration }) {
  const [proposalData, setProposalData] = useState(initialProposalData);
  const [formError, setFormError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setProposalData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setFormError("");
    setDownloadComplete(false);
  }

  function generateProposal(event) {
    event.preventDefault();

    if (
      !proposalData.companyName ||
      !proposalData.contactName ||
      !proposalData.workEmail ||
      !proposalData.industry ||
      !proposalData.implementationGoal
    ) {
      setFormError("Please complete all fields before exporting the proposal.");
      return;
    }

    setIsGenerating(true);
    setFormError("");

    // Create an A4 PDF using millimeter measurements.
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const leftMargin = 18;
    const contentWidth = pageWidth - leftMargin * 2;

    // Helper function for the PDF footer.
    function addFooter(pageNumber) {
      pdf.setDrawColor(220, 225, 235);
      pdf.line(leftMargin, pageHeight - 18, pageWidth - leftMargin, pageHeight - 18);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 110, 125);

      pdf.text(
        "NexusTech B2B Solutions | Academic Promotional Website",
        leftMargin,
        pageHeight - 11,
      );

      pdf.text(
        `Page ${pageNumber}`,
        pageWidth - leftMargin,
        pageHeight - 11,
        { align: "right" },
      );
    }

    // Header background.
    pdf.setFillColor(11, 15, 25);
    pdf.rect(0, 0, pageWidth, 48, "F");

    // Brand title.
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(0, 240, 255);
    pdf.text("NexusTech", leftMargin, 20);

    pdf.setFontSize(9);
    pdf.setTextColor(205, 213, 225);
    pdf.text("ENTERPRISE SOFTWARE SOLUTIONS", leftMargin, 28);

    pdf.setFontSize(9);
    pdf.setTextColor(148, 163, 184);
    pdf.text("CUSTOM SOLUTION PROPOSAL", leftMargin, 38);

    // Proposal date and reference.
    const proposalDate = new Date();

    const referenceNumber = `NT-${proposalDate
      .getTime()
      .toString()
      .slice(-8)}`;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(205, 213, 225);

    pdf.text(
      `Date: ${proposalDate.toLocaleDateString("en-PH")}`,
      pageWidth - leftMargin,
      20,
      { align: "right" },
    );

    pdf.text(
      `Reference: ${referenceNumber}`,
      pageWidth - leftMargin,
      28,
      { align: "right" },
    );

    let yPosition = 62;

    // Proposal introduction.
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(25, 35, 50);
    pdf.text("Enterprise Software Proposal", leftMargin, yPosition);

    yPosition += 10;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(80, 90, 105);

    const introduction = pdf.splitTextToSize(
      `Prepared for ${proposalData.companyName}. This proposal summarizes the NexusTech configuration selected through the interactive promotional portal.`,
      contentWidth,
    );

    pdf.text(introduction, leftMargin, yPosition);
    yPosition += introduction.length * 5 + 8;

    // Client information section.
    pdf.setFillColor(244, 247, 250);
    pdf.roundedRect(leftMargin, yPosition, contentWidth, 42, 3, 3, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(25, 35, 50);
    pdf.text("CLIENT INFORMATION", leftMargin + 6, yPosition + 9);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(75, 85, 100);

    pdf.text(
      `Company: ${proposalData.companyName}`,
      leftMargin + 6,
      yPosition + 18,
    );

    pdf.text(
      `Contact: ${proposalData.contactName}`,
      leftMargin + 6,
      yPosition + 26,
    );

    pdf.text(
      `Email: ${proposalData.workEmail}`,
      leftMargin + 90,
      yPosition + 18,
    );

    pdf.text(
      `Industry: ${proposalData.industry}`,
      leftMargin + 90,
      yPosition + 26,
    );

    yPosition += 54;

    // Selected solution section.
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(25, 35, 50);
    pdf.text("1. Selected Solution", leftMargin, yPosition);

    yPosition += 9;

    pdf.setFontSize(10);
    pdf.text(
      `${configuration.planName} Plan`,
      leftMargin,
      yPosition,
    );

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 90, 105);

    pdf.text(
      `Base subscription: PHP ${configuration.planPrice.toLocaleString("en-PH")} per month`,
      leftMargin + 70,
      yPosition,
    );

    yPosition += 10;

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(25, 35, 50);
    pdf.text("Optional modules:", leftMargin, yPosition);

    yPosition += 7;

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 90, 105);

    if (configuration.modules.length > 0) {
      configuration.modules.forEach((module) => {
        pdf.text(
          `- ${module.name}: PHP ${module.price.toLocaleString("en-PH")} per month`,
          leftMargin + 5,
          yPosition,
        );

        yPosition += 6;
      });
    } else {
      pdf.text("- No optional modules selected", leftMargin + 5, yPosition);
      yPosition += 6;
    }

    yPosition += 7;

    // Cost summary.
    pdf.setFillColor(232, 252, 253);
    pdf.roundedRect(leftMargin, yPosition, contentWidth, 30, 3, 3, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(20, 40, 50);

    pdf.text("ESTIMATED MONTHLY COST", leftMargin + 7, yPosition + 10);
    pdf.text("ESTIMATED ANNUAL COST", leftMargin + 100, yPosition + 10);

    pdf.setFontSize(15);
    pdf.setTextColor(0, 120, 135);

    pdf.text(
      `PHP ${configuration.monthlyTotal.toLocaleString("en-PH")}`,
      leftMargin + 7,
      yPosition + 21,
    );

    pdf.text(
      `PHP ${configuration.annualTotal.toLocaleString("en-PH")}`,
      leftMargin + 100,
      yPosition + 21,
    );

    yPosition += 43;

    // Implementation objective.
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(25, 35, 50);
    pdf.text("2. Implementation Objective", leftMargin, yPosition);

    yPosition += 9;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(80, 90, 105);

    const goalText = pdf.splitTextToSize(
      proposalData.implementationGoal,
      contentWidth,
    );

    pdf.text(goalText, leftMargin, yPosition);
    yPosition += goalText.length * 5 + 10;

    // Proposed next steps.
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(25, 35, 50);
    pdf.text("3. Proposed Next Steps", leftMargin, yPosition);

    yPosition += 9;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(80, 90, 105);

    const nextSteps = [
      "1. Conduct a detailed requirements consultation.",
      "2. Review current systems, integrations, and data migration needs.",
      "3. Confirm the final scope, implementation timeline, and pricing.",
      "4. Prepare a guided sandbox or product demonstration.",
    ];

    nextSteps.forEach((step) => {
      pdf.text(step, leftMargin, yPosition);
      yPosition += 7;
    });

    yPosition += 5;

    // Disclaimer.
    pdf.setFillColor(255, 248, 230);
    pdf.roundedRect(leftMargin, yPosition, contentWidth, 30, 3, 3, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(100, 75, 20);
    pdf.text("IMPORTANT NOTICE", leftMargin + 6, yPosition + 9);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    const disclaimer = pdf.splitTextToSize(
      "This automatically generated document is an academic demonstration and not a legally binding quotation. Final pricing, scope, taxes, migration, and implementation fees require formal assessment.",
      contentWidth - 12,
    );

    pdf.text(disclaimer, leftMargin + 6, yPosition + 16);

    addFooter(1);

    // Create a descriptive download filename.
    const safeCompanyName =
      createSafeFileName(proposalData.companyName) || "company";

    pdf.save(`NexusTech-Proposal-${safeCompanyName}.pdf`);

    setIsGenerating(false);
    setDownloadComplete(true);
  }

  return (
    <section id="proposal" className="section-padding proposal-section">
      <div className="container">
        <div className="section-heading text-center mx-auto">
          <span className="section-label">Instant proposal generator</span>

          <h2>
            Export your custom{" "}
            <span className="gradient-text">solution proposal</span>
          </h2>

          <p>
            Review your selected configuration, enter your company details,
            and instantly download a branded proposal PDF.
          </p>
        </div>

        <div className="proposal-container glass-panel">
          <div className="row g-5">
            {/* Current configuration preview */}
            <div className="col-lg-5">
              <div className="proposal-preview">
                <span className="proposal-preview-label">
                  Current configuration
                </span>

                <h3>{configuration.planName} Plan</h3>

                <div className="proposal-price">
                  <strong>
                    {formatCurrency(configuration.monthlyTotal)}
                  </strong>
                  <span>estimated per month</span>
                </div>

                <div className="proposal-module-list">
                  <span>Selected modules</span>

                  {configuration.modules.length > 0 ? (
                    configuration.modules.map((module) => (
                      <div key={module.id}>
                        <span>
                          <i className="bi bi-check-circle-fill"></i>
                          {module.name}
                        </span>

                        <strong>{formatCurrency(module.price)}</strong>
                      </div>
                    ))
                  ) : (
                    <p>No optional modules selected.</p>
                  )}
                </div>

                <div className="proposal-annual-total">
                  <span>Estimated annual cost</span>
                  <strong>
                    {formatCurrency(configuration.annualTotal)}
                  </strong>
                </div>

                <a
                  href="#configurator"
                  className="btn btn-outline-neon w-100"
                >
                  <i className="bi bi-sliders me-2"></i>
                  Modify Configuration
                </a>
              </div>
            </div>

            {/* Proposal information form */}
            <div className="col-lg-7">
              <form className="proposal-form" onSubmit={generateProposal}>
                <div className="proposal-form-heading">
                  <span>Proposal details</span>
                  <h3>Who should this proposal be prepared for?</h3>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="proposalCompany">
                      Company name
                    </label>

                    <input
                      id="proposalCompany"
                      name="companyName"
                      type="text"
                      className="form-control custom-input"
                      value={proposalData.companyName}
                      onChange={handleInputChange}
                      placeholder="Example Corporation"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="proposalContact">
                      Contact person
                    </label>

                    <input
                      id="proposalContact"
                      name="contactName"
                      type="text"
                      className="form-control custom-input"
                      value={proposalData.contactName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="proposalEmail">
                      Work email
                    </label>

                    <input
                      id="proposalEmail"
                      name="workEmail"
                      type="email"
                      className="form-control custom-input"
                      value={proposalData.workEmail}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="proposalIndustry">
                      Industry
                    </label>

                    <select
                      id="proposalIndustry"
                      name="industry"
                      className="form-select custom-input"
                      value={proposalData.industry}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an industry</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Professional Services">
                        Professional services
                      </option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label" htmlFor="implementationGoal">
                      Main implementation objective
                    </label>

                    <textarea
                      id="implementationGoal"
                      name="implementationGoal"
                      className="form-control custom-input"
                      rows="5"
                      value={proposalData.implementationGoal}
                      onChange={handleInputChange}
                      placeholder="Describe the business problem or process that your organization wants to improve."
                      required
                    ></textarea>
                  </div>
                </div>

                {formError && (
                  <div className="form-error" role="alert">
                    <i className="bi bi-exclamation-circle"></i>
                    {formError}
                  </div>
                )}

                {downloadComplete && (
                  <div className="download-success" role="status">
                    <i className="bi bi-check-circle-fill"></i>
                    Your custom proposal was generated and downloaded.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-neon btn-lg w-100 mt-4"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                      Generating Proposal
                    </>
                  ) : (
                    <>
                      <i className="bi bi-file-earmark-pdf me-2"></i>
                      Export Custom Proposal
                    </>
                  )}
                </button>

                <small className="proposal-disclaimer">
                  The PDF is generated locally in your browser. This
                  demonstration does not upload the entered information.
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProposalGenerator;