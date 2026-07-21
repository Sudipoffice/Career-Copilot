import { Router } from 'express';
import { analysisController } from '../../controllers/analysis/analysis-controller';
import { validate } from '../../middlewares/validate';
import { analysisRequestSchema } from '@career-copilot/schemas';

const analysisRouter = Router();

analysisRouter.post('/skill-gap', validate(analysisRequestSchema), analysisController.skillGap);
analysisRouter.post('/resume-score', analysisController.resumeScore);

export { analysisRouter };
