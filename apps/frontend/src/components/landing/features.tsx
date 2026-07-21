'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Percent,
  GitCompare,
  PenLine,
  MessageSquare,
  Calendar,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'AI extracts and structures every section of your resume — experience, skills, education, projects, and certifications.',
    gradient: 'from-orange-400 to-amber-500',
    preview: '84/100',
  },
  {
    icon: Percent,
    title: 'ATS Match Score',
    description: 'Get a precise match percentage between your resume and any job description. Understand exactly where you stand.',
    gradient: 'from-emerald-400 to-teal-500',
    preview: '92%',
  },
  {
    icon: GitCompare,
    title: 'Skill Gap Analysis',
    description: 'Identify missing skills, weak areas, and nice-to-haves. Prioritized learning recommendations tailored to the role.',
    gradient: 'from-blue-400 to-indigo-500',
    preview: '6 gaps',
  },
  {
    icon: PenLine,
    title: 'Resume Improvements',
    description: 'Actionable suggestions for better bullet points, missing keywords, stronger action verbs, and quantified achievements.',
    gradient: 'from-violet-400 to-purple-500',
    preview: '12 fixes',
  },
  {
    icon: MessageSquare,
    title: 'Interview Questions',
    description: 'Personalized questions grouped by difficulty — easy, medium, hard. Each with expected answer points and revision topics.',
    gradient: 'from-rose-400 to-pink-500',
    preview: '15 Qs',
  },
  {
    icon: Calendar,
    title: 'AI Study Plan',
    description: 'A customized study roadmap based on your skill gaps. 3-day, 7-day, or 14-day plans with daily topics and resources.',
    gradient: 'from-amber-400 to-orange-500',
    preview: '7 days',
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 bg-white/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Core Features
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            Everything you need to prepare
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-sm`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-stone-200 group-hover:text-stone-300 transition-colors">
                  {feature.preview}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
