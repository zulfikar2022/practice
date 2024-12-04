import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { student, password } = req.body;

  const result = await UserServices.createStudentIntoDB(password, student);
  res.status(200).json({
    success: true,
    message: 'User inserted into the database successfully.',
    data: result,
  });
});
export const UserControllers = { createStudent };
