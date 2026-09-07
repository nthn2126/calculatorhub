const iconByType = {
  basic: "calculator",
  scientific: "science",
  percentage: "percent",
  fraction: "fraction",
  ratio: "ratio",
  average: "chart",
  exponent: "exponent",
  sqrt: "root",
  loan: "bank",
  emi: "card",
  gst: "receipt",
  discount: "tag",
  "simple-interest": "trend",
  "compound-interest": "trend",
  profit: "coins",
  salary: "wallet",
  investment: "chart",
  sip: "calendar",
  bmi: "scale",
  bmr: "flame",
  calorie: "apple",
  "ideal-weight": "scale",
  "body-fat": "person",
  pace: "running",
  age: "cake",
  "date-difference": "calendar",
  "days-between": "calendar",
  "time-duration": "stopwatch",
  hours: "clock",
  length: "ruler",
  weight: "scale",
  temperature: "thermometer",
  speed: "speed",
  area: "area",
  volume: "flask",
  data: "database",
  time: "hourglass",
  tip: "restaurant",
  "fuel-cost": "fuel",
  "fuel-consumption": "car",
  concrete: "construction",
  brick: "brick",
  tile: "tile",
  paint: "paint",
  "square-footage": "area",
  grade: "clipboard",
  gpa: "graduation",
  cgpa: "graduation",
  "marks-percentage": "clipboard",
  binary: "code",
  "ip-subnet": "network",
  password: "lock",
};

const pathsByIcon = {
  calculator: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" /></>,
  science: <><path d="M9 3v6l-4.5 8A2 2 0 0 0 6.25 20h11.5a2 2 0 0 0 1.75-3L15 9V3M7 15h10M8 3h8" /></>,
  percent: <><path d="m7 17 10-10M8 8h.01M16 16h.01" /><circle cx="8" cy="8" r="2" /><circle cx="16" cy="16" r="2" /></>,
  fraction: <><path d="M6 18 18 6M8 7h.01M16 17h.01" /><circle cx="8" cy="7" r="2" /><circle cx="16" cy="17" r="2" /></>,
  ratio: <><circle cx="8" cy="8" r="3" /><circle cx="16" cy="16" r="3" /><path d="M10.5 10.5 13.5 13.5" /></>,
  chart: <><path d="M5 19V9M12 19V5M19 19v-7" /><path d="M3 19h18" /></>,
  exponent: <><path d="M5 17 10 7l5 10M7 14h6M16 8h3v3" /></>,
  root: <><path d="m4 13 3 3 4-10h9M14 18h6" /></>,
  bank: <><path d="m3 10 9-6 9 6M5 10v7M9 10v7M15 10v7M19 10v7M3 20h18M2 17h20" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6" /></>,
  tag: <><path d="M4 5v6l9 9 7-7-9-9z" /><circle cx="8" cy="8" r="1" /></>,
  trend: <><path d="m4 17 5-5 3 3 7-8M14 7h5v5" /></>,
  coins: <><circle cx="9" cy="9" r="5" /><path d="M13 12a5 5 0 1 0 2-3M9 7v4M7.5 9h3" /></>,
  wallet: <><path d="M4 6h15a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13v2" /><path d="M16 13h3" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></>,
  scale: <><path d="M12 4v15M7 20h10M5 7h14M5 7l-3 6h6zM19 7l-3 6h6z" /></>,
  flame: <><path d="M12 21a6 6 0 0 0 5-9c-2 1-3-1-3-5-4 2-7 6-7 9a5 5 0 0 0 5 5z" /></>,
  apple: <><path d="M12 8c-2-3-6-1-6 3 0 5 3 9 6 9s6-4 6-9c0-4-4-6-6-3zM12 6c0-2 1-3 3-4" /></>,
  person: <><circle cx="12" cy="6" r="3" /><path d="M6 21c.5-5 2.5-8 6-8s5.5 3 6 8M9 16h6" /></>,
  running: <><circle cx="15" cy="5" r="2" /><path d="m13 9-3 4 4 2 2 6M10 13l-5 2M14 15l-5 5" /></>,
  cake: <><path d="M4 12h16v8H4zM3 12h18M7 8c-2 0-2-3 0-3 0-2 3-2 3 0 0 2-1 3-3 3zM14 8c-2 0-2-3 0-3 0-2 3-2 3 0 0 2-1 3-3 3z" /></>,
  stopwatch: <><circle cx="12" cy="13" r="7" /><path d="M12 13V9M10 3h4M12 3v3M18 7l2-2" /></>,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
  ruler: <><path d="m4 17 13-13 3 3L7 20H4zM8 13l3 3M11 10l3 3M14 7l3 3" /></>,
  thermometer: <><path d="M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0zM12 16v-5" /></>,
  speed: <><path d="M4 16a8 8 0 1 1 16 0M12 12l4-4M3 20h18" /></>,
  area: <><path d="M5 5h14v14H5zM5 5l14 14M19 5 5 19" /></>,
  flask: <><path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3M7 15h10" /></>,
  database: <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 2 14 2 14 0V5M5 12v7c0 2 14 2 14 0v-7" /></>,
  hourglass: <><path d="M6 3h12M6 21h12M7 4c0 4 5 4.5 5 8s-5 4-5 8M17 4c0 4-5 4.5-5 8s5 4 5 8" /></>,
  restaurant: <><path d="M6 3v8M3 3v5a3 3 0 0 0 6 0V3M6 11v10M16 3v18M16 3c4 2 4 6 0 8" /></>,
  fuel: <><path d="M5 20V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15M5 20h13M8 7h5v4H8zM16 7l3 3v7a1 1 0 0 0 2 0v-5" /></>,
  car: <><path d="m5 16 2-6h10l2 6M4 16h16v4H4zM8 20v1M16 20v1M7 13h2M15 13h2" /></>,
  construction: <><path d="M4 20h16M6 20V9h12v11M4 9h16M8 9V5h8v4M10 5V3h4v2" /></>,
  brick: <><path d="M4 5h16v14H4zM4 10h16M4 15h16M10 5v5M16 10v5M8 15v4" /></>,
  tile: <><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></>,
  paint: <><path d="M5 20h14M8 20v-7h8v7M10 13V5h4v8M8 5h8M12 5V3" /></>,
  clipboard: <><path d="M8 4h8v3H8zM6 6H4v15h16V6h-2M8 12h8M8 16h5" /></>,
  graduation: <><path d="m3 9 9-5 9 5-9 5zM7 11v5c3 3 7 3 10 0v-5M21 9v7" /></>,
  code: <><path d="m9 7-5 5 5 5M15 7l5 5-5 5M13 4l-2 16" /></>,
  network: <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="M12 7v5M10 13l-4 3M14 13l4 3" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" /></>,
};

function CalculatorIcon({ type, className = "" }) {
  const icon = iconByType[type] || "calculator";

  return (
    <svg
      className={`calculator-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {pathsByIcon[icon]}
    </svg>
  );
}

export default CalculatorIcon;
