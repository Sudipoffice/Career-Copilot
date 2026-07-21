import { create } from 'zustand';
import type { Resume } from '@career-copilot/types';

interface ResumeState {
  resumes: Resume[];
  selectedResume: Resume | null;
  isUploading: boolean;
  setResumes: (resumes: Resume[]) => void;
  selectResume: (resume: Resume | null) => void;
  setIsUploading: (isUploading: boolean) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumes: [],
  selectedResume: null,
  isUploading: false,
  setResumes: (resumes) => set({ resumes }),
  selectResume: (resume) => set({ selectedResume: resume }),
  setIsUploading: (isUploading) => set({ isUploading }),
}));
