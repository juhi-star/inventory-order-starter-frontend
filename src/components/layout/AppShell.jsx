const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { Menu } from "lucide-react";
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
    _jsxDEV('nav', { className: "flex flex-col gap-1 p-4"   , 'aria-label': "Primary", children: 
      NAV_ITEMS.map((item) => (
        _jsxDEV(NavLink, {

          to: item.to,
          end: item.end,
          onClick: onNavigate,
          className: ({ isActive }) =>
            cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )
          ,
 children: 
          item.label
        }, item.to, false, {fileName: _jsxFileName, lineNumber: 38}, this)
      ))
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 36}, this)
  );
}

function Brand() {
  return (
    _jsxDEV(Link, { to: "/", className: "flex items-center gap-2 px-4 py-4 border-b border-border"      , children: [
      _jsxDEV('div', { className: "h-8 w-8 rounded-md bg-primary"   , 'aria-hidden': true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this )
      , _jsxDEV('div', { className: "flex flex-col" , children: [
        _jsxDEV('span', { className: "text-sm font-semibold leading-none"  , children: "Inventory"}, void 0, false, {fileName: _jsxFileName, lineNumber: 64}, this)
        , _jsxDEV('span', { className: "text-xs text-muted-foreground" , children: "Orders"}, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 63}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 61}, this)
  );
}

function getInitials(value) {
  const trimmed = value.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const first = _nullishCoalesce(_optionalChain([parts, 'access', _ => _[0], 'optionalAccess', _2 => _2[0]]), () => ( ""));
    const second = _nullishCoalesce(_optionalChain([parts, 'access', _3 => _3[1], 'optionalAccess', _4 => _4[0]]), () => ( ""));
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
    _jsxDEV(DropdownMenu, { children: [
      _jsxDEV(DropdownMenuTrigger, { asChild: true, children: 
        _jsxDEV(Button, {
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9 rounded-full bg-muted text-sm font-medium"     ,
          'aria-label': "Open user menu"  ,
 children: 
          initials
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 96}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 95}, this)
      , _jsxDEV(DropdownMenuContent, { align: "end", className: "w-56", children: [
        _jsxDEV(DropdownMenuLabel, { children: [
          _jsxDEV('div', { className: "text-sm font-medium" , children: user.full_name || user.email}, void 0, false, {fileName: _jsxFileName, lineNumber: 107}, this)
          , _jsxDEV('div', { className: "text-xs font-normal text-muted-foreground"  , children: user.email}, void 0, false, {fileName: _jsxFileName, lineNumber: 108}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 106}, this)
        , _jsxDEV(DropdownMenuSeparator, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 110}, this )
        , _jsxDEV(DropdownMenuItem, { onClick: handleSignOut, children: "Sign out" }, void 0, false, {fileName: _jsxFileName, lineNumber: 111}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 105}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 94}, this)
  );
}

export function AppShell() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleClose = () => setIsOpen(false);
  return (
    _jsxDEV('div', { className: "min-h-screen bg-background" , children: [
      _jsxDEV('aside', { className: "hidden md:fixed md:inset-y-0 md:flex md:w-60 md:flex-col md:border-r md:border-border md:bg-card"        , children: [
        _jsxDEV(Brand, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 124}, this )
        , _jsxDEV(SidebarNav, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 125}, this )
        , _jsxDEV('div', { className: "mt-auto flex items-center justify-end gap-2 border-t border-border p-3"       , children: 
          _jsxDEV(UserMenu, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 126}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 123}, this)
      , _jsxDEV('header', { className: "sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:hidden"            , children: [
        _jsxDEV(Sheet, { open: isOpen, onOpenChange: setIsOpen, children: [
          _jsxDEV(SheetTrigger, { asChild: true, children: 
            _jsxDEV(Button, { variant: "ghost", size: "icon", 'aria-label': "Open menu" , children: 
              _jsxDEV(Menu, { className: "h-5 w-5" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 134}, this )
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 133}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 132}, this)
          , _jsxDEV(SheetContent, { side: "left", className: "w-60 p-0" , children: [
            _jsxDEV(Brand, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 138}, this )
            , _jsxDEV(SidebarNav, { onNavigate: handleClose,}, void 0, false, {fileName: _jsxFileName, lineNumber: 139}, this )
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 137}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 131}, this)
        , _jsxDEV('span', { className: "flex-1 text-sm font-semibold"  , children: "Inventory & Orders"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 142}, this)
        , _jsxDEV(UserMenu, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 143}, this )
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 130}, this)
      , _jsxDEV('main', { className: "md:pl-60", children: 
        _jsxDEV('div', { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"     , children: 
          _jsxDEV(Outlet, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 147}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 146}, this)
      }, location.pathname, false, {fileName: _jsxFileName, lineNumber: 145}, this)
      , _jsxDEV(Toaster, { richColors: true, closeButton: true, position: "top-right",}, void 0, false, {fileName: _jsxFileName, lineNumber: 150}, this )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 122}, this)
  );
}
