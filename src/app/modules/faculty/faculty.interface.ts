import { Types } from 'mongoose';
import { UserName } from '../student/student.interface';

export type Designation =
  | 'lecturer'
  | 'assistant professor'
  | 'associate professor'
  | 'professor';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: UserName;
  designation: Designation;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
