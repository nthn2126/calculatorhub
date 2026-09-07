import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import calculators from "../data/calculators";
import CalculatorIcon from "./CalculatorIcon";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Search({ onNavigate }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return calculators
      .filter((calculator) => {
        return (
          calculator.name
            .toLowerCase()
            .includes(search) ||
          calculator.description
            .toLowerCase()
            .includes(search) ||
          calculator.category
            .toLowerCase()
            .includes(search)
        );
      })
      .slice(0, 6);
  }, [query]);

  const openCalculator = (calculator) => {
    navigate(
      `/calculators/${calculator.slug}`
    );

    setQuery("");
    setFocused(false);

    if (onNavigate) {
      onNavigate();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const search = query.trim().toLowerCase();

    if (!search) {
      navigate("/calculators");
      return;
    }

    const exactMatch = calculators.find(
      (calculator) =>
        calculator.name.toLowerCase() === search ||
        calculator.slug.toLowerCase() === search
    );

    if (exactMatch) {
      openCalculator(exactMatch);
      return;
    }

    navigate(
      `/calculators?search=${encodeURIComponent(
        query.trim()
      )}`
    );

    setFocused(false);

    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className="search-component">

      <form
        className="search-form"
        onSubmit={handleSubmit}
      >
        <div className="search-input-wrapper">

          <span
            className="search-icon"
            aria-hidden="true"
          >
            <SearchIcon />
          </span>

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            onFocus={() => setFocused(true)}
            placeholder="Search calculators..."
            aria-label="Search calculators"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </form>

      {focused &&
        query.trim() &&
        suggestions.length > 0 && (
          <div className="search-suggestions">

            {suggestions.map((calculator) => (
              <button
                type="button"
                key={calculator.slug}
                className="search-suggestion"
                onMouseDown={(event) =>
                  event.preventDefault()
                }
                onClick={() =>
                  openCalculator(calculator)
                }
              >
                <span className="search-suggestion-icon">
                  <CalculatorIcon
                    type={calculator.type}
                  />
                </span>

                <span className="search-suggestion-content">
                  <strong>
                    {calculator.name}
                  </strong>

                  <small>
                    {calculator.category}
                  </small>
                </span>
              </button>
            ))}

            <button
              type="button"
              className="search-view-all"
              onMouseDown={(event) =>
                event.preventDefault()
              }
              onClick={() => {
                navigate(
                  `/calculators?search=${encodeURIComponent(
                    query.trim()
                  )}`
                );

                setFocused(false);

                if (onNavigate) {
                  onNavigate();
                }
              }}
            >
              View all search results →
            </button>

          </div>
        )}

      {focused &&
        query.trim() &&
        suggestions.length === 0 && (
          <div className="search-no-results">

            <span className="search-no-results-icon">
              <SearchIcon />
            </span>

            <p>
              No calculator found for "{query}".
            </p>

            <button
              type="button"
              onMouseDown={(event) =>
                event.preventDefault()
              }
              onClick={() => {
                navigate(
                  `/calculators?search=${encodeURIComponent(
                    query.trim()
                  )}`
                );

                setFocused(false);

                if (onNavigate) {
                  onNavigate();
                }
              }}
            >
              Search all calculators
            </button>

          </div>
        )}

    </div>
  );
}

export default Search;