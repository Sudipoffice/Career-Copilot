import { Router } from 'express';
import { studyPlanController } from '../../controllers/studyPlan/study-plan-controller';
import { validate } from '../../middlewares/validate';
import { studyPlanSchema } from '@career-copilot/schemas';

const studyPlanRouter = Router();

studyPlanRouter.post('/generate', validate(studyPlanSchema), studyPlanController.generate);

export { studyPlanRouter };
