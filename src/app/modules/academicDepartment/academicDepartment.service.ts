import { TAcadmicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcadmicDepartment) => {
  return await AcademicDepartment.create(payload);
};

const getAllAcademicDepartmentsFromDB = async () => {
  return await AcademicDepartment.find();
};
const getSpecificAcademicDepartmentFromDB = async (id: string) => {
  return await AcademicDepartment.findById({ _id: id });
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: TAcadmicDepartment,
) => {
  return await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: payload.name,
        academicFaculty: payload.academicFaculty,
      },
    },
    { new: true },
  );
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSpecificAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
