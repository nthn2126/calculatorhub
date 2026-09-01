import { useState } from "react";

function BasicCalculator() {
  const [display, setDisplay] = useState("0");

  const handleInput = (value) => {
    if (value === "C") {
      setDisplay("0");
      return;
    }

    if (value === "⌫") {
      setDisplay((current) =>
        current.length > 1 ? current.slice(0, -1) : "0"
      );
      return;
    }

    if (value === "=") {
      try {
        const expression = display
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");

        const result = Function(`"use strict"; return (${expression})`)();

        if (Number.isFinite(result)) {
          setDisplay(String(result));
        } else {
          setDisplay("Error");
        }
      } catch {
        setDisplay("Error");
      }

      return;
    }

    if (display === "0" || display === "Error") {
      setDisplay(value);
    } else {
      setDisplay((current) => current + value);
    }
  };

  const buttons = [
    "C",
    "⌫",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "−",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <section className="calculator basic-calculator">
      <div className="calculator-display">{display}</div>

      <div className="calculator-buttons">
        {buttons.map((button) => (
          <button
            key={button}
            type="button"
            onClick={() => handleInput(button)}
            className={
              button === "="
                ? "calculator-button equals"
                : button === "C" || button === "⌫"
                  ? "calculator-button action"
                  : "calculator-button"
            }
          >
            {button}
          </button>
        ))}
      </div>
    </section>
  );
}

export default BasicCalculator;