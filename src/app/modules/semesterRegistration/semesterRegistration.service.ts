import { RegistrationStatus } from './semesterRegistration.constants';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: Partial<TSemesterRegistration>,
) => {
  if (!payload?.status) {
    payload.status = RegistrationStatus.UPCOMING; // Set the default status to 'UPCOMING'
  }
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
      status: {
        $in: [RegistrationStatus.UPCOMING, RegistrationStatus.ONGOING],
      },
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
      registeredSemester?.status === RegistrationStatus.UPCOMING &&
      payload?.status === RegistrationStatus.ENDED
    ) {
      throw new Error('Cannot End an Upcoming semester');
    } else if (
      registeredSemester?.status === RegistrationStatus.ONGOING &&
      payload?.status === RegistrationStatus.UPCOMING
    ) {
      throw new Error(
        `Cannot make an ${registeredSemester.status} semester ${payload.status}`,
      );
    } else if (registeredSemester?.status === RegistrationStatus.ENDED) {
      throw new Error(`Cannot update an ${registeredSemester.status} semester`);
    }

    if (!registeredSemester) {
      throw new Error('Semester registration not found');
    }

    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
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
