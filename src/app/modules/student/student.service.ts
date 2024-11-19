import { ObjectId } from 'mongoose';
import { StudentData } from './student.interface';
import { Student } from './student.model';

export const createStudentIntoDB = async (student: StudentData) => {
  try {
    const result = await Student.create(student);
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getStudentById = async (id: ObjectId) => {
  const student = await Student.findById(id);
  return student;
};

export const getAllStudents = async () => {
  const students = await Student.find({});
  return students;
};
