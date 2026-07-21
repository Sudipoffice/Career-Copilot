import { Router } from 'express';
import { resumeController } from '../../controllers/resume/resume-controller';
import { upload } from '../../middlewares/upload';

const resumeRouter = Router();

resumeRouter.post('/upload', upload.single('file'), resumeController.upload);
resumeRouter.get('/', resumeController.list);
resumeRouter.get('/:id', resumeController.getById);
resumeRouter.get('/:id/file', resumeController.getFile);
resumeRouter.delete('/:id', resumeController.delete);

export { resumeRouter };
