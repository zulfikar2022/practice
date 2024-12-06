import { Schema, Types } from 'mongoose';
import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsync';

// creating a schema validation using joi

const getStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const student = await StudentServices.getStudentById(id);
  res.status(200).json({
    message: 'Student data got successfully',
    data: student,
  });
});

const getStudents = catchAsync(async (req, res) => {
  const students = await StudentServices.getAllStudents(
    req.query as Record<string, string>,
  );
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

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const student = req.body;

  const result = await StudentServices.updateStudentIntoDB(id, student);
  res.status(200).json({
    message: 'Student updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
};
