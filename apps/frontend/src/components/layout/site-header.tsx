'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Home, FileText, Search, LayoutDashboard, HelpCircle, BookOpen, Sparkles, PlayCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@career-copilot/ui';

const dashboardSubLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/job-description', label: 'Skill Gap Analysis', icon: Search },
  { href: '/questions', label: 'Interview Questions', icon: HelpCircle },
  { href: '/study-plan', label: 'Study Plan', icon: BookOpen },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 transition-all duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-stone-200/50 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
              CC
            </span>
            <span className="hidden sm:inline">Career Copilot</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <a
            href="#how-it-works"
            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <PlayCircle className="h-4 w-4" />
            How It Works
          </a>
          <a
            href="#features"
            className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Sparkles className="h-4 w-4" />
            Features
          </a>

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', dropdownOpen && 'rotate-180')} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border bg-white shadow-lg py-1.5">
                {dashboardSubLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <nav className="relative w-64 bg-background border-r h-full p-4 pt-2 space-y-1 shadow-lg overflow-y-auto">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <a
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
            >
              <PlayCircle className="h-4 w-4" />
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Features
            </a>

            <div className="pt-2 border-t border-border mt-2">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Dashboard
              </div>
              {dashboardSubLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-border mt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
