import { Types } from 'mongoose';

export type TAcadmicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};
