import { Schema, model, connect } from 'mongoose';
import { Student } from './student.interface';

const StudentSchema = new Schema<Student>({
  id: {
    type: String,
    required: true,
  },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    loadClass: { type: String, required: true },
  },
  gender: ['male', 'female'],
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
    type: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
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
  localGuardian: {
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
  profileImage: {
    type: String,
  },
  isActive: ['active', 'blocked'],
});
