import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  StudentData,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
const guardianSchema = new Schema<Guardian>(
  {
    fathersName: {
      type: String,
      require: true,
    },
    fathersOccupation: {
      type: String,
      required: true,
    },
    fathersContactNumber: {
      type: String,
      required: true,
    },
    mothersName: {
      type: String,
      required: true,
    },
    mothersOccupation: {
      type: String,
      required: true,
    },
    mothersContactNumber: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const localGuardianSchema = new Schema<LocalGuardian>(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const studentSchema = new Schema<StudentData>({
  name: {
    type: userNameSchema,
    required: true,
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
  },
  dateOfBirth: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emergencyContactNumber: {
    type: String,
    required: true,
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
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a defined activity status',
    },
    default: 'active',
  },
});

export const Student = model<StudentData>('Student', studentSchema);
