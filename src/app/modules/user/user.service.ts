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
import { TFaculty } from '../faculty/faculty.interface';
import createFacultyId from '../../utils/createFacultyId';
import { Faculty } from '../faculty/faculty.model';
import { sendEmail } from '../../utils/sendEmail';
import jwt from 'jsonwebtoken';
import { USER_ROLE } from './user.constant';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  let userData: Partial<TUser> = {} as NewUser;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.password = password || (config.default_password as string);
    userData.role = 'student';
    userData.email = studentData.email;
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
    studentData.id = userData.id;

    // transaction-2
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(500, 'Student creation failed');
    }
    await session.commitTransaction();
    await session.endSession();
    const activationTokenPayload = {
      userId: newUser[0]._id,
      email: userData.email,
      role: USER_ROLE.STUDENT,
    };
    const activationToken = jwt.sign(
      activationTokenPayload,
      config.jwt_access_secret as string,
      {
        expiresIn: '1d',
      },
    );
    console.log('before the sendEmail function call');
    await sendEmail(
      userData.email as string | string[],
      'Activate your account',
      'Please click the button below to activate your account',
      `<a href="http://localhost:3000/api/v1/auth/activate/${newUser[0]._id}/${activationToken}" style="background-color: blue; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Activate</a>`,
    );
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createFacultyIntoDB = async (
  password: string,
  facultyData: Partial<TFaculty>,
) => {
  let userData: Partial<TUser> = {} as NewUser;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const facultyId = await createFacultyId();
    userData.password = password || (config.default_password as string);
    userData.role = 'faculty';
    userData.id = facultyId;
    userData.email = facultyData.email;

    // transaction-1
    console.log('inside the createFacultyIntoDB service');
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(500, 'User creation failed');
    }

    facultyData.user = newUser[0]._id;
    facultyData.id = facultyId;

    // transaction-2
    const newFaculty = await Faculty.create([facultyData], { session });

    if (!newFaculty.length) {
      throw new AppError(500, 'Faculty creation failed');
    }
    await session.commitTransaction();
    await session.endSession();
    const activationTokenPayload = {
      userId: newUser[0]._id,
      email: userData.email,
      role: USER_ROLE.FACULTY,
    };
    const activationToken = jwt.sign(
      activationTokenPayload,
      config.jwt_access_secret as string,
      {
        expiresIn: '1d',
      },
    );
    console.log('before the sendEmail function call');
    await sendEmail(
      userData.email as string | string[],
      'Activate your account',
      'Please click the button below to activate your account',
      `<a href="http://localhost:3000/api/v1/auth/activate/${newUser[0]._id}/${activationToken}" style="background-color: blue; color: white; padding: 20px; text-decoration: none; border-radius: 5px;">Activate</a>`,
    );
    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserServices = { createStudentIntoDB, createFacultyIntoDB };
