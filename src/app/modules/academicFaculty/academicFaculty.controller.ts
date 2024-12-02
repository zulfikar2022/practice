import { catchAsync } from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const academicFaculty =
    await academicFacultyServices.createAcademicFacultyIntoDB(req.body);
  res.status(201).json({
    status: 'Academic faculty created successfully',
    data: academicFaculty,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const academicFaculties =
    await academicFacultyServices.getAllAcademicFacultyFromDB();
  res.status(200).json({
    status: 'All academic faculties fetched successfully',
    data: academicFaculties,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const academicFaculty =
    await academicFacultyServices.getSingleAcademicFacultyFromDB(req.params.id);
  res.status(200).json({
    status: 'Academic faculty fetched successfully',
    data: academicFaculty,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const updatedAcademicFaculty =
    await academicFacultyServices.updateAcademicFacultyIntoDB(
      req.params.id,
      req.body,
    );
  res.status(200).json({
    status: 'Academic faculty updated successfully',
    data: updatedAcademicFaculty,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
