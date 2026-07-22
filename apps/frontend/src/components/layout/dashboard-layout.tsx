'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './sidebar';
import { CommandPalette } from '@/components/ui/command-palette';
import Link from 'next/link';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <CommandPalette />

      {/* Mobile header — only visible on small screens */}
      <div className="flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          aria-label="Toggle sidebar"
        >
          {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
            CC
          </span>
          <span className="hidden sm:inline">Career Copilot</span>
        </Link>
        <div className="w-9" />
      </div>

      <div className="flex flex-1">
        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/20" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative w-64 h-full" onClick={(e) => e.stopPropagation()}>
              <Sidebar className="h-full border-r bg-background" onNavigate={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        <Sidebar className="hidden md:block" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
