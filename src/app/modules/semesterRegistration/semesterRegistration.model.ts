import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { semesterRegistrationStatus } from './semesterRegistration.constants';
import { TSemesterRegistration } from './semesterRegistration.interface';
import mongoose from 'mongoose';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      validate: {
        validator: async function (value) {
          const academicSemester = await AcademicSemester.findById(value);
          return !!academicSemester;
        },
        message: 'Academic semester does not exist with id {VALUE}',
      },
      unique: true,
    },
    status: {
      type: String,
      enum: {
        values: semesterRegistrationStatus,
        message: 'Invalid status',
      },
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
