import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  console.log('inside the validator and trying to validate data');
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation
    // if alright next ()
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
