import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { student, password } = req.body;
  console.log('inside controller');
  console.log(req.body);
  // data validation using jod

  // UserValidation.userValidationSchema.parse(student);

  const result = await UserServices.createStudentIntoDB(password, student);
  res.status(200).json({
    success: true,
    message: 'User inserted into the database successfully.',
    data: result,
  });
});
export const UserControllers = { createStudent };
