import { ObjectId, Types } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

export const hasTimeConflict = async (
  semesterRegistration: Types.ObjectId,
  payload: Partial<TOfferedCourse>,
  offeredCourseId?: string,
): Promise<boolean> => {
  let days: string[] = [];
  let startTime: string;
  let indicator = false;
  let assignedSchedules;

  if (offeredCourseId) {
    // this portion will be executed while updating the data
    assignedSchedules = await OfferedCourse.find(
      {
        semesterRegistration,
        _id:
          payload?.faculty ||
          (await OfferedCourse.findById(offeredCourseId).select('faculty')),
      },
      {
        startTime: 1,
        endTime: 1,
        days: 1,
      },
    );
  } else {
    // this portion will be executed while creating the data
    assignedSchedules = await OfferedCourse.find(
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
    days = payload.days as string[];
    startTime = payload.startTime as string;
  }
  if (assignedSchedules.length === 0) {
    throw new Error('No assigned schedules found');
  }

  assignedSchedules.forEach((schedule) => {
    schedule.days.forEach((day) => {
      if (!indicator) {
        if (days?.includes(day)) {
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
              indicator = true;
            }
          }
        }
      }
    });
  });

  return indicator;
};
