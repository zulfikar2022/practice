import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constants';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  try {
    const result = await Course.create(payload);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  try {
    const courseQuery = new QueryBuilder(Course.find({}), query)
      .search(courseSearchableFields)
      .filter()
      .sort()
      .paginate();
    const result = await courseQuery.modelQuery;
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
