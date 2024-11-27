import config from '../../config';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TUser) => {
  let user: NewUser = {} as NewUser;

  // if password is not provided, use default password
  user.password = password || (config.default_password as string);

  // set student role
  user.role = 'student';
  user.id = studentData.id;

  // create a user
  const result = await User.create(user);
  return result;
};

export const UserServices = { createStudentIntoDB };
