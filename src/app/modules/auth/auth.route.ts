import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordValidationSchema),
  auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
  AuthControllers.changePassword,
);

router.get(
  '/activate/:userId/:token',
  // auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
  AuthControllers.activateAccount,
);

export const authRoute = router;
