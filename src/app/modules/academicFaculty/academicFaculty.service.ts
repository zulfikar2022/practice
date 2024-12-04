import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  return await AcademicFaculty.create(payload);
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  return await AcademicFaculty.findById({ _id: id });
};

const getAllAcademicFacultyFromDB = async () => {
  return await AcademicFaculty.find({});
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: { name: string },
) => {
  return await AcademicFaculty.findByIdAndUpdate(
    { _id: id },
    { $set: { name: payload.name } },
    { new: true },
  );
};

const deleteAcademicFacultyFromDB = async (id: string) => {
  return await AcademicFaculty.findByIdAndDelete(id);
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getSingleAcademicFacultyFromDB,
  getAllAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
  deleteAcademicFacultyFromDB,
};
