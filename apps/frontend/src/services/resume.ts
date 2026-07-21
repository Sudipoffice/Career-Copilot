import { apiClient } from './api-client';
import type { Resume } from '@career-copilot/types';

export const resumeService = {
  upload: async (file: File): Promise<Resume> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${apiClient.baseUrl}/resume/upload`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
  list: () => apiClient.get<Resume[]>('/resume'),
  getById: (id: string) => apiClient.get<Resume>(`/resume/${id}`),
  delete: (id: string) => apiClient.delete(`/resume/${id}`),
};
