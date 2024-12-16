import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

type Decoded = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export const auth = (...requiredRoles: TUserRole[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = req.header('Authorization');

      // check if token is present or not
      if (!token) {
        res.status(401).json({
          message: 'Access denied',
        });
        return;
      }
      // check if token is valid
      const decoded: Decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as Decoded;
      const { userId, role } = decoded;
      const user = await User.findOne({ id: userId });
      if (user?.id !== userId || user?.role !== role) {
        throw new Error('User not found');
      }

      if (requiredRoles && !requiredRoles.includes(user.role)) {
        throw new Error('Access denied');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
