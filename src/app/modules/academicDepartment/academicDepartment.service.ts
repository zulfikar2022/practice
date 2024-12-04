import { AppError } from '../../errors/AppError';
import { TAcadmicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcadmicDepartment) => {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: payload.name,
  });
  if (isDepartmentExist) {
    throw new Error('This department already exists');
  }
  return await AcademicDepartment.create(payload);
};

const getAllAcademicDepartmentsFromDB = async () => {
  return await AcademicDepartment.find().populate('academicFaculty');
};
const getSpecificAcademicDepartmentFromDB = async (id: string) => {
  return await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty',
  );
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: TAcadmicDepartment,
) => {
  const isDepartmentExists = await AcademicDepartment.findOne({ _id: id });
  if (!isDepartmentExists) {
    throw new AppError(404, 'Department does not exist');
  }
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
