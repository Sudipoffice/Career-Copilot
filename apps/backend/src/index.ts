import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { createApp } from './app';
import { loadEnv } from '@career-copilot/config';
import { connectDB } from './lib/db';

async function bootstrap() {
  const env = loadEnv();
  await connectDB();

  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);

    const forceExit = setTimeout(() => {
      console.error('Forced shutdown after 10s');
      process.exit(1);
    }, 10000);

    server.close(() => {
      console.log('Server closed');
    });
    await mongoose.disconnect();
    console.log('MongoDB disconnected');

    clearTimeout(forceExit);
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
