import express from 'express';
import { facultyController } from './faculty.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();
router.get('/', auth, facultyController.getAllFaculty);
router.get('/:facultyId', facultyController.getSpecificFaculty);
router.patch('/:facultyId', facultyController.updateFaculty);
router.delete('/:facultyId', facultyController.deleteFaculty);

export const facultyRouter = router;
