import { getEnv } from '@career-copilot/config';

export { loadEnv, getEnv, config } from '@career-copilot/config';

export const appConfig = {
  get port() {
    return getEnv().PORT;
  },
  get prefix() {
    return getEnv().API_PREFIX;
  },
  get corsOrigin() {
    return getEnv().CORS_ORIGIN;
  },
  get mongoUri() {
    return getEnv().MONGODB_URI;
  },
  get aiKey() {
    return getEnv().OPENROUTER_API_KEY;
  },
  get aiModel() {
    return getEnv().AI_MODEL;
  },
};
