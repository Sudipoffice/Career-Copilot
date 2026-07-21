import type { Request, Response, NextFunction } from 'express';
import { studyPlanService } from '../../services/study-plan-service';

export const studyPlanController = {
  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const plan = await studyPlanService.generate(req.body);
      res.json({ success: true, data: plan });
    } catch (err) {
      next(err);
    }
  },
};
