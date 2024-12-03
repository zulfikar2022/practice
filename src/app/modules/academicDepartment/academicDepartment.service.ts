import { TAcadmicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartment = async (payload: TAcadmicDepartment) => {
  return await AcademicDepartment.create(payload);
};

const getAllAcademicDepartments = async () => {
  return await AcademicDepartment.find();
};
const getSpecificAcademicDepartment = async (id: string) => {
  return await AcademicDepartment.findById({ _id: id });
};

const updateAcademicDepartment = async (
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
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSpecificAcademicDepartment,
  updateAcademicDepartment,
};
