import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // create semester registration
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );
    res.status(201).json({
      success: true,
      message: 'Semester registration created successfully',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Semester registration fetched successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await SemesterRegistrationService.updateSemesterRegistrationInDB(
        id,
        req.body,
      );
    res.status(200).json({
      success: true,
      message: 'Semester registration updated successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB();
    res.status(200).json({
      success: true,
      message: 'Semester registrations fetched successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistrations,
};
