import mongoose, { Schema } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { Days } from './offeredCourse.constants';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
      validate: {
        validator: async function (value: string) {
          const semesterRegistration =
            await SemesterRegistration.findById(value);
          return !!semesterRegistration;
        },
        message: 'Semester Registration does not exist',
      },
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      validate: {
        validator: async function (value: string) {
          const academicSemester = await AcademicSemester.findById(value);
          return !!academicSemester;
        },
        message: 'Academic Semester does not exist',
      },
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
      validate: {
        validator: async function (value: string) {
          const academicFaculty = await AcademicFaculty.findById(value);
          return !!academicFaculty;
        },
        message: 'Academic Faculty does not exist',
      },
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
      validate: {
        validator: async function (value: string) {
          const academicDepartment = await AcademicDepartment.findById(value);
          return !!academicDepartment;
        },
        message: 'Academic Department does not exist',
      },
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      validate: {
        validator: async function (value: string) {
          const course = await Course.findById(value);
          return !!course;
        },
        message: 'Course does not exist',
      },
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
      validate: {
        validator: async function (value: string) {
          const faculty = await Faculty.findById(value);
          return !!faculty;
        },
        message: 'Faculty does not exist',
      },
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: {
      type: String,
      enum: Days,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OfferedCourse = mongoose.model(
  'OfferedCourse',
  offeredCourseSchema,
);
