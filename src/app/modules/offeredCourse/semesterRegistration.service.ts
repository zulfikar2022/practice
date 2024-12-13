import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

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
    // time conflict resolve
    const assignedSchedules = await OfferedCourse.find(
      {
        semesterRegistration,
        faculty: payload.faculty,
      },
      {
        startTime: 1,
        endTime: 1,
        days: 1,
      },
    );
    console.log(assignedSchedules);
    assignedSchedules.forEach((schedule) => {
      schedule.days.forEach((day) => {
        if (days.includes(day)) {
          const startTimeHour = parseInt(schedule.startTime.split(':')[0]);
          const endTimeHour = parseInt(schedule.endTime.split(':')[0]);
          const endTimeMinute = parseInt(schedule.endTime.split(':')[1]);
          const currentStartTimeHour = parseInt(startTime.split(':')[0]);
          const currentStartTimeMinute = parseInt(startTime.split(':')[1]);

          if (
            currentStartTimeHour >= startTimeHour &&
            currentStartTimeHour <= endTimeHour
          ) {
            if (
              !(
                currentStartTimeHour === endTimeHour &&
                currentStartTimeMinute > endTimeMinute
              )
            ) {
              throw new Error(`Time conflict  occurred.`);
            }
          }
        }
      });
    });
    const result = await OfferedCourse.create(payload);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
