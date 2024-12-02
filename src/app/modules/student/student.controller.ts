import { NextFunction, Request, RequestHandler, Response } from 'express';

import { Schema, Types } from 'mongoose';
import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsync';

// creating a schema validation using joi

const getStudent = catchAsync(async (req, res) => {
  const id: Schema.Types.ObjectId = new Types.ObjectId(
    req.params.id,
  ) as unknown as Schema.Types.ObjectId;

  const student = await StudentServices.getStudentById(id);
  res.status(200).json({
    message: 'Student data got successfully',
    data: student,
  });
});

const getStudents = catchAsync(async (req, res) => {
  const students = await StudentServices.getAllStudents();
  res.status(200).json({
    message: 'All students got successfully',
    data: students,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await StudentServices.deleteFromDB(id);
  res.status(200).json({
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getStudent,
  getStudents,
  deleteStudent,
};
