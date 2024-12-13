import { ObjectId } from 'mongoose';
import { catchAsync } from '../../utils/catchAsync';
import { OfferedCourseService } from './semesterRegistration.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);
  res.status(201).json({
    success: true,
    data: {
      result,
    },
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.updateOfferedCourseIntoDB(
    id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Offered course updated successfully',
    data: {
      result,
    },
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
};
