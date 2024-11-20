import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  StudentData,
  StudentMethods,
  StudentModel,
  UserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Minimum length of firstName is 3'],
      validate: {
        validator: (value: string) => {
          return validator.isAlpha(value);
        },
        message: '{VALUE} is not a string value',
      },
    },
    middleName: {
      type: String,
      trim: true,
      set: (value: String) => value.toUpperCase(),
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

const studentSchema = new Schema<StudentData, StudentModel, StudentMethods>({
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
    trim: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
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
  profileImage: {
    type: String,
    trim: true,
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

studentSchema.methods.isUserExists = async function (email: string) {
  const existingUser = await Student.findOne({ email: email });

  return existingUser;
};

export const Student = model<StudentData, StudentModel>(
  'Student',
  studentSchema,
);
