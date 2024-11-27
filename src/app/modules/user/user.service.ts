import { StudentData } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

export const createStudentIntoDB = async (studentData: StudentData) => {
  try {
    // const result = await Student.create(student); // usage of built in static method
    const student = new Student(studentData);
    student.isUserExists(student.email);
    const result = await student.save(); // usage of a built in instance method
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const UserServices = { createStudentIntoDB };
