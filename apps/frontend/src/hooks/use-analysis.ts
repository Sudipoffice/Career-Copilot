import { useQuery } from '@tanstack/react-query';
import { analysisService } from '@/services/analysis';
import type { AnalysisRequestInput } from '@career-copilot/schemas';

export function useAnalysis(params: AnalysisRequestInput) {
  return useQuery({
    queryKey: ['analysis', params.resumeId, params.jdId],
    queryFn: () => analysisService.getSkillGap(params),
    enabled: !!params.resumeId && !!params.jdId,
  });
}
