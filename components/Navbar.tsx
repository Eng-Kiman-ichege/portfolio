"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutDashboard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const isAdmin = pathname.startsWith("/admin");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/8 bg-background/80 backdrop-blur-xl shadow-xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-1 text-xl font-bold tracking-tighter transition-colors hover:text-accent"
          >
            <span className="relative">
              EVAN
              <span className="text-accent">.</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-accent transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isSignedIn && (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-9 px-3 gap-2 rounded-full text-muted-foreground hover:text-foreground ${
                      isAdmin ? "bg-white/5 text-foreground" : ""
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>
                <Link href="/admin/new">
                  <Button
                    size="sm"
                    className="h-9 px-4 gap-2 rounded-full shadow-lg shadow-accent/10 hover:shadow-accent/20 transition-shadow"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Project</span>
                  </Button>
                </Link>
              </div>
            )}

            <div className={`${isSignedIn ? "border-l border-white/10 pl-3" : ""} flex items-center gap-3`}>
              {isSignedIn && <UserButton />}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-white/8 bg-background/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-2 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-white/5 last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isSignedIn && (
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Button>
                </Link>
                <Link href="/admin/new" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gap-2">
                    <Plus className="h-4 w-4" /> New Project
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
