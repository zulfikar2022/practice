import { Request, Response } from 'express';
import { createStudentIntoDB } from './student.service';

export const createStudent = async (req: Request, res: Response) => {
  const student = req.body;
  try {
    const result = await createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: 'User inserted into the database successfully.',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
