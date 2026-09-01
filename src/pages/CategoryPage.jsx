import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import calculators from "../data/calculators";
import CalculatorCard from "../components/CalculatorCard";
import AdSlot from "../components/AdSlot";

function CategoryPage() {
  const { category } = useParams();

  const categoryMap = {
    math: "Math",
    finance: "Finance",
    health: "Health",
    "date-time": "Date & Time",
    conversion: "Conversion",
    everyday: "Everyday",
    construction: "Construction",
    education: "Education",
    technology: "Technology",
  };

  const categoryName =
    categoryMap[category?.toLowerCase()] || "";

  const categoryCalculators = useMemo(() => {
    return calculators.filter(
      (calculator) =>
        calculator.category.toLowerCase() ===
        categoryName.toLowerCase()
    );
  }, [categoryName]);

  if (!categoryCalculators.length) {
    return (
      <main className="page-container">
        <div className="not-found">
          <h1>Category Not Found</h1>

          <p>
            We couldn't find this calculator category.
          </p>

          <Link to="/calculators">
            View All Calculators
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="category-page">

      <div className="page-container">

        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{categoryName}</span>
        </div>

        <header className="category-header">

          <span className="category-label">
            Calculator Category
          </span>

          <h1>
            {categoryName} Calculators
          </h1>

          <p>
            Explore our free{" "}
            {categoryName.toLowerCase()}{" "}
            calculators and tools.
          </p>

        </header>

        <AdSlot />

        <div className="category-results-header">

          <h2>
            {categoryCalculators.length}{" "}
            {categoryCalculators.length === 1
              ? "Calculator"
              : "Calculators"}
          </h2>

        </div>

        <div className="calculator-grid">

          {categoryCalculators.map((calculator) => (
            <CalculatorCard
              key={calculator.slug}
              calculator={calculator}
            />
          ))}

        </div>

        <AdSlot />

      </div>

    </main>
  );
}

export default CategoryPage;