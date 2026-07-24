'use client';

import { FileText, Search, HelpCircle, BookOpen, Home, LayoutDashboard } from 'lucide-react';
import { cn } from '@career-copilot/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/job-description', label: 'Skill Gap Analysis', icon: Search },
  { href: '/questions', label: 'Interview Questions', icon: HelpCircle },
  { href: '/study-plan', label: 'Study Plan', icon: BookOpen },
];

export function Sidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn('w-64 border-r bg-muted/40 flex flex-col shrink-0', className)}>
      <Link href="/" className="flex items-center gap-2 border-b border-border px-4 py-3.5 text-lg font-semibold tracking-tight shrink-0">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
          CC
        </span>
        <span>Career Copilot</span>
      </Link>
      <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
              pathname === href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
