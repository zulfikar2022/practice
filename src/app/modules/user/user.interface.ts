export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type NewUser = {
  password: string;
  role: 'admin' | 'student' | 'faculty';
  id: string;
};
