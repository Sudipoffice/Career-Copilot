'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, Target, ArrowRight, CheckCircle2, XCircle, Lightbulb, FileText } from 'lucide-react';
import { api, type Resume, type JobDescription, type SkillGapResult } from '@/lib/api-client';

export default function AnalysisPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [selectedJd, setSelectedJd] = useState('');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const [r, j] = await Promise.all([api.resume.list(), api.jd.list()]);
      setResumes(r);
      setJds(j);
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

  const matchColor = (pct: number) => {
    if (pct >= 80) return 'text-emerald-600';
    if (pct >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const matchBg = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-50';
    if (pct >= 60) return 'bg-amber-50';
    return 'bg-rose-50';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h2>
        <p className="text-muted-foreground mt-1">Compare your resume against a job description</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <Loader2 className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Resume</label>
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
              <label className="text-sm font-medium mb-1.5 block">Job Description</label>
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
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={!selectedResume || !selectedJd || analyzing}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
              {analyzing ? 'Analyzing...' : 'Run Analysis'}
            </button>
          </div>

          {result && (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className={`flex items-center gap-4 p-6 ${matchBg(result.matchPercentage)}`}>
                <div className={`text-5xl font-bold ${matchColor(result.matchPercentage)}`}>
                  {result.matchPercentage}%
                </div>
                <div>
                  <div className="font-semibold">Match Score</div>
                  <div className="text-sm text-muted-foreground">
                    {result.matchPercentage >= 80 ? 'Strong match!' : result.matchPercentage >= 60 ? 'Moderate match' : 'Needs improvement'}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 mb-3">
                      <CheckCircle2 className="h-4 w-4" />
                      Matching Skills ({result.matchingSkills.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchingSkills.map((s) => (
                        <span key={s} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">{s}</span>
                      ))}
                      {result.matchingSkills.length === 0 && <span className="text-xs text-muted-foreground">None</span>}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-rose-700 mb-3">
                      <XCircle className="h-4 w-4" />
                      Missing Skills ({result.missingSkills.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingSkills.map((s) => (
                        <span key={s} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-700">{s}</span>
                      ))}
                      {result.missingSkills.length === 0 && <span className="text-xs text-muted-foreground">None</span>}
                    </div>
                  </div>
                </div>

                {result.recommendations.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-3">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Recommendations
                    </div>
                    <ul className="space-y-2">
                      {result.recommendations.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-stone-50 rounded-xl p-3">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.resumeSuggestions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-3">
                      <FileText className="h-4 w-4 text-blue-500" />
                      Resume Suggestions
                    </div>
                    <ul className="space-y-2">
                      {result.resumeSuggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-blue-50 rounded-xl p-3">
                          <ArrowRight className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
