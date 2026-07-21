import { Router } from 'express';
import { resumeRouter } from './resume';
import { jdRouter } from './jd';
import { analysisRouter } from './analysis';
import { questionsRouter } from './questions';
import { studyPlanRouter } from './study-plan';
import { healthRouter } from './health';

const v1Router = Router();

v1Router.use('/health', healthRouter);
v1Router.use('/resume', resumeRouter);
v1Router.use('/jd', jdRouter);
v1Router.use('/analysis', analysisRouter);
v1Router.use('/questions', questionsRouter);
v1Router.use('/study-plan', studyPlanRouter);

export { v1Router };
