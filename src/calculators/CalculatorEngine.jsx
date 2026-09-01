import { useState } from "react";

import BasicCalculator from "./BasicCalculator";
import ScientificCalculator from "./ScientificCalculator";

/* =========================================================
   SHARED UI
========================================================= */

function Input({
  label,
  value,
  onChange,
  type = "number",
  placeholder = "",
  min,
  max,
  step,
}) {
  return (
    <label className="calculator-input-group">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="calculator-input-group">
      <span>{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="calculator-input-group">
      <span>{label}</span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows="4"
      />
    </label>
  );
}

function CalculateButton({
  onClick,
  children = "Calculate",
}) {
  return (
    <button
      type="button"
      className="calculate-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Result({ title = "Result", children }) {
  return (
    <div className="calculator-result">
      <strong>{title}</strong>

      <div className="calculator-result-value">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return Number(value).toLocaleString("en-IN", {
    maximumFractionDigits,
  });
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return `₹${Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function capitalize(value) {
  return value
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function gcd(a, b) {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a || 1;
}

/* =========================================================
   MATH CALCULATORS
========================================================= */

function PercentageCalculator() {
  const [number, setNumber] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const a = Number(number);
    const b = Number(percentage);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setResult(null);
      return;
    }

    setResult((a * b) / 100);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Number"
        value={number}
        onChange={setNumber}
        placeholder="500"
      />

      <Input
        label="Percentage (%)"
        value={percentage}
        onChange={setPercentage}
        placeholder="20"
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Result">
          {formatNumber(result)}
        </Result>
      )}
    </div>
  );
}

function FractionCalculator() {
  const [numerator1, setNumerator1] = useState("");
  const [denominator1, setDenominator1] = useState("");
  const [numerator2, setNumerator2] = useState("");
  const [denominator2, setDenominator2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);

  function calculate() {
    const n1 = Number(numerator1);
    const d1 = Number(denominator1);
    const n2 = Number(numerator2);
    const d2 = Number(denominator2);

    if (
      !Number.isFinite(n1) ||
      !Number.isFinite(d1) ||
      !Number.isFinite(n2) ||
      !Number.isFinite(d2) ||
      d1 === 0 ||
      d2 === 0
    ) {
      setResult(null);
      return;
    }

    let numerator;
    let denominator;

    if (operation === "+") {
      numerator = n1 * d2 + n2 * d1;
      denominator = d1 * d2;
    } else if (operation === "-") {
      numerator = n1 * d2 - n2 * d1;
      denominator = d1 * d2;
    } else if (operation === "*") {
      numerator = n1 * n2;
      denominator = d1 * d2;
    } else {
      if (n2 === 0) {
        setResult(null);
        return;
      }

      numerator = n1 * d2;
      denominator = d1 * n2;
    }

    if (denominator < 0) {
      numerator *= -1;
      denominator *= -1;
    }

    const divisor = gcd(numerator, denominator);

    setResult({
      numerator: numerator / divisor,
      denominator: denominator / divisor,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Numerator 1"
        value={numerator1}
        onChange={setNumerator1}
      />

      <Input
        label="Denominator 1"
        value={denominator1}
        onChange={setDenominator1}
      />

      <Select
        label="Operation"
        value={operation}
        onChange={setOperation}
        options={[
          { value: "+", label: "Add (+)" },
          { value: "-", label: "Subtract (-)" },
          { value: "*", label: "Multiply (×)" },
          { value: "/", label: "Divide (÷)" },
        ]}
      />

      <Input
        label="Numerator 2"
        value={numerator2}
        onChange={setNumerator2}
      />

      <Input
        label="Denominator 2"
        value={denominator2}
        onChange={setDenominator2}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <Result title="Result">
          {result.numerator}/{result.denominator}
        </Result>
      )}
    </div>
  );
}

function RatioCalculator() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const a = Number(first);
    const b = Number(second);

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      a === 0 ||
      b === 0
    ) {
      setResult(null);
      return;
    }

    const divisor = gcd(a, b);

    setResult({
      ratio: `${a / divisor}:${b / divisor}`,
      decimal: a / b,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="First Value"
        value={first}
        onChange={setFirst}
        placeholder="20"
      />

      <Input
        label="Second Value"
        value={second}
        onChange={setSecond}
        placeholder="30"
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Simplified Ratio">
            {result.ratio}
          </Result>

          <Result title="Ratio Value">
            {formatNumber(result.decimal)}
          </Result>
        </>
      )}
    </div>
  );
}

function AverageCalculator() {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const values = numbers
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));

    if (values.length === 0) {
      setResult(null);
      return;
    }

    const total = values.reduce(
      (sum, value) => sum + value,
      0
    );

    setResult(total / values.length);
  }

  return (
    <div className="calculator-form">
      <TextArea
        label="Numbers"
        value={numbers}
        onChange={setNumbers}
        placeholder="10, 20, 30, 40"
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Average">
          {formatNumber(result)}
        </Result>
      )}
    </div>
  );
}

function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const a = Number(base);
    const b = Number(exponent);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setResult(null);
      return;
    }

    setResult(Math.pow(a, b));
  }

  return (
    <div className="calculator-form">
      <Input
        label="Base"
        value={base}
        onChange={setBase}
        placeholder="2"
      />

      <Input
        label="Exponent"
        value={exponent}
        onChange={setExponent}
        placeholder="8"
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Result">
          {formatNumber(result)}
        </Result>
      )}
    </div>
  );
}

function SquareRootCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const value = Number(number);

    if (!Number.isFinite(value) || value < 0) {
      setResult(null);
      return;
    }

    setResult(Math.sqrt(value));
  }

  return (
    <div className="calculator-form">
      <Input
        label="Number"
        value={number}
        onChange={setNumber}
        placeholder="144"
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Square Root">
          {formatNumber(result)}
        </Result>
      )}
    </div>
  );
}

/* =========================================================
   FINANCE CALCULATORS
========================================================= */

function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const p = Number(principal);
    const annualRate = Number(rate);
    const y = Number(years);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(y) ||
      p <= 0 ||
      y <= 0
    ) {
      setResult(null);
      return;
    }

    const months = y * 12;
    const monthlyRate = annualRate / 100 / 12;

    let emi;

    if (monthlyRate === 0) {
      emi = p / months;
    } else {
      emi =
        (p *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - p;

    setResult({
      emi,
      totalPayment,
      totalInterest,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Loan Amount"
        value={principal}
        onChange={setPrincipal}
        placeholder="500000"
      />

      <Input
        label="Annual Interest Rate (%)"
        value={rate}
        onChange={setRate}
        placeholder="8.5"
      />

      <Input
        label="Loan Term (Years)"
        value={years}
        onChange={setYears}
        placeholder="5"
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Monthly EMI">
            {formatCurrency(result.emi)}
          </Result>

          <Result title="Total Interest">
            {formatCurrency(result.totalInterest)}
          </Result>

          <Result title="Total Payment">
            {formatCurrency(result.totalPayment)}
          </Result>
        </>
      )}
    </div>
  );
}

function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState("add");
  const [result, setResult] = useState(null);

  function calculate() {
    const value = Number(amount);
    const gstRate = Number(rate);

    if (
      !Number.isFinite(value) ||
      !Number.isFinite(gstRate) ||
      gstRate < 0
    ) {
      setResult(null);
      return;
    }

    if (mode === "add") {
      const gst = (value * gstRate) / 100;

      setResult({
        base: value,
        gst,
        total: value + gst,
      });
    } else {
      const base = value / (1 + gstRate / 100);
      const gst = value - base;

      setResult({
        base,
        gst,
        total: value,
      });
    }
  }

  return (
    <div className="calculator-form">
      <Input
        label="Amount"
        value={amount}
        onChange={setAmount}
        placeholder="10000"
      />

      <Input
        label="GST Rate (%)"
        value={rate}
        onChange={setRate}
        placeholder="18"
      />

      <Select
        label="Calculation"
        value={mode}
        onChange={setMode}
        options={[
          { value: "add", label: "Add GST" },
          { value: "remove", label: "Remove GST" },
        ]}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Base Amount">
            {formatCurrency(result.base)}
          </Result>

          <Result title="GST Amount">
            {formatCurrency(result.gst)}
          </Result>

          <Result title="Final Amount">
            {formatCurrency(result.total)}
          </Result>
        </>
      )}
    </div>
  );
}

function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const p = Number(price);
    const d = Number(discount);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(d) ||
      p < 0 ||
      d < 0
    ) {
      setResult(null);
      return;
    }

    const savings = (p * d) / 100;
    const finalPrice = p - savings;

    setResult({
      savings,
      finalPrice,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Original Price"
        value={price}
        onChange={setPrice}
        placeholder="2000"
      />

      <Input
        label="Discount (%)"
        value={discount}
        onChange={setDiscount}
        placeholder="20"
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Discount Amount">
            {formatCurrency(result.savings)}
          </Result>

          <Result title="Final Price">
            {formatCurrency(result.finalPrice)}
          </Result>
        </>
      )}
    </div>
  );
}

function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const p = Number(principal);
    const r = Number(rate);
    const t = Number(years);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(r) ||
      !Number.isFinite(t)
    ) {
      setResult(null);
      return;
    }

    const interest = (p * r * t) / 100;

    setResult({
      interest,
      total: p + interest,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Principal"
        value={principal}
        onChange={setPrincipal}
        placeholder="100000"
      />

      <Input
        label="Annual Interest Rate (%)"
        value={rate}
        onChange={setRate}
        placeholder="8"
      />

      <Input
        label="Time (Years)"
        value={years}
        onChange={setYears}
        placeholder="3"
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Simple Interest">
            {formatCurrency(result.interest)}
          </Result>

          <Result title="Total Amount">
            {formatCurrency(result.total)}
          </Result>
        </>
      )}
    </div>
  );
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState(null);

  function calculate() {
    const p = Number(principal);
    const r = Number(rate);
    const t = Number(years);
    const n = Number(frequency);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(r) ||
      !Number.isFinite(t) ||
      !Number.isFinite(n) ||
      n <= 0
    ) {
      setResult(null);
      return;
    }

    const amount =
      p * Math.pow(1 + r / 100 / n, n * t);

    setResult({
      interest: amount - p,
      amount,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Principal"
        value={principal}
        onChange={setPrincipal}
      />

      <Input
        label="Annual Interest Rate (%)"
        value={rate}
        onChange={setRate}
      />

      <Input
        label="Time (Years)"
        value={years}
        onChange={setYears}
      />

      <Select
        label="Compounding Frequency"
        value={frequency}
        onChange={setFrequency}
        options={[
          { value: "1", label: "Annually" },
          { value: "2", label: "Half-Yearly" },
          { value: "4", label: "Quarterly" },
          { value: "12", label: "Monthly" },
          { value: "365", label: "Daily" },
        ]}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Compound Interest">
            {formatCurrency(result.interest)}
          </Result>

          <Result title="Final Amount">
            {formatCurrency(result.amount)}
          </Result>
        </>
      )}
    </div>
  );
}

function ProfitCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const cost = Number(costPrice);
    const selling = Number(sellingPrice);

    if (
      !Number.isFinite(cost) ||
      !Number.isFinite(selling) ||
      cost <= 0
    ) {
      setResult(null);
      return;
    }

    const difference = selling - cost;
    const percentage = (difference / cost) * 100;

    setResult({
      type: difference >= 0 ? "Profit" : "Loss",
      amount: Math.abs(difference),
      percentage: Math.abs(percentage),
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Cost Price"
        value={costPrice}
        onChange={setCostPrice}
      />

      <Input
        label="Selling Price"
        value={sellingPrice}
        onChange={setSellingPrice}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title={result.type}>
            {formatCurrency(result.amount)}
          </Result>

          <Result title={`${result.type} Percentage`}>
            {formatNumber(result.percentage)}%
          </Result>
        </>
      )}
    </div>
  );
}

function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const annual = Number(annualSalary);

    if (!Number.isFinite(annual) || annual < 0) {
      setResult(null);
      return;
    }

    setResult({
      monthly: annual / 12,
      weekly: annual / 52,
      daily: annual / 365,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Annual Salary"
        value={annualSalary}
        onChange={setAnnualSalary}
        placeholder="600000"
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Monthly Salary">
            {formatCurrency(result.monthly)}
          </Result>

          <Result title="Weekly Salary">
            {formatCurrency(result.weekly)}
          </Result>

          <Result title="Daily Salary">
            {formatCurrency(result.daily)}
          </Result>
        </>
      )}
    </div>
  );
}

function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] =
    useState("");

  const [monthlyContribution, setMonthlyContribution] =
    useState("");

  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const initial = Number(initialInvestment);
    const monthly = Number(monthlyContribution);
    const annualRate = Number(rate);
    const duration = Number(years);

    if (
      !Number.isFinite(initial) ||
      !Number.isFinite(monthly) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(duration) ||
      duration < 0
    ) {
      setResult(null);
      return;
    }

    const months = duration * 12;
    const monthlyRate = annualRate / 100 / 12;

    let futureValue;

    if (monthlyRate === 0) {
      futureValue = initial + monthly * months;
    } else {
      futureValue =
        initial * Math.pow(1 + monthlyRate, months) +
        monthly *
          ((Math.pow(1 + monthlyRate, months) - 1) /
            monthlyRate);
    }

    const invested = initial + monthly * months;

    setResult({
      invested,
      gains: futureValue - invested,
      value: futureValue,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Initial Investment"
        value={initialInvestment}
        onChange={setInitialInvestment}
      />

      <Input
        label="Monthly Contribution"
        value={monthlyContribution}
        onChange={setMonthlyContribution}
      />

      <Input
        label="Expected Annual Return (%)"
        value={rate}
        onChange={setRate}
      />

      <Input
        label="Investment Period (Years)"
        value={years}
        onChange={setYears}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Total Invested">
            {formatCurrency(result.invested)}
          </Result>

          <Result title="Estimated Gains">
            {formatCurrency(result.gains)}
          </Result>

          <Result title="Future Value">
            {formatCurrency(result.value)}
          </Result>
        </>
      )}
    </div>
  );
}

function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] =
    useState("");

  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const monthly = Number(monthlyInvestment);
    const annualRate = Number(rate);
    const duration = Number(years);

    if (
      !Number.isFinite(monthly) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(duration) ||
      monthly < 0 ||
      duration < 0
    ) {
      setResult(null);
      return;
    }

    const months = duration * 12;
    const monthlyRate = annualRate / 100 / 12;

    let maturityValue;

    if (monthlyRate === 0) {
      maturityValue = monthly * months;
    } else {
      maturityValue =
        monthly *
        ((Math.pow(1 + monthlyRate, months) - 1) /
          monthlyRate) *
        (1 + monthlyRate);
    }

    const invested = monthly * months;

    setResult({
      invested,
      returns: maturityValue - invested,
      maturityValue,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Monthly SIP Investment"
        value={monthlyInvestment}
        onChange={setMonthlyInvestment}
      />

      <Input
        label="Expected Annual Return (%)"
        value={rate}
        onChange={setRate}
      />

      <Input
        label="Investment Period (Years)"
        value={years}
        onChange={setYears}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Invested Amount">
            {formatCurrency(result.invested)}
          </Result>

          <Result title="Estimated Returns">
            {formatCurrency(result.returns)}
          </Result>

          <Result title="Maturity Value">
            {formatCurrency(result.maturityValue)}
          </Result>
        </>
      )}
    </div>
  );
}

/* =========================================================
   HEALTH CALCULATORS
========================================================= */

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const w = Number(weight);
    const h = Number(height);

    if (
      !Number.isFinite(w) ||
      !Number.isFinite(h) ||
      w <= 0 ||
      h <= 0
    ) {
      setResult(null);
      return;
    }

    const meters = h / 100;
    const bmi = w / (meters * meters);

    let category;

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }

    setResult({
      bmi,
      category,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Weight (kg)"
        value={weight}
        onChange={setWeight}
      />

      <Input
        label="Height (cm)"
        value={height}
        onChange={setHeight}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="BMI">
            {formatNumber(result.bmi)}
          </Result>

          <Result title="Category">
            {result.category}
          </Result>
        </>
      )}
    </div>
  );
}

function BMRCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);

  function calculate() {
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    if (
      !Number.isFinite(w) ||
      !Number.isFinite(h) ||
      !Number.isFinite(a)
    ) {
      setResult(null);
      return;
    }

    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    setResult(bmr);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Weight (kg)"
        value={weight}
        onChange={setWeight}
      />

      <Input
        label="Height (cm)"
        value={height}
        onChange={setHeight}
      />

      <Input
        label="Age"
        value={age}
        onChange={setAge}
      />

      <Select
        label="Sex"
        value={gender}
        onChange={setGender}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Estimated BMR">
          {formatNumber(result)} calories/day
        </Result>
      )}
    </div>
  );
}

function CalorieCalculator() {
  const [bmr, setBmr] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState(null);

  function calculate() {
    const value = Number(bmr);
    const multiplier = Number(activity);

    if (!Number.isFinite(value)) {
      setResult(null);
      return;
    }

    setResult(value * multiplier);
  }

  return (
    <div className="calculator-form">
      <Input
        label="BMR"
        value={bmr}
        onChange={setBmr}
        placeholder="1600"
      />

      <Select
        label="Activity Level"
        value={activity}
        onChange={setActivity}
        options={[
          { value: "1.2", label: "Sedentary" },
          { value: "1.375", label: "Lightly Active" },
          { value: "1.55", label: "Moderately Active" },
          { value: "1.725", label: "Very Active" },
          { value: "1.9", label: "Extra Active" },
        ]}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Estimated Daily Calories">
          {formatNumber(result)} calories/day
        </Result>
      )}
    </div>
  );
}

function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);

  function calculate() {
    const h = Number(height);

    if (!Number.isFinite(h) || h <= 0) {
      setResult(null);
      return;
    }

    const inches = h / 2.54;
    const overFiveFeet = Math.max(inches - 60, 0);

    const idealWeight =
      gender === "male"
        ? 50 + 2.3 * overFiveFeet
        : 45.5 + 2.3 * overFiveFeet;

    setResult(idealWeight);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Height (cm)"
        value={height}
        onChange={setHeight}
      />

      <Select
        label="Sex"
        value={gender}
        onChange={setGender}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Estimated Ideal Weight">
          {formatNumber(result)} kg
        </Result>
      )}
    </div>
  );
}

function BodyFatCalculator() {
  const [bmi, setBmi] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);

  function calculate() {
    const b = Number(bmi);
    const a = Number(age);

    if (
      !Number.isFinite(b) ||
      !Number.isFinite(a) ||
      b <= 0 ||
      a <= 0
    ) {
      setResult(null);
      return;
    }

    const sexConstant = gender === "male" ? 1 : 0;

    const bodyFat =
      1.2 * b +
      0.23 * a -
      10.8 * sexConstant -
      5.4;

    setResult(bodyFat);
  }

  return (
    <div className="calculator-form">
      <Input
        label="BMI"
        value={bmi}
        onChange={setBmi}
      />

      <Input
        label="Age"
        value={age}
        onChange={setAge}
      />

      <Select
        label="Sex"
        value={gender}
        onChange={setGender}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Estimated Body Fat">
          {formatNumber(result)}%
        </Result>
      )}
    </div>
  );
}

function PaceCalculator() {
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [result, setResult] = useState(null);

  function calculate() {
    const d = Number(distance);
    const h = Number(hours);
    const m = Number(minutes);
    const s = Number(seconds);

    if (
      !Number.isFinite(d) ||
      !Number.isFinite(h) ||
      !Number.isFinite(m) ||
      !Number.isFinite(s) ||
      d <= 0
    ) {
      setResult(null);
      return;
    }

    const totalSeconds =
      h * 3600 +
      m * 60 +
      s;

    if (totalSeconds <= 0) {
      setResult(null);
      return;
    }

    const paceSeconds = totalSeconds / d;

    const paceMinutes = Math.floor(paceSeconds / 60);
    const remainingSeconds = Math.round(
      paceSeconds % 60
    );

    const speed =
      d / (totalSeconds / 3600);

    setResult({
      pace: `${paceMinutes}:${String(
        remainingSeconds
      ).padStart(2, "0")}`,
      speed,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Distance (km)"
        value={distance}
        onChange={setDistance}
      />

      <Input
        label="Hours"
        value={hours}
        onChange={setHours}
      />

      <Input
        label="Minutes"
        value={minutes}
        onChange={setMinutes}
      />

      <Input
        label="Seconds"
        value={seconds}
        onChange={setSeconds}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Pace">
            {result.pace} min/km
          </Result>

          <Result title="Average Speed">
            {formatNumber(result.speed)} km/h
          </Result>
        </>
      )}
    </div>
  );
}

/* =========================================================
   DATE & TIME CALCULATORS
========================================================= */

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    if (!birthDate) {
      setResult(null);
      return;
    }

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    if (
      Number.isNaN(birth.getTime()) ||
      birth > today
    ) {
      setResult(null);
      return;
    }

    let years =
      today.getFullYear() -
      birth.getFullYear();

    let months =
      today.getMonth() -
      birth.getMonth();

    let days =
      today.getDate() -
      birth.getDate();

    if (days < 0) {
      months--;

      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Date of Birth"
        type="date"
        value={birthDate}
        onChange={setBirthDate}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <Result title="Your Age">
          {result.years} years, {result.months} months,{" "}
          {result.days} days
        </Result>
      )}
    </div>
  );
}

function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(
      `${startDate}T00:00:00`
    );

    const end = new Date(
      `${endDate}T00:00:00`
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      setResult(null);
      return;
    }

    const difference = Math.abs(end - start);
    const days = Math.round(
      difference / 86400000
    );

    setResult(days);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Start Date"
        type="date"
        value={startDate}
        onChange={setStartDate}
      />

      <Input
        label="End Date"
        type="date"
        value={endDate}
        onChange={setEndDate}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Difference">
          {result.toLocaleString("en-IN")} days
        </Result>
      )}
    </div>
  );
}

function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    if (!startTime || !endTime) {
      setResult(null);
      return;
    }

    const [startHours, startMinutes] =
      startTime.split(":").map(Number);

    const [endHours, endMinutes] =
      endTime.split(":").map(Number);

    let startTotal =
      startHours * 60 + startMinutes;

    let endTotal =
      endHours * 60 + endMinutes;

    if (endTotal < startTotal) {
      endTotal += 24 * 60;
    }

    const difference =
      endTotal - startTotal;

    setResult({
      hours: Math.floor(difference / 60),
      minutes: difference % 60,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Start Time"
        type="time"
        value={startTime}
        onChange={setStartTime}
      />

      <Input
        label="End Time"
        type="time"
        value={endTime}
        onChange={setEndTime}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <Result title="Duration">
          {result.hours} hours {result.minutes} minutes
        </Result>
      )}
    </div>
  );
}

/* =========================================================
   CONVERTERS
========================================================= */

const conversionUnits = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371192,
    yard: 1.0936133,
    foot: 3.2808399,
    inch: 39.3700787,
  },

  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462262,
    ounce: 35.2739619,
  },

  area: {
    "square meter": 1,
    "square kilometer": 0.000001,
    "square foot": 10.7639104,
    "square yard": 1.19599,
    acre: 0.000247105,
    hectare: 0.0001,
  },

  volume: {
    liter: 1,
    milliliter: 1000,
    "cubic meter": 0.001,
    gallon: 0.264172052,
    quart: 1.05668821,
    pint: 2.11337642,
  },

  data: {
    byte: 1,
    kilobyte: 1 / 1024,
    megabyte: 1 / 1024 ** 2,
    gigabyte: 1 / 1024 ** 3,
    terabyte: 1 / 1024 ** 4,
  },

  time: {
    second: 1,
    minute: 1 / 60,
    hour: 1 / 3600,
    day: 1 / 86400,
    week: 1 / 604800,
  },

  speed: {
    "meter/second": 1,
    "kilometer/hour": 3.6,
    "mile/hour": 2.23693629,
    knot: 1.94384449,
  },
};

function GenericConverter({ type }) {
  const units =
    conversionUnits[type] ||
    conversionUnits.length;

  const unitNames = Object.keys(units);

  const [value, setValue] = useState("");
  const [from, setFrom] = useState(unitNames[0]);
  const [to, setTo] = useState(
    unitNames[1] || unitNames[0]
  );
  const [result, setResult] = useState(null);

  function calculate() {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      setResult(null);
      return;
    }

    const baseValue =
      number / units[from];

    const converted =
      baseValue * units[to];

    setResult(converted);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Value"
        value={value}
        onChange={setValue}
      />

      <Select
        label="From"
        value={from}
        onChange={setFrom}
        options={unitNames.map((unit) => ({
          value: unit,
          label: capitalize(unit),
        }))}
      />

      <Select
        label="To"
        value={to}
        onChange={setTo}
        options={unitNames.map((unit) => ({
          value: unit,
          label: capitalize(unit),
        }))}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Converted Value">
          {formatNumber(result)}
        </Result>
      )}
    </div>
  );
}

function TemperatureConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("celsius");
  const [to, setTo] = useState("fahrenheit");
  const [result, setResult] = useState(null);

  function toCelsius(number, unit) {
    if (unit === "fahrenheit") {
      return (number - 32) * (5 / 9);
    }

    if (unit === "kelvin") {
      return number - 273.15;
    }

    return number;
  }

  function fromCelsius(number, unit) {
    if (unit === "fahrenheit") {
      return number * (9 / 5) + 32;
    }

    if (unit === "kelvin") {
      return number + 273.15;
    }

    return number;
  }

  function calculate() {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      setResult(null);
      return;
    }

    const celsius =
      toCelsius(number, from);

    setResult(
      fromCelsius(celsius, to)
    );
  }

  return (
    <div className="calculator-form">
      <Input
        label="Temperature"
        value={value}
        onChange={setValue}
      />

      <Select
        label="From"
        value={from}
        onChange={setFrom}
        options={[
          { value: "celsius", label: "Celsius" },
          { value: "fahrenheit", label: "Fahrenheit" },
          { value: "kelvin", label: "Kelvin" },
        ]}
      />

      <Select
        label="To"
        value={to}
        onChange={setTo}
        options={[
          { value: "celsius", label: "Celsius" },
          { value: "fahrenheit", label: "Fahrenheit" },
          { value: "kelvin", label: "Kelvin" },
        ]}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Converted Temperature">
          {formatNumber(result)}
        </Result>
      )}
    </div>
  );
}

/* =========================================================
   EVERYDAY CALCULATORS
========================================================= */

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] =
    useState("10");

  const [people, setPeople] =
    useState("1");

  const [result, setResult] = useState(null);

  function calculate() {
    const billAmount = Number(bill);
    const tip = Number(tipPercentage);
    const numberOfPeople = Number(people);

    if (
      !Number.isFinite(billAmount) ||
      !Number.isFinite(tip) ||
      !Number.isFinite(numberOfPeople) ||
      numberOfPeople <= 0
    ) {
      setResult(null);
      return;
    }

    const tipAmount =
      (billAmount * tip) / 100;

    const total =
      billAmount + tipAmount;

    setResult({
      tipAmount,
      total,
      perPerson: total / numberOfPeople,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Bill Amount"
        value={bill}
        onChange={setBill}
      />

      <Input
        label="Tip (%)"
        value={tipPercentage}
        onChange={setTipPercentage}
      />

      <Input
        label="Number of People"
        value={people}
        onChange={setPeople}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Tip Amount">
            {formatCurrency(result.tipAmount)}
          </Result>

          <Result title="Total Bill">
            {formatCurrency(result.total)}
          </Result>

          <Result title="Per Person">
            {formatCurrency(result.perPerson)}
          </Result>
        </>
      )}
    </div>
  );
}

function FuelCostCalculator() {
  const [distance, setDistance] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuelPrice, setFuelPrice] =
    useState("");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const d = Number(distance);
    const m = Number(mileage);
    const price = Number(fuelPrice);

    if (
      !Number.isFinite(d) ||
      !Number.isFinite(m) ||
      !Number.isFinite(price) ||
      m <= 0
    ) {
      setResult(null);
      return;
    }

    const fuelRequired = d / m;
    const totalCost =
      fuelRequired * price;

    setResult({
      fuelRequired,
      totalCost,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Distance (km)"
        value={distance}
        onChange={setDistance}
      />

      <Input
        label="Vehicle Mileage (km/L)"
        value={mileage}
        onChange={setMileage}
      />

      <Input
        label="Fuel Price per Liter"
        value={fuelPrice}
        onChange={setFuelPrice}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Fuel Required">
            {formatNumber(result.fuelRequired)} L
          </Result>

          <Result title="Estimated Fuel Cost">
            {formatCurrency(result.totalCost)}
          </Result>
        </>
      )}
    </div>
  );
}

function FuelConsumptionCalculator() {
  const [distance, setDistance] =
    useState("");

  const [fuelUsed, setFuelUsed] =
    useState("");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const d = Number(distance);
    const f = Number(fuelUsed);

    if (
      !Number.isFinite(d) ||
      !Number.isFinite(f) ||
      d <= 0 ||
      f <= 0
    ) {
      setResult(null);
      return;
    }

    setResult({
      mileage: d / f,
      litersPer100Km: (f / d) * 100,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Distance Traveled (km)"
        value={distance}
        onChange={setDistance}
      />

      <Input
        label="Fuel Used (liters)"
        value={fuelUsed}
        onChange={setFuelUsed}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Fuel Economy">
            {formatNumber(result.mileage)} km/L
          </Result>

          <Result title="Fuel Consumption">
            {formatNumber(result.litersPer100Km)} L/100 km
          </Result>
        </>
      )}
    </div>
  );
}

/* =========================================================
   CONSTRUCTION CALCULATORS
========================================================= */

function SquareFootageCalculator() {
  const [length, setLength] =
    useState("");

  const [width, setWidth] =
    useState("");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const l = Number(length);
    const w = Number(width);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      l < 0 ||
      w < 0
    ) {
      setResult(null);
      return;
    }

    const squareMeters = l * w;
    const squareFeet =
      squareMeters * 10.7639104167;

    setResult({
      squareMeters,
      squareFeet,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Length (meters)"
        value={length}
        onChange={setLength}
      />

      <Input
        label="Width (meters)"
        value={width}
        onChange={setWidth}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Area">
            {formatNumber(result.squareMeters)} m²
          </Result>

          <Result title="Square Feet">
            {formatNumber(result.squareFeet)} ft²
          </Result>
        </>
      )}
    </div>
  );
}

function ConcreteCalculator() {
  const [length, setLength] =
    useState("");

  const [width, setWidth] =
    useState("");

  const [depth, setDepth] =
    useState("");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(d) ||
      l <= 0 ||
      w <= 0 ||
      d <= 0
    ) {
      setResult(null);
      return;
    }

    const volume =
      l * w * (d / 100);

    setResult(volume);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Length (meters)"
        value={length}
        onChange={setLength}
      />

      <Input
        label="Width (meters)"
        value={width}
        onChange={setWidth}
      />

      <Input
        label="Depth (cm)"
        value={depth}
        onChange={setDepth}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Concrete Required">
          {formatNumber(result, 3)} m³
        </Result>
      )}
    </div>
  );
}

function BrickCalculator() {
  const [wallLength, setWallLength] =
    useState("");

  const [wallHeight, setWallHeight] =
    useState("");

  const [brickLength, setBrickLength] =
    useState("19");

  const [brickHeight, setBrickHeight] =
    useState("9");

  const [mortarJoint, setMortarJoint] =
    useState("1");

  const [waste, setWaste] =
    useState("5");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const wallL = Number(wallLength);
    const wallH = Number(wallHeight);
    const brickL = Number(brickLength);
    const brickH = Number(brickHeight);
    const mortar = Number(mortarJoint);
    const wastePercent = Number(waste);

    if (
      !Number.isFinite(wallL) ||
      !Number.isFinite(wallH) ||
      !Number.isFinite(brickL) ||
      !Number.isFinite(brickH) ||
      !Number.isFinite(mortar) ||
      !Number.isFinite(wastePercent) ||
      wallL <= 0 ||
      wallH <= 0 ||
      brickL <= 0 ||
      brickH <= 0
    ) {
      setResult(null);
      return;
    }

    const wallArea =
      wallL * wallH;

    const effectiveLength =
      (brickL + mortar) / 100;

    const effectiveHeight =
      (brickH + mortar) / 100;

    const brickFaceArea =
      effectiveLength *
      effectiveHeight;

    const baseBricks =
      wallArea / brickFaceArea;

    const totalBricks = Math.ceil(
      baseBricks *
        (1 + wastePercent / 100)
    );

    setResult({
      wallArea,
      totalBricks,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Wall Length (meters)"
        value={wallLength}
        onChange={setWallLength}
      />

      <Input
        label="Wall Height (meters)"
        value={wallHeight}
        onChange={setWallHeight}
      />

      <Input
        label="Brick Length (cm)"
        value={brickLength}
        onChange={setBrickLength}
      />

      <Input
        label="Brick Height (cm)"
        value={brickHeight}
        onChange={setBrickHeight}
      />

      <Input
        label="Mortar Joint (cm)"
        value={mortarJoint}
        onChange={setMortarJoint}
      />

      <Input
        label="Extra/Waste (%)"
        value={waste}
        onChange={setWaste}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Wall Area">
            {formatNumber(result.wallArea)} m²
          </Result>

          <Result title="Estimated Bricks Required">
            {result.totalBricks.toLocaleString("en-IN")}
          </Result>
        </>
      )}
    </div>
  );
}

function TileCalculator() {
  const [roomLength, setRoomLength] =
    useState("");

  const [roomWidth, setRoomWidth] =
    useState("");

  const [tileLength, setTileLength] =
    useState("60");

  const [tileWidth, setTileWidth] =
    useState("60");

  const [waste, setWaste] =
    useState("10");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const roomL = Number(roomLength);
    const roomW = Number(roomWidth);
    const tileL = Number(tileLength);
    const tileW = Number(tileWidth);
    const wastePercent = Number(waste);

    if (
      !Number.isFinite(roomL) ||
      !Number.isFinite(roomW) ||
      !Number.isFinite(tileL) ||
      !Number.isFinite(tileW) ||
      !Number.isFinite(wastePercent) ||
      roomL <= 0 ||
      roomW <= 0 ||
      tileL <= 0 ||
      tileW <= 0
    ) {
      setResult(null);
      return;
    }

    const roomArea =
      roomL * roomW;

    const tileArea =
      (tileL / 100) *
      (tileW / 100);

    const tiles =
      Math.ceil(
        (roomArea / tileArea) *
          (1 + wastePercent / 100)
      );

    setResult({
      roomArea,
      tiles,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Room Length (meters)"
        value={roomLength}
        onChange={setRoomLength}
      />

      <Input
        label="Room Width (meters)"
        value={roomWidth}
        onChange={setRoomWidth}
      />

      <Input
        label="Tile Length (cm)"
        value={tileLength}
        onChange={setTileLength}
      />

      <Input
        label="Tile Width (cm)"
        value={tileWidth}
        onChange={setTileWidth}
      />

      <Input
        label="Extra/Waste (%)"
        value={waste}
        onChange={setWaste}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Room Area">
            {formatNumber(result.roomArea)} m²
          </Result>

          <Result title="Tiles Required">
            {result.tiles.toLocaleString("en-IN")}
          </Result>
        </>
      )}
    </div>
  );
}

function PaintCalculator() {
  const [roomLength, setRoomLength] =
    useState("");

  const [roomWidth, setRoomWidth] =
    useState("");

  const [wallHeight, setWallHeight] =
    useState("");

  const [doors, setDoors] =
    useState("0");

  const [windows, setWindows] =
    useState("0");

  const [coverage, setCoverage] =
    useState("10");

  const [coats, setCoats] =
    useState("2");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const length = Number(roomLength);
    const width = Number(roomWidth);
    const height = Number(wallHeight);
    const doorCount = Number(doors);
    const windowCount = Number(windows);
    const paintCoverage = Number(coverage);
    const coatCount = Number(coats);

    if (
      !Number.isFinite(length) ||
      !Number.isFinite(width) ||
      !Number.isFinite(height) ||
      !Number.isFinite(doorCount) ||
      !Number.isFinite(windowCount) ||
      !Number.isFinite(paintCoverage) ||
      !Number.isFinite(coatCount) ||
      length <= 0 ||
      width <= 0 ||
      height <= 0 ||
      paintCoverage <= 0 ||
      coatCount <= 0
    ) {
      setResult(null);
      return;
    }

    const wallArea =
      2 * (length + width) * height;

    const doorArea =
      doorCount * 1.9 * 0.8;

    const windowArea =
      windowCount * 1.2 * 1.2;

    const paintArea =
      Math.max(
        wallArea -
          doorArea -
          windowArea,
        0
      );

    const liters =
      (paintArea * coatCount) /
      paintCoverage;

    setResult({
      paintArea,
      liters,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Room Length (meters)"
        value={roomLength}
        onChange={setRoomLength}
      />

      <Input
        label="Room Width (meters)"
        value={roomWidth}
        onChange={setRoomWidth}
      />

      <Input
        label="Wall Height (meters)"
        value={wallHeight}
        onChange={setWallHeight}
      />

      <Input
        label="Number of Doors"
        value={doors}
        onChange={setDoors}
      />

      <Input
        label="Number of Windows"
        value={windows}
        onChange={setWindows}
      />

      <Input
        label="Paint Coverage (m²/L)"
        value={coverage}
        onChange={setCoverage}
      />

      <Input
        label="Number of Coats"
        value={coats}
        onChange={setCoats}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Paint Area">
            {formatNumber(result.paintArea)} m²
          </Result>

          <Result title="Estimated Paint Required">
            {formatNumber(result.liters)} L
          </Result>
        </>
      )}
    </div>
  );
}

/* =========================================================
   EDUCATION CALCULATORS
========================================================= */

function GradeCalculator() {
  const [percentage, setPercentage] =
    useState("");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const value = Number(percentage);

    if (
      !Number.isFinite(value) ||
      value < 0 ||
      value > 100
    ) {
      setResult(null);
      return;
    }

    let grade;

    if (value >= 90) grade = "A+";
    else if (value >= 80) grade = "A";
    else if (value >= 70) grade = "B";
    else if (value >= 60) grade = "C";
    else if (value >= 50) grade = "D";
    else grade = "F";

    setResult(grade);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Percentage (%)"
        value={percentage}
        onChange={setPercentage}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <Result title="Grade">
          {result}
        </Result>
      )}
    </div>
  );
}

function GPACalculator() {
  const [gradePoints, setGradePoints] =
    useState("");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const values = gradePoints
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));

    if (values.length === 0) {
      setResult(null);
      return;
    }

    const average =
      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length;

    setResult(average);
  }

  return (
    <div className="calculator-form">
      <TextArea
        label="Grade Points"
        value={gradePoints}
        onChange={setGradePoints}
        placeholder="8, 9, 7, 10"
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="GPA">
          {formatNumber(result)}
        </Result>
      )}
    </div>
  );
}

function MarksPercentageCalculator() {
  const [obtained, setObtained] =
    useState("");

  const [maximum, setMaximum] =
    useState("");

  const [result, setResult] =
    useState(null);

  function calculate() {
    const o = Number(obtained);
    const m = Number(maximum);

    if (
      !Number.isFinite(o) ||
      !Number.isFinite(m) ||
      m <= 0
    ) {
      setResult(null);
      return;
    }

    setResult((o / m) * 100);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Marks Obtained"
        value={obtained}
        onChange={setObtained}
      />

      <Input
        label="Maximum Marks"
        value={maximum}
        onChange={setMaximum}
      />

      <CalculateButton onClick={calculate} />

      {result !== null && (
        <Result title="Percentage">
          {formatNumber(result)}%
        </Result>
      )}
    </div>
  );
}

/* =========================================================
   TECHNOLOGY CALCULATORS
========================================================= */

function BinaryCalculator() {
  const [first, setFirst] =
    useState("");

  const [second, setSecond] =
    useState("");

  const [operation, setOperation] =
    useState("+");

  const [result, setResult] =
    useState(null);

  function calculate() {
    if (
      !/^[01]+$/.test(first) ||
      !/^[01]+$/.test(second)
    ) {
      setResult(null);
      return;
    }

    const a = parseInt(first, 2);
    const b = parseInt(second, 2);

    let decimalResult;

    if (operation === "+") {
      decimalResult = a + b;
    } else if (operation === "-") {
      decimalResult = a - b;
    } else if (operation === "*") {
      decimalResult = a * b;
    } else {
      if (b === 0) {
        setResult(null);
        return;
      }

      decimalResult = Math.floor(a / b);
    }

    const binaryResult =
      decimalResult < 0
        ? `-${Math.abs(decimalResult).toString(2)}`
        : decimalResult.toString(2);

    setResult({
      binary: binaryResult,
      decimal: decimalResult,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="Binary Number 1"
        type="text"
        value={first}
        onChange={setFirst}
        placeholder="1010"
      />

      <Select
        label="Operation"
        value={operation}
        onChange={setOperation}
        options={[
          { value: "+", label: "Add (+)" },
          { value: "-", label: "Subtract (-)" },
          { value: "*", label: "Multiply (×)" },
          { value: "/", label: "Divide (÷)" },
        ]}
      />

      <Input
        label="Binary Number 2"
        type="text"
        value={second}
        onChange={setSecond}
        placeholder="0011"
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Binary Result">
            {result.binary}
          </Result>

          <Result title="Decimal Result">
            {result.decimal}
          </Result>
        </>
      )}
    </div>
  );
}

function IPSubnetCalculator() {
  const [ipAddress, setIpAddress] =
    useState("");

  const [prefix, setPrefix] =
    useState("24");

  const [result, setResult] =
    useState(null);

  function ipToNumber(parts) {
    return (
      ((parts[0] << 24) |
        (parts[1] << 16) |
        (parts[2] << 8) |
        parts[3]) >>>
      0
    );
  }

  function numberToIp(number) {
    return [
      (number >>> 24) & 255,
      (number >>> 16) & 255,
      (number >>> 8) & 255,
      number & 255,
    ].join(".");
  }

  function calculate() {
    const parts =
      ipAddress
        .trim()
        .split(".")
        .map(Number);

    const cidr = Number(prefix);

    if (
      parts.length !== 4 ||
      parts.some(
        (part) =>
          !Number.isInteger(part) ||
          part < 0 ||
          part > 255
      ) ||
      !Number.isInteger(cidr) ||
      cidr < 0 ||
      cidr > 32
    ) {
      setResult(null);
      return;
    }

    const ipNumber =
      ipToNumber(parts);

    const mask =
      cidr === 0
        ? 0
        : (0xffffffff << (32 - cidr)) >>>
          0;

    const network =
      (ipNumber & mask) >>> 0;

    const broadcast =
      (network | (~mask >>> 0)) >>> 0;

    const totalAddresses =
      2 ** (32 - cidr);

    const usableHosts =
      cidr <= 30
        ? Math.max(totalAddresses - 2, 0)
        : totalAddresses;

    const firstHost =
      cidr <= 30
        ? numberToIp(network + 1)
        : numberToIp(network);

    const lastHost =
      cidr <= 30
        ? numberToIp(broadcast - 1)
        : numberToIp(broadcast);

    setResult({
      network: numberToIp(network),
      broadcast: numberToIp(broadcast),
      mask: numberToIp(mask),
      totalAddresses,
      usableHosts,
      firstHost,
      lastHost,
    });
  }

  return (
    <div className="calculator-form">
      <Input
        label="IPv4 Address"
        type="text"
        value={ipAddress}
        onChange={setIpAddress}
        placeholder="192.168.1.10"
      />

      <Select
        label="CIDR Prefix"
        value={prefix}
        onChange={setPrefix}
        options={Array.from(
          { length: 33 },
          (_, index) => ({
            value: String(index),
            label: `/${index}`,
          })
        )}
      />

      <CalculateButton onClick={calculate} />

      {result && (
        <>
          <Result title="Network Address">
            {result.network}
          </Result>

          <Result title="Broadcast Address">
            {result.broadcast}
          </Result>

          <Result title="Subnet Mask">
            {result.mask}
          </Result>

          <Result title="Total Addresses">
            {result.totalAddresses.toLocaleString(
              "en-IN"
            )}
          </Result>

          <Result title="Usable Hosts">
            {result.usableHosts.toLocaleString(
              "en-IN"
            )}
          </Result>

          <Result title="First Host">
            {result.firstHost}
          </Result>

          <Result title="Last Host">
            {result.lastHost}
          </Result>
        </>
      )}
    </div>
  );
}

function PasswordGenerator() {
  const [length, setLength] =
    useState("16");

  const [result, setResult] =
    useState("");

  function generate() {
    const requestedLength =
      Number(length);

    if (
      !Number.isFinite(requestedLength)
    ) {
      return;
    }

    const size = Math.max(
      4,
      Math.min(
        Math.floor(requestedLength),
        128
      )
    );

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

    const values =
      new Uint32Array(size);

    if (
      typeof window !== "undefined" &&
      window.crypto &&
      window.crypto.getRandomValues
    ) {
      window.crypto.getRandomValues(
        values
      );
    } else {
      for (let i = 0; i < size; i++) {
        values[i] =
          Math.floor(
            Math.random() *
              4294967296
          );
      }
    }

    let password = "";

    for (let i = 0; i < size; i++) {
      password +=
        characters[
          values[i] %
            characters.length
        ];
    }

    setResult(password);
  }

  return (
    <div className="calculator-form">
      <Input
        label="Password Length"
        value={length}
        onChange={setLength}
        min="4"
        max="128"
        step="1"
      />

      <CalculateButton
        onClick={generate}
      >
        Generate Password
      </CalculateButton>

      {result && (
        <Result title="Generated Password">
          <span
            style={{
              wordBreak: "break-all",
            }}
          >
            {result}
          </span>
        </Result>
      )}
    </div>
  );
}

/* =========================================================
   MAIN ENGINE
========================================================= */

function CalculatorEngine({ calculator }) {
  switch (calculator.type) {
    /* MATH */
    case "basic":
      return <BasicCalculator />;

    case "scientific":
      return <ScientificCalculator />;

    case "percentage":
      return <PercentageCalculator />;

    case "fraction":
      return <FractionCalculator />;

    case "ratio":
      return <RatioCalculator />;

    case "average":
      return <AverageCalculator />;

    case "exponent":
      return <ExponentCalculator />;

    case "sqrt":
      return <SquareRootCalculator />;

    /* FINANCE */
    case "loan":
    case "emi":
      return <EMICalculator />;

    case "gst":
      return <GSTCalculator />;

    case "discount":
      return <DiscountCalculator />;

    case "simple-interest":
      return <SimpleInterestCalculator />;

    case "compound-interest":
      return <CompoundInterestCalculator />;

    case "profit":
      return <ProfitCalculator />;

    case "salary":
      return <SalaryCalculator />;

    case "investment":
      return <InvestmentCalculator />;

    case "sip":
      return <SIPCalculator />;

    /* HEALTH */
    case "bmi":
      return <BMICalculator />;

    case "bmr":
      return <BMRCalculator />;

    case "calorie":
      return <CalorieCalculator />;

    case "ideal-weight":
      return <IdealWeightCalculator />;

    case "body-fat":
      return <BodyFatCalculator />;

    case "pace":
      return <PaceCalculator />;

    /* DATE & TIME */
    case "age":
      return <AgeCalculator />;

    case "date-difference":
    case "days-between":
      return <DateDifferenceCalculator />;

    case "time-duration":
    case "hours":
      return <TimeDurationCalculator />;

    /* CONVERSION */
    case "length":
    case "weight":
    case "area":
    case "volume":
    case "data":
    case "time":
    case "speed":
      return (
        <GenericConverter
          type={calculator.type}
        />
      );

    case "temperature":
      return <TemperatureConverter />;

    /* EVERYDAY */
    case "tip":
      return <TipCalculator />;

    case "fuel-cost":
      return <FuelCostCalculator />;

    case "fuel-consumption":
      return <FuelConsumptionCalculator />;

    /* CONSTRUCTION */
    case "concrete":
      return <ConcreteCalculator />;

    case "brick":
      return <BrickCalculator />;

    case "tile":
      return <TileCalculator />;

    case "paint":
      return <PaintCalculator />;

    case "square-footage":
      return <SquareFootageCalculator />;

    /* EDUCATION */
    case "grade":
      return <GradeCalculator />;

    case "gpa":
    case "cgpa":
      return <GPACalculator />;

    case "marks-percentage":
      return <MarksPercentageCalculator />;

    /* TECHNOLOGY */
    case "binary":
      return <BinaryCalculator />;

    case "ip-subnet":
      return <IPSubnetCalculator />;

    case "password":
      return <PasswordGenerator />;

    default:
      return (
        <div className="calculator-form">
          <h2>Calculator Coming Soon</h2>

          <p>
            This calculator is currently
            being added to CalculatorHub.
          </p>
        </div>
      );
  }
}

export default CalculatorEngine;