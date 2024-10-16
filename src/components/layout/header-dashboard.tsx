import { CircleUser, Menu } from "lucide-react";
import Link from "next/link";
import Brand from "~/components/icons/brand";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import AuthLogoutButton from "../auth/auth-logout-button";

const navLinks: {
  name: string;
  href: string;
}[] = [
  // { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/dashboard/orders" },
];

const dropdownLinks: {
  name: string;
  href: string;
}[] = [
  { name: "Orders", href: "/dashboard/orders" },
  // { name: "Settings", href: "#" },
  // { name: "Support", href: "#" },
];

function NavLinks() {
  return (
    <>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Brand className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-muted-foreground hover:text-foreground"
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}

export default function HeaderDashboard() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavLinks />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* This could be a link to the user's profile in the real app. */}
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            {/* Drop down links, if any. */}
            {dropdownLinks.length !== 0 && (
              <>
                <DropdownMenuSeparator />
                {dropdownLinks.map((link) => (
                  <DropdownMenuItem key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </>
            )}

            {/* Logout button */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <AuthLogoutButton variant="ghost" size="inset">
                Logout
              </AuthLogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
