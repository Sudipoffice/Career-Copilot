// File storage abstraction
// Local disk for development, S3 for production

export interface StorageProvider {
  upload(file: Express.Multer.File): Promise<string>;
  delete(key: string): Promise<void>;
  getUrl(key: string): string;
}
