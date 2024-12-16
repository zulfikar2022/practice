import config from '../../config';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUserPermissionToService = async (payload: TLoginUser) => {
  const user = await User.findOne({ id: payload.id });
  if (!(await User.isUserExistByCustomId(payload.id))) {
    throw new Error('User not found');
  }
  if (await User.isDeleted(payload.id)) {
    throw new Error('User is deleted');
  }
  if (await User.isBlocked(payload.id)) {
    throw new Error('User is blocked');
  }
  if (!(await User.isPasswordMatch(payload.id, payload.password))) {
    throw new Error('Password is incorrect');
  }
  // create token and sent to client side
  const jwtPayload = {
    userId: payload.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  // access granted. Send access token and refresh token to the user
  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUserPermissionToService,
};
