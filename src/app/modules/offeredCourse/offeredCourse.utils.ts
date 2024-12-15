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
  payload: Partial<TOfferedCourse>,
): Promise<boolean> => {
  let indicator = false;
  const { faculty, days } = payload;
  const sameFacultySameSemester = await OfferedCourse.find({
    faculty,
    semesterRegistration,
  });
  if (sameFacultySameSemester.length === 0) {
    return indicator;
  }

  return indicator;
};
