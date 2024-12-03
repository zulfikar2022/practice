import { ObjectId } from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getStudentById = async (id: ObjectId) => {
  const student = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'user',
      select:
        '_id id role needsPasswordChange status isDeleted createdAt updatedAt',
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
    });
  return students;
};

const deleteFromDB = async (id: string) => {
  const targetStudent: TStudent = (await Student.findOne({
    _id: id,
  })) as TStudent;
  console.log(targetStudent);
  const userId = targetStudent.user;
  const result = await User.updateOne(
    { _id: userId },
    { $set: { isDeleted: true } },
  );
  return result;
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
