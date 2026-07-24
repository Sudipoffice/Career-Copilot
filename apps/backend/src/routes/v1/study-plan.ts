import { Router } from 'express';
import { studyPlanController } from '../../controllers/studyPlan/study-plan-controller';

const studyPlanRouter = Router();

studyPlanRouter.post('/generate', studyPlanController.generate);

export { studyPlanRouter };
