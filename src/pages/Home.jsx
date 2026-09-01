import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import calculators from "../data/calculators";
import CalculatorCard from "../components/CalculatorCard";
import AdSlot from "../components/AdSlot";

function Home() {
  const [search, setSearch] = useState("");

  const basicCalculator = calculators.find(
    (calculator) => calculator.slug === "basic-calculator"
  );

  const scientificCalculator = calculators.find(
    (calculator) => calculator.slug === "scientific-calculator"
  );

  const popularCalculators = calculators
    .filter(
      (calculator) =>
        calculator.slug !== "basic-calculator" &&
        calculator.slug !== "scientific-calculator"
    )
    .slice(0, 12);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return calculators
      .filter(
        (calculator) =>
          calculator.name.toLowerCase().includes(query) ||
          calculator.category.toLowerCase().includes(query) ||
          calculator.description.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [search]);

  return (
    <main className="home-page">

      {/* HERO */}

      <section className="hero-section">
        <div className="page-container">

          <span className="hero-badge">
            Free Online Calculators
          </span>

          <h1>
            Every Calculator You Need,
            <br />
            In One Place
          </h1>

          <p>
            Calculate, convert, compare, and solve everyday
            problems with fast and free online calculators.
          </p>

          

        </div>
      </section>

      <AdSlot />

      {/* MAIN CALCULATORS */}

      <section className="main-calculators-section">
        <div className="page-container">

          <div className="section-heading">
            <div>
              <span>Start calculating</span>

              <h2>
                Our Main Calculators
              </h2>

              <p>
                Powerful calculators ready to use instantly.
              </p>
            </div>
          </div>

          <div className="main-calculator-grid">

            {basicCalculator && (
              <CalculatorCard
                calculator={basicCalculator}
              />
            )}

            {scientificCalculator && (
              <CalculatorCard
                calculator={scientificCalculator}
              />
            )}

          </div>

        </div>
      </section>

      <AdSlot />

      {/* POPULAR */}

      <section className="popular-section">
        <div className="page-container">

          <div className="section-heading">
            <div>
              <span>Explore more</span>

              <h2>
                Popular Calculators
              </h2>

              <p>
                Quickly access some of our most useful
                calculators.
              </p>
            </div>

            <Link
              className="view-all-link"
              to="/calculators"
            >
              View All →
            </Link>
          </div>

          <div className="calculator-grid">

            {popularCalculators.map((calculator) => (
              <CalculatorCard
                key={calculator.slug}
                calculator={calculator}
              />
            ))}

          </div>

        </div>
      </section>

      <AdSlot />

      {/* CATEGORIES */}

      <section className="categories-section">
        <div className="page-container">

          <div className="section-heading centered">
            <span>Find the right tool</span>

            <h2>
              Calculator Categories
            </h2>

            <p>
              Browse calculators by what you need to calculate.
            </p>
          </div>

          <div className="category-grid">

            {[
              ["Math", "➗", "Math and number calculators"],
              ["Finance", "💰", "Money and financial calculators"],
              ["Health", "❤️", "Health and fitness calculators"],
              ["Date & Time", "📅", "Date and time calculators"],
              ["Conversion", "🔄", "Unit and measurement converters"],
              ["Everyday", "🏠", "Useful everyday calculators"],
              ["Construction", "🏗️", "Construction and measurement tools"],
              ["Education", "🎓", "Student and education calculators"],
              ["Technology", "💻", "Technology and developer tools"],
            ].map(([name, icon, description]) => (
              <Link
                key={name}
                to={`/category/${name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="category-card"
              >
                <span className="category-icon">
                  {icon}
                </span>

                <h3>{name}</h3>

                <p>{description}</p>

                <span className="category-arrow">
                  →
                </span>
              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* FINAL CTA */}

      <section className="home-cta">
        <div className="page-container">

          <h2>
            Can't find what you're looking for?
          </h2>

          <p>
            Browse our complete collection of calculators.
          </p>

          <Link
            to="/calculators"
            className="primary-button"
          >
            Explore All Calculators
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;