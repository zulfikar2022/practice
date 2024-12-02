import { Types } from 'mongoose';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';
import { Student } from '../student/student.model';

const findLastStudentId = async (semesterId: string) => {
  console.log('semesterId', semesterId);
  const totalDocumentsNumber = await Student.find({
    admissionSemester: semesterId,
  }).countDocuments();
  return totalDocumentsNumber.toString() || undefined;
};

// year, semesterCode, 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  const semesterName = payload.name;
  const semesterCode = payload.code;
  const semesterYear = payload.year;
  // for the first time
  const currentId =
    (await findLastStudentId(payload._id as string)) ||
    (0).toString().padStart(4, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  let actualId = `${payload.year}${payload.code}${incrementId}`;
  return actualId;
};
