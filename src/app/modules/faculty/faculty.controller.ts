import { Request, Response } from 'express';
import { facultyServices } from './faculty.service';
import { catchAsync } from '../../utils/catchAsync';

const getAllFaculty = async (req: Request, res: Response) => {
  try {
    const faculties = await facultyServices.getAllFacultyFromDB();
    res.status(200).send({ message: 'All faculties', data: faculties });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Internal server error', data: error, success: false });
  }
};

const getSpecificFaculty = async (req: Request, res: Response) => {
  try {
    const facultyId = req.params.facultyId;
    const faculty = await facultyServices.getSpecificFacultyFromDB(facultyId);
    res.status(200).send({ message: 'Faculty', data: faculty, success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Internal server error', data: error, success: false });
  }
};

const updateFaculty = async (req: Request, res: Response) => {
  try {
    const facultyId = req.params.facultyId;
    const faculty = await facultyServices.updateFacultyInDB(
      facultyId,
      req.body,
    );
    res
      .status(200)
      .send({ message: 'Faculty updated', data: faculty, success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Internal server error', data: error, success: false });
  }
};

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyId = req.params.facultyId;
  const result = await facultyServices.deleteFacultyFromDB(facultyId);
  res.status(200).send({
    message: 'Faculty deleted successfully',
    data: result,
    success: true,
  });
});

export const facultyController = {
  getAllFaculty,
  getSpecificFaculty,
  updateFaculty,
  deleteFaculty,
};
