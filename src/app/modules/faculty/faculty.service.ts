import mongoose, { Error } from 'mongoose';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';
import { User } from '../user/user.model';

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
    const faculty = await Faculty.find({ _id: facultyId });
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

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // first update the 'faculties' collection
    const updatingAtFaculty = await Faculty.findByIdAndUpdate(
      id,
      {
        $set: { isDeleted: true },
      },
      { new: true },
    );
    if (!updatingAtFaculty) {
      throw new Error('Deleting faculty failed');
    }
    const userId = updatingAtFaculty.user;

    const updatingAtUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true },
    );
    if (!updatingAtUser) {
      throw new Error('Deleting faculty failed');
    }
    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new Error((error as Error).message);
  }
};

export const facultyServices = {
  getAllFacultyFromDB,
  getSpecificFacultyFromDB,
  updateFacultyInDB,
  deleteFacultyFromDB,
};
