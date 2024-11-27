import { Request, Response } from 'express';

import { Schema, Types } from 'mongoose';
import { StudentServices } from './student.service';

// creating a schema validation using joi

const getStudent = async (req: Request, res: Response) => {
  const id: Schema.Types.ObjectId = new Types.ObjectId(
    req.params.id,
  ) as unknown as Schema.Types.ObjectId;

  try {
    const student = await StudentServices.getStudentById(id);
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

const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentServices.getAllStudents();
    res.status(200).json({
      message: 'All students got successfully',
      data: students,
    });
  } catch (error: any) {
    res.json(error?.message);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await StudentServices.deleteFromDB(id);
    res.status(200).json({
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || 'some error ocurred',
    });
  }
};

export const StudentControllers = {
  getStudent,
  getStudents,
  deleteStudent,
};
