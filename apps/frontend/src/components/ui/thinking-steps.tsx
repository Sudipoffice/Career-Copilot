'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export interface ThinkingStep {
  label: string;
  description?: string;
}

interface ThinkingStepsProps {
  steps: ThinkingStep[];
  currentStep: number;
  status?: 'running' | 'done' | 'error';
}

export function ThinkingSteps({ steps, currentStep, status = 'running' }: ThinkingStepsProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isDone = i < currentStep;
        const isPending = i > currentStep;

        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            className={`flex items-center gap-3 rounded-xl border p-3.5 transition-colors ${
              isActive && status === 'running'
                ? 'border-blue-200 bg-blue-50'
                : isDone
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : isPending
                    ? 'border-transparent bg-white opacity-40'
                    : 'border-border bg-white'
            }`}
          >
            {isActive && status === 'running' ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-600 shrink-0" />
            ) : isDone ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : status === 'error' && isActive ? (
              <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
            ) : (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-stone-300" />
              </span>
            )}
            <div className="flex-1 min-w-0">
              <span className={`text-sm font-medium ${
                isActive && status === 'running' ? 'text-blue-700' : isDone ? 'text-emerald-700' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
              {step.description && isActive && (
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              )}
            </div>
            {isActive && status === 'running' && (
              <div className="h-1.5 w-20 rounded-full bg-stone-200 overflow-hidden shrink-0">
                <motion.div
                  className="h-full rounded-full bg-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                />
              </div>
            )}
          </motion.div>
        );
      })}

      <AnimatePresence>
        {status === 'done' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald-600 font-medium text-center pt-1"
          >
            Complete
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
