'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface AnimatedStepsProps {
  messages: string[];
  interval?: number;
}

export function AnimatedSteps({ messages, interval = 2500 }: AnimatedStepsProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 200);
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-6 sm:p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        </span>
        <div className="h-8 flex items-center justify-center">
          <span
            className={`text-sm font-medium text-foreground transition-opacity duration-200 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {messages[index]}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {messages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'bg-primary scale-125' : 'bg-stone-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
