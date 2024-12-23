import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  email: string;
  isActivated: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<Boolean>;
  isDeleted(id: string): Promise<Boolean>;
  isBlocked(id: string): Promise<Boolean>;
  isPasswordMatch(id: string, password: string): Promise<Boolean>;
}

export type NewUser = {
  password: string;
  role: 'admin' | 'student' | 'faculty';
  id: string;
};

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
