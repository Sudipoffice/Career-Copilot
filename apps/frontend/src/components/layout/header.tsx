'use client';

import { Button } from '@career-copilot/ui';
import { useTheme } from '@/components/providers/theme-provider';
import { Moon, Sun } from 'lucide-react';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-6">
      <div className="flex flex-1 items-center">
        <h1 className="text-xl font-bold">Career Copilot AI</h1>
      </div>
      <nav className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </nav>
    </header>
  );
}
