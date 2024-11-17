import express, { Request, Response } from 'express';
import { createStudent } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', createStudent);
