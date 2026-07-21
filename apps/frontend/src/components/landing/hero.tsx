'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const floatingBadges = [
  { label: '92% Match', x: '60%', y: '15%', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { label: 'ATS +18%', x: '75%', y: '35%', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { label: 'Study Plan Ready', x: '55%', y: '60%', color: 'bg-violet-50 text-violet-700 border-violet-200' },
];

const dashboardCards = [
  { label: 'Resume Score', value: '84', unit: '/100', color: 'from-orange-400 to-amber-500' },
  { label: 'Skill Match', value: '76', unit: '%', color: 'from-emerald-400 to-teal-500' },
  { label: 'Questions', value: '12', unit: '', color: 'from-blue-400 to-indigo-500' },
];

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
                href="#"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white/60 px-8 text-sm font-medium text-foreground hover:bg-white hover:shadow-sm active:scale-[0.98] transition-all"
              >
                <Play className="h-4 w-4" />
                See Demo
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
            <div className="relative aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-stone-50 rounded-3xl border border-border shadow-xl">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                      Resume Uploaded
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                      JD Pasted
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {dashboardCards.map((card) => (
                      <div
                        key={card.label}
                        className="rounded-2xl bg-white border border-border p-4 shadow-sm"
                      >
                        <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-2xl font-bold">{card.value}</span>
                          <span className="text-xs text-muted-foreground">{card.unit}</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                            style={{ width: `${card.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-white border border-border p-4 shadow-sm">
                    <div className="text-xs font-medium text-muted-foreground mb-3">
                      Missing Skills
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Docker', 'Kubernetes', 'GraphQL', 'Redis'].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 border border-rose-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/50 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-amber-800">Study Plan</div>
                        <div className="text-sm font-semibold text-amber-900 mt-0.5">
                          7-Day Preparation Ready
                        </div>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                        CC
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className={`absolute inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-md backdrop-blur-sm ${badge.color}`}
                  style={{ left: badge.x, top: badge.y }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                >
                  <span className="flex h-1.5 w-1.5 rounded-full bg-current" />
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
