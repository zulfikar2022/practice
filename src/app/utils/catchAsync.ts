import { NextFunction, Request, RequestHandler, Response } from 'express';

// async handler
export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      // console.log(error);
      next(error);
    });
  };
};
