import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface NextStep {
  label: string;
  href: string;
}

export function NextSteps({ steps }: { steps: NextStep[] }) {
  return (
    <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/[0.03] p-5 space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Next Steps</p>
      <div className="flex flex-wrap gap-2">
        {steps.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 active:scale-[0.97] transition-all"
          >
            {step.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
