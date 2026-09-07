const iconsByType = {
  basic: "➗",
  scientific: "🔬",
  percentage: "%",
  fraction: "½",
  ratio: "⚖️",
  average: "📊",
  exponent: "xⁿ",
  sqrt: "√",
  loan: "🏦",
  emi: "💳",
  gst: "🧾",
  discount: "🏷️",
  "simple-interest": "📈",
  "compound-interest": "📈",
  profit: "💰",
  salary: "💵",
  investment: "📊",
  sip: "📅",
  bmi: "⚖️",
  bmr: "🔥",
  calorie: "🍎",
  "ideal-weight": "⚖️",
  "body-fat": "💪",
  pace: "🏃",
  age: "🎂",
  "date-difference": "📅",
  "days-between": "📆",
  "time-duration": "⏱️",
  hours: "⏰",
  length: "📏",
  weight: "⚖️",
  temperature: "🌡️",
  speed: "🏎️",
  area: "📐",
  volume: "🧪",
  data: "💾",
  time: "⏳",
  tip: "🍽️",
  "fuel-cost": "⛽",
  "fuel-consumption": "🚗",
  concrete: "🏗️",
  brick: "🧱",
  tile: "🔲",
  paint: "🎨",
  "square-footage": "📐",
  grade: "📝",
  gpa: "🎓",
  cgpa: "🎓",
  "marks-percentage": "📚",
  binary: "💻",
  "ip-subnet": "🌐",
  password: "🔐",
};

function CalculatorIcon({
  type,
  className = "",
}) {
  return (
    <span
      className={`calculator-icon ${className}`}
      aria-hidden="true"
    >
      {iconsByType[type] || "🧮"}
    </span>
  );
}

export default CalculatorIcon;
