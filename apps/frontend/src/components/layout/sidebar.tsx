'use client';

import { FileText, Search, BarChart3, HelpCircle, BookOpen } from 'lucide-react';
import { cn } from '@career-copilot/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/job-description', label: 'Job Description', icon: Search },
  { href: '/analysis', label: 'Analysis', icon: BarChart3 },
  { href: '/questions', label: 'Interview Questions', icon: HelpCircle },
  { href: '/study-plan', label: 'Study Plan', icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-muted/40 md:block">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
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
