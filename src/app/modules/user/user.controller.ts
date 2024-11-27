import { studentValidationSchema } from '../student/student.validation';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  const student = req.body;
  // data validation using joi
  const { error, value } = studentValidationSchema.validate(student, {
    abortEarly: false,
  });

  if (error) {
    console.log(error);
    res.status(500).json({
      message: 'Schema validation failed',
      error: error.details.map((err) => err.message),
    });
  }
  try {
    const result = await UserServices.createStudentIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'User inserted into the database successfully.',
      data: result,
    });
  } catch (error: any) {
    // console.log(error);
    console.log('Some error happened');
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
export const UserControllers = { createStudent };
