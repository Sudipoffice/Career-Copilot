'use client';

import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';

const roadmap = [
  { phase: 'Current', items: [
    { label: 'Resume Analysis', done: true },
    { label: 'ATS Match Score', done: true },
    { label: 'Question Generator', done: true },
    { label: 'Skill Gap Analysis', done: true },
    { label: 'Study Plan Generator', done: true },
  ]},
  { phase: 'Coming Soon', items: [
    { label: 'Authentication & User Profiles', done: false },
    { label: 'Progress Tracking Dashboard', done: false },
    { label: 'Company-Specific Preparation', done: false },
    { label: 'Voice Mock Interviews', done: false },
    { label: 'Coding Assessment Simulator', done: false },
  ]},
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-32 bg-white/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Roadmap
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            What&apos;s coming next
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roadmap.map((phase) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white border border-border p-8 shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-6">{phase.phase}</h3>
              <div className="space-y-4">
                {phase.items.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 ${item.done ? '' : 'opacity-40'}`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        item.done
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {item.done ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
