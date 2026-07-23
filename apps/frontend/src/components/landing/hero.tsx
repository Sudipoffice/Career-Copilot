'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const resumeSections = [
  {
    id: 'header',
    content: (
      <div className="text-center mb-5">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-orange-500 mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20">
          SK
        </div>
        <h2 className="text-xl font-bold tracking-tight text-stone-800">Sarah Kim</h2>
        <p className="text-sm text-primary font-medium mt-0.5">Senior Full-Stack Engineer</p>
        <div className="flex items-center justify-center gap-3 mt-2 text-[10px] text-stone-400">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> San Francisco, CA</span>
          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> sarah.kim@email.com</span>
          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> (415) 555-0123</span>
        </div>
      </div>
    ),
  },
  {
    id: 'summary',
    content: (
      <div className="mb-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400 mb-2">Professional Summary</h3>
        <p className="text-[11px] text-stone-600 leading-relaxed">
          Full-stack engineer with 6+ years building scalable web applications. Proficient in React, Node.js,
          and cloud infrastructure. Passionate about developer experience and delivering high-impact products
          that serve millions of users.
        </p>
      </div>
    ),
  },
  {
    id: 'experience',
    content: (
      <div className="mb-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400 mb-2">Experience</h3>
        {[
          { role: 'Senior Engineer', company: 'TechCorp Inc.', period: '2022 — Present', pts: ['Led migration of monolith to microservices, reducing deploy time by 60%', 'Designed GraphQL API serving 2M+ daily requests with 99.9% uptime', 'Mentored 4 junior engineers through structured code review program'] },
          { role: 'Full-Stack Developer', company: 'StartupXYZ', period: '2020 — 2022', pts: ['Built real-time dashboard serving 50K concurrent users using WebSockets', 'Implemented CI/CD pipeline cutting release cycle from 2 weeks to 2 days', 'Reduced bundle size by 45% through code splitting and lazy loading'] },
          { role: 'Junior Developer', company: 'WebAgency Co.', period: '2018 — 2020', pts: ['Developed 12+ client-facing React applications with responsive design', 'Integrated RESTful APIs and third-party services including Stripe and Auth0'] },
        ].slice(0, 2).map((exp) => (
          <div key={exp.role} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-stone-800">{exp.role}</span>
              <span className="text-[9px] text-stone-400 font-mono">{exp.period}</span>
            </div>
            <p className="text-[10px] text-primary font-medium">{exp.company}</p>
            <ul className="mt-1 space-y-0.5">
              {exp.pts.map((pt) => (
                <li key={pt} className="text-[10px] text-stone-500 flex items-start gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-stone-300 mt-1 shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'education',
    content: (
      <div className="mb-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400 mb-2">Education</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[12px] font-semibold text-stone-800">B.S. Computer Science</span>
            <p className="text-[10px] text-stone-500">University of California, Berkeley</p>
          </div>
          <span className="text-[9px] text-stone-400 font-mono">2014 — 2018</span>
        </div>
        <p className="text-[10px] text-stone-400 mt-0.5">GPA: 3.8 · Dean&apos;s List · CS Honors Program</p>
      </div>
    ),
  },
  {
    id: 'skills',
    content: (
      <div>
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-1.5">
          {['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'Next.js', 'Tailwind', 'Redis', 'Kubernetes', 'GitHub Actions'].map((s) => (
            <span key={s} className="px-2 py-1 rounded-md bg-stone-100 text-[9px] font-medium text-stone-600 border border-stone-200">{s}</span>
          ))}
        </div>
      </div>
    ),
  },
];

const atsScore = 91;

function ResumeCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.6, 1, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, y: translateY, opacity }}
      className="relative w-full max-w-[400px] mx-auto"
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
        {/* ATS Score badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]), scale: useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]) }}
          className="absolute -top-2 -right-2 z-10 h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-200 flex items-center justify-center flex-col"
        >
          <span className="text-[10px] font-bold text-white leading-none">{atsScore}</span>
          <span className="text-[6px] text-white/80 font-medium uppercase tracking-wider mt-0.5">ATS</span>
        </motion.div>

        {/* Resume content */}
        <div className="p-6">
          {resumeSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 8 }}
              style={{
                opacity: useTransform(scrollYProgress, [i * 0.12, i * 0.12 + 0.15], [0, 1]),
                y: useTransform(scrollYProgress, [i * 0.12, i * 0.12 + 0.15], [8, 0]),
              }}
            >
              {section.content}
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]) }}
          className="border-t border-stone-100 px-6 py-3 flex items-center justify-between bg-stone-50/50"
        >
          <span className="text-[9px] text-stone-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ATS-optimized template
          </span>
          <span className="text-[9px] text-stone-400 flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            career-copilot.ai/review
          </span>
        </motion.div>
      </div>
    </motion.div>
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
            <ResumeCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
