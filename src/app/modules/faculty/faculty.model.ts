import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { userNameSchema } from '../student/student.model';

const faculty = new mongoose.Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: userNameSchema,
    designation: {
      type: String,
      required: true,
      enum: {
        values: [
          'lecturer',
          'assistant professor',
          'associate professor',
          'professor',
        ],
        message: 'Invalid designation',
      },
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Invalid gender',
      },
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Faculty = mongoose.model<TFaculty>('Faculty', faculty);
