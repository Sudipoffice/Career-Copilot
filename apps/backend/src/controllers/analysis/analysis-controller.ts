import type { Request, Response, NextFunction } from 'express';
import { analysisService } from '../../services/analysis-service';

export const analysisController = {
  async skillGap(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await analysisService.analyzeSkillGap(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async resumeScore(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await analysisService.scoreResume(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
};
