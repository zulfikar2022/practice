import { ObjectId } from 'mongoose';
import { Student } from './student.model';

const getStudentById = async (id: ObjectId) => {
  const student = await Student.findById(id);
  return student;
};

const getAllStudents = async () => {
  const students = await Student.find({});
  return students;
};

const deleteFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { $set: { isDeleted: true } });
  return result;
};

export const StudentServices = {
  getStudentById,
  getAllStudents,
  deleteFromDB,
};
