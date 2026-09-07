import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import calculators from "../data/calculators";
import CalculatorEngine from "../calculators/CalculatorEngine";
import CalculatorCard from "../components/CalculatorCard";
import Breadcrumbs from "../components/Breadcrumbs";
import FAQ from "../components/FAQ";
import AdSlot from "../components/AdSlot";
import { getCalculatorGuide } from "../data/calculatorGuides";

function normalizeCategorySlug(category) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CalculatorPage() {
  const { slug } = useParams();

  const calculator = useMemo(() => {
    return calculators.find(
      (item) => item.slug === slug
    );
  }, [slug]);

  const relatedCalculators = useMemo(() => {
    if (!calculator) {
      return [];
    }

    return calculators
      .filter(
        (item) =>
          item.category === calculator.category &&
          item.slug !== calculator.slug
      )
      .slice(0, 4);
  }, [calculator]);

  const guide = calculator
    ? getCalculatorGuide(calculator.type)
    : null;

  const faqItems = useMemo(() => {
    if (!calculator) {
      return [];
    }

    return [
      {
        question: `What is the ${calculator.name}?`,
        answer: calculator.description,
      },
      {
        question: `How do I use the ${calculator.name}?`,
        answer: `Enter the required values into the calculator and select the calculate button. The result will be displayed instantly.`,
      },
      {
        question: `Is the ${calculator.name} free to use?`,
        answer:
          "Yes. CalculatorHub provides free online calculators that can be used without registration.",
      },
      {
        question: `Can I use this calculator on my phone?`,
        answer:
          "Yes. CalculatorHub calculators are designed to work on smartphones, tablets, laptops, and desktop computers.",
      },
    ];
  }, [calculator]);

  useEffect(() => {
    if (!calculator) {
      document.title = "Calculator Not Found | CalculatorHub";
      return;
    }

    const title = `${calculator.name} | Free Online Calculator`;

    const description =
      calculator.description ||
      `Use our free ${calculator.name} online. Get accurate results instantly with CalculatorHub.`;

    document.title = title;

    const setMeta = (
      name,
      content
    ) => {
      let element = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!element) {
        element =
          document.createElement("meta");

        element.setAttribute("name", name);

        document.head.appendChild(element);
      }

      element.setAttribute(
        "content",
        content
      );
    };

    const setProperty = (
      property,
      content
    ) => {
      let element = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!element) {
        element =
          document.createElement("meta");

        element.setAttribute(
          "property",
          property
        );

        document.head.appendChild(element);
      }

      element.setAttribute(
        "content",
        content
      );
    };

    setMeta(
      "description",
      description
    );

    setMeta(
      "robots",
      "index, follow"
    );

    setProperty(
      "og:title",
      title
    );

    setProperty(
      "og:description",
      description
    );

    setProperty(
      "og:type",
      "website"
    );

    setProperty(
      "og:url",
      window.location.href
    );

    setProperty(
      "og:site_name",
      "CalculatorHub"
    );

    setMeta(
      "twitter:card",
      "summary"
    );

    setMeta(
      "twitter:title",
      title
    );

    setMeta(
      "twitter:description",
      description
    );

    const canonicalUrl =
      `${window.location.origin}/calculators/${calculator.slug}`;

    let canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (!canonical) {
      canonical =
        document.createElement("link");

      canonical.setAttribute(
        "rel",
        "canonical"
      );

      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      canonicalUrl
    );

    const schemaId =
      "calculator-page-schema";

    let schema =
      document.getElementById(
        schemaId
      );

    if (!schema) {
      schema =
        document.createElement("script");

      schema.id = schemaId;
      schema.type =
        "application/ld+json";

      document.head.appendChild(schema);
    }

    schema.textContent =
      JSON.stringify({
        "@context":
          "https://schema.org",

        "@type":
          "WebApplication",

        name:
          calculator.name,

        description,

        applicationCategory:
          "UtilitiesApplication",

        operatingSystem:
          "All",

        url:
          canonicalUrl,

        offers: {
          "@type":
            "Offer",

          price:
            "0",

          priceCurrency:
            "USD",
        },

        isAccessibleForFree:
          true,
      });

    return () => {
      const existingSchema =
        document.getElementById(
          schemaId
        );

      if (existingSchema) {
        existingSchema.remove();
      }
    };
  }, [calculator]);

  if (!calculator) {
    return (
      <main className="page-container">
        <div className="not-found">

          <div
            className="calculator-card-icon"
            aria-hidden="true"
          >
            ?
          </div>

          <h1>
            Calculator Not Found
          </h1>

          <p>
            We couldn't find the calculator
            you're looking for.
          </p>

          <Link to="/calculators">
            Browse All Calculators
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="calculator-page">

      <div className="page-container">

        {/* Breadcrumbs */}

        <Breadcrumbs
          items={[
            {
              label: "Home",
              path: "/",
            },
            {
              label: "Calculators",
              path: "/calculators",
            },
            {
              label: calculator.category,
              path: `/category/${normalizeCategorySlug(calculator.category)}`,
            },
            {
              label: calculator.name,
            },
          ]}
        />


        {/* Calculator Header */}

        <header className="calculator-page-header">

          <span className="category-label">
            {calculator.category} Calculator
          </span>

          <h1>
            {calculator.name}
          </h1>

          <p>
            {calculator.description}
          </p>

        </header>


        {/* Top Advertisement */}

        <AdSlot />


        {/* Calculator */}

        <section
          className="calculator-wrapper"
          aria-label={`${calculator.name} calculator`}
        >
          <CalculatorEngine
            calculator={calculator}
          />
        </section>


        {/* Short explanation */}

        <section className="content-section">

          <div className="content-page-inner">

            <h2>
              About the {calculator.name}
            </h2>

            <p>
              The {calculator.name} is a free
              online tool designed to help you
              calculate results quickly and
              conveniently.
            </p>

            <p>
              Enter the required information
              into the calculator above and
              use the calculate button to get
              your result instantly.
            </p>

          </div>

        </section>

        {/* Formula and worked example */}

        <section className="content-section calculator-guide">
          <div className="content-page-inner">
            <h2>Formula and Calculation</h2>

            <div className="calculator-guide-grid">
              <div>
                <h3>Formula</h3>
                <p>{guide.formula}</p>
              </div>

              <div>
                <h3>Worked example</h3>
                <p>{guide.example}</p>
              </div>
            </div>

            <h3>What the result means</h3>
            <p>{guide.meaning}</p>
          </div>
        </section>


        {/* How to use */}

        <section className="content-section">

          <div className="content-page-inner">

            <h2>
              How to Use the{" "}
              {calculator.name}
            </h2>

            <ol>

              <li>
                Enter the required values
                into the calculator.
              </li>

              <li>
                Check that the entered
                information is correct.
              </li>

              <li>
                Select the calculate button.
              </li>

              <li>
                Review the result displayed
                by the calculator.
              </li>

            </ol>

          </div>

        </section>


        {/* Middle Advertisement */}

        <AdSlot />


        {/* FAQ */}

        <FAQ
          items={faqItems}
        />


        {/* Related Calculators */}

        {relatedCalculators.length > 0 && (
          <section className="related-calculators">

            <div className="section-header">

              <div>
                <h2>
                  Related Calculators
                </h2>

                <p>
                  Explore more free{" "}
                  {calculator.category.toLowerCase()}{" "}
                  calculators.
                </p>
              </div>

              <Link to="/calculators">
                View All
              </Link>

            </div>

            <div className="calculator-grid">

              {relatedCalculators.map(
                (related) => (
                  <CalculatorCard
                    key={related.slug}
                    calculator={related}
                  />
                )
              )}

            </div>

          </section>
        )}


        {/* Bottom Advertisement */}

        <AdSlot />

      </div>

    </main>
  );
}

export default CalculatorPage;