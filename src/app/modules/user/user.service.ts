import config from '../../config';
import { TStudent } from '../student/student.interface';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  let userData: Partial<TUser> = {} as NewUser;

  // if password is not provided, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // setting manually generated id
  userData.id = studentData.id;
  try {
    // create a user
    const result = await User.create(userData);

    // create a student
    if (Object.keys(result).length > 0) {
      // set id , _id as user
      studentData.id = result.id;
      studentData.user = result._id;
    }
  } catch (error) {
    throw new Error('Error while creating a user');
  }
};

export const UserServices = { createStudentIntoDB };
