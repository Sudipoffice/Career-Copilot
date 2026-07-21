import { Router } from 'express';
import { jdController } from '../../controllers/jd/jd-controller';
import { validate } from '../../middlewares/validate';
import { jdCreateSchema } from '@career-copilot/schemas';

const jdRouter = Router();

jdRouter.post('/', validate(jdCreateSchema), jdController.create);
jdRouter.get('/', jdController.list);
jdRouter.get('/:id', jdController.getById);
jdRouter.delete('/:id', jdController.delete);

export { jdRouter };
