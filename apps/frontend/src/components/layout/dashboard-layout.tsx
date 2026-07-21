import { Header } from './header';
import { Sidebar } from './sidebar';
import { CommandPalette } from '@/components/ui/command-palette';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CommandPalette />
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
