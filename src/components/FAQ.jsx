import { useEffect } from "react";

function FAQ({ items = [] }) {
  useEffect(() => {
    if (!items.length) {
      return;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const schemaId = "faq-schema";

    let script =
      document.getElementById(schemaId);

    if (!script) {
      script =
        document.createElement("script");

      script.id = schemaId;
      script.type = "application/ld+json";

      document.head.appendChild(script);
    }

    script.textContent =
      JSON.stringify(schema);

    return () => {
      const existing =
        document.getElementById(schemaId);

      if (existing) {
        existing.remove();
      }
    };
  }, [items]);

  return (
    <div className="faq">

      <h2>
        Frequently Asked Questions
      </h2>

      {items.map((item, index) => (
        <details
          className="faq-item"
          key={`${item.question}-${index}`}
        >
          <summary className="faq-question">
            {item.question}
          </summary>

          <div className="faq-answer">
            <p>
              {item.answer}
            </p>
          </div>
        </details>
      ))}

    </div>
  );
}

export default FAQ;