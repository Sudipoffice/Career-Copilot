'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, Loader2, FileText, Target, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const demoSteps = [
  { label: 'Resume Uploaded', icon: FileText, duration: 800, color: 'text-emerald-600' },
  { label: 'Analyzing Resume...', icon: Loader2, duration: 1200, color: 'text-blue-600' },
  { label: 'ATS Score: 91%', icon: Target, duration: 600, color: 'text-emerald-600' },
  { label: 'Skill Match: 84%', icon: CheckCircle2, duration: 600, color: 'text-emerald-600' },
  { label: 'Questions Ready: 12', icon: Sparkles, duration: 600, color: 'text-violet-600' },
  { label: 'Study Plan Built', icon: BookOpen, duration: 600, color: 'text-amber-600' },
];

const missingSkills = ['Docker', 'GraphQL', 'CI/CD'];

function DemoFlow() {
  const [step, setStep] = useState(0);
  const [showMissing, setShowMissing] = useState(false);

  useEffect(() => {
    if (step >= demoSteps.length) return;
    const timer = setTimeout(() => setStep((s) => s + 1), demoSteps[step]!.duration);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step >= 3) {
      const t = setTimeout(() => setShowMissing(true), 400);
      return () => clearTimeout(t);
    }
    setShowMissing(false);
  }, [step]);

  return (
    <div className="relative aspect-[4/3]">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-stone-50 rounded-3xl border border-border shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Live Analysis</span>
          </div>

          <div className="space-y-3 min-h-[200px]">
            {demoSteps.slice(0, Math.min(step + 1, 5)).map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  i === step && s.icon === Loader2
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-transparent bg-white'
                }`}
              >
                {s.icon === Loader2 && i === step ? (
                  <Loader2 className={`h-4 w-4 animate-spin ${s.color}`} />
                ) : (
                  <CheckCircle2 className={`h-4 w-4 ${s.color}`} />
                )}
                <span className={`text-sm font-medium ${s.color}`}>{s.label}</span>
                {i === 1 && step === 1 && (
                  <div className="flex-1 h-1.5 rounded-full bg-stone-200 overflow-hidden ml-2">
                    <motion.div
                      className="h-full rounded-full bg-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                  </div>
                )}
              </motion.div>
            ))}

            <AnimatePresence>
              {showMissing && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-rose-200 bg-rose-50 p-3"
                >
                  <div className="text-xs font-medium text-rose-700 mb-2">Missing Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-rose-700 border border-rose-200 shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-amber-800">7-Day Study Plan Ready</span>
              </div>
              <span className="text-xs text-amber-600">View →</span>
            </div>
          </motion.div>

          {step < 2 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center pt-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-stone-300 animate-pulse" />
              Analyzing your career profile...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-100/30 via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Career Preparation
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground">
              Land Your Dream Job with{' '}
              <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{' '}
              Preparation
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Upload your resume, paste a job description, and let AI analyze the match, identify
              skill gaps, improve your ATS score, and generate personalized interview questions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/resume"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all"
              >
                Analyze My Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white/60 px-8 text-sm font-medium text-foreground hover:bg-white hover:shadow-sm active:scale-[0.98] transition-all"
              >
                <Play className="h-4 w-4" />
                See How It Works
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-stone-200 to-stone-300"
                  />
                ))}
              </div>
              <div>
                <span className="font-semibold text-foreground">2,400+</span> job seekers this month
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <DemoFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
