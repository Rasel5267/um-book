import express from 'express';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middleware/validateRequest';
import { DocumentValidation } from './document.validation';
import { DocumentController } from './document.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(DocumentValidation.create),
  auth(ENUM_USER_ROLE.FACULTY),
  DocumentController.createDocument
);

router.post(
  '/status/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DocumentController.approvedDocument
);

router.patch(
  '/:id',
  validateRequest(DocumentValidation.update),
  auth(ENUM_USER_ROLE.FACULTY),
  DocumentController.updateDocument
);

router.delete(
  '/:DocumentId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  DocumentController.deleteDocument
);

router.get('/download-pdf/:filename', DocumentController.download);

router.get('/unapproved', DocumentController.getUnapprovedDocuments);

router.get('/:id', DocumentController.getSingleDocument);

router.get('/', DocumentController.getAllDocuments);

export const DocumentRoutes = router;
