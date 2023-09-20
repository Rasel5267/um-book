import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.createAcademicSemester
);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.updateAcademicSemester
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.deleteAcademicSemester
);

router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);

router.get('/', AcademicSemesterController.getAllAcademicSemester);

export const AcademicSemesterRoute = router;
