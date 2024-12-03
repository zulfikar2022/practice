import mongoose from 'mongoose';
import { TAcadmicDepartment } from './academicDepartment.interface';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

const academicDepartmentSchema = new mongoose.Schema<TAcadmicDepartment>({
  name: {
    type: String,
    required: true,
  },
  academicFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
    validator: async function (value: string) {
      const academicFaculty = await AcademicFaculty.findById(value);
      if (!academicFaculty) {
        return false;
      }
      return true;
    },
    message: 'Academic Faculty does not exist',
  },
});

export const AcademicDepartment = mongoose.model<TAcadmicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
