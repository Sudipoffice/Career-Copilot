'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Loader2, Building2, ArrowUpRight, FileText, Zap, Target, CheckCircle2, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { api, type Resume, type JobDescription, type SkillGapResult } from '@/lib/api-client';
import { EmptyState } from '@/components/ui/empty-state';
import { NextSteps } from '@/components/ui/next-steps';
import { AnimatedSteps } from '@/components/ui/animated-steps';
import { ScoreCard } from '@/components/ui/score-card';

export default function JobDescriptionPage() {
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<JobDescription | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [rawText, setRawText] = useState('');

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);

  const load = useCallback(async () => {
    try {
      const [jdData, resumeData] = await Promise.all([api.jd.list(), api.resume.list()]);
      setJds(jdData);
      setResumes(resumeData);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const jd = await api.jd.create({ title, company: company || undefined, rawText });
      setJds((prev) => [jd, ...prev]);
      setSelected(jd);
      setShowForm(false);
      setTitle('');
      setCompany('');
      setRawText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Creation failed');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.jd.delete(id);
    setJds((prev) => prev.filter((j) => j._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const handleAnalyze = async () => {
    if (!selectedResume || !selected) return;
    setAnalyzing(true);
    setError('');
    setResult(null);
    try {
      const data = await api.analysis.skillGap({ resumeId: selectedResume, jdId: selected._id });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Description</h2>
          <p className="text-muted-foreground mt-1">Paste and analyze job descriptions, then match against your resume</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="h-4 w-4" />
          {showForm ? 'Cancel' : 'Add JD'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <Loader2 className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {creating && (
        <AnimatedSteps
          messages={[
            'Reading job description...',
            'Extracting required skills...',
            'Identifying responsibilities...',
            'Analyzing tech stack...',
            'Structuring the results...',
          ]}
        />
      )}

      {showForm && !creating && (
        <form onSubmit={handleCreate} className="rounded-xl border border-border p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                required
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Company</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Job Description *</label>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={8}
              required
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
              {creating ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </form>
      )}

      <div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All JDs</h3>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-stone-100 animate-pulse" />)}
            </div>
          ) : jds.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-7 w-7" />}
              title="No Job Descriptions"
              description="Add a job description to analyze."
            />
          ) : (
            <div className="space-y-2">
              {jds.map((j) => (
                <button
                  key={j._id}
                  onClick={() => { setSelected(j); setResult(null); }}
                  className={`w-full flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${
                    selected?._id === j._id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-stone-50'
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{j.title}</div>
                    {j.company && <div className="text-xs text-muted-foreground">{j.company}</div>}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(j._id); }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </button>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="mt-6 space-y-6">
            {/* JD Details — collapsible */}
            <details className="group rounded-xl border border-border" open>
              <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {selected.title}{selected.company ? ` @ ${selected.company}` : ''}
                </span>
                <span className="text-xs opacity-50 group-open:opacity-100 transition-opacity">
                  {selected.structuredData ? 'JD Details' : 'Raw Text'}
                </span>
              </summary>
              <div className="px-5 pb-5 space-y-5 border-t border-border pt-4">
                {selected.structuredData ? (
                  <>
                    {selected.structuredData.level && (
                      <p className="text-sm"><span className="font-medium">Level:</span> {selected.structuredData.level}</p>
                    )}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.structuredData.requiredSkills.map((s) => (
                          <span key={s} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">{s}</span>
                        ))}
                      </div>
                    </div>
                    {selected.structuredData.preferredSkills.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Preferred Skills</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.structuredData.preferredSkills.map((s) => (
                            <span key={s} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selected.structuredData.technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.structuredData.technologies.map((t) => (
                            <span key={t} className="rounded-full bg-violet-50 px-2.5 py-1 text-xs text-violet-700">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selected.structuredData.responsibilities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Responsibilities</h4>
                        <ul className="space-y-1">
                          {selected.structuredData.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="flex h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <details className="group">
                      <summary className="text-xs font-medium cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                        Raw Text
                      </summary>
                      <pre className="mt-2 rounded-xl bg-stone-50 p-4 text-xs text-muted-foreground whitespace-pre-wrap max-h-60 overflow-y-auto">
                        {selected.rawText}
                      </pre>
                    </details>
                  </>
                ) : (
                  <pre className="rounded-xl bg-stone-50 p-4 text-xs text-muted-foreground whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {selected.rawText}
                  </pre>
                )}
              </div>
            </details>

            {/* Skill Gap Analysis */}
            <div className="rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Skill Gap Analysis</h3>
              </div>

              {resumes.length === 0 ? (
                <EmptyState
                  icon={<FileText className="h-7 w-7" />}
                  title="No Resume Uploaded"
                  description="Upload a resume first to run a skill gap analysis."
                  action={
                    <a
                      href="/resume"
                      className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-all"
                    >
                      <FileText className="h-4 w-4" />
                      Upload Resume
                    </a>
                  }
                />
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <select
                      value={selectedResume}
                      onChange={(e) => setSelectedResume(e.target.value)}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                      <option value="">Select your resume...</option>
                      {resumes.map((r) => (
                        <option key={r._id} value={r._id}>{r.fileName}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={!selectedResume || analyzing}
                    className="inline-flex h-[42px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shrink-0"
                  >
                    {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                    {analyzing ? 'Analyzing...' : 'Match'}
                  </button>
                </div>
              )}

              {analyzing && (
                <AnimatedSteps
                  messages={[
                    'Loading resume and job description...',
                    'Analyzing skill requirements...',
                    'Comparing qualifications...',
                    'Calculating match score...',
                    'Generating recommendations...',
                  ]}
                />
              )}

              {result && (
                <div className="space-y-5 pt-2">
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

                  {result.matchingSkills.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-700 mb-3">Matching Skills ({result.matchingSkills.length})</h4>
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
                    <div>
                      <h4 className="text-sm font-semibold text-rose-700 mb-3">Missing Skills ({result.missingSkills.length})</h4>
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

                  {result.recommendations.length > 0 && (
                    <div className="rounded-xl bg-stone-50 p-4 space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Recommendations
                      </h4>
                      <div className="space-y-2">
                        {result.recommendations.map((r, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0 mt-0.5">{i + 1}</span>
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.resumeSuggestions.length > 0 && (
                    <div className="rounded-xl bg-info-light/50 p-4 space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2 text-info">
                        <FileText className="h-4 w-4" />
                        Resume Suggestions
                      </h4>
                      <div className="space-y-2">
                        {result.resumeSuggestions.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <ArrowRight className="h-3.5 w-3.5 text-info shrink-0 mt-0.5" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <NextSteps steps={[
                    { label: 'Generate Interview Questions', href: '/questions' },
                    { label: 'Create a Study Plan', href: '/study-plan' },
                  ]} />
                </div>
              )}

              {!analyzing && !result && resumes.length > 0 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Select your resume and click Match to see how you compare.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
