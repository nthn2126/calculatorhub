import { Link } from "react-router-dom";
import { useEffect } from "react";

function PrivacyPolicy() {
  useEffect(() => {
    document.title =
      "Privacy Policy | CalculatorHub";

    const description =
      "Read the CalculatorHub privacy policy to understand how information is handled when you use our website.";

    let meta = document.querySelector(
      'meta[name="description"]'
    );

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", description);
  }, []);

  return (
    <main className="page-container">
      <div className="content-page">

        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Privacy Policy</span>
        </div>

        <header className="page-header">
          <span className="category-label">
            CalculatorHub
          </span>

          <h1>Privacy Policy</h1>

          <p>
            Your privacy is important to us.
          </p>
        </header>

        <section className="content-section">
          <h2>Introduction</h2>

          <p>
            This Privacy Policy explains how
            CalculatorHub handles information when
            visitors use this website.
          </p>
        </section>

        <section className="content-section">
          <h2>Information We Collect</h2>

          <p>
            CalculatorHub calculators are designed
            to perform calculations directly in your
            browser. We do not require you to create
            an account to use our calculators.
          </p>

          <p>
            Some information may be collected
            automatically by standard website
            technologies, analytics services, hosting
            providers, or advertising services.
          </p>
        </section>

        <section className="content-section">
          <h2>Cookies</h2>

          <p>
            CalculatorHub may use cookies and similar
            technologies to improve website functionality,
            understand website usage, and support
            advertising.
          </p>
        </section>

        <section className="content-section">
          <h2>Advertising</h2>

          <p>
            We may display advertisements from
            third-party advertising providers such as
            Google AdSense.
          </p>

          <p>
            Advertising providers may use cookies or
            similar technologies to provide and measure
            advertisements.
          </p>
        </section>

        <section className="content-section">
          <h2>Third-Party Services</h2>

          <p>
            Third-party services used by the website
            may have their own privacy policies and
            practices. We recommend reviewing their
            policies where applicable.
          </p>
        </section>

        <section className="content-section">
          <h2>Changes to This Policy</h2>

          <p>
            We may update this Privacy Policy from
            time to time. Changes will be reflected
            on this page.
          </p>
        </section>

        <section className="content-section">
          <h2>Contact</h2>

          <p>
            If you have questions about this Privacy
            Policy, please contact us through our
            Contact page.
          </p>

          <Link to="/contact">
            Contact Us →
          </Link>
        </section>

      </div>
    </main>
  );
}

export default PrivacyPolicy;