import express from 'express';
import { facultyController } from './faculty.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.get('/', auth(USER_ROLE.ADMIN), facultyController.getAllFaculty);
router.get('/:facultyId', facultyController.getSpecificFaculty);
router.patch('/:facultyId', facultyController.updateFaculty);
router.delete('/:facultyId', facultyController.deleteFaculty);

export const facultyRouter = router;
