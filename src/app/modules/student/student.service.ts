import { StudentData } from './student.interface';
import { Student } from './student.model';

export const createStudentIntoDB = async (student: StudentData) => {
  const result = await Student.create(student);
  return result;
};
