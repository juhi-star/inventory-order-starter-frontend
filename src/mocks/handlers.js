 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { http, HttpResponse, } from "msw";











import { db, } from "./db";



const API_BASE = _nullishCoalesce(import.meta.env.VITE_API_BASE_URL, () => ( "http://localhost:8000/api/v1"));

const url = (path) => `${API_BASE}${path}`;

const uid = () => crypto.randomUUID();

const now = () => new Date().toISOString();

const errorEnvelope = (code, message, details) => ({
  error: { code, message, details, request_id: uid() },
});
























const productHandlers = [
  http.get(url("/products"), () => HttpResponse.json([...db.products.values()])),
  http.post(url("/products"), async ({ request }) => {
    const body = await request.json();
    const skuExists = [...db.products.values()].some((p) => p.sku === body.sku);
    if (skuExists) {
      return HttpResponse.json(errorEnvelope("duplicate_sku", "SKU already exists"), { status: 409 });
    }
    const product = { id: uid(), ...body, created_at: now() };
    db.products.set(product.id, product);
    return HttpResponse.json(product, { status: 201 });
  }),
  http.get(url("/products/:id"), ({ params }) => {
    const product = db.products.get(params.id);
    if (!product) return HttpResponse.json(errorEnvelope("not_found", "Product not found"), { status: 404 });
    return HttpResponse.json(product);
  }),
  http.put(url("/products/:id"), async ({ params, request }) => {
    const existing = db.products.get(params.id);
    if (!existing) return HttpResponse.json(errorEnvelope("not_found", "Product not found"), { status: 404 });
    const body = await request.json();
    const skuClash = [...db.products.values()].some((p) => p.sku === body.sku && p.id !== params.id);
    if (skuClash) {
      return HttpResponse.json(errorEnvelope("duplicate_sku", "SKU already exists"), { status: 409 });
    }
    const updated = { ...existing, ...body };
    db.products.set(params.id, updated);
    return HttpResponse.json(updated);
  }),
  http.delete(url("/products/:id"), ({ params }) => {
    if (!db.products.has(params.id)) {
      return HttpResponse.json(errorEnvelope("not_found", "Product not found"), { status: 404 });
    }
    db.products.delete(params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];

const customerHandlers = [
  http.get(url("/customers"), () => HttpResponse.json([...db.customers.values()])),
  http.post(url("/customers"), async ({ request }) => {
    const body = await request.json();
    const emailExists = [...db.customers.values()].some((c) => c.email === body.email);
    if (emailExists) {
      return HttpResponse.json(errorEnvelope("duplicate_email", "Email already exists"), { status: 409 });
    }
    const customer = { id: uid(), ...body, created_at: now() };
    db.customers.set(customer.id, customer);
    return HttpResponse.json(customer, { status: 201 });
  }),
  http.get(url("/customers/:id"), ({ params }) => {
    const customer = db.customers.get(params.id);
    if (!customer) return HttpResponse.json(errorEnvelope("not_found", "Customer not found"), { status: 404 });
    return HttpResponse.json(customer);
  }),
  http.put(url("/customers/:id"), async ({ params, request }) => {
    const existing = db.customers.get(params.id);
    if (!existing) return HttpResponse.json(errorEnvelope("not_found", "Customer not found"), { status: 404 });
    const body = await request.json();
    const emailClash = [...db.customers.values()].some((c) => c.email === body.email && c.id !== params.id);
    if (emailClash) {
      return HttpResponse.json(errorEnvelope("duplicate_email", "Email already exists"), { status: 409 });
    }
    const updated = { ...existing, ...body };
    db.customers.set(params.id, updated);
    return HttpResponse.json(updated);
  }),
  http.delete(url("/customers/:id"), ({ params }) => {
    if (!db.customers.has(params.id)) {
      return HttpResponse.json(errorEnvelope("not_found", "Customer not found"), { status: 404 });
    }
    db.customers.delete(params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];

function buildOrder(input) {
  const customer = db.customers.get(input.customer_id);
  if (!customer) return { order: null, oversell: [] };
  const oversell = [];
  const lines = [];
  input.lines.forEach((line, idx) => {
    const product = db.products.get(line.product_id);
    if (!product) return;
    if (line.qty > product.qty) {
      oversell.push({ line: idx, product_id: product.id, requested: line.qty, available: product.qty });
      return;
    }
    lines.push({
      product_id: product.id,
      product_name: product.name,
      qty: line.qty,
      unit_price: product.price,
      subtotal: +(product.price * line.qty).toFixed(2),
    });
  });
  if (oversell.length > 0) return { order: null, oversell };
  const total = +lines.reduce((sum, l) => sum + l.subtotal, 0).toFixed(2);
  const order = {
    id: uid(),
    customer_id: customer.id,
    customer_name: customer.full_name,
    lines,
    total,
    status: "placed",
    created_at: now(),
  };
  return { order, oversell: [] };
}

const orderHandlers = [
  http.get(url("/orders"), () => HttpResponse.json([...db.orders.values()])),
  http.post(url("/orders"), async ({ request }) => {
    const body = await request.json();
    if (!db.customers.has(body.customer_id)) {
      return HttpResponse.json(errorEnvelope("not_found", "Customer not found"), { status: 404 });
    }
    if (!Array.isArray(body.lines) || body.lines.length === 0) {
      return HttpResponse.json(errorEnvelope("validation_error", "Order must have at least one line"), {
        status: 422,
      });
    }
    const { order, oversell } = buildOrder(body);
    if (oversell.length > 0) {
      return HttpResponse.json(errorEnvelope("oversell", "Insufficient stock for one or more lines", oversell), {
        status: 409,
      });
    }
    if (!order) {
      return HttpResponse.json(errorEnvelope("validation_error", "Could not build order"), { status: 422 });
    }
    order.lines.forEach((line) => {
      const product = db.products.get(line.product_id);
      if (product) db.products.set(product.id, { ...product, qty: product.qty - line.qty });
    });
    db.orders.set(order.id, order);
    return HttpResponse.json(order, { status: 201 });
  }),
  http.get(url("/orders/:id"), ({ params }) => {
    const order = db.orders.get(params.id);
    if (!order) return HttpResponse.json(errorEnvelope("not_found", "Order not found"), { status: 404 });
    return HttpResponse.json(order);
  }),
  http.post(url("/orders/:id/cancel"), ({ params }) => {
    const order = db.orders.get(params.id);
    if (!order) return HttpResponse.json(errorEnvelope("not_found", "Order not found"), { status: 404 });
    if (order.status === "cancelled") {
      return HttpResponse.json(errorEnvelope("invalid_state", "Order already cancelled"), { status: 409 });
    }
    const cancelled = { ...order, status: "cancelled" };
    db.orders.set(order.id, cancelled);
    order.lines.forEach((line) => {
      const product = db.products.get(line.product_id);
      if (product) db.products.set(product.id, { ...product, qty: product.qty + line.qty });
    });
    return HttpResponse.json(cancelled);
  }),
];

const dashboardHandlers = [
  http.get(url("/dashboard/summary"), () => {
    const allProducts = [...db.products.values()];
    const lowStock = allProducts.filter((p) => p.qty <= 10).sort((a, b) => a.qty - b.qty);
    const summary = {
      total_products: db.products.size,
      total_customers: db.customers.size,
      total_orders: db.orders.size,
      low_stock_count: lowStock.length,
      low_stock_products: lowStock.slice(0, 10),
    };
    return HttpResponse.json(summary);
  }),
];

const healthHandlers = [http.get(url("/health/live"), () => HttpResponse.json({ status: "ok" }))];

const accessTokens = new Map();
const refreshTokens = new Map();

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    is_active: user.is_active,
    last_login_at: user.last_login_at,
    created_at: user.created_at,
  };
}

function bearerUser(request) {
  const header = request.headers.get("authorization");
  if (!header) return null;
  const match = /^Bearer (.+)$/.exec(header);
  if (!match) return null;
  const token = match[1];
  if (!token) return null;
  const userId = accessTokens.get(token);
  if (!userId) return null;
  return _nullishCoalesce(db.users.get(userId), () => ( null));
}










const authHandlers = [
  http.post(url("/auth/login"), async ({ request }) => {
    const body = await request.json();
    const candidate = [...db.users.values()].find((u) => u.email === body.email.toLowerCase());
    if (!candidate || candidate.password !== body.password) {
      return HttpResponse.json(
        errorEnvelope("invalid_credentials", "Invalid email or password"),
        { status: 401 },
      );
    }
    const accessToken = uid();
    const refreshToken = uid();
    accessTokens.set(accessToken, candidate.id);
    refreshTokens.set(refreshToken, { userId: candidate.id, used: false });
    candidate.last_login_at = now();
    return HttpResponse.json(
      {
        user: toPublicUser(candidate),
        tokens: {
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: "bearer",
          expires_in: 900,
        },
      },
      { status: 200 },
    );
  }),
  http.post(url("/auth/refresh"), async ({ request }) => {
    const body = await request.json();
    const record = refreshTokens.get(body.refresh_token);
    if (!record || record.used) {
      return HttpResponse.json(errorEnvelope("invalid_token", "Refresh token no longer valid"), {
        status: 401,
      });
    }
    record.used = true;
    const newAccess = uid();
    const newRefresh = uid();
    accessTokens.set(newAccess, record.userId);
    refreshTokens.set(newRefresh, { userId: record.userId, used: false });
    return HttpResponse.json({
      access_token: newAccess,
      refresh_token: newRefresh,
      token_type: "bearer",
      expires_in: 900,
    });
  }),
  http.post(url("/auth/logout"), ({ request }) => {
    const user = bearerUser(request);
    if (!user) {
      return HttpResponse.json(errorEnvelope("unauthorized", "Not authenticated"), {
        status: 401,
      });
    }
    const toRemove = [];
    for (const [token, record] of refreshTokens.entries()) {
      if (record.userId === user.id) toRemove.push(token);
    }
    for (const token of toRemove) refreshTokens.delete(token);
    return new HttpResponse(null, { status: 204 });
  }),
  http.get(url("/auth/me"), ({ request }) => {
    const user = bearerUser(request);
    if (!user) {
      return HttpResponse.json(errorEnvelope("unauthorized", "Not authenticated"), {
        status: 401,
      });
    }
    return HttpResponse.json(toPublicUser(user));
  }),
];

export const handlers = [
  ...authHandlers,
  ...productHandlers,
  ...customerHandlers,
  ...orderHandlers,
  ...dashboardHandlers,
  ...healthHandlers,
];
