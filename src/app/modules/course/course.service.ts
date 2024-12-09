import { Course } from './course.model';

const createCourseIntoDB = async () => {
  try {
    const result = await Course.create();
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const getAllCoursesFromDB = async () => {
  try {
    const result = await Course.find({});
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const getSingleCourseFromDB = async (id: string) => {
  try {
    const result = await Course.findById(id);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteCourseFromDB = async (id: string) => {
  try {
    const result = await Course.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
