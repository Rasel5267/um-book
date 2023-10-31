import express from 'express';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middleware/validateRequest';
import { QuestionValidation } from './question.validation';
import { QuestionController } from './question.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(QuestionValidation.create),
  auth(ENUM_USER_ROLE.FACULTY),
  QuestionController.createQuestion
);

router.post(
  '/status/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  QuestionController.approvedQuestion
);

router.patch(
  '/:id',
  validateRequest(QuestionValidation.update),
  auth(ENUM_USER_ROLE.FACULTY),
  QuestionController.updateQuestion
);

router.delete(
  '/:QuestionId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  QuestionController.deleteQuestion
);

router.get('/download-pdf/:filename', QuestionController.download);

router.get('/unapproved', QuestionController.getUnapprovedQuestions);

router.get('/:id', QuestionController.getSingleQuestion);

router.get('/', QuestionController.getAllQuestions);

export const QuestionRoutes = router;
