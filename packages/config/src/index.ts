import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { envSchema, type Env } from '@career-copilot/schemas';
export { tokens } from './design-tokens';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

let cachedEnv: Env | null = null;

export function loadEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    const formatted = result.error.flatten();
    for (const [key, messages] of Object.entries(formatted.fieldErrors)) {
      console.error(`  ${key}: ${messages.join(', ')}`);
    }
    process.exit(1);
  }

  cachedEnv = result.data;
  return cachedEnv;
}

export function getEnv(): Env {
  if (!cachedEnv) {
    throw new Error('Environment not loaded. Call loadEnv() first.');
  }
  return cachedEnv;
}

export const config = {
  get environment() {
    return getEnv().NODE_ENV;
  },
  get isDev() {
    return getEnv().NODE_ENV === 'development';
  },
  get isProd() {
    return getEnv().NODE_ENV === 'production';
  },
  get isTest() {
    return getEnv().NODE_ENV === 'test';
  },
};
