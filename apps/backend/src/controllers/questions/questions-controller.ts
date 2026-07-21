import type { Request, Response, NextFunction } from 'express';
import { questionsService } from '../../services/questions-service';

export const questionsController = {
  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const questions = await questionsService.generate(req.body);
      res.json({ success: true, data: questions });
    } catch (err) {
      next(err);
    }
  },
};
