const calculators = [
  // =========================
  // MATH
  // =========================

  {
    slug: "basic-calculator",
    name: "Basic Calculator",
    category: "Math",
    description:
      "Perform addition, subtraction, multiplication, division, percentages, and everyday calculations.",
    type: "basic",
  },
  {
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    category: "Math",
    description:
      "Perform advanced calculations including trigonometry, logarithms, roots, parentheses, and constants.",
    type: "scientific",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Math",
    description:
      "Calculate percentages, percentage increases, decreases, and differences.",
    type: "percentage",
  },
  {
    slug: "fraction-calculator",
    name: "Fraction Calculator",
    category: "Math",
    description:
      "Add, subtract, multiply, divide, and simplify fractions.",
    type: "fraction",
  },
  {
    slug: "ratio-calculator",
    name: "Ratio Calculator",
    category: "Math",
    description:
      "Simplify ratios and solve proportions quickly.",
    type: "ratio",
  },
  {
    slug: "average-calculator",
    name: "Average Calculator",
    category: "Math",
    description:
      "Calculate the average or mean of a set of numbers.",
    type: "average",
  },
  {
    slug: "exponent-calculator",
    name: "Exponent Calculator",
    category: "Math",
    description:
      "Calculate powers and exponents quickly.",
    type: "exponent",
  },
  {
    slug: "square-root-calculator",
    name: "Square Root Calculator",
    category: "Math",
    description:
      "Calculate the square root of a number.",
    type: "sqrt",
  },

  // =========================
  // FINANCE
  // =========================

  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    category: "Finance",
    description:
      "Calculate monthly loan payments, total interest, and total repayment.",
    type: "loan",
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    category: "Finance",
    description:
      "Calculate monthly EMI, total interest, and total loan payment.",
    type: "emi",
  },
  {
    slug: "gst-calculator",
    name: "GST Calculator",
    category: "Finance",
    description:
      "Calculate GST amounts and prices with or without GST.",
    type: "gst",
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "Finance",
    description:
      "Calculate discounts, savings, and final sale prices.",
    type: "discount",
  },
  {
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    category: "Finance",
    description:
      "Calculate simple interest and total amount.",
    type: "simple-interest",
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "Finance",
    description:
      "Calculate compound interest and investment growth.",
    type: "compound-interest",
  },
  {
    slug: "percentage-profit-calculator",
    name: "Profit Percentage Calculator",
    category: "Finance",
    description:
      "Calculate profit, loss, and profit percentage.",
    type: "profit",
  },
  {
    slug: "salary-calculator",
    name: "Salary Calculator",
    category: "Finance",
    description:
      "Convert salary between annual, monthly, weekly, and daily amounts.",
    type: "salary",
  },
  {
    slug: "investment-calculator",
    name: "Investment Calculator",
    category: "Finance",
    description:
      "Estimate investment growth based on contributions, return, and time.",
    type: "investment",
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "Finance",
    description:
      "Calculate estimated SIP investment returns and maturity value.",
    type: "sip",
  },

  // =========================
  // HEALTH
  // =========================

  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "Health",
    description:
      "Calculate Body Mass Index using height and weight.",
    type: "bmi",
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    category: "Health",
    description:
      "Calculate Basal Metabolic Rate.",
    type: "bmr",
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    category: "Health",
    description:
      "Estimate daily calorie requirements based on activity.",
    type: "calorie",
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    category: "Health",
    description:
      "Estimate an ideal weight based on height.",
    type: "ideal-weight",
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    category: "Health",
    description:
      "Estimate body fat percentage.",
    type: "body-fat",
  },
  {
    slug: "pace-calculator",
    name: "Pace Calculator",
    category: "Health",
    description:
      "Calculate running pace, time, distance, and speed.",
    type: "pace",
  },

  // =========================
  // DATE & TIME
  // =========================

  {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "Date & Time",
    description:
      "Calculate exact age in years, months, and days.",
    type: "age",
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    category: "Date & Time",
    description:
      "Calculate the number of days between two dates.",
    type: "date-difference",
  },
  {
    slug: "days-between-dates-calculator",
    name: "Days Between Dates Calculator",
    category: "Date & Time",
    description:
      "Find the number of days between two dates.",
    type: "days-between",
  },
  {
    slug: "time-duration-calculator",
    name: "Time Duration Calculator",
    category: "Date & Time",
    description:
      "Calculate the duration between two times.",
    type: "time-duration",
  },
  {
    slug: "hours-calculator",
    name: "Hours Calculator",
    category: "Date & Time",
    description:
      "Calculate hours and minutes between times.",
    type: "hours",
  },

  // =========================
  // CONVERSION
  // =========================

  {
    slug: "length-converter",
    name: "Length Converter",
    category: "Conversion",
    description:
      "Convert meters, kilometers, miles, feet, inches, yards, and more.",
    type: "length",
  },
  {
    slug: "weight-converter",
    name: "Weight Converter",
    category: "Conversion",
    description:
      "Convert kilograms, grams, pounds, ounces, and more.",
    type: "weight",
  },
  {
    slug: "temperature-converter",
    name: "Temperature Converter",
    category: "Conversion",
    description:
      "Convert Celsius, Fahrenheit, and Kelvin.",
    type: "temperature",
  },
  {
    slug: "speed-converter",
    name: "Speed Converter",
    category: "Conversion",
    description:
      "Convert km/h, mph, m/s, knots, and more.",
    type: "speed",
  },
  {
    slug: "area-converter",
    name: "Area Converter",
    category: "Conversion",
    description:
      "Convert square meters, square feet, acres, hectares, and more.",
    type: "area",
  },
  {
    slug: "volume-converter",
    name: "Volume Converter",
    category: "Conversion",
    description:
      "Convert liters, gallons, milliliters, and other volume units.",
    type: "volume",
  },
  {
    slug: "data-converter",
    name: "Data Storage Converter",
    category: "Conversion",
    description:
      "Convert bytes, KB, MB, GB, TB, and more.",
    type: "data",
  },
  {
    slug: "time-converter",
    name: "Time Converter",
    category: "Conversion",
    description:
      "Convert seconds, minutes, hours, days, and weeks.",
    type: "time",
  },

  // =========================
  // EVERYDAY
  // =========================

  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    category: "Everyday",
    description:
      "Calculate tips, total bills, and split bills.",
    type: "tip",
  },
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "Everyday",
    description:
      "Calculate fuel required and estimated trip cost.",
    type: "fuel-cost",
  },
  {
    slug: "fuel-consumption-calculator",
    name: "Fuel Consumption Calculator",
    category: "Everyday",
    description:
      "Calculate vehicle fuel consumption and mileage.",
    type: "fuel-consumption",
  },
  {
    slug: "time-calculator",
    name: "Time Calculator",
    category: "Everyday",
    description:
      "Add and subtract time durations.",
    type: "time-duration",
  },

  // =========================
  // CONSTRUCTION
  // =========================

  {
    slug: "concrete-calculator",
    name: "Concrete Calculator",
    category: "Construction",
    description:
      "Estimate the amount of concrete needed.",
    type: "concrete",
  },
  {
    slug: "brick-calculator",
    name: "Brick Calculator",
    category: "Construction",
    description:
      "Estimate the number of bricks required for a wall.",
    type: "brick",
  },
  {
    slug: "tile-calculator",
    name: "Tile Calculator",
    category: "Construction",
    description:
      "Calculate the number of tiles required.",
    type: "tile",
  },
  {
    slug: "paint-calculator",
    name: "Paint Calculator",
    category: "Construction",
    description:
      "Estimate the amount of paint needed.",
    type: "paint",
  },
  {
    slug: "square-footage-calculator",
    name: "Square Footage Calculator",
    category: "Construction",
    description:
      "Calculate the area of rooms, floors, and walls.",
    type: "square-footage",
  },

  // =========================
  // EDUCATION
  // =========================

  {
    slug: "grade-calculator",
    name: "Grade Calculator",
    category: "Education",
    description:
      "Calculate grades from percentage scores.",
    type: "grade",
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "Education",
    description:
      "Calculate GPA from grade points.",
    type: "gpa",
  },
  {
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "Education",
    description:
      "Calculate CGPA from semester grade points.",
    type: "cgpa",
  },
  {
    slug: "marks-percentage-calculator",
    name: "Marks Percentage Calculator",
    category: "Education",
    description:
      "Calculate percentage from obtained and maximum marks.",
    type: "marks-percentage",
  },

  // =========================
  // TECHNOLOGY
  // =========================

  {
    slug: "binary-calculator",
    name: "Binary Calculator",
    category: "Technology",
    description:
      "Perform calculations using binary numbers.",
    type: "binary",
  },
  {
    slug: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    category: "Technology",
    description:
      "Calculate IPv4 subnet information.",
    type: "ip-subnet",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Technology",
    description:
      "Generate strong random passwords.",
    type: "password",
  },
];

export default calculators;