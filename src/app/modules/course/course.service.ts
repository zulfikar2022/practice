import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constants';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../errors/AppError';

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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );
    if (!updateBasicCourseInfo) {
      throw new Error("Failed to update course's basic information");
    }
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

      newPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrerequisites } },
        },
        { new: true, session },
      );
      if (!newPrerequisiteCourses) {
        throw new Error("Failed to update course's prerequisite courses");
      }

      deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrerequisites } },
          },
        },
        { new: true, session },
      );
      if (!deletedPrerequisiteCourses) {
        throw new Error("Failed to delete course's prerequisite courses");
      }
    }
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error((error as Error).message);
  }
};

const assignFacultiesWithCourseIntoDB = async (
  courseID: mongoose.Types.ObjectId,
  payload: Partial<TCourseFaculty>,
) => {
  try {
    let result = await CourseFaculty.findByIdAndUpdate(
      courseID,
      { $addToSet: { faculties: { $each: payload } } },
      {
        new: true,
        upsert: true,
      },
    );
    result.course = courseID;
    result = await result.save();
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
  assignFacultiesWithCourseIntoDB,
};
