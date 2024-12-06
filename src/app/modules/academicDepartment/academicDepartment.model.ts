import mongoose from 'mongoose';
import { TAcadmicDepartment } from './academicDepartment.interface';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

const academicDepartmentSchema = new mongoose.Schema<TAcadmicDepartment>({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    unique: true,
  },
  academicFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: [true, 'Academic Faculty is required'],
    validate: {
      validator: async function (value: string) {
        const academicFaculty = await AcademicFaculty.findById(value);
        return academicFaculty instanceof AcademicFaculty;
      },
      message: 'Academic Faculty does not exist',
    },
  },
});

// academicDepartmentSchema.pre<TAcadmicDepartment>('save', async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExist) {
//     throw new Error('This department already exists');
//   }
//   next();
// });

export const AcademicDepartment = mongoose.model<TAcadmicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
