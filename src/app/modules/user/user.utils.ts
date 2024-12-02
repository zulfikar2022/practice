import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

// year, semesterCode, 4 digit number
export const generateStudentId = (payload: TAcademicSemester) => {
  const semesterName = payload.name;
  const semesterCode = payload.code;
  const semesterYear = payload.year;

  // for the first time
  const currentId = (0).toString().padStart(4, '0');

  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  let actualId = `${payload.year}${payload.code}${incrementId}`;
  return actualId;
};
