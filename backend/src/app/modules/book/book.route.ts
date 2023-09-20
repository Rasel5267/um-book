import express from 'express';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookController } from './book.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(BookValidation.create),
  auth(ENUM_USER_ROLE.FACULTY),
  BookController.createBook
);

router.post(
  '/status/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.approvedBook
);

router.patch(
  '/:id',
  validateRequest(BookValidation.update),
  auth(ENUM_USER_ROLE.FACULTY),
  BookController.updateBook
);

router.delete(
  '/:bookId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  BookController.deleteBook
);

router.get('/download-pdf/:filename', BookController.download);

router.get('/unapproved', BookController.getUnapprovedBooks);

router.get('/:id', BookController.getSingleBook);

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
