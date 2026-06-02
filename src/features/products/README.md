# products

Product list, create/edit dialog, low-stock badge.

Suggested files:

- `components/product-table.tsx` — paginated list with search.
- `components/product-form.tsx` — RHF + zodResolver, validates SKU + price + qty.
- `store/products-slice.ts` — RTK slice + memoized selectors (`createSelector`).
- `store/products-thunks.ts` — CRUD thunks against `/api/v1/products`.
