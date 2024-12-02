import mongoose from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonth,
} from './academicSemester.interface';
import {
  Months,
  SemesterCode,
  SemesterName,
} from './academicSemester.constants';

const academicSemesterSchema = new mongoose.Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: SemesterName,
    required: true,
  },
  code: {
    type: String,
    enum: SemesterCode,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error(
      `Semester ${this.name} already exists in the year ${this.year}`,
    );
  } else {
    next();
  }
});
export const AcademicSemester = mongoose.model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
