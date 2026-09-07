const guidesByType = {
  percentage: {
    formula: "Percentage = (part ÷ whole) × 100",
    example:
      "For 20% of 500, calculate (20 ÷ 100) × 500 = 100.",
    meaning:
      "The result shows the selected portion of the original number.",
  },
  average: {
    formula: "Average = Sum of values ÷ Number of values",
    example:
      "For 10, 20, and 30, calculate (10 + 20 + 30) ÷ 3 = 20.",
    meaning:
      "The result represents the central or typical value in the data set.",
  },
  loan: {
    formula:
      "Monthly payment = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)",
    example:
      "For a loan, enter the principal, annual interest rate, and term. The calculator converts the rate and term to monthly values before applying the formula.",
    meaning:
      "The result estimates your regular payment, total repayment, and interest cost.",
  },
  emi: {
    formula:
      "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)",
    example:
      "Enter the loan amount, annual rate, and number of months. The monthly rate is applied to the principal and repayment period.",
    meaning:
      "EMI is the fixed amount paid each month toward principal and interest.",
  },
  gst: {
    formula:
      "GST amount = Original price × GST rate ÷ 100",
    example:
      "For a price of ₹1,000 at 18% GST, GST is ₹180 and the inclusive price is ₹1,180.",
    meaning:
      "The result separates the tax amount from the final price.",
  },
  bmi: {
    formula: "BMI = Weight in kilograms ÷ Height in metres²",
    example:
      "For 70 kg and 1.75 m, BMI = 70 ÷ (1.75 × 1.75) = 22.86.",
    meaning:
      "BMI is a screening measure that compares weight with height; it is not a medical diagnosis.",
  },
  "simple-interest": {
    formula: "Simple interest = Principal × Rate × Time ÷ 100",
    example:
      "For ₹10,000 at 5% for 2 years, interest is ₹1,000 and the total is ₹11,000.",
    meaning:
      "The result shows interest calculated only on the original principal.",
  },
  "compound-interest": {
    formula: "Amount = Principal × (1 + Rate ÷ n)ⁿᵗ",
    example:
      "Enter the principal, rate, compounding frequency, and time to estimate the final amount and earned interest.",
    meaning:
      "The result includes interest earned on both the principal and earlier interest.",
  },
  profit: {
    formula: "Profit = Selling price − Cost price",
    example:
      "If an item costs ₹800 and sells for ₹1,000, profit is ₹200 or 25% of the cost price.",
    meaning:
      "The result shows the gain or loss and its percentage compared with the cost.",
  },
  age: {
    formula: "Age = Difference between the birth date and target date",
    example:
      "Enter both dates to calculate the exact elapsed years, months, and days.",
    meaning:
      "The result is the precise elapsed age at the selected target date.",
  },
  "date-difference": {
    formula: "Date difference = End date − Start date",
    example:
      "Enter a start date and end date to count the days between them.",
    meaning:
      "The result shows the elapsed time between the two selected dates.",
  },
  "time-duration": {
    formula: "Duration = End time − Start time",
    example:
      "Enter 09:00 and 17:30 to calculate a duration of 8 hours and 30 minutes.",
    meaning:
      "The result shows the total elapsed hours and minutes.",
  },
};

const defaultGuide = {
  formula:
    "The calculator applies the standard mathematical conversion or calculation for the selected inputs.",
  example:
    "Enter the requested values, review the units, and select Calculate to see a worked result.",
  meaning:
    "The result provides an estimate based on the values and assumptions you enter.",
};

export function getCalculatorGuide(type) {
  return guidesByType[type] || defaultGuide;
}
