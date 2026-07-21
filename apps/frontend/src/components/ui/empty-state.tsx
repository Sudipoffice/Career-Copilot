import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-12 text-center">
      <div className="flex justify-center mb-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
          {icon}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>
      {action && <div className="flex items-center justify-center gap-3">{action}</div>}
    </div>
  );
}
