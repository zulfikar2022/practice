import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
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
    const newUser = await User.create(userData);

    // create a student
    if (Object.keys(newUser).length > 0) {
      // set id , _id as user
      studentData.id = newUser.id; // embedding id
      studentData.user = newUser._id; // reference id

      const newStudent = await Student.create(studentData);
      return newStudent;
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error while creating a user');
  }
};

export const UserServices = { createStudentIntoDB };
