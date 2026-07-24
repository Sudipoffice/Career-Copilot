import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { questionsService } from '../../services/questions-service';

const genSchema = z.object({
  jdId: z.string().length(24).optional(),
  resumeId: z.string().length(24).optional(),
  count: z.coerce.number().min(1).max(20).default(10),
  types: z.array(z.enum(['behavioral', 'technical', 'situational'])).optional(),
}).refine((data) => data.jdId || data.resumeId, {
  message: 'Either jdId or resumeId is required',
});

export const questionsController = {
  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = genSchema.parse(req.body || {});
      const questions = await questionsService.generate(parsed);
      res.json({ success: true, data: questions });
    } catch (err) {
      next(err);
    }
  },
};
