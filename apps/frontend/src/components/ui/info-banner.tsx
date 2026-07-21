'use client';

import { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

type Variant = 'info' | 'success' | 'warning' | 'error';

interface InfoBannerProps {
  variant?: Variant;
  title: string;
  description?: string;
  dismissable?: boolean;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
}

const config: Record<Variant, { icon: typeof AlertCircle; bg: string; border: string; text: string; iconColor: string }> = {
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    iconColor: 'text-blue-500',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    iconColor: 'text-emerald-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    iconColor: 'text-amber-500',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-800',
    iconColor: 'text-rose-500',
  },
};

export function InfoBanner({ variant = 'info', title, description, dismissable = true, action, onDismiss }: InfoBannerProps) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  const c = config[variant];
  const Icon = c.icon;

  return (
    <div className={`flex items-start gap-3 rounded-xl border ${c.border} ${c.bg} px-4 py-3 text-sm ${c.text}`}>
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${c.iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium">{title}</p>
        {description && <p className="mt-0.5 opacity-80">{description}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {action && (
          <button
            onClick={action.onClick}
            className="rounded-lg px-3 py-1.5 text-xs font-medium bg-white/80 hover:bg-white transition-colors shadow-sm"
          >
            {action.label}
          </button>
        )}
        {dismissable && (
          <button
            onClick={() => { setHidden(true); onDismiss?.(); }}
            className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
