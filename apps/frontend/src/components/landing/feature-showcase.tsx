'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText, Percent, MessageSquare, Calendar } from 'lucide-react';

const rows = [
  {
    icon: FileText,
    title: 'Intelligent Resume Parsing',
    description: 'Upload any PDF or DOCX and watch AI extract your entire career history into structured, analyzable data.',
    points: ['Extracts skills, experience, education, and projects', 'Identifies certifications and achievements', 'Normalizes data for accurate comparison'],
    gradient: 'from-orange-400 to-amber-500',
    image: (
      <div className="rounded-2xl bg-white border border-border p-6 shadow-sm">
        <div className="space-y-3">
          {['Senior Frontend Engineer', 'React, TypeScript, Next.js', '5 years of experience'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Percent,
    title: 'Deep ATS Analysis',
    description: 'Understand exactly how your resume performs against ATS systems. Get a detailed breakdown of every scoring factor.',
    points: ['Overall ATS compatibility score', 'Keyword match analysis', 'Formatting and structure recommendations'],
    gradient: 'from-blue-400 to-indigo-500',
    image: (
      <div className="rounded-2xl bg-white border border-border p-6 shadow-sm">
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-emerald-600">91%</div>
          <div className="text-sm text-muted-foreground">ATS Score</div>
        </div>
        <div className="space-y-2">
          {['Keyword Match: 94%', 'Format: 88%', 'Section Structure: 92%'].map((item) => (
            <div key={item} className="flex items-center justify-between text-sm">
              <span>{item.split(':')[0]}</span>
              <span className="font-medium">{item.split(':')[1]}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: 'Personalized Interview Questions',
    description: 'Generate custom interview questions based on the job description. Practice with expected answers and key talking points.',
    points: ['Behavioral, technical, and situational questions', 'Easy, medium, and hard difficulty levels', 'Expected answer points for each question'],
    gradient: 'from-violet-400 to-purple-500',
    image: (
      <div className="rounded-2xl bg-white border border-border p-6 shadow-sm">
        <div className="flex gap-2 mb-4">
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <span key={level} className="flex-1 text-center rounded-lg bg-stone-100 py-2 text-xs font-medium text-stone-600">
              {level}
            </span>
          ))}
        </div>
        <div className="text-sm p-3 rounded-xl bg-stone-50">
          <div className="font-medium mb-1">Explain React&apos;s reconciliation algorithm.</div>
          <div className="text-muted-foreground text-xs">Difficulty: Hard · Technical</div>
        </div>
      </div>
    ),
  },
  {
    icon: Calendar,
    title: 'AI-Generated Study Plans',
    description: 'Get a structured study roadmap tailored to your skill gaps. Daily topics with resources and estimated time commitment.',
    points: ['3-day, 7-day, or 14-day plans', 'Curated learning resources', 'Priority-based topic ordering'],
    gradient: 'from-emerald-400 to-teal-500',
    image: (
      <div className="rounded-2xl bg-white border border-border p-6 shadow-sm">
        <div className="space-y-2">
          {[
            { day: 'Day 1', topic: 'React Fundamentals', time: '2h' },
            { day: 'Day 2', topic: 'State Management', time: '1.5h' },
            { day: 'Day 3', topic: 'Performance Optimization', time: '2.5h' },
          ].map((item) => (
            <div key={item.day} className="flex items-center justify-between p-3 rounded-xl bg-stone-50">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-stone-500 w-10">{item.day}</span>
                <span className="text-sm font-medium">{item.topic}</span>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            Powerful features, beautiful results
          </h2>
        </motion.div>

        <div className="space-y-32">
          {rows.map((row, i) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${row.gradient} text-white shadow-sm mb-5`}>
                  <row.icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl leading-tight mb-4">{row.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{row.description}</p>
                <ul className="space-y-3">
                  {row.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:underline"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                {row.image}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
