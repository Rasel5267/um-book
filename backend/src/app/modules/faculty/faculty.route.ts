import express from 'express';
import { FacultyController } from './faculty.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.ADMIN),
  FacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FacultyController.deleteFaculty
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  FacultyController.getAllFaculties
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  FacultyController.getSingleFaculty
);

export const FacultyRoutes = router;
