import { ObjectId, Types } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

export const hasTimeConflictWhileCreating = async (
  payload: TOfferedCourse,
): Promise<boolean> => {
  const { faculty, semesterRegistration, days } = payload;
  let indicator = false;

  const sameFacultySameSemester = await OfferedCourse.findOne({
    semesterRegistration,
    faculty,
  });
  if (sameFacultySameSemester) {
    const startTime = new Date(
      `1970-01-01T${sameFacultySameSemester.startTime}`,
    );
    const endTime = new Date(`1970-01-01T${sameFacultySameSemester.endTime}`);

    const newStartTime = new Date(`1970-01-01T${payload.startTime}`);
    const newEndTime = new Date(`1970-01-01T${payload.endTime}`);
    days.forEach((day) => {
      if (
        sameFacultySameSemester.days.includes(day) &&
        ((newStartTime >= startTime && newStartTime <= endTime) ||
          (newEndTime >= startTime && newEndTime <= endTime))
      ) {
        indicator = true;
      }
    });
  }

  return indicator;
};

export const hasTimeConflictWhileUpdating = async (
  id: string,
  semesterRegistration: string,
  payload: Partial<
    Pick<
      TOfferedCourse,
      'faculty' | 'days' | 'maxCapacity' | 'startTime' | 'endTime'
    >
  >,
): Promise<boolean> => {
  const { faculty, days, startTime, endTime } = payload;
  const sameFacultySameSemester = await OfferedCourse.find({
    faculty,
    semesterRegistration,
  });
  if (sameFacultySameSemester.length === 0) {
    return false;
  }

  const offeredCourse: TOfferedCourse = sameFacultySameSemester?.find(
    (element) => {
      return element._id.toString() === id;
    },
  ) as TOfferedCourse;

  if (!offeredCourse.days.some((element) => days?.includes(element))) {
    return false;
  }

  let indicator = false;
  const startTimeDate = new Date(`1970-01-01T${offeredCourse.startTime}`);
  const endTimeDate = new Date(`1970-01-01T${offeredCourse.endTime}`);
  for (let i = 0; days && days instanceof Array && i < days.length; i++) {
    if (offeredCourse.days.includes(days[i])) {
      if (startTime && !endTime) {
        let newStartTime = new Date(`1970-01-01T${startTime}`);
        return newStartTime >= startTimeDate && newStartTime <= endTimeDate;
      } else if (!startTime && endTime) {
        let newEndTime = new Date(`1970-01-01T${endTime}`);
        return newEndTime >= startTimeDate && newEndTime <= endTimeDate;
      } else if (startTime && endTime) {
        let newStartTime = new Date(`1970-01-01T${startTime}`);
        let newEndTime = new Date(`1970-01-01T${endTime}`);
        return (
          (newStartTime >= startTimeDate && newStartTime <= endTimeDate) ||
          (newEndTime >= startTimeDate && newEndTime <= endTimeDate)
        );
      } else if (!startTime && !endTime) {
        return false;
      }
    }
  }
  if (startTime && !endTime) {
    let newStartTime = new Date(`1970-01-01T${startTime}`);
    return newStartTime >= startTimeDate && newStartTime <= endTimeDate;
  } else if (!startTime && endTime) {
    let newEndTime = new Date(`1970-01-01T${endTime}`);
    return newEndTime >= startTimeDate && newEndTime <= endTimeDate;
  } else if (startTime && endTime) {
    let newStartTime = new Date(`1970-01-01T${startTime}`);
    let newEndTime = new Date(`1970-01-01T${endTime}`);
    return (
      (newStartTime >= startTimeDate && newStartTime <= endTimeDate) ||
      (newEndTime >= startTimeDate && newEndTime <= endTimeDate)
    );
  }
  return false;
};
