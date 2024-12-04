import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  UserName,
} from './student.interface';
import { z } from 'zod';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

const userNameSchema = new Schema<UserName>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Minimum length of firstName is 3'],
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);
const guardianSchema = new Schema<Guardian>(
  {
    fathersName: {
      type: String,
      require: true,
      trim: true,
    },
    fathersOccupation: {
      type: String,
      required: true,
      trim: true,
    },
    fathersContactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    mothersName: {
      type: String,
      required: true,
      trim: true,
    },
    mothersOccupation: {
      type: String,
      required: true,
      trim: true,
    },
    mothersContactNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const localGuardianSchema = new Schema<LocalGuardian>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent>({
  name: {
    type: userNameSchema,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "Gender can be one of the following: 'male','female' or 'other'",
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        const { success } = z.string().email().safeParse(value);
        return success;
      },
      message: '{VALUE} is not a valid email',
    },
  },
  dateOfBirth: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  emergencyContactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: '{VALUE} is not defined',
    },
  },
  presentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    validate: {
      validator: async function (value: string) {
        const academicSemester = await AcademicSemester.findById(value);
        return academicSemester ? true : false;
      },
      message: 'Admission semester does not exist',
    },
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    validate: {
      validator: async function (value: string) {
        const academicDepartment = await AcademicDepartment.findById(value);
        return academicDepartment ? true : false;
      },
      message: 'Academic Department does not exist',
    },
  },
  profileImage: {
    type: String,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.methods.isUserExists = async function (email: string) {
  const existingUser = await Student.findOne({ email: email });

  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
