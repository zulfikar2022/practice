import mongoose, { ObjectId } from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { AppError } from '../../errors/AppError';

const getStudentById = async (id: string) => {
  const student = await Student.find({ id })
    .populate('admissionSemester')
    .populate({
      path: 'user',
      select:
        '_id id role needsPasswordChange status isDeleted createdAt updatedAt',
    })
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return student;
};

const getAllStudents = async (query: Record<string, string>) => {
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm;
  }
  const studentSearchableFields = [
    'email',
    'contactNumber',
    'emergencyContactNumber',
    'id',
  ];

  const searchQuery = studentSearchableFields.map((field) => {
    return { [field]: { $regex: searchTerm, $options: 'i' } };
  });

  const excludeFields = ['searchTerm'];
  let filterQuery: Record<string, unknown> = {};
  Object.keys(query).forEach((key) => {
    if (!excludeFields.includes(key)) {
      filterQuery[key] = query[key];
    }
  });
  const students = await Student.find({ $or: searchQuery })
    .find(filterQuery)
    .populate({ path: 'admissionSemester' })
    .populate({
      path: 'user',
      select:
        '_id id role needsPasswordChange status isDeleted createdAt updatedAt',
    })
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return students;
};

const deleteFromDB = async (id: string) => {
  let targetStudent: TStudent;
  try {
    targetStudent = (await Student.findOne({
      id,
    })) as TStudent;
    if (!targetStudent) {
      throw new AppError(404, `Student not found with the id ${id}`);
    }
  } catch (error) {
    throw new AppError(404, 'some Error occurred');
  }

  const userId = targetStudent.user;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(404, 'User not found');
    }
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(404, 'Student not found');
    }

    await session.commitTransaction();
    session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error('failed to delete student');
  }
  // return result;
};

const updateStudentIntoDB = async (id: string, student: TStudent) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = student;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getStudentById,
  getAllStudents,
  deleteFromDB,
  updateStudentIntoDB,
};
