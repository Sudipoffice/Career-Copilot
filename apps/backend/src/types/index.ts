export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: import('express').NextFunction,
) => Promise<void>;
