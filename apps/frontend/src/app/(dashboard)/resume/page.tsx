'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, FileText, Trash2, Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { api, type Resume } from '@/lib/api-client';

export default function ResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Resume | null>(null);
  const [scoring, setScoring] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.resume.list();
      setResumes(data);
    } catch {
      setError('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const created = await api.resume.upload(file);
      setResumes((prev) => [created, ...prev]);
      setSelected(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.resume.delete(id);
    setResumes((prev) => prev.filter((r) => r._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const handleScore = async () => {
    if (!selected) return;
    setScoring(true);
    try {
      const score = await api.analysis.resumeScore({ resumeId: selected._id });
      setSelected({ ...selected, parsedContent: score });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scoring failed');
    } finally {
      setScoring(false);
    }
  };

  const atsColor = (r?: string) => {
    if (r === 'excellent') return 'text-emerald-600 bg-emerald-50';
    if (r === 'good') return 'text-blue-600 bg-blue-50';
    if (r === 'fair') return 'text-amber-600 bg-amber-50';
    return 'text-rose-600 bg-rose-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resume</h2>
          <p className="text-muted-foreground mt-1">Upload and analyze your resume</p>
        </div>
        <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98] transition-all">
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload Resume'}
          <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Uploaded Resumes</h3>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : resumes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No resumes uploaded yet
            </div>
          ) : (
            <div className="space-y-2">
              {resumes.map((r) => (
                <button
                  key={r._id}
                  onClick={() => setSelected(r)}
                  className={`w-full flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${
                    selected?._id === r._id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-stone-50'
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{r.fileName}</div>
                    <div className="text-xs text-muted-foreground">
                      {(r.fileSize / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(r._id); }}
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
              Select or upload a resume to view analysis
            </div>
          ) : (
            <div className="rounded-xl border border-border p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{selected.fileName}</h3>
                  <p className="text-xs text-muted-foreground">ID: {selected._id}</p>
                </div>
                {selected.parsedContent ? (
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${atsColor(selected.parsedContent.atsRating)}`}>
                    <CheckCircle2 className="h-3 w-3" />
                    {selected.parsedContent.atsRating}
                  </span>
                ) : (
                  <button
                    onClick={handleScore}
                    disabled={scoring}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
                  >
                    {scoring ? <Loader2 className="h-3 w-3 animate-spin" /> : <ArrowUpRight className="h-3 w-3" />}
                    {scoring ? 'Scoring...' : 'Analyze'}
                  </button>
                )}
              </div>

              {selected.parsedContent && (
                <>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-50">
                    <div className="text-4xl font-bold text-primary">{selected.parsedContent.overallScore}</div>
                    <div className="text-sm text-muted-foreground">ATS Score</div>
                  </div>

                  {selected.parsedContent.missingKeywords.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.parsedContent.missingKeywords.map((k) => (
                          <span key={k} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-700">{k}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selected.parsedContent.improvements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Improvements</h4>
                      <ul className="space-y-1.5">
                        {selected.parsedContent.improvements.map((imp, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
