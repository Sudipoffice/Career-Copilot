import type { Request, Response, NextFunction } from 'express';
import { resumeService } from '../../services/resume-service';

export const resumeController = {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) throw new Error('No file uploaded');
      const result = await resumeService.processUpload(file);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const resumes = await resumeService.list();
      res.json({ success: true, data: resumes });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const resume = await resumeService.getById(req.params.id as string);
      res.json({ success: true, data: resume });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await resumeService.delete(req.params.id as string);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
