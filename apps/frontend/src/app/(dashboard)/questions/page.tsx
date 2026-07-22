'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, HelpCircle, Sparkles, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { api, type JobDescription, type Question } from '@/lib/api-client';
import { EmptyState } from '@/components/ui/empty-state';
import { NextSteps } from '@/components/ui/next-steps';

export default function QuestionsPage() {
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [selectedJd, setSelectedJd] = useState('');
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const load = useCallback(async () => {
    try {
      const data = await api.jd.list();
      setJds(data);
    } catch {
      setError('Failed to load job descriptions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleGenerate = async () => {
    if (!selectedJd) return;
    setGenerating(true);
    setError('');
    setQuestions([]);
    try {
      const result = await api.questions.generate({ jdId: selectedJd, count });
      setQuestions(result.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const filtered = difficultyFilter === 'all'
    ? questions
    : questions.filter((q) => q.difficulty === difficultyFilter);

  const difficultyColor = (d: string) => {
    if (d === 'easy') return 'bg-success-light text-success';
    if (d === 'medium') return 'bg-warning-light text-warning';
    return 'bg-danger-light text-danger';
  };

  const typeColor = (t: string) => {
    if (t === 'technical') return 'bg-blue-50 text-blue-700';
    if (t === 'behavioral') return 'bg-violet-50 text-violet-700';
    return 'bg-stone-100 text-stone-700';
  };

  const importanceStars = (d: string) => {
    if (d === 'hard') return '★★★★★';
    if (d === 'medium') return '★★★☆☆';
    return '★★☆☆☆';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Interview Questions</h2>
          <p className="text-muted-foreground mt-1">Generate practice questions from a job description</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-stone-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Interview Questions</h2>
        <p className="text-muted-foreground mt-1">Generate practice questions from a job description</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-danger-light px-4 py-3 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {jds.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-7 w-7" />}
          title="No Job Description"
          description="Add a job description first to generate tailored interview questions."
          action={<Link href="/job-description" className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-all"><FileText className="h-4 w-4" />Add JD</Link>}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
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
            <div className="w-24">
              <label className="text-sm font-medium mb-1.5 block">Count</label>
              <input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!selectedJd || generating}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {generating ? 'Generating...' : 'Generate'}
            </button>
          </div>

          {generating && (
            <div className="rounded-2xl border border-border p-8 text-center space-y-3">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
              <p className="text-sm font-medium">Generating questions based on the job description...</p>
              <div className="flex justify-center gap-3">
                {['Analyzing JD', 'Generating', 'Formatting'].map((step, i) => (
                  <span key={step} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full ${i < 2 ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}

          {questions.length > 0 && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter:</span>
                <div className="flex gap-1.5">
                  {['all', 'easy', 'medium', 'hard'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficultyFilter(d)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        difficultyFilter === d
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-stone-100 text-muted-foreground hover:bg-stone-200'
                      }`}
                    >
                      {d === 'all' ? 'All' : `${d.charAt(0).toUpperCase() + d.slice(1)}`}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-auto">{filtered.length} questions</span>
              </div>

              <div className="space-y-4">
                {filtered.map((q, i) => (
                  <div key={i} className="rounded-2xl border border-border p-5 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-medium shrink-0">
                          {i + 1}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColor(q.type)}`}>
                          {q.type}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <span className="text-xs text-amber-600 shrink-0" title="Importance">{importanceStars(q.difficulty)}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3">{q.text}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <HelpCircle className="h-3 w-3" />
                      Tests: <span className="font-medium text-foreground">{q.skillTested}</span>
                    </div>
                    <details className="group">
                      <summary className="text-xs font-medium text-primary cursor-pointer hover:underline">
                        Reveal Expected Topics
                      </summary>
                      <div className="mt-3 space-y-1.5 pl-3 border-l-2 border-primary/20">
                        {q.keyPoints.map((kp, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="flex h-1 w-1 rounded-full bg-primary shrink-0 mt-1.5" />
                            {kp}
                          </div>
                        ))}
                        {q.suggestedStructure && (
                          <div className="mt-2 rounded-lg bg-stone-50 p-3 text-xs text-muted-foreground">
                            <span className="font-medium">Structure:</span> {q.suggestedStructure}
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                ))}
              </div>

              <NextSteps steps={[
                { label: 'Create a Study Plan', href: '/study-plan' },
              ]} />
            </>
          )}

          {!generating && questions.length === 0 && (
            <EmptyState
              icon={<HelpCircle className="h-7 w-7" />}
              title="Select & Generate"
              description="Choose a job description and click Generate to create tailored interview questions."
            />
          )}
        </>
      )}
    </div>
  );
}
