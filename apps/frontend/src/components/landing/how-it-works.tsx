'use client';

import { motion } from 'framer-motion';
import { Upload, Clipboard, Sparkles, Target } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Resume',
    description: 'Drag and drop your PDF or DOCX resume. AI extracts and structures all your experience, skills, and achievements instantly.',
    color: 'from-orange-400 to-amber-500',
  },
  {
    icon: Clipboard,
    title: 'Paste Job Description',
    description: 'Paste any job description. The AI analyzes required skills, responsibilities, and qualifications.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Sparkles,
    title: 'AI Analysis',
    description: 'Our engine compares your resume against the job, identifies gaps, and generates actionable improvements.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Target,
    title: 'Prepare Smarter',
    description: 'Get personalized interview questions, a study plan, and ATS-optimized resume suggestions.',
    color: 'from-violet-400 to-purple-500',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            How It Works
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            Four steps to your next opportunity
          </h2>
        </motion.div>

        <div className="grid md:grid-cow-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15 }}
              className="group relative"
            >
              <div className="rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-sm mb-5`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-500">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
