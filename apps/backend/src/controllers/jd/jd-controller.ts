import type { Request, Response, NextFunction } from 'express';
import { jdService } from '../../services/jd-service';

export const jdController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const jd = await jdService.create(req.body);
      res.status(201).json({ success: true, data: jd });
    } catch (err) {
      next(err);
    }
  },

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const jds = await jdService.list();
      res.json({ success: true, data: jds });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const jd = await jdService.getById(req.params.id as string);
      res.json({ success: true, data: jd });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await jdService.delete(req.params.id as string);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
