import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createAcademicDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.updateAcademicDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoute = router;
