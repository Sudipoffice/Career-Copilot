import { create } from 'zustand';
import type { SkillGapAnalysis } from '@career-copilot/types';

interface AnalysisState {
  currentAnalysis: SkillGapAnalysis | null;
  isAnalyzing: boolean;
  setAnalysis: (analysis: SkillGapAnalysis | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  currentAnalysis: null,
  isAnalyzing: false,
  setAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
}));
