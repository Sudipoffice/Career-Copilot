'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Building2, Target, HelpCircle, BookOpen, BarChart3, Command, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: typeof FileText;
  keywords: string[];
}

const items: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Overview and career readiness score', href: '/dashboard', icon: BarChart3, keywords: ['home', 'overview', 'stats', 'readiness'] },
  { id: 'resume', label: 'Resume Analysis', description: 'Upload and analyze your resume', href: '/resume', icon: FileText, keywords: ['upload', 'ats', 'score', 'cv', 'parsing'] },
  { id: 'jd', label: 'Job Description', description: 'Paste and analyze job descriptions', href: '/job-description', icon: Building2, keywords: ['job', 'description', 'jd', 'requirements', 'company'] },
  { id: 'analysis', label: 'Skill Gap Analysis', description: 'Compare resume against job requirements', href: '/analysis', icon: Target, keywords: ['skill', 'gap', 'match', 'comparison', 'missing'] },
  { id: 'questions', label: 'Interview Questions', description: 'Generate practice interview questions', href: '/questions', icon: HelpCircle, keywords: ['interview', 'practice', 'behavioral', 'technical'] },
  { id: 'study-plan', label: 'Study Plan', description: 'Create a personalized learning roadmap', href: '/study-plan', icon: BookOpen, keywords: ['learn', 'roadmap', 'schedule', 'topics', 'weeks'] },
];

function fuzzyMatch(text: string, query: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  const filtered = query
    ? items.filter((item) =>
        fuzzyMatch(item.label, query) ||
        fuzzyMatch(item.description, query) ||
        item.keywords.some((k) => fuzzyMatch(k, query)),
      )
    : items;

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex]!.href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg rounded-2xl border border-border bg-white shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search tools..."
                className="flex-1 h-12 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </div>

            <div className="max-h-72 overflow-y-auto p-2 space-y-0.5">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No results found</p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-stone-50'
                    }`}
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      i === selectedIndex ? 'bg-primary/15 text-primary' : 'bg-stone-100 text-muted-foreground'
                    }`}>
                      <item.icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{highlight(item.label, query)}</div>
                      <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                    </div>
                    <ArrowRight className={`h-3.5 w-3.5 shrink-0 ${
                      i === selectedIndex ? 'text-primary' : 'text-muted-foreground opacity-0'
                    }`} />
                  </button>
                ))
              )}
            </div>

            <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span><kbd className="inline-flex items-center rounded border border-border px-1 py-0.5 text-[10px] font-mono">↑↓</kbd> Navigate</span>
              <span><kbd className="inline-flex items-center rounded border border-border px-1 py-0.5 text-[10px] font-mono">↵</kbd> Open</span>
              <span><kbd className="inline-flex items-center rounded border border-border px-1 py-0.5 text-[10px] font-mono">Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}
