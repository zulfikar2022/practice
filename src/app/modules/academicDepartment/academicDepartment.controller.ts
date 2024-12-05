import { catchAsync } from '../../utils/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const academicDepartment =
    await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      academicDepartment,
    },
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const academicDepartments =
    await academicDepartmentService.getAllAcademicDepartmentsFromDB();
  res.status(200).json({
    status: 'success',
    data: {
      academicDepartments,
    },
  });
});

const getSpecificAcademicDepartment = catchAsync(
  async (req, res): Promise<void> => {
    const academicDepartment =
      await academicDepartmentService.getSpecificAcademicDepartmentFromDB(
        req.params.id,
      );
    if (!academicDepartment) {
      res.status(404).json({
        status: 'fail',
        message: 'No academic department found with that ID',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: {
        academicDepartment,
      },
    });
  },
);

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const academicDepartment =
    await academicDepartmentService.updateAcademicDepartmentIntoDB(
      req.params.id,
      req.body,
    );
  res.status(200).json({
    status: 'success',
    data: {
      academicDepartment,
    },
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSpecificAcademicDepartment,
  updateAcademicDepartment,
};
