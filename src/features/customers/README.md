# customers

Customer list, create/edit dialog.

Suggested files:

- `components/customer-table.tsx` — paginated list.
- `components/customer-form.tsx` — RHF + zodResolver, validates email + phone.
- `store/customers-slice.ts` + `customers-thunks.ts` — CRUD against `/api/v1/customers`.
