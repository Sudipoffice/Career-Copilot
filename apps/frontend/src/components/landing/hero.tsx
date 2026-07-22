'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, FileText, BookOpen, ChevronRight, Zap, Shield, Brain, Briefcase, Lightbulb } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

function CircularGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-stone-100" />
          <motion.circle
            cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      <span className="text-[11px] font-medium text-muted-foreground tracking-wide">{label}</span>
    </div>
  );
}

const timelineSteps = [
  { label: 'Uploading Resume', detail: 'PDF parsed · 245 KB', icon: FileText },
  { label: 'Scanning Content', detail: 'Extracting sections & keywords', icon: Zap },
  { label: 'ATS Scoring', detail: 'Evaluating against best practices', icon: Shield },
  { label: 'Matching Skills', detail: 'Cross-referencing job market data', icon: Brain },
  { label: 'Generating Insights', detail: 'Preparing recommendations', icon: Lightbulb },
];

const missingSkills = [
  { name: 'Docker', level: 'Critical' },
  { name: 'GraphQL', level: 'Important' },
  { name: 'CI/CD', level: 'Important' },
  { name: 'AWS', level: 'Recommended' },
];

const studyPlan = [
  { day: 'Day 1', topic: 'Docker & Containers', duration: '2 hrs' },
  { day: 'Day 2', topic: 'GraphQL APIs', duration: '2.5 hrs' },
  { day: 'Day 3', topic: 'CI/CD Pipelines', duration: '2 hrs' },
  { day: 'Day 4', topic: 'AWS Basics', duration: '3 hrs' },
  { day: 'Day 5', topic: 'System Design', duration: '2 hrs' },
];

function DemoFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const rawStep = useTransform(
    scrollYProgress,
    [0, 0.08, 0.22, 0.38, 0.52, 0.68, 0.82, 1],
    [0, 1, 2, 3, 4, 5, 6, 7],
  );

  useMotionValueEvent(rawStep, 'change', (v) => setStep(Math.min(Math.floor(v), 7)));

  return (
    <div ref={sectionRef} className="relative">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/50 overflow-hidden">
        {/* Header */}
        <div className="relative px-5 py-4 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50">
                <span className="absolute h-2 w-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
              <span className="text-xs font-semibold text-stone-300 tracking-wider uppercase">AI Analysis Engine</span>
            </div>
            <span className="text-[10px] text-stone-500 font-mono">v2.1 · active</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-stone-700 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(step / 7 * 100, 100)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-[10px] font-medium text-stone-400 font-mono w-8 text-right">
              {Math.min(Math.round(step / 7 * 100), 100)}%
            </span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Score gauges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 2 ? 1 : 0.3, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-around py-2"
          >
            <CircularGauge value={step >= 2 ? 91 : 0} label="ATS Score" color="#F97316" />
            <div className="w-px h-16 bg-stone-100" />
            <CircularGauge value={step >= 3 ? 84 : 0} label="Skill Match" color="#6366F1" />
          </motion.div>

          {/* Timeline */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">Processing Steps</span>
            </div>
            {timelineSteps.slice(0, Math.min(step + 1, timelineSteps.length)).map((s, i) => {
              const isActive = i === step && step < 5;
              const isDone = i < step;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary/5 border border-primary/15'
                      : isDone
                        ? 'bg-emerald-50/50'
                        : 'bg-stone-50'
                  }`}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm shadow-primary/20'
                      : isDone
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-stone-100 text-stone-400'
                  }`}>
                    {isActive ? (
                      <span className="h-3 w-3 rounded-full border-2 border-white animate-pulse" />
                    ) : isDone ? (
                      <span className="text-xs font-bold">✓</span>
                    ) : (
                      <s.icon className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-primary' : isDone ? 'text-stone-700' : 'text-stone-400'
                    }`}>
                      {s.label}
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-1 flex-1 max-w-[120px] rounded-full bg-primary/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-primary"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                          />
                        </div>
                        <span className="text-[10px] text-primary/60">{s.detail}</span>
                      </div>
                    )}
                    {isDone && (
                      <div className="text-[10px] text-stone-400 mt-0.5">{s.detail}</div>
                    )}
                  </div>
                  {isDone && <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />}
                </motion.div>
              );
            })}
          </div>

          {/* Missing Skills */}
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/50 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Briefcase className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-semibold text-amber-800">Skill Gaps Identified</span>
                </div>
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-200 px-2 text-[10px] font-bold text-amber-800">
                  {missingSkills.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs font-medium text-amber-800 border border-amber-200/60 shadow-sm"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      skill.level === 'Critical' ? 'bg-red-400' :
                      skill.level === 'Important' ? 'bg-amber-400' : 'bg-blue-400'
                    }`} />
                    {skill.name}
                    <span className="text-[9px] text-amber-500/70 font-normal">({skill.level})</span>
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Study Plan */}
          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <BookOpen className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold text-emerald-800">5-Day Study Plan</span>
              </div>
              <div className="space-y-1.5">
                {studyPlan.map((item) => (
                  <div key={item.day} className="flex items-center gap-3 px-2.5 py-2 rounded-lg bg-white/60">
                    <span className="text-[10px] font-semibold text-emerald-700 w-10">{item.day}</span>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-stone-700">{item.topic}</span>
                    </div>
                    <span className="text-[10px] text-stone-400">{item.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scroll hint */}
          {step < 2 && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: step < 2 ? 1 : 0 }}
              className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-2"
            >
              <svg className="h-3.5 w-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Scroll to simulate AI analysis
            </motion.div>
          )}

          {step >= 7 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center pt-1"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Analysis complete — ready for improvement
              </span>
            </motion.div>
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

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight text-foreground">
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
