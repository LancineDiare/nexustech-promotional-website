// Import React's StrictMode to detect possible development problems.
import { StrictMode } from "react";

// Import ReactDOM to display the application in the browser.
import { createRoot } from "react-dom/client";

// Import Bootstrap's responsive CSS framework.
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap's JavaScript features.
// This enables interactive components such as modals and dropdowns.
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import the Bootstrap Icons collection.
import "bootstrap-icons/font/bootstrap-icons.css";

// Import the custom styles used throughout the website.
import "./styles/global.css";

// Import the main application component.
import App from "./App.jsx";

// Connect the React application to the HTML element with the ID "root".
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

