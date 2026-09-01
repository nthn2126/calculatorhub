import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-main">

          <div className="footer-brand">
            <Link
              to="/"
              className="footer-logo"
            >
              <span className="footer-logo-icon">
                🧮
              </span>

              <span>
                CalculatorHub
              </span>
            </Link>

            <p>
              Free online calculators for math,
              finance, health, conversions,
              construction, education,
              technology, and everyday calculations.
            </p>
          </div>

          <div className="footer-column">
            <h3>Calculators</h3>

            <Link to="/calculators">
              All Calculators
            </Link>

            <Link to="/category/math">
              Math Calculators
            </Link>

            <Link to="/category/finance">
              Finance Calculators
            </Link>

            <Link to="/category/health">
              Health Calculators
            </Link>
          </div>

          <div className="footer-column">
            <h3>Popular Tools</h3>

            <Link to="/calculators/basic-calculator">
              Basic Calculator
            </Link>

            <Link to="/calculators/scientific-calculator">
              Scientific Calculator
            </Link>

            <Link to="/calculators/bmi-calculator">
              BMI Calculator
            </Link>

            <Link to="/calculators/gst-calculator">
              GST Calculator
            </Link>
          </div>

          <div className="footer-column">
            <h3>Information</h3>

            <Link to="/about">
              About Us
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms of Use
            </Link>
          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {currentYear} CalculatorHub.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy-policy">
              Privacy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/contact">
              Contact
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;