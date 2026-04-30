"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Plus, LayoutDashboard, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tighter transition-colors hover:text-accent">
          EVAN<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <Link 
            href="/#projects" 
            className="hidden sm:block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Projects
          </Link>
          
          {isSignedIn && (
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className={`h-9 px-3 sm:px-4 gap-2 rounded-full ${isAdmin ? "bg-white/5 text-foreground" : "text-muted-foreground"}`}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <Link href="/admin/new">
                <Button size="sm" className="h-9 w-9 sm:w-auto sm:px-4 gap-2 rounded-full cursor-pointer transition-all hover:bg-accent hover:text-white shadow-lg shadow-accent/10">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Project</span>
                </Button>
              </Link>
            </div>
          )}


          <div className="ml-2 border-l border-white/10 pl-2 sm:pl-4">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
