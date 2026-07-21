import { AppError } from '../middlewares/error-handler';

export class APIError extends AppError {
  constructor(statusCode: number, message: string, details?: Record<string, string[]>) {
    super(statusCode, message, details);
    this.name = 'APIError';
  }
}

export const Errors = {
  notFound: (resource = 'Resource') => new APIError(404, `${resource} not found`),
  badRequest: (message: string, details?: Record<string, string[]>) =>
    new APIError(400, message, details),
  unauthorized: (message = 'Unauthorized') => new APIError(401, message),
  forbidden: (message = 'Forbidden') => new APIError(403, message),
  conflict: (message: string) => new APIError(409, message),
  tooLarge: (message = 'File too large') => new APIError(413, message),
};
