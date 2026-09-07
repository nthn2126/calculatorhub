import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "./Search";

function CalculatorIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="2.5"
        width="16"
        height="19"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <rect
        x="7"
        y="5.5"
        width="10"
        height="3"
        rx="0.8"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="8"
        cy="12"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="12"
        cy="12"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="16"
        cy="12"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="8"
        cy="16"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="12"
        cy="16"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="16"
        cy="16"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="8"
        cy="19"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="12"
        cy="19"
        r="0.9"
        fill="currentColor"
      />

      <circle
        cx="16"
        cy="19"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(
      "calculatorhub-theme"
    );

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "ocean"
    ) {
      return savedTheme;
    }

    return (
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    )
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "calculatorhub-theme",
      theme
    );
  }, [theme]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const cycleTheme = () => {
    setTheme((current) => {
      if (current === "light") {
        return "dark";
      }

      if (current === "dark") {
        return "ocean";
      }

      return "light";
    });
  };

  const themeDetails = {
    light: {
      label: "Light",
      icon: "☀",
      next: "dark",
    },
    dark: {
      label: "Dark",
      icon: "☾",
      next: "ocean",
    },
    ocean: {
      label: "Ocean",
      icon: "🌊",
      next: "light",
    },
  }[theme];

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="navbar-container">

          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
            aria-label="CalculatorHub Home"
          >
            <span className="navbar-logo-icon">
              <CalculatorIcon />
            </span>

            <span className="navbar-logo-text">
              CalculatorHub
            </span>
          </Link>

          <button
            type="button"
            className="navbar-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            className={`navbar-content ${
              menuOpen
                ? "navbar-content-open"
                : ""
            }`}
          >

            <div className="navbar-links">

              <Link
                to="/"
                className={
                  isActive("/")
                    ? "navbar-link active"
                    : "navbar-link"
                }
                onClick={closeMenu}
              >
                Home
              </Link>

              <Link
                to="/calculators"
                className={
                  isActive("/calculators")
                    ? "navbar-link active"
                    : "navbar-link"
                }
                onClick={closeMenu}
              >
                All Calculators
              </Link>

              <Link
                to="/category/math"
                className={
                  isActive("/category/math")
                    ? "navbar-link active"
                    : "navbar-link"
                }
                onClick={closeMenu}
              >
                Math
              </Link>

              <Link
                to="/category/finance"
                className={
                  isActive("/category/finance")
                    ? "navbar-link active"
                    : "navbar-link"
                }
                onClick={closeMenu}
              >
                Finance
              </Link>

              <Link
                to="/category/health"
                className={
                  isActive("/category/health")
                    ? "navbar-link active"
                    : "navbar-link"
                }
                onClick={closeMenu}
              >
                Health
              </Link>

            </div>

            <div className="navbar-actions">

              <div className="navbar-search">
                <Search
                  onNavigate={closeMenu}
                />
              </div>

              <button
                type="button"
                className="theme-toggle"
                onClick={cycleTheme}
                aria-label={`Switch to ${themeDetails.next} theme`}
                title={`Switch to ${themeDetails.next} theme`}
              >
                <span
                  className="theme-toggle-icon"
                  aria-hidden="true"
                >
                  {themeDetails.icon}
                </span>

                <span className="theme-toggle-text">
                  {themeDetails.label}
                </span>
              </button>

            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;