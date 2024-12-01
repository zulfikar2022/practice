import { NextFunction, Request, RequestHandler, Response } from 'express';

import { Schema, Types } from 'mongoose';
import { StudentServices } from './student.service';

// creating a schema validation using joi

const getStudent: RequestHandler = async (req, res, next) => {
  const id: Schema.Types.ObjectId = new Types.ObjectId(
    req.params.id,
  ) as unknown as Schema.Types.ObjectId;

  try {
    const student = await StudentServices.getStudentById(id);
    res.status(200).json({
      message: 'Student data got successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const getStudents: RequestHandler = async (req, res, next) => {
  try {
    const students = await StudentServices.getAllStudents();
    res.status(200).json({
      message: 'All students got successfully',
      data: students,
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteStudent: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await StudentServices.deleteFromDB(id);
    res.status(200).json({
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const StudentControllers = {
  getStudent,
  getStudents,
  deleteStudent,
};
