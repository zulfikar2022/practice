import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year, semesterCode, 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  const semesterName = payload.name;
  const semesterCode = payload.code;
  const semesterYear = payload.year;
  // for the first time
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(4, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  let actualId = `${payload.year}${payload.code}${incrementId}`;
  return actualId;
};
