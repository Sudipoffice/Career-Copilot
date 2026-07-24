'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { FileText, Trash2, CheckCircle2, XCircle, AlertCircle, Eye, Lightbulb, Shield, Target, Zap } from 'lucide-react';
import { api, type Resume } from '@/lib/api-client';
import { ScoreCard } from '@/components/ui/score-card';
import { EmptyState } from '@/components/ui/empty-state';
import { FileUploadZone } from '@/components/ui/file-upload-zone';
import { NextSteps } from '@/components/ui/next-steps';
import { AnimatedSteps } from '@/components/ui/animated-steps';

export default function ResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scoring, setScoring] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Resume | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

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

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    setError('');
    try {
      const created = await api.resume.uploadWithProgress(file, setUploadProgress);
      setResumes((prev) => [created, ...prev]);
      setSelected(created);
      if (created.parsedContent) setScoring(null);
      else setScoring(created._id);
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

  const isPdf = selected?.mimeType === 'application/pdf';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resume Analysis</h2>
          <p className="text-muted-foreground mt-1">Upload your resume for ATS analysis and scoring</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className={`space-y-4 ${!selected ? 'lg:col-span-5' : 'lg:col-span-2'}`}>
          <FileUploadZone
            uploading={uploading}
            uploadProgress={uploadProgress}
            error={error}
            onFile={handleFile}
          />

          <div ref={listRef}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Uploaded Resumes</h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-stone-100 animate-pulse" />)}
              </div>
            ) : resumes.length === 0 ? (
              <EmptyState
                icon={<FileText className="h-7 w-7" />}
                title="No Resume Yet"
                description="Drag &amp; drop or use the upload zone above."
              />
            ) : (
            <div className="space-y-2">
              {resumes.map((r) => (
                <button
                  key={r._id}
                  onClick={() => { setSelected(r); setShowPreview(false); if (!r.parsedContent) setScoring(r._id); else setScoring(null); }}
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
                    <div className="text-xs text-muted-foreground">{(r.fileSize / 1024).toFixed(0)} KB</div>
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
        </div>

        {!selected && resumes.length === 0 && (
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/[0.02] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-sm">ATS Tips for a Strong Resume</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">How to score higher with automated systems</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white border border-border p-4 space-y-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-semibold">Use Standard Sections</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">ATS parsers expect clear headers: Summary, Experience, Education, Skills. Avoid creative layouts.</p>
                </div>
                <div className="rounded-xl bg-white border border-border p-4 space-y-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-semibold">Match Keywords</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">Use terms from the job description. If they ask for "React," write "React" not "React.js framework."</p>
                </div>
                <div className="rounded-xl bg-white border border-border p-4 space-y-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <h4 className="text-xs font-semibold">Quantify Impact</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">Use numbers: "Increased sales by 30%" beats "Responsible for increasing sales."</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground text-center">Upload a resume above to see your personalized ATS analysis.</p>
            </div>
          </div>
        )}

        {selected && (
          <div className="lg:col-span-3">
            {scoring === selected._id && !selected.parsedContent ? (
              <AnimatedSteps
                messages={[
                  'Parsing your resume content...',
                  'Extracting skills and experience...',
                  'Analyzing ATS compatibility...',
                  'Checking keyword coverage...',
                  'Generating improvement suggestions...',
                ]}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${!showPreview ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Analysis
                  </button>
                  {isPdf && (
                    <button
                      onClick={() => setShowPreview(true)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${showPreview ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Preview
                    </button>
                  )}
                </div>

                {showPreview && isPdf ? (
                  <div className="rounded-2xl border border-border overflow-hidden">
                    <iframe
                      src={api.resume.fileUrl(selected._id)}
                      className="w-full h-[70vh]"
                      title={selected.fileName}
                    />
                  </div>
                ) : selected.parsedContent ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <ScoreCard
                        label="ATS Score"
                        value={selected.parsedContent.overallScore}
                        subtitle={selected.fileName}
                        why={`Your resume scored in the ${selected.parsedContent.atsRating} range. ${selected.parsedContent.missingKeywords.length > 0 ? `Missing ${selected.parsedContent.missingKeywords.length} key terms.` : 'All key terms detected.'}`}
                        size="lg"
                      />
                      <ScoreCard
                        label="Keyword Coverage"
                        value={Math.max(0, 100 - selected.parsedContent.missingKeywords.length * 8)}
                        subtitle="Based on detected keywords"
                        why={selected.parsedContent.missingKeywords.length > 0 ? `Missing: ${selected.parsedContent.missingKeywords.slice(0, 4).join(', ')}` : 'All expected keywords found'}
                        trend={selected.parsedContent.missingKeywords.length > 3 ? 'down' : 'up'}
                      />
                    </div>

                    {selected.parsedContent.formattingIssues.length > 0 && (
                      <div className="rounded-2xl border border-border p-5 space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-rose-500" />
                          Formatting Issues
                        </h4>
                        {selected.parsedContent.formattingIssues.map((issue) => (
                          <div key={issue} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    )}

                    {selected.parsedContent.missingKeywords.length > 0 && (
                      <div className="rounded-2xl border border-border p-5 space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          Missing Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selected.parsedContent.missingKeywords.map((k) => (
                            <span key={k} className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 border border-rose-200">
                              <XCircle className="h-3 w-3" />
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selected.parsedContent.sectionSuggestions.length > 0 && (
                      <div className="rounded-2xl border border-border p-5 space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-info" />
                          Section Suggestions
                        </h4>
                        {selected.parsedContent.sectionSuggestions.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-info-light text-info text-xs font-medium shrink-0 mt-0.5">{i + 1}</span>
                            {s}
                          </div>
                        ))}
                      </div>
                    )}

                    {selected.parsedContent.improvements.length > 0 && (
                      <div className="rounded-2xl border border-border p-5 space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          Improvements
                        </h4>
                        {selected.parsedContent.improvements.map((imp, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                            {imp}
                          </div>
                        ))}
                    </div>
                  )}

                  <NextSteps steps={[
                    { label: 'Add a Job Description', href: '/job-description' },
                    { label: 'Match with Job', href: '/job-description' },
                  ]} />
                </>
              ) : (
                  <EmptyState
                    icon={<FileText className="h-7 w-7" />}
                    title="Not Analyzed Yet"
                    description="This resume hasn't been analyzed. Select it to trigger AI analysis."
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
