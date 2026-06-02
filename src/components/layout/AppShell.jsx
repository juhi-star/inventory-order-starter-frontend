import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { selectAuthUser } from "@/features/auth/store/auth-slice";
import { logoutThunk } from "@/features/auth/store/auth-thunks";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/products", label: "Products" },
  { to: "/customers", label: "Customers" },
  { to: "/orders", label: "Orders" },
];

function SidebarNav({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 p-4" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 px-4 py-4 border-b border-border">
      <div className="h-8 w-8 rounded-md bg-primary" aria-hidden={true} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-none">Inventory</span>
        <span className="text-xs text-muted-foreground">Orders</span>
      </div>
    </Link>
  );
}

function getInitials(value) {
  const trimmed = value.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return (first + second).toUpperCase() || "?";
  }
  return trimmed.slice(0, 2).toUpperCase();
}

function UserMenu() {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return null;

  const initials = getInitials(user.full_name || user.email);

  const handleSignOut = async () => {
    await dispatch(logoutThunk());
    navigate("/login", { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-muted text-sm font-medium" aria-label="Open user menu">
          {initials}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="text-sm font-medium">{user.full_name || user.email}</div>
          <div className="text-xs font-normal text-muted-foreground">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleClose = () => setIsOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-60 md:flex-col md:border-r md:border-border md:bg-card">
        <Brand />
        <SidebarNav />
        <div className="mt-auto flex items-center justify-end gap-2 border-t border-border p-3">
          <UserMenu />
        </div>
      </aside>

      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <Brand />
            <SidebarNav onNavigate={handleClose} />
          </SheetContent>
        </Sheet>
        <span className="flex-1 text-sm font-semibold">Inventory & Orders</span>
        <UserMenu />
      </header>

      <main className="md:pl-60" key={location.pathname}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <Toaster richColors closeButton position="top-right" />
    </div>
  );
}
