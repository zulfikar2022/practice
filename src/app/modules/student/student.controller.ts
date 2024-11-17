import { Request, Response } from 'express';
import { createStudentIntoDB, getStudentById } from './student.service';
import mongoose, { ObjectId, Schema, Types } from 'mongoose';

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