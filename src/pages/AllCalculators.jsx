import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useSearchParams } from "react-router-dom";

import calculators from "../data/calculators";
import CalculatorCard from "../components/CalculatorCard";
import AdSlot from "../components/AdSlot";
import {
  matchesCalculatorSearch,
  rankCalculatorSearch,
} from "../utils/calculatorSearch";

function AllCalculators() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialSearch =
    searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] =
    useState(initialSearch);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    document.title =
      "All Calculators - Free Online Calculators | CalculatorHub";

    const description =
      "Explore free online calculators for math, finance, health, date and time, conversions, construction, education, technology, and everyday calculations.";

    let metaDescription =
      document.querySelector(
        'meta[name="description"]'
      );

    if (!metaDescription) {
      metaDescription =
        document.createElement("meta");

      metaDescription.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        metaDescription
      );
    }

    metaDescription.setAttribute(
      "content",
      description
    );

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

      document.head.appendChild(
        canonical
      );
    }

    canonical.setAttribute(
      "href",
      `${window.location.origin}/calculators`
    );
  }, []);

  useEffect(() => {
    const urlSearch =
      searchParams.get("search") || "";

    setSearchTerm(urlSearch);
  }, [searchParams]);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          calculators.map(
            (calculator) =>
              calculator.category
          )
        )
      ),
    ];
  }, []);

  const filteredCalculators = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return calculators
      .filter((calculator) => {
        const matchesCategory =
          selectedCategory === "All" ||
          calculator.category === selectedCategory;

        return (
          matchesCategory &&
          matchesCalculatorSearch(calculator, search)
        );
      })
      .sort(
        (a, b) =>
          rankCalculatorSearch(b, search) -
          rankCalculatorSearch(a, search)
      );
  }, [
    searchTerm,
    selectedCategory,
  ]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    const nextParams =
      new URLSearchParams(
        searchParams
      );

    if (value.trim()) {
      nextParams.set(
        "search",
        value.trim()
      );
    } else {
      nextParams.delete("search");
    }

    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");

    setSearchParams({});
  };

  return (
    <main className="all-calculators-page">
      <div className="page-container">

        <div className="breadcrumbs">
          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            All Calculators
          </span>
        </div>

        <header className="page-header">

          <span className="category-label">
            CalculatorHub
          </span>

          <h1>
            All Calculators
          </h1>

          <p>
            Find the right free online
            calculator for math, finance,
            health, conversions,
            construction, education,
            technology, and everyday
            calculations.
          </p>

        </header>

        <AdSlot />

        <section className="calculator-filters">

          <div className="search-wrapper">

            <label htmlFor="calculator-search">
              Search Calculators
            </label>

            <input
              id="calculator-search"
              type="search"
              value={searchTerm}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value
                )
              }
              placeholder="Search for a calculator..."
              aria-label="Search calculators"
            />

          </div>

          <div className="category-filter">

            <label htmlFor="calculator-category">
              Category
            </label>

            <select
              id="calculator-category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(
                  event.target.value
                )
              }
            >

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}

            </select>

          </div>

        </section>

        <section className="calculator-results">

          <div className="category-results-header">

            <h2>
              {filteredCalculators.length}{" "}
              {filteredCalculators.length ===
              1
                ? "Calculator"
                : "Calculators"}
            </h2>

            {(searchTerm ||
              selectedCategory !==
                "All") && (
              <button
                type="button"
                onClick={
                  clearFilters
                }
              >
                Clear Filters
              </button>
            )}

          </div>

          {filteredCalculators.length >
          0 ? (
            <div className="calculator-grid">

              {filteredCalculators.map(
                (calculator) => (
                  <CalculatorCard
                    key={
                      calculator.slug
                    }
                    calculator={
                      calculator
                    }
                  />
                )
              )}

            </div>
          ) : (
            <div className="empty-state">

              <h2>
                No Calculators Found
              </h2>

              <p>
                We couldn't find a
                calculator matching
                your search. Try
                another keyword or
                category.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
              >
                Show All Calculators
              </button>

            </div>
          )}

        </section>

        <AdSlot />

        <section className="calculator-information">

          <h2>
            Free Online Calculators
          </h2>

          <p>
            CalculatorHub provides a
            growing collection of free
            online calculators designed
            to make everyday calculations
            quick and simple.
          </p>

          <p>
            You can calculate percentages,
            loans, GST, discounts, BMI,
            age, dates, unit conversions,
            construction quantities,
            grades, GPA, binary values,
            and many other common
            calculations.
          </p>

          <p>
            Choose a calculator above to
            open its dedicated page and
            enter your values. Calculations
            are performed directly in your
            browser.
          </p>

        </section>

        <AdSlot />

      </div>
    </main>
  );
}

export default AllCalculators;