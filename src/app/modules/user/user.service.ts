import { Schema } from 'zod';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  let userData: Partial<TUser> = {} as NewUser;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.password = password || (config.default_password as string);
    userData.role = 'student';
    const academicSemester = await AcademicSemester.findById(
      studentData.admissionSemester,
    );
    userData.id = await generateStudentId(
      academicSemester as TAcademicSemester,
    );

    // transaction-1
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(500, 'User creation failed');
    }
    studentData.user = newUser[0]._id;

    // transaction-2
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(500, 'Student creation failed');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    console.log('transaction failed', error);
    await session.abortTransaction();
    await session.endSession();
  }

  // setting manually generated id
};

export const UserServices = { createStudentIntoDB };
