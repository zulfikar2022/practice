import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  try {
    const { semesterRegistration } = payload;
    const academicSemester =
      await SemesterRegistration.findById(semesterRegistration);

    if (!academicSemester) {
      throw new Error('Academic semester not found');
    }
    payload.academicSemester = academicSemester.academicSemester;
    const { startTime, endTime } = payload;

    const startTimeHour = parseInt(startTime.split(':')[0]);
    const startTimeMinute = parseInt(startTime.split(':')[1]);
    const endTimeHour = parseInt(endTime.split(':')[0]);
    const endTimeMinute = parseInt(endTime.split(':')[1]);
    if (
      startTimeHour > endTimeHour ||
      (startTimeHour === endTimeHour && startTimeMinute >= endTimeMinute)
    ) {
      throw new Error('Start time cannot be greater than or equal to end time');
    }

    const { academicDepartment, academicFaculty } = payload;
    const academicDepartmentData =
      await AcademicDepartment.findById(academicDepartment);

    if (
      academicDepartmentData?.academicFaculty.toString() !==
      academicFaculty.toString()
    ) {
      throw new Error(
        `Academic Department does not belong to the Academic Faculty`,
      );
    }

    const result = await OfferedCourse.create(payload);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
