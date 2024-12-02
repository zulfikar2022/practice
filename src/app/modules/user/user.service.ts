import { Schema } from 'zod';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  let userData: Partial<TUser> = {} as NewUser;
  console.log('inside user service.');

  // if password is not provided, use default password instead
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester information
  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  // setting manually generated id
  userData.id = await generateStudentId(academicSemester as TAcademicSemester);
  try {
    // create a user
    const newUser = await User.create(userData);

    // create a student
    if (Object.keys(newUser).length > 0) {
      // set id , _id as user
      studentData.id = newUser.id; // embedding id
      studentData.user = newUser._id; // reference id
      try {
        const newStudent = await Student.create(studentData);
        return newStudent;
      } catch (error: any) {
        await User.deleteOne({ id: newUser.id });
        throw new Error('Error while creating a student');
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error while creating a user');
  }
};

export const UserServices = { createStudentIntoDB };
