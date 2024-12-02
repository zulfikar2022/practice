import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Student } from '../student/student.model';

const findTotalStudentNumberOnSameSemester = async (semesterId: string) => {
  const totalDocumentsNumber = await Student.find({
    admissionSemester: semesterId,
  }).countDocuments();
  return totalDocumentsNumber.toString();
};

// year, semesterCode, 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId = await findTotalStudentNumberOnSameSemester(
    payload._id as string,
  );
  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  let actualId = `${payload.year}${payload.code}${incrementId}`;
  return actualId;
};
