import { Request, Response } from 'express';
import {
  createStudentIntoDB,
  getAllStudents,
  getStudentById,
} from './student.service';
import { Schema, Types } from 'mongoose';
import { studentValidationSchema } from './student.validation';

// creating a schema validation using joi

export const createStudent = async (req: Request, res: Response) => {
  const student = req.body;
  // data validation using joi
  const { error, value } = studentValidationSchema.validate(student, {
    abortEarly: false,
  });

  if (error) {
    console.log(error);
    res
      .json({
        message: 'Schema validation failed',
        error: error.details.map((err) => err.message),
      })
      .status(500);
  }
  try {
    const result = await createStudentIntoDB(value);
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

export const getStudent = async (req: Request, res: Response) => {
  const id: Schema.Types.ObjectId = new Types.ObjectId(
    req.params.id,
  ) as unknown as Schema.Types.ObjectId;

  try {
    const student = await getStudentById(id);
    res.status(200).json({
      message: 'Student data got successfully',
      data: student,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      message: error?.message || 'some error ocurred',
    });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({
      message: 'All students got successfully',
      data: students,
    });
  } catch (error: any) {
    res.json(error?.message);
  }
};
