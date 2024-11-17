export type Guardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNumber: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContactNumber: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type StudentData = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth?: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
