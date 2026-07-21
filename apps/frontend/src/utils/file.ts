export type FileValidationResult = {
  valid: boolean;
  error?: string;
};

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_SIZE = 10 * 1024 * 1024;

export function validateFile(file: File): FileValidationResult {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only PDF and DOCX files are allowed.',
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'File is too large. Maximum size is 10MB.',
    };
  }

  return { valid: true };
}
