import { NextFunction, Request, Response } from 'express';

export const requestValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('this is a validator');
  // validation
  next();
};
