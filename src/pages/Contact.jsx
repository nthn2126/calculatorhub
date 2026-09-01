import { Link } from "react-router-dom";
import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title =
      "Contact CalculatorHub";

    const description =
      "Contact CalculatorHub for questions, feedback, suggestions, or website-related inquiries.";

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
          <span>Contact</span>
        </div>

        <header className="page-header">
          <span className="category-label">
            CalculatorHub
          </span>

          <h1>Contact Us</h1>

          <p>
            Have a question, suggestion, or problem?
            We'd love to hear from you.
          </p>
        </header>

        <section className="content-section">
          <h2>Get in Touch</h2>

          <p>
            If you have feedback about one of our
            calculators or suggestions for a new
            calculator, you can contact the
            CalculatorHub team.
          </p>

          <div className="contact-card">
            <h3>Email</h3>

            <p>
              For general questions and website
              feedback, please contact us by email.
            </p>

            <a href="mailto:contact@calculatorhub.com">
              contact@calculatorhub.com
            </a>
          </div>
        </section>

        <section className="content-section">
          <h2>Calculator Suggestions</h2>

          <p>
            If there is a calculator you would like
            us to add, please tell us the calculator
            name and what you would like it to
            calculate.
          </p>
        </section>

      </div>
    </main>
  );
}

export default Contact;