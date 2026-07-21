'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Loader2, Building2, ArrowUpRight } from 'lucide-react';
import { api, type JobDescription } from '@/lib/api-client';

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

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.jd.list();
      setJds(data);
    } catch {
      setError('Failed to load job descriptions');
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Description</h2>
          <p className="text-muted-foreground mt-1">Paste and analyze job descriptions</p>
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

      {showForm && (
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

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All JDs</h3>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : jds.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No job descriptions yet
            </div>
          ) : (
            <div className="space-y-2">
              {jds.map((j) => (
                <button
                  key={j._id}
                  onClick={() => setSelected(j)}
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

        <div className="lg:col-span-3">
          {!selected ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              Select or create a job description to view analysis
            </div>
          ) : (
            <div className="rounded-xl border border-border p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">{selected.title}</h3>
                {selected.company && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {selected.company}
                  </p>
                )}
              </div>

              {selected.structuredData && (
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
                </>
              )}

              <details className="group">
                <summary className="text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  Raw Text
                </summary>
                <pre className="mt-2 rounded-xl bg-stone-50 p-4 text-xs text-muted-foreground whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {selected.rawText}
                </pre>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
