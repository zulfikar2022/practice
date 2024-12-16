import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUserPermissionToService = async (payload: TLoginUser) => {
  const result = await User.findOne({
    id: payload.id,
  }).select('-__v -createdAt -updatedAt ');
  if (!result) {
    throw new Error('User not found');
  }
  if (result.isDeleted) {
    throw new Error('User is deleted');
  }
  if (result.status === 'blocked') {
    throw new Error('User is blocked');
  }
  const match = await bcrypt.compare(payload.password, result.password);
  if (!match) {
    throw new Error('Password is incorrect');
  }
  // access granted. Send access token and refresh token to the user
  return result;
};

export const AuthServices = {
  loginUserPermissionToService,
};
