import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  const { student, password } = req.body;
  // data validation using jod
  try {
    // UserValidation.userValidationSchema.parse(student);
    const result = await UserServices.createStudentIntoDB(password, student);
    res.status(200).json({
      success: true,
      message: 'User inserted into the database successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const UserControllers = { createStudent };
