import { Link } from "react-router-dom";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title =
      "About CalculatorHub | Free Online Calculators";

    const description =
      "Learn about CalculatorHub, a free online calculator website providing simple and useful calculators for everyday calculations.";

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
          <span>About</span>
        </div>

        <header className="page-header">
          <span className="category-label">
            CalculatorHub
          </span>

          <h1>About CalculatorHub</h1>

          <p>
            Simple, useful, and free online calculators
            for everyday needs.
          </p>
        </header>

        <section className="content-section">
          <h2>What is CalculatorHub?</h2>

          <p>
            CalculatorHub is a free online collection
            of calculators designed to make common
            calculations quick and easy.
          </p>

          <p>
            The website brings together calculators for
            mathematics, finance, health, dates and time,
            unit conversions, construction, education,
            technology, and everyday calculations.
          </p>
        </section>

        <section className="content-section">
          <h2>Our Goal</h2>

          <p>
            Our goal is to provide simple calculators
            that are easy to understand and use on both
            desktop and mobile devices.
          </p>

          <p>
            Calculations are performed directly in your
            browser, making the tools fast and convenient.
          </p>
        </section>

        <section className="content-section">
          <h2>Explore Our Calculators</h2>

          <p>
            Browse our complete collection of free
            calculators and find the tool you need.
          </p>

          <Link
            className="calculator-card-button"
            to="/calculators"
          >
            View All Calculators →
          </Link>
        </section>

      </div>
    </main>
  );
}

export default About;