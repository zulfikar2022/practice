import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: Partial<TSemesterRegistration>,
) => {
  // Check if the semester is already registered
  const academicSemester = payload.academicSemester;
  const isSemesterRegistrationExists =
    (await SemesterRegistration.find({ academicSemester })).length > 0
      ? true
      : false;

  if (isSemesterRegistrationExists) {
    throw new Error('This semester is already registered');
  }
  try {
    const result = await SemesterRegistration.create(payload);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const getAllSemesterRegistrationsFromDB = async () => {
  try {
    const result =
      await SemesterRegistration.find().populate('academicSemester');
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  try {
    const result = await SemesterRegistration.findById(id);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const updateSemesterRegistrationInDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  try {
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
};
