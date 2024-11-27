import { StudentData } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (studentData: StudentData) => {
  try {
    const result = await User.create(studentData);
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const UserServices = { createStudentIntoDB };
