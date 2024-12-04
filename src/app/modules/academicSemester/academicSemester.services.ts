import { AppError } from '../../errors/AppError';
import { SemesterCode, SemesterName } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code
  let academicSemesterNameCodeMapper: Record<string, string> = {};

  SemesterName.forEach((name, index) => {
    academicSemesterNameCodeMapper[`${name}`] = SemesterCode[index];
  });
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const academicSemesters = await AcademicSemester.find({});
  return academicSemesters;
};
const getSpecificSemesterFromDB = async (id: string) => {
  const academicSemester = await AcademicSemester.find({ _id: id });
  return academicSemester;
};
const getAcademicSemesterByIdFromDB = async (id: string) => {
  const academicSemester = await AcademicSemester.findById(id);
  return academicSemester;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSpecificSemesterFromDB,
  getAcademicSemesterByIdFromDB,
};
