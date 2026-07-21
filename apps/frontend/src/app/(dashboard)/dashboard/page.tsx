'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FileText, Building2, Target, HelpCircle, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '@/lib/api-client';

export default function DashboardPage() {
  const [stats, setStats] = useState({ resumes: 0, jds: 0 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [resumes, jds] = await Promise.all([api.resume.list(), api.jd.list()]);
      setStats({ resumes: resumes.length, jds: jds.length });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const cards = [
    { href: '/resume', icon: FileText, label: 'Resume', desc: 'Upload and analyze your resume for ATS compatibility', count: stats.resumes, color: 'from-orange-400 to-amber-500' },
    { href: '/job-description', icon: Building2, label: 'Job Description', desc: 'Paste JDs and extract structured insights', count: stats.jds, color: 'from-blue-400 to-indigo-500' },
    { href: '/analysis', icon: Target, label: 'Skill Gap', desc: 'Compare your resume against any job description', color: 'from-violet-400 to-purple-500' },
    { href: '/questions', icon: HelpCircle, label: 'Questions', desc: 'Generate practice interview questions', color: 'from-emerald-400 to-teal-500' },
    { href: '/study-plan', icon: BookOpen, label: 'Study Plan', desc: 'Create a personalized learning roadmap', color: 'from-rose-400 to-pink-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome to Career Copilot AI</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm mb-4`}>
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">{card.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              {'count' in card && (
                <p className="text-xs text-muted-foreground mt-3">
                  {card.count} {card.count === 1 ? 'item' : 'items'}
                </p>
              )}
              <ArrowRight className="absolute top-5 right-5 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
