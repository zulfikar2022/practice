import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserPermissionToService(req.body);
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  // const result = await AuthServices.changePasswordPermissionToService(req.body);
  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
    data: null,
  });
});
const activateAccount = catchAsync(async (req: Request, res: Response) => {
  try {
    const { userId, token } = req.params;
    await AuthServices.activateAccountService(userId, token);
    res.send('<h1>Your account is activated successfully.</h1>');
  } catch (error) {
    throw error;
  }
});

export const AuthControllers = {
  loginUser,
  changePassword,
  activateAccount,
};
