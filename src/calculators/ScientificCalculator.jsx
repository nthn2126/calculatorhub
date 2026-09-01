import { useState } from "react";

function ScientificCalculator() {
  const [display, setDisplay] = useState("0");

  const calculate = (value) => {
    try {
      const expression = value
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/√/g, "Math.sqrt")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(");

      const result = Function(`"use strict"; return (${expression})`)();

      if (Number.isFinite(result)) {
        setDisplay(String(result));
      } else {
        setDisplay("Error");
      }
    } catch {
      setDisplay("Error");
    }
  };

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
      calculate(display);
      return;
    }

    if (value === "√") {
      calculate(`√(${display})`);
      return;
    }

    if (value === "sin") {
      calculate(`sin(${display})`);
      return;
    }

    if (value === "cos") {
      calculate(`cos(${display})`);
      return;
    }

    if (value === "tan") {
      calculate(`tan(${display})`);
      return;
    }

    if (value === "log") {
      calculate(`log(${display})`);
      return;
    }

    if (value === "ln") {
      calculate(`ln(${display})`);
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
    "(",
    ")",
    "÷",
    "sin",
    "7",
    "8",
    "9",
    "×",
    "cos",
    "4",
    "5",
    "6",
    "−",
    "tan",
    "1",
    "2",
    "3",
    "+",
    "√",
    "0",
    ".",
    "π",
    "log",
    "ln",
    "=",
  ];

  return (
    <section className="calculator scientific-calculator">
      <div className="calculator-display">{display}</div>

      <div className="calculator-buttons scientific-buttons">
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

export default ScientificCalculator;