// useReducer is suitable when a component manages several related values.
import { useReducer } from "react";

// Initial calculator values.
const initialState = {
  employees: 100,
  branches: 5,
  monthlySalary: 30000,
  automationLevel: 30,
};

// The reducer describes how each calculator value can be updated.
function calculatorReducer(state, action) {
  switch (action.type) {
    case "UPDATE_EMPLOYEES":
      return { ...state, employees: Number(action.payload) };

    case "UPDATE_BRANCHES":
      return { ...state, branches: Number(action.payload) };

    case "UPDATE_SALARY":
      return { ...state, monthlySalary: Number(action.payload) };

    case "UPDATE_AUTOMATION":
      return { ...state, automationLevel: Number(action.payload) };

    case "RESET_CALCULATOR":
      return initialState;

    default:
      return state;
  }
}

// Format numbers as Philippine peso values.
function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Format large numbers using commas.
function formatNumber(value) {
  return new Intl.NumberFormat("en-PH", {
    maximumFractionDigits: 0,
  }).format(value);
}

function InteractiveROICalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const { employees, branches, monthlySalary, automationLevel } = state;

  // Convert the percentage into a decimal, such as 30% becoming 0.30.
  const automationRate = automationLevel / 100;

  // Assume that one employee can save up to 2.5 hours each month.
  const employeeHoursSaved = employees * 2.5 * 12 * automationRate;

  // Assume that each branch can save up to 20 administrative hours monthly.
  const branchHoursSaved = branches * 20 * 12 * automationRate;

  const annualHoursSaved = employeeHoursSaved + branchHoursSaved;

  // Estimate the average hourly labor cost using 160 work hours per month.
  const hourlyLaborCost = monthlySalary / 160;

  const annualLaborSavings = annualHoursSaved * hourlyLaborCost;

  // Simulated annual NexusTech subscription pricing.
  const annualPlatformCost =
    120000 + employees * 1200 + branches * 18000;

  // ROI formula: (financial gain - investment cost) / investment cost × 100.
  const roiPercentage =
    ((annualLaborSavings - annualPlatformCost) / annualPlatformCost) * 100;

  // Calculate the number of months needed to recover the investment.
  const monthlySavings = annualLaborSavings / 12;

  const paybackMonths =
    monthlySavings > 0 ? annualPlatformCost / monthlySavings : 0;

  return (
    <section id="calculator" className="section-padding calculator-section">
      <div className="container">
        <div className="section-heading text-center mx-auto">
          <span className="section-label">Interactive ROI calculator</span>

          <h2>
            Estimate your potential{" "}
            <span className="gradient-text">business impact</span>
          </h2>

          <p>
            Adjust the business values below to calculate potential time
            savings, platform costs, and return on investment.
          </p>
        </div>

        <div className="calculator-container glass-panel">
          <div className="row g-5">
            {/* Calculator input controls */}
            <div className="col-lg-6">
              <div className="calculator-form">
                <div className="calculator-title">
                  <div>
                    <span>Business profile</span>
                    <h3>Configure your organization</h3>
                  </div>

                  <button
                    type="button"
                    className="reset-button"
                    onClick={() => dispatch({ type: "RESET_CALCULATOR" })}
                  >
                    <i className="bi bi-arrow-counterclockwise"></i>
                    Reset
                  </button>
                </div>

                {/* Employee slider */}
                <div className="range-field">
                  <div className="range-label">
                    <label htmlFor="employees">
                      <i className="bi bi-people"></i>
                      Number of employees
                    </label>

                    <output>{formatNumber(employees)}</output>
                  </div>

                  <input
                    id="employees"
                    type="range"
                    className="form-range"
                    min="25"
                    max="1000"
                    step="25"
                    value={employees}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_EMPLOYEES",
                        payload: event.target.value,
                      })
                    }
                  />

                  <div className="range-limits">
                    <span>25</span>
                    <span>1,000</span>
                  </div>
                </div>

                {/* Branch slider */}
                <div className="range-field">
                  <div className="range-label">
                    <label htmlFor="branches">
                      <i className="bi bi-buildings"></i>
                      Operational branches
                    </label>

                    <output>{branches}</output>
                  </div>

                  <input
                    id="branches"
                    type="range"
                    className="form-range"
                    min="1"
                    max="50"
                    step="1"
                    value={branches}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_BRANCHES",
                        payload: event.target.value,
                      })
                    }
                  />

                  <div className="range-limits">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Monthly salary slider */}
                <div className="range-field">
                  <div className="range-label">
                    <label htmlFor="salary">
                      <i className="bi bi-cash-stack"></i>
                      Average monthly salary
                    </label>

                    <output>{formatCurrency(monthlySalary)}</output>
                  </div>

                  <input
                    id="salary"
                    type="range"
                    className="form-range"
                    min="15000"
                    max="100000"
                    step="5000"
                    value={monthlySalary}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_SALARY",
                        payload: event.target.value,
                      })
                    }
                  />

                  <div className="range-limits">
                    <span>₱15,000</span>
                    <span>₱100,000</span>
                  </div>
                </div>

                {/* Automation slider */}
                <div className="range-field">
                  <div className="range-label">
                    <label htmlFor="automation">
                      <i className="bi bi-gear-wide-connected"></i>
                      Target automation level
                    </label>

                    <output>{automationLevel}%</output>
                  </div>

                  <input
                    id="automation"
                    type="range"
                    className="form-range"
                    min="10"
                    max="60"
                    step="5"
                    value={automationLevel}
                    onChange={(event) =>
                      dispatch({
                        type: "UPDATE_AUTOMATION",
                        payload: event.target.value,
                      })
                    }
                  />

                  <div className="range-limits">
                    <span>10%</span>
                    <span>60%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live calculation results */}
            <div className="col-lg-6">
              <div className="roi-results">
                <div className="results-heading">
                  <span>Live projection</span>
                  <h3>Your estimated annual results</h3>
                </div>

                <div className="roi-main-result">
                  <span>Estimated return on investment</span>

                  <strong
                    className={roiPercentage >= 0 ? "positive-roi" : "negative-roi"}
                  >
                    {roiPercentage.toFixed(1)}%
                  </strong>

                  <small>
                    Based on estimated savings compared with the annual platform
                    cost
                  </small>
                </div>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <article className="result-card">
                      <i className="bi bi-clock-history"></i>
                      <span>Hours saved yearly</span>
                      <strong>{formatNumber(annualHoursSaved)}</strong>
                    </article>
                  </div>

                  <div className="col-sm-6">
                    <article className="result-card">
                      <i className="bi bi-piggy-bank"></i>
                      <span>Annual labor savings</span>
                      <strong>{formatCurrency(annualLaborSavings)}</strong>
                    </article>
                  </div>

                  <div className="col-sm-6">
                    <article className="result-card">
                      <i className="bi bi-receipt"></i>
                      <span>Annual platform cost</span>
                      <strong>{formatCurrency(annualPlatformCost)}</strong>
                    </article>
                  </div>

                  <div className="col-sm-6">
                    <article className="result-card">
                      <i className="bi bi-calendar-check"></i>
                      <span>Estimated payback</span>
                      <strong>
                        {paybackMonths > 0
                          ? `${paybackMonths.toFixed(1)} months`
                          : "Not available"}
                      </strong>
                    </article>
                  </div>
                </div>

                <div className="calculator-note">
                  <i className="bi bi-info-circle"></i>
                  <p>
                    This calculator provides an academic estimate for
                    demonstration purposes. Actual savings and implementation
                    costs depend on business processes and selected modules.
                  </p>
                </div>

                <a href="#configurator" className="btn btn-neon w-100">
                  Configure Your Solution
                  <i className="bi bi-sliders ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveROICalculator;