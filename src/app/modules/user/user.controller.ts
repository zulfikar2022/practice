import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {
  const { student, password } = req.body;

  const result = await UserServices.createStudentIntoDB(password, student);
  res.status(200).json({
    success: true,
    message: 'User inserted into the database successfully.',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { faculty, password } = req.body;
  console.log('inside the createFaculty controller');
  const result = await UserServices.createFacultyIntoDB(password, faculty);
  res.status(200).json({
    success: true,
    message: 'User inserted into the database successfully.',
    data: result,
  });
});
export const UserControllers = { createStudent, createFaculty };
