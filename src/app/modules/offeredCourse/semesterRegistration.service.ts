import { Types } from 'mongoose';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import {
  hasTimeConflictWhileCreating,
  hasTimeConflictWhileUpdating,
} from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  try {
    const {
      semesterRegistration,
      days,
      startTime,
      endTime,
      academicDepartment,
      academicFaculty,
    } = payload;

    const academicSemester =
      await SemesterRegistration.findById(semesterRegistration);

    if (!academicSemester) {
      throw new Error('Academic semester not found');
    }
    payload.academicSemester = academicSemester.academicSemester;

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

    // check if the same offered course and same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
      await OfferedCourse.findOne({
        semesterRegistration,
        course: payload.course,
        section: payload.section,
      });

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
      throw new Error(
        `Same course with same section already exists in the same semester`,
      );
    }

    // time conflict resolve with the same faculty
    if (await hasTimeConflictWhileCreating(payload)) {
      throw new Error('Time conflict with the same faculty');
    }

    const result = await OfferedCourse.create(payload);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<
    Pick<
      TOfferedCourse,
      'faculty' | 'days' | 'maxCapacity' | 'startTime' | 'endTime'
    >
  >,
) => {
  try {
    const semesterRegistration = await OfferedCourse.findById(id).select(
      'semesterRegistration faculty -_id',
    );
    if (!semesterRegistration) {
      throw new Error('Offered course not found');
    }
    if (
      await hasTimeConflictWhileUpdating(
        id,
        semesterRegistration.semesterRegistration.toString(),
        payload,
      )
    ) {
      throw new Error('Time conflict with the same faculty');
    }
    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};
