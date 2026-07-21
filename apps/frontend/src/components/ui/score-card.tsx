'use client';

import { motion } from 'framer-motion';
import { HelpCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  max?: number;
  subtitle?: string;
  why?: string;
  trend?: 'up' | 'down' | 'flat';
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

function palette(val: number) {
  if (val >= 90) return { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'Excellent' };
  if (val >= 80) return { bar: 'bg-emerald-400', text: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'Great' };
  if (val >= 65) return { bar: 'bg-amber-400', text: 'text-amber-600', bg: 'bg-amber-50', badge: 'Good' };
  if (val >= 50) return { bar: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50', badge: 'Fair' };
  return { bar: 'bg-rose-500', text: 'text-rose-600', bg: 'bg-rose-50', badge: 'Needs Work' };
}

export function ScoreCard({ label, value, max = 100, subtitle, why, trend, icon, size = 'md' }: Props) {
  const pct = Math.round((value / max) * 100);
  const colors = palette(pct);

  const sizeClasses = size === 'lg' ? 'p-6' : size === 'sm' ? 'p-3' : 'p-4';
  const valueSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl';

  return (
    <div className={`rounded-2xl border border-border bg-white shadow-sm ${sizeClasses}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="shrink-0">{icon}</span>}
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{label}</div>
            {subtitle && <div className="text-xs text-muted-foreground truncate">{subtitle}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {trend === 'up' && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
          {trend === 'down' && <TrendingDown className="h-3.5 w-3.5 text-rose-500" />}
          {trend === 'flat' && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {colors.badge}
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${valueSize} font-bold ${colors.text}`}
        >
          {pct}
        </motion.span>
        <span className="text-sm text-muted-foreground">/ {max}</span>
      </div>

      <div className="relative h-2 rounded-full bg-stone-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors.bar}`}
        />
      </div>

      {why && (
        <div className="flex items-start gap-1.5 mt-3 text-xs text-muted-foreground">
          <HelpCircle className="h-3 w-3 shrink-0 mt-0.5 text-muted-foreground/60" />
          <span>{why}</span>
        </div>
      )}
    </div>
  );
}
