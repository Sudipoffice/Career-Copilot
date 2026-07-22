'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FileText, Building2, Target, HelpCircle, BookOpen, ArrowRight, Upload, Clock } from 'lucide-react';
import { api, type Resume, type SkillGapResult } from '@/lib/api-client';
import { CareerReadinessScore } from '@/components/dashboard/career-readiness-score';

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jdCount, setJdCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [latestSkillGap, setLatestSkillGap] = useState<SkillGapResult | null>(null);


  const load = useCallback(async () => {
    try {
      const [res, jds] = await Promise.all([api.resume.list(), api.jd.list()]);
      setResumes(res);
      setJdCount(jds.length);

      if (res.length > 0 && jds.length > 0) {
        try {
          const gap = await api.analysis.skillGap({ resumeId: res[0]!._id, jdId: jds[0]!._id });
          setLatestSkillGap(gap);
        } catch {
          // silent — quota exhausted
        }
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const cards = [
    { href: '/resume', icon: FileText, label: 'Resume', desc: 'Upload and analyze your resume for ATS compatibility', count: resumes.length, color: 'from-orange-400 to-amber-500' },
    { href: '/job-description', icon: Building2, label: 'Job Description', desc: 'Paste JDs and extract structured insights', count: jdCount, color: 'from-blue-400 to-indigo-500' },
    { href: '/analysis', icon: Target, label: 'Skill Gap', desc: 'Compare your resume against any job description', color: 'from-violet-400 to-purple-500' },
    { href: '/questions', icon: HelpCircle, label: 'Questions', desc: 'Generate practice interview questions', color: 'from-emerald-400 to-teal-500' },
    { href: '/study-plan', icon: BookOpen, label: 'Study Plan', desc: 'Create a personalized learning roadmap', color: 'from-rose-400 to-pink-500' },
  ];

  const totalItems = resumes.length + jdCount;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          {totalItems > 0
            ? 'Ready for your next opportunity? Let\'s improve your career profile.'
            : 'Upload a resume or paste a job description to get started.'}
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-48 rounded-2xl bg-stone-100 animate-pulse" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-36 rounded-2xl bg-stone-100 animate-pulse" />
            ))}
          </div>
        </div>
      ) : totalItems === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <div className="flex justify-center mb-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
              <Upload className="h-7 w-7" />
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-1">No Data Yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Upload a resume or paste a job description to begin your career analysis.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/resume"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-all"
            >
              <Upload className="h-4 w-4" />
              Upload Resume
            </Link>
            <Link
              href="/job-description"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium hover:bg-stone-50 transition-all"
            >
              <Building2 className="h-4 w-4" />
              Add JD
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <CareerReadinessScore resumes={resumes} latestSkillGap={latestSkillGap} />
            </div>
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {cards.slice(0, 4).map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative rounded-2xl border border-border bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm mb-3`}>
                    <card.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-semibold text-sm mb-0.5">{card.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                  {'count' in card && (
                    <p className="text-xs text-muted-foreground mt-2">{card.count} {card.count === 1 ? 'item' : 'items'}</p>
                  )}
                  <ArrowRight className="absolute top-4 right-4 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cards.slice(4).map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative rounded-2xl border border-border bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm mb-3`}>
                  <card.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-semibold text-sm mb-0.5">{card.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                <ArrowRight className="absolute top-4 right-4 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {totalItems > 0 && (
            <div className="rounded-2xl border border-border p-5 space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Quick Overview
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl bg-stone-50 p-4 text-center">
                  <p className="text-2xl font-bold">{resumes.length}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Resumes</p>
                </div>
                <div className="rounded-xl bg-stone-50 p-4 text-center">
                  <p className="text-2xl font-bold">{jdCount}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Job Descriptions</p>
                </div>
                <div className="rounded-xl bg-stone-50 p-4 text-center">
                  <p className="text-2xl font-bold">{latestSkillGap ? latestSkillGap.matchPercentage + '%' : '—'}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Best Match</p>
                </div>
                <div className="rounded-xl bg-stone-50 p-4 text-center">
                  <p className="text-2xl font-bold">{resumes.filter((r) => r.parsedContent).length}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Analyzed</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
