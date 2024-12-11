import express from 'express';
import { facultyController } from './faculty.controller';

const router = express.Router();
router.get('/', facultyController.getAllFaculty);
router.get('/:facultyId', facultyController.getSpecificFaculty);
router.patch('/:facultyId', facultyController.updateFaculty);
router.delete('/:facultyId', facultyController.deleteFaculty);

export const facultyRouter = router;
