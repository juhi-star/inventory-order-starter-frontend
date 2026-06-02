

const now = () => new Date().toISOString();

const uid = () => crypto.randomUUID();

const seedProducts = [
  { id: uid(), name: "Wireless Mouse", sku: "WM-001", price: 25.99, qty: 42, created_at: now() },
  { id: uid(), name: "Mechanical Keyboard", sku: "KB-002", price: 89.5, qty: 8, created_at: now() },
  { id: uid(), name: "27-inch Monitor", sku: "MN-027", price: 299.0, qty: 4, created_at: now() },
  { id: uid(), name: "USB-C Hub", sku: "HUB-003", price: 39.99, qty: 25, created_at: now() },
  { id: uid(), name: "Laptop Stand", sku: "LS-010", price: 45.0, qty: 2, created_at: now() },
  { id: uid(), name: "Noise-Cancelling Headphones", sku: "HP-200", price: 199.99, qty: 15, created_at: now() },
  { id: uid(), name: "Webcam 1080p", sku: "WC-108", price: 65.0, qty: 9, created_at: now() },
  { id: uid(), name: "Ergonomic Chair", sku: "CH-500", price: 499.0, qty: 1, created_at: now() },
  { id: uid(), name: "Desk Lamp LED", sku: "DL-300", price: 35.5, qty: 30, created_at: now() },
  { id: uid(), name: "External SSD 1TB", sku: "SSD-1TB", price: 119.99, qty: 6, created_at: now() },
];

const seedCustomers = [
  { id: uid(), full_name: "Alice Chen", email: "alice@example.com", phone: "+14155551001", created_at: now() },
  { id: uid(), full_name: "Bob Martinez", email: "bob@example.com", phone: "+14155551002", created_at: now() },
  { id: uid(), full_name: "Carol Singh", email: "carol@example.com", phone: "+14155551003", created_at: now() },
  { id: uid(), full_name: "David Kim", email: "david@example.com", phone: "+14155551004", created_at: now() },
  { id: uid(), full_name: "Elena Rossi", email: "elena@example.com", phone: "+14155551005", created_at: now() },
];

function buildSeedOrders(products, customers) {
  const [p1, p2] = [products[0], products[3]];
  const [c1, c2] = [customers[0], customers[1]];
  if (!p1 || !p2 || !c1 || !c2) return [];
  const order1Subtotal = +(p1.price * 2).toFixed(2);
  const order2Subtotal = p2.price;
  return [
    {
      id: uid(),
      customer_id: c1.id,
      customer_name: c1.full_name,
      lines: [
        {
          product_id: p1.id,
          product_name: p1.name,
          qty: 2,
          unit_price: p1.price,
          subtotal: order1Subtotal,
        },
      ],
      total: order1Subtotal,
      status: "placed",
      created_at: now(),
    },
    {
      id: uid(),
      customer_id: c2.id,
      customer_name: c2.full_name,
      lines: [
        {
          product_id: p2.id,
          product_name: p2.name,
          qty: 1,
          unit_price: p2.price,
          subtotal: order2Subtotal,
        },
      ],
      total: order2Subtotal,
      status: "cancelled",
      created_at: now(),
    },
  ];
}

const products = new Map(seedProducts.map((p) => [p.id, p]));
const customers = new Map(seedCustomers.map((c) => [c.id, c]));
const orders = new Map(
  buildSeedOrders(seedProducts, seedCustomers).map((o) => [o.id, o]),
);












const seedUsers = [
  {
    id: uid(),
    email: "admin@example.com",
    full_name: "Administrator",
    role: "admin",
    is_active: true,
    last_login_at: null,
    created_at: now(),
    password: "admin123",
  },
];

const users = new Map(seedUsers.map((u) => [u.id, u]));

export const db = {
  products,
  customers,
  orders,
  users,
  reset() {
    db.products = new Map(seedProducts.map((p) => [p.id, { ...p }]));
    db.customers = new Map(seedCustomers.map((c) => [c.id, { ...c }]));
    db.orders = new Map(buildSeedOrders([...db.products.values()], [...db.customers.values()]).map((o) => [o.id, o]));
    db.users = new Map(seedUsers.map((u) => [u.id, { ...u }]));
  },
};
