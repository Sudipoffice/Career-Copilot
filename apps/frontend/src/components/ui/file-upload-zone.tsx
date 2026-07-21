'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploadZoneProps {
  accept?: string;
  maxSize?: number;
  label?: string;
  uploading?: boolean;
  uploadProgress?: number;
  error?: string;
  onFile: (file: File) => void;
  onClear?: () => void;
}

const MAX_SIZE_DEFAULT = 10 * 1024 * 1024;
const ACCEPT_DEFAULT = '.pdf,.doc,.docx';

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type ValidationError =
  | { type: 'type'; message: string }
  | { type: 'size'; message: string }
  | null;

export function FileUploadZone({
  accept = ACCEPT_DEFAULT,
  maxSize = MAX_SIZE_DEFAULT,
  label,
  uploading = false,
  uploadProgress,
  error,
  onFile,
  onClear,
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<ValidationError>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = accept.split(',').map((t) => t.trim().toLowerCase());

  const validate = useCallback(
    (file: File): ValidationError => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(ext)) {
        return {
          type: 'type',
          message: `Invalid file type. Accepted: ${accept}`,
        };
      }
      if (file.size > maxSize) {
        return {
          type: 'size',
          message: `File too large. Max ${formatSize(maxSize)} (${formatSize(file.size)} uploaded)`,
        };
      }
      return null;
    },
    [allowedTypes, maxSize, accept],
  );

  const handleFile = useCallback(
    (file: File) => {
      const err = validate(file);
      setValidationError(err);
      if (err) {
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setValidationError(null);
      onFile(file);
    },
    [validate, onFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setValidationError(null);
    if (inputRef.current) inputRef.current.value = '';
    onClear?.();
  }, [onClear]);

  const displayError = error || validationError?.message;

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium">{label}</p>}

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && !uploading && inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all
          ${isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : selectedFile
              ? 'border-emerald-300 bg-emerald-50/50'
              : 'border-border hover:border-primary/50 hover:bg-stone-50'
          }
          ${uploading ? 'pointer-events-none' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleInputChange}
          disabled={uploading}
        />

        {uploading ? (
          <div className="space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <div>
              <p className="text-sm font-medium">Uploading...</p>
              {typeof uploadProgress === 'number' && (
                <div className="mt-3 mx-auto max-w-xs">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{selectedFile?.name}</p>
          </div>
        ) : selectedFile ? (
          <div className="space-y-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mx-auto">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(selectedFile.size)}</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:bg-stone-100 transition-colors"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
              <Upload className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-medium">
                {isDragOver ? 'Drop your file here' : 'Drag & drop your resume'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or click to browse &middot; PDF, DOCX up to {formatSize(maxSize)}
              </p>
            </div>
          </div>
        )}
      </div>

      {displayError && (
        <div className="flex items-start gap-2 rounded-xl bg-danger-light px-4 py-3 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
