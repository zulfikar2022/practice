import { Types } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

export const hasTimeConflict = async (
  semesterRegistration: Types.ObjectId,
  payload: Partial<TOfferedCourse>,
): Promise<boolean> => {
  console.log('inside hasTimeConflict');
  const days = payload.days as string[];
  const startTime = payload.startTime as string;
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
  let indicator = false;
  assignedSchedules.forEach((schedule) => {
    schedule.days.forEach((day) => {
      if (!indicator) {
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
              indicator = true;
            }
          }
        }
      }
    });
  });

  return indicator;
};
