import mongoose from 'mongoose';
import { TCourse, TPreRequisiteCourse } from './course.interface';

const preRequisiteCoursesSchema = new mongoose.Schema<TPreRequisiteCourse>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
  },
  { versionKey: false },
);

export const Course = mongoose.model<TCourse>('Course', courseSchema);
