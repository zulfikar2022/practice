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
    const courseQuery = new QueryBuilder(
      Course.find({}).populate('preRequisiteCourses.course'),
      query,
    )
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
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
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

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  // step-1: Basic course info update
  try {
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true },
    );
    let newPrerequisiteCourses;
    let deletedPrerequisiteCourses;
    // check if there is any prerequisite course to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter the deleted fields from the payload
      const deletedPrerequisites = preRequisiteCourses
        .filter((course) => course.isDeleted)
        .map((el) => el.course);

      // filtering out the new course fields
      const newPrerequisites = preRequisiteCourses.filter(
        (course) => !course.isDeleted,
      );
      console.log(newPrerequisites);

      const newPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrerequisites } },
        },
        { new: true },
      );

      deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrerequisites } },
          },
        },
        { new: true },
      );
    }
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
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
  updateCourseIntoDB,
};
