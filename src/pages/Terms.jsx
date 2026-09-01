import { Link } from "react-router-dom";
import { useEffect } from "react";

function Terms() {
  useEffect(() => {
    document.title =
      "Terms of Use | CalculatorHub";

    const description =
      "Read the CalculatorHub terms of use for information about using our free online calculators and website.";

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
          <span>Terms of Use</span>
        </div>

        <header className="page-header">
          <span className="category-label">
            CalculatorHub
          </span>

          <h1>Terms of Use</h1>

          <p>
            Please read these terms before using
            CalculatorHub.
          </p>
        </header>

        <section className="content-section">
          <h2>Use of the Website</h2>

          <p>
            CalculatorHub provides online calculators
            and informational content for general
            informational and educational purposes.
          </p>

          <p>
            You may use the calculators for personal,
            educational, and general informational
            purposes.
          </p>
        </section>

        <section className="content-section">
          <h2>Accuracy of Calculations</h2>

          <p>
            We make reasonable efforts to provide
            useful and accurate calculators. However,
            CalculatorHub does not guarantee that every
            calculation or result will always be
            completely accurate or suitable for a
            particular purpose.
          </p>

          <p>
            You should independently verify important
            financial, medical, legal, engineering,
            construction, or other critical calculations
            before relying on them.
          </p>
        </section>

        <section className="content-section">
          <h2>No Professional Advice</h2>

          <p>
            CalculatorHub does not provide financial,
            medical, legal, engineering, tax, or other
            professional advice through its calculators.
          </p>
        </section>

        <section className="content-section">
          <h2>External Services</h2>

          <p>
            The website may contain advertisements or
            links to third-party services. CalculatorHub
            is not responsible for the content or
            practices of third-party websites.
          </p>
        </section>

        <section className="content-section">
          <h2>Changes to These Terms</h2>

          <p>
            We may update these Terms of Use when
            necessary. Continued use of the website
            after changes are published means you
            accept the updated terms.
          </p>
        </section>

        <section className="content-section">
          <h2>Contact</h2>

          <p>
            If you have questions about these terms,
            please contact us.
          </p>

          <Link to="/contact">
            Contact Us →
          </Link>
        </section>

      </div>
    </main>
  );
}

export default Terms;