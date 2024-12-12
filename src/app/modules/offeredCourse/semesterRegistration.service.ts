import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  try {
    const result = await OfferedCourse.create(payload);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
