import mongoose, { ObjectId } from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { AppError } from '../../errors/AppError';

const getStudentById = async (id: ObjectId) => {
  const student = await Student.findById(id)
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

const getAllStudents = async () => {
  const students = await Student.find({})
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
    throw error;
  }
  // return result;
};

const updateStudentIntoDB = async (id: string, student: TStudent) => {
  const result = await Student.updateOne(
    { _id: id },
    {
      $set: {
        name: student.name,
        contactNumber: student.contactNumber,
        emergencyContactNumber: student.emergencyContactNumber,
        presentAddress: student.presentAddress,
        guardian: student.guardian,
        localGuardian: student.localGuardian,
        profileImage: student.profileImage,
      },
    },
  );
  return result;
};

export const StudentServices = {
  getStudentById,
  getAllStudents,
  deleteFromDB,
  updateStudentIntoDB,
};
