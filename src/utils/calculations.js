export function calculatePercentage(value, percentage) {
  return (Number(value) * Number(percentage)) / 100;
}

export function calculateBMI(weight, height) {
  const w = Number(weight);
  const h = Number(height) / 100;

  if (!w || !h) return 0;

  return w / (h * h);
}

export function calculateSimpleInterest(principal, rate, time) {
  return (Number(principal) * Number(rate) * Number(time)) / 100;
}

export function calculateCompoundInterest(principal, rate, time, frequency = 1) {
  const p = Number(principal);
  const r = Number(rate) / 100;
  const t = Number(time);
  const n = Number(frequency);

  return p * Math.pow(1 + r / n, n * t) - p;
}

export function calculateEMI(principal, annualRate, years) {
  const p = Number(principal);
  const r = Number(annualRate) / 12 / 100;
  const n = Number(years) * 12;

  if (!p || !n) return 0;

  if (r === 0) {
    return p / n;
  }

  return (
    (p * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1)
  );
}

export function calculateDiscount(price, discount) {
  const originalPrice = Number(price);
  const discountPercent = Number(discount);

  const savings = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - savings;

  return {
    savings,
    finalPrice,
  };
}

export function calculateGST(price, gstRate) {
  const amount = Number(price);
  const rate = Number(gstRate);

  const gst = (amount * rate) / 100;

  return {
    gst,
    total: amount + gst,
  };
}

export function calculateAverage(numbers) {
  const values = numbers
    .map(Number)
    .filter((value) => Number.isFinite(value));

  if (!values.length) return 0;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function calculateAge(birthDate, today = new Date()) {
  const birth = new Date(birthDate);

  if (Number.isNaN(birth.getTime())) {
    return null;
  }

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;

    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years,
    months,
    days,
  };
}