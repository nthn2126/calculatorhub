const ignoredTerms = new Set([
  "a",
  "and",
  "can",
  "calculate",
  "find",
  "for",
  "how",
  "i",
  "is",
  "me",
  "my",
  "the",
  "what",
]);

function getSearchTerms(query) {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(
      (term) => term && !ignoredTerms.has(term)
    );
}

function getSearchableText(calculator) {
  return [
    calculator.name,
    calculator.slug.replace(/-/g, " "),
    calculator.category,
    calculator.description,
    calculator.type,
  ]
    .join(" ")
    .toLowerCase();
}

export function matchesCalculatorSearch(
  calculator,
  query
) {
  const terms = getSearchTerms(query);

  if (!terms.length) {
    return true;
  }

  const searchableText =
    getSearchableText(calculator);

  return terms.every((term) =>
    searchableText.includes(term)
  );
}

export function rankCalculatorSearch(
  calculator,
  query
) {
  const search = query.trim().toLowerCase();
  const name = calculator.name.toLowerCase();
  const slug = calculator.slug.toLowerCase();

  if (name === search || slug === search) {
    return 3;
  }

  if (
    name.includes(search) ||
    slug.includes(search)
  ) {
    return 2;
  }

  return 1;
}
