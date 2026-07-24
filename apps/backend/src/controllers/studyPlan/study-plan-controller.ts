import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { studyPlanService } from '../../services/study-plan-service';

const spSchema = z.object({
  goal: z.string().max(1000).optional(),
  resumeId: z.string().length(24).optional(),
  jdId: z.string().length(24).optional(),
  durationWeeks: z.coerce.number().min(1).max(52),
  focusAreas: z.array(z.string()).max(10).default([]),
}).refine((data) => data.resumeId || data.jdId, {
  message: 'Either resumeId or jdId is required',
});

export const studyPlanController = {
  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = spSchema.parse(req.body || {});
      const plan = await studyPlanService.generate(parsed);
      res.json({ success: true, data: plan });
    } catch (err) {
      next(err);
    }
  },
};
