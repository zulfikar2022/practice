import { Schema, model, connect } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'inactive';
};
