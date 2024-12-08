import { Error } from 'mongoose';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';

const getAllFacultyFromDB = async () => {
  try {
    const faculties = await Faculty.find();
    return faculties;
  } catch (error) {
    throw error;
  }
};

const getSpecificFacultyFromDB = async (facultyId: string) => {
  try {
    const faculty = await Faculty.find({ id: facultyId });
    return faculty;
  } catch (error) {
    throw error;
  }
};

const updateFacultyInDB = async (
  facultyId: string,
  faculty: Partial<TFaculty>,
) => {
  try {
    const { name, ...remainingFacultyData } = faculty;
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingFacultyData,
    };
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }

    const updatedFaculty = await Faculty.updateOne(
      { _id: facultyId },
      modifiedUpdatedData,
      {
        new: true,
      },
    );
    return updatedFaculty;
  } catch (error) {
    throw error;
  }
};

export const facultyServices = {
  getAllFacultyFromDB,
  getSpecificFacultyFromDB,
  updateFacultyInDB,
};
