# auth

Worked-example vertical slice. Implemented; treat as a reference for the other features.

Files:

- `components/login-form.tsx` — RHF + zodResolver, controlled by parent.
- `pages/LoginPage.tsx` — centred Card, dispatches `loginThunk`, navigates on success.
- `routes/require-auth.tsx` — Outlet wrapper. Lazy bootstrap via `fetchCurrentUserThunk` if a stored access token is present, then renders `<Outlet/>` or `<Navigate to='/login'/>`.
- `schemas/login.ts` — Zod `loginFormSchema` + inferred `LoginFormValues`.
- `store/auth-slice.ts` — RTK slice (`user`, `status`, `error`) + memoised selectors.
- `store/auth-thunks.ts` — `loginThunk`, `fetchCurrentUserThunk`, `logoutThunk` using `apiClient`.

Token persistence lives in `src/lib/auth-storage.ts`. MSW mock handlers in `src/mocks/handlers.ts` accept `admin@example.com / admin123`.
