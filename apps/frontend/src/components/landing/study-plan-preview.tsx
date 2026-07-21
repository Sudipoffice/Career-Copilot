'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const plan = {
  focus: 'React & Frontend Engineering',
  duration: '14 days',
  modules: [
    {
      title: 'React Core & Rendering',
      days: 'Days 1-3',
      topics: ['Reconciliation algorithm', 'Fiber architecture', 'React 18 concurrent features'],
      hours: 6,
    },
    {
      title: 'State Management & Performance',
      days: 'Days 4-7',
      topics: ['Zustand vs Redux vs Context', 'Code splitting & lazy loading', 'useMemo/useCallback patterns'],
      hours: 8,
    },
    {
      title: 'System Design for Frontend',
      days: 'Days 8-11',
      topics: ['Component architecture patterns', 'Micro-frontend considerations', 'Build tooling & bundlers'],
      hours: 8,
    },
    {
      title: 'Mock Interviews & Review',
      days: 'Days 12-14',
      topics: ['Full-length mock interviews', 'Whiteboard practice', 'Behavioral storytelling'],
      hours: 6,
    },
  ],
};

export function StudyPlanPreview() {
  return (
    <section className="py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <BookOpen className="h-4 w-4" />
            Study Plans
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">
            Your personalized study roadmap
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AI generates a structured plan based on your skill gaps. Choose 3, 7, or 14 day plans with curated resources.
          </p>
        </motion.div>

        <div className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-border bg-stone-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{plan.focus}</h3>
                <p className="text-sm text-muted-foreground">{plan.duration} plan</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white shadow-sm"
              >
                Start Plan
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {plan.modules.map((module, i) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 pb-8 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  {i < plan.modules.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="font-medium text-sm">{module.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.hours}h
                      </span>
                      <span>{module.days}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
