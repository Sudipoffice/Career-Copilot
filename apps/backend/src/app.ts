import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { getEnv } from '@career-copilot/config';
import { errorHandler } from './middlewares/error-handler';
import { notFoundHandler } from './middlewares/not-found';
import { requestId } from './middlewares/request-id';
import { v1Router } from './routes/v1';

export function createApp() {
  const app = express();
  const env = getEnv();

  // Security
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

  // Compression
  app.use(compression());

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Request ID
  app.use(requestId);

  // Logging
  if (env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use(env.API_PREFIX, v1Router);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
