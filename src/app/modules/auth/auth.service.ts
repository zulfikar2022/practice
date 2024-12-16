import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUserPermissionToService = async (payload: TLoginUser) => {
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
  // access granted. Send access token and refresh token to the user
  return {};
};

export const AuthServices = {
  loginUserPermissionToService,
};
