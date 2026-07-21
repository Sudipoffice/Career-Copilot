'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, Target, CheckCircle2, XCircle, Lightbulb, FileText, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { api, type Resume, type JobDescription, type SkillGapResult } from '@/lib/api-client';
import { ScoreCard } from '@/components/ui/score-card';
import { EmptyState } from '@/components/ui/empty-state';
import { InfoBanner } from '@/components/ui/info-banner';

export default function AnalysisPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [selectedJd, setSelectedJd] = useState('');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [error, setError] = useState('');
  const [showQuotaBanner, setShowQuotaBanner] = useState(true);

  const load = useCallback(async () => {
    try {
      const [r, j] = await Promise.all([api.resume.list(), api.jd.list()]);
      setResumes(r);
      setJds(j);
      if (r.length === 1) setSelectedResume(r[0]!._id);
      if (j.length === 1) setSelectedJd(j[0]!._id);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAnalyze = async () => {
    if (!selectedResume || !selectedJd) return;
    setAnalyzing(true);
    setError('');
    setResult(null);
    try {
      const data = await api.analysis.skillGap({ resumeId: selectedResume, jdId: selectedJd });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h2>
          <p className="text-muted-foreground mt-1">Compare your resume against a job description</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-12 rounded-xl bg-stone-100 animate-pulse" />)}
          </div>
          <div className="lg:col-span-3">
            <div className="h-64 rounded-2xl bg-stone-100 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h2>
        <p className="text-muted-foreground mt-1">Compare your resume against a job description</p>
      </div>

      {error && (
        <InfoBanner variant="error" title="Analysis failed" description={error} dismissable={false} />
      )}

      {showQuotaBanner && error && !analyzing && (
        <InfoBanner
          variant="warning"
          title="AI analysis is temporarily unavailable"
          description="The Gemini API quota has been exceeded. Your data is saved and ready when service resumes."
          onDismiss={() => setShowQuotaBanner(false)}
        />
      )}

      {resumes.length === 0 || jds.length === 0 ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {resumes.length === 0 && (
            <EmptyState
              icon={<FileText className="h-7 w-7" />}
              title="No Resume Uploaded"
              description="Upload a resume first to run an analysis."
              action={<Link href="/resume" className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-all"><FileText className="h-4 w-4" />Upload Resume</Link>}
            />
          )}
          {jds.length === 0 && (
            <EmptyState
              icon={<FileText className="h-7 w-7" />}
              title="No Job Description"
              description="Add a job description to compare against."
              action={<Link href="/job-description" className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-all"><FileText className="h-4 w-4" />Add JD</Link>}
            />
          )}
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-[1fr,1fr,auto] gap-4 items-end">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Your Resume</label>
              <select
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option value="">Select a resume...</option>
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>{r.fileName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Target Job</label>
              <select
                value={selectedJd}
                onChange={(e) => setSelectedJd(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option value="">Select a job description...</option>
                {jds.map((j) => (
                  <option key={j._id} value={j._id}>{j.title}{j.company ? ` @ ${j.company}` : ''}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!selectedResume || !selectedJd || analyzing}
              className="inline-flex h-[42px] items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
              {analyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>

          {analyzing && (
            <div className="rounded-2xl border border-border p-8 text-center space-y-3">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
              <p className="text-sm font-medium">Comparing your resume with the job description...</p>
              <div className="flex justify-center gap-3">
                {['Analyzing', 'Matching', 'Scoring'].map((step, i) => (
                  <span key={step} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full ${i < 2 ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <ScoreCard
                  label="Skill Match"
                  value={result.matchPercentage}
                  subtitle="Overall compatibility"
                  why={`${result.matchingSkills.length} matching skills, ${result.missingSkills.length} gaps identified.`}
                  size="lg"
                  trend={result.matchPercentage >= 70 ? 'up' : 'down'}
                />
                <ScoreCard
                  label="Coverage"
                  value={result.matchingSkills.length + result.missingSkills.length > 0
                    ? Math.round((result.matchingSkills.length / (result.matchingSkills.length + result.missingSkills.length)) * 100)
                    : 0}
                  subtitle="Skills you have vs. required"
                  why={result.missingSkills.length > 0
                    ? `You're missing ${result.missingSkills.length} of ${result.matchingSkills.length + result.missingSkills.length} required skills.`
                    : 'All required skills covered.'}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {result.matchingSkills.length > 0 && (
                  <div className="rounded-2xl border border-border p-5 space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Matching Skills ({result.matchingSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.matchingSkills.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1.5 text-xs font-medium text-success border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {result.missingSkills.length > 0 && (
                  <div className="rounded-2xl border border-border p-5 space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2 text-rose-700">
                      <XCircle className="h-4 w-4" />
                      Missing Skills ({result.missingSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 rounded-full bg-danger-light px-3 py-1.5 text-xs font-medium text-danger border border-rose-200">
                          <XCircle className="h-3 w-3" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {result.recommendations.length > 0 && (
                <div className="rounded-2xl border border-border p-5 space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Recommendations
                  </h4>
                  <div className="space-y-2">
                    {result.recommendations.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground bg-stone-50 rounded-xl p-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                          {i + 1}
                        </span>
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.resumeSuggestions.length > 0 && (
                <div className="rounded-2xl border border-border p-5 space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2 text-info">
                    <FileText className="h-4 w-4" />
                    Resume Suggestions
                  </h4>
                  <div className="space-y-2">
                    {result.resumeSuggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-info-light rounded-xl p-3">
                        <ArrowRight className="h-4 w-4 text-info shrink-0 mt-0.5" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!analyzing && !result && (
            <EmptyState
              icon={<Target className="h-7 w-7" />}
              title="Ready to Analyze"
              description="Select a resume and job description above, then click Run Analysis."
            />
          )}
        </>
      )}
    </div>
  );
}
