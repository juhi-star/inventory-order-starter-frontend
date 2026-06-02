const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatCurrency = (value) => currencyFormatter.format(value);

export const formatDate = (iso) => dateFormatter.format(new Date(iso));

export const shortId = (id) => id.slice(0, 8);
