import mongoose from 'mongoose';
import { catchAsync } from '../../utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;
  const course = await CourseServices.createCourseIntoDB(courseData);
  res.status(201).json({
    success: true,
    data: course,
    message: 'Course is created successfully!',
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const courses = await CourseServices.getAllCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    data: courses,
    message: 'All courses are retrieved successfully!',
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = await CourseServices.getSingleCourseFromDB(id);
  res.status(200).json({
    success: true,
    data: course,
    message: 'Course is retrieved successfully!',
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = await CourseServices.deleteCourseFromDB(id);
  res.status(200).json({
    success: true,
    data: course,
    message: 'Course is deleted successfully!',
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    data: result,
    statusCode: 200,
    message: 'Course is updated successfully!',
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseID } = req.params;
  const { faculties } = req.body;
  try {
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      new mongoose.Types.ObjectId(courseID),
      faculties,
    );
    res.status(200).json({
      success: true,
      data: result,
      message: 'Faculties are assigned with course successfully!',
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseID } = req.params;
  const { faculties } = req.body;
  try {
    const result = await CourseServices.removeFacultiesFromCourseIntoDB(
      new mongoose.Types.ObjectId(courseID),
      faculties,
    );
    res.status(200).json({
      success: true,
      data: result,
      message: 'Faculties are removed from course successfully!',
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
