import { Request, Response } from 'express';
import { facultyServices } from './faculty.service';
import { get } from 'mongoose';

const getAllFaculty = async (req: Request, res: Response) => {
  try {
    const faculties = await facultyServices.getAllFacultyFromDB();
    res.status(200).send({ message: 'All faculties', data: faculties });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', data: error });
  }
};

const getSpecificFaculty = async (req: Request, res: Response) => {
  try {
    const facultyId = req.params.facultyId;
    const faculty = await facultyServices.getSpecificFacultyFromDB(facultyId);
    res.status(200).send({ message: 'Faculty', data: faculty });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', data: error });
  }
};

const updateFaculty = async (req: Request, res: Response) => {
  try {
    const facultyId = req.params.facultyId;
    const faculty = await facultyServices.updateFacultyInDB(
      facultyId,
      req.body,
    );
    res.status(200).send({ message: 'Faculty updated', data: faculty });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', data: error });
  }
};

const deleteFaculty = async (req: Request, res: Response) => {
  const facultyId = req.params.facultyId;
};

export const facultyController = {
  getAllFaculty,
  getSpecificFaculty,
  updateFaculty,
  deleteFaculty,
};
