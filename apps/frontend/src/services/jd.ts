import { apiClient } from './api-client';
import type { JobDescription } from '@career-copilot/types';
import type { JdCreateInput } from '@career-copilot/schemas';

export const jdService = {
  create: (data: JdCreateInput) => apiClient.post<JobDescription>('/jd', data),
  list: () => apiClient.get<JobDescription[]>('/jd'),
  getById: (id: string) => apiClient.get<JobDescription>(`/jd/${id}`),
  delete: (id: string) => apiClient.delete(`/jd/${id}`),
};
