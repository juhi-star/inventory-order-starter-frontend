# orders

Order creation wizard, order list, order detail.

Suggested files:

- `components/order-create-form.tsx` — line items, server-computed total preview.
- `components/order-table.tsx` — paginated list with status filter.
- `components/order-detail.tsx` — line items, cancel action.
- `store/orders-slice.ts` + `orders-thunks.ts` — CRUD against `/api/v1/orders`.

Surface the **409 oversell** error inline on the form, not as a toast — users need to fix line items, not dismiss the message.
