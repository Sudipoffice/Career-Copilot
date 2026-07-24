import { Router } from 'express';
import { questionsController } from '../../controllers/questions/questions-controller';

const questionsRouter = Router();

questionsRouter.post('/generate', questionsController.generate);

export { questionsRouter };
