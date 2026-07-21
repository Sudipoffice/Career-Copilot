'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { FileText, Trash2, Loader2, CheckCircle2, XCircle, AlertCircle, Eye } from 'lucide-react';
import { api, type Resume } from '@/lib/api-client';
import { ScoreCard } from '@/components/ui/score-card';
import { EmptyState } from '@/components/ui/empty-state';
import { FileUploadZone } from '@/components/ui/file-upload-zone';
import { InfoBanner } from '@/components/ui/info-banner';

export default function ResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scoring, setScoring] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Resume | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showQuotaBanner, setShowQuotaBanner] = useState(true);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resume Analysis</h2>
          <p className="text-muted-foreground mt-1">Upload your resume for ATS analysis and scoring</p>
        </div>
      </div>

      {showQuotaBanner && (
        <InfoBanner
          variant="warning"
          title="AI analysis is temporarily unavailable"
          description="The Gemini API quota has been exceeded. Your data is saved and ready for analysis when service resumes. All other features still work."
          onDismiss={() => setShowQuotaBanner(false)}
        />
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
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

        <div className="lg:col-span-3">
          {!selected ? (
            <EmptyState
              icon={<FileText className="h-7 w-7" />}
              title="Select a Resume"
              description="Choose a resume from the list to view its analysis."
            />
          ) : scoring === selected._id && !selected.parsedContent ? (
            <div className="rounded-2xl border border-border p-8 text-center space-y-3">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
              <p className="text-sm font-medium">Analyzing your resume...</p>
              <div className="flex justify-center gap-2">
                {['Parsing', 'Extracting', 'Scoring'].map((step, i) => (
                  <span key={step} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full ${i < 2 ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                    {step}
                  </span>
                ))}
              </div>
            </div>
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
                </>
              ) : (
                <EmptyState
                  icon={<FileText className="h-7 w-7" />}
                  title="Not Analyzed Yet"
                  description="Click on a resume to trigger AI analysis, or re-upload for a fresh scan."
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
