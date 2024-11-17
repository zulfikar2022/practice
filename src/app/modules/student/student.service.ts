import { ObjectId } from 'mongoose';
import { StudentData } from './student.interface';
import { Student } from './student.model';

export const createStudentIntoDB = async (student: StudentData) => {
  const result = await Student.create(student);
  return result;
};

export const getStudentById = async (id: ObjectId) => {
  const student = await Student.findById(id);
  return student;
};
