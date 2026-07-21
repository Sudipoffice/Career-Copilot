import { Router } from 'express';
import { questionsController } from '../../controllers/questions/questions-controller';
import { validate } from '../../middlewares/validate';
import { questionGenSchema } from '@career-copilot/schemas';

const questionsRouter = Router();

questionsRouter.post('/generate', validate(questionGenSchema), questionsController.generate);

export { questionsRouter };
