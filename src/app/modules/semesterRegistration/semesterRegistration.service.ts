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

  // Check if there's already an upcoming or ongoing semester registration
  const isUpcomingOrOngoingSemesterExists =
    (await SemesterRegistration.find({
      status: { $in: ['UPCOMING', 'ONGOING'] },
    }).countDocuments()) > 0;

  if (isUpcomingOrOngoingSemesterExists) {
    throw new Error(
      `There's already an ${payload.status} semester registered.`,
    );
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
    const registeredSemester = await SemesterRegistration.findById(id); // Get the registered semester
    if (
      registeredSemester?.status === 'UPCOMING' &&
      payload?.status === 'ENDED'
    ) {
      throw new Error('Cannot end an upcoming semester');
    } else if (
      registeredSemester?.status === 'ONGOING' &&
      payload?.status === 'UPCOMING'
    ) {
      throw new Error(
        `Cannot make an ${registeredSemester.status} semester ${payload.status}`,
      );
    } else if (registeredSemester?.status === 'ENDED') {
      throw new Error(`Cannot update an ${registeredSemester.status} semester`);
    }

    if (!registeredSemester) {
      throw new Error('Semester registration not found');
    }

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
