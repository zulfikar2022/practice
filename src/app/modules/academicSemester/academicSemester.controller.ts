import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );

    res.json({
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });
  },
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemestersFromDB();
    res.json({
      success: true,
      message: 'All academic semesters are here',
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
};
