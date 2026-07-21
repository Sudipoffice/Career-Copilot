'use client';

import { useState } from 'react';
import { Loader2, BookOpen, Clock, CheckCircle2, Goal, ArrowRight } from 'lucide-react';
import { api, type StudyPlan } from '@/lib/api-client';

export default function StudyPlanPage() {
  const [goal, setGoal] = useState('');
  const [durationWeeks, setDurationWeeks] = useState(2);
  const [focusAreaInput, setFocusAreaInput] = useState('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState('');

  const addFocusArea = () => {
    const trimmed = focusAreaInput.trim();
    if (trimmed && !focusAreas.includes(trimmed) && focusAreas.length < 10) {
      setFocusAreas((prev) => [...prev, trimmed]);
      setFocusAreaInput('');
    }
  };

  const removeFocusArea = (area: string) => {
    setFocusAreas((prev) => prev.filter((a) => a !== area));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || focusAreas.length === 0) return;
    setGenerating(true);
    setError('');
    setPlan(null);
    try {
      const result = await api.studyPlan.generate({ goal, durationWeeks, focusAreas });
      setPlan(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Study Plan</h2>
        <p className="text-muted-foreground mt-1">Generate a personalized learning roadmap</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <Loader2 className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleGenerate} className="rounded-xl border border-border p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Your Goal *</label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. I want to become a Senior Frontend Engineer at a FAANG company"
                rows={3}
                required
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Duration</label>
              <select
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                {[1, 2, 3, 4, 6, 8, 12].map((w) => (
                  <option key={w} value={w}>{w} {w === 1 ? 'week' : 'weeks'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Focus Areas</label>
              <div className="flex gap-2">
                <input
                  value={focusAreaInput}
                  onChange={(e) => setFocusAreaInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFocusArea(); } }}
                  placeholder="e.g. React, System Design"
                  className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={addFocusArea}
                  disabled={!focusAreaInput.trim() || focusAreas.length >= 10}
                  className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  Add
                </button>
              </div>
              {focusAreas.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {focusAreas.map((area) => (
                    <span key={area} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {area}
                      <button onClick={() => removeFocusArea(area)} className="hover:text-rose-600">&times;</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={generating || !goal || focusAreas.length === 0}
              className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
              {generating ? 'Generating...' : 'Generate Study Plan'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-3">
          {!plan ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              Fill in the form and generate your personalized study plan
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-5 bg-stone-50">
                <div className="flex items-start gap-3">
                  <Goal className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{plan.goal}</p>
                    <p className="text-xs text-muted-foreground mt-1">{plan.totalWeeks} week plan</p>
                  </div>
                </div>
              </div>

              {plan.weeklyPlans.map((week) => (
                <div key={week.week} className="rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center justify-between bg-stone-50 px-5 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {week.week}
                      </span>
                      <span className="font-medium text-sm">{week.topic}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {week.duration}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {week.resources.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Resources</h5>
                        <div className="flex flex-wrap gap-2">
                          {week.resources.map((r, i) => (
                            <span key={i} className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-700">
                              {r.type === 'course' ? '📚' : r.type === 'book' ? '📖' : r.type === 'article' ? '📄' : r.type === 'video' ? '🎬' : '🛠️'}
                              {r.url ? (
                                <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                  {r.title}
                                </a>
                              ) : (
                                r.title
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {week.practiceExercises.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Practice</h5>
                        <ul className="space-y-1">
                          {week.practiceExercises.map((ex, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <ArrowRight className="h-3 w-3 shrink-0 mt-0.5 text-primary" />
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {week.milestones.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Milestones</h5>
                        <div className="space-y-1">
                          {week.milestones.map((m, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-emerald-700">
                              <CheckCircle2 className="h-3 w-3 shrink-0" />
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
