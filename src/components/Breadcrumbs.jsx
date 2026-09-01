function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.name}-${index}`}>
            <span className="breadcrumb-separator">/</span>

            {isLast || !item.href ? (
              <span className="breadcrumb-current">
                {item.name}
              </span>
            ) : (
              <a href={item.href}>{item.name}</a>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;