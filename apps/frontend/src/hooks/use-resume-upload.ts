import { useMutation } from '@tanstack/react-query';
import { resumeService } from '@/services/resume';

export function useResumeUpload() {
  return useMutation({
    mutationFn: (file: File) => resumeService.upload(file),
  });
}
