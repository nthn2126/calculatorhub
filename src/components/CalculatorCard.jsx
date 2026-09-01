import { Link } from "react-router-dom";

function CalculatorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="4.5"
        y="2.5"
        width="15"
        height="19"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="7.5"
        y="5.5"
        width="9"
        height="3"
        rx="0.7"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <circle
        cx="8.5"
        cy="12.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="12"
        cy="12.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="15.5"
        cy="12.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="8.5"
        cy="16.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="12"
        cy="16.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="15.5"
        cy="16.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="8.5"
        cy="19.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="12"
        cy="19.5"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="15.5"
        cy="19.5"
        r="0.8"
        fill="currentColor"
      />
    </svg>
  );
}

function CalculatorCard({ calculator }) {
  return (
    <article className="calculator-card">

      <div className="calculator-card-icon">
        <CalculatorIcon />
      </div>

      <div className="calculator-card-content">

        <span className="calculator-card-category">
          {calculator.category}
        </span>

        <h3>
          <Link
            to={`/calculators/${calculator.slug}`}
          >
            {calculator.name}
          </Link>
        </h3>

        <p>
          {calculator.description}
        </p>

        <Link
          className="calculator-card-button"
          to={`/calculators/${calculator.slug}`}
        >
          Use Calculator →
        </Link>

      </div>

    </article>
  );
}

export default CalculatorCard;