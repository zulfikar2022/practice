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

export const OfferedCourseControllers = {
  createOfferedCourse,
};
