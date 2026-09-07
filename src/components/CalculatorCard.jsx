import { Link } from "react-router-dom";
import CalculatorIcon from "./CalculatorIcon";

function CalculatorCard({ calculator }) {
  return (
    <article className="calculator-card">

      <div className="calculator-card-icon">
        <CalculatorIcon type={calculator.type} />
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