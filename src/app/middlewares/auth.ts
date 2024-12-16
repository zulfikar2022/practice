import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization');
    console.log(req.headers);
    // check if token is present or not
    if (!token) {
      res.status(401).json({
        message: 'Access denied',
      });
      return;
    }
    // check if token is valid
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    next();
  } catch (error) {
    next(error);
  }
};
