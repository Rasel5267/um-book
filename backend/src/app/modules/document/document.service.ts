/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { UploadedFile } from 'express-fileupload';
import { deleteFile } from '../../../shared/deleteFile';
import path from 'path';
import { IDocument } from './document.interface';
import { Document } from './document.model';

const CreateDocument = async (
  user: JwtPayload,
  payload: IDocument & { pdfFile: UploadedFile; imageFile: UploadedFile }
): Promise<IDocument> => {
  const isFacultyExist = await Faculty.findOne({ id: user.userId });
  if (!isFacultyExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // Insert other Document data into the database
  payload.faculty = isFacultyExist._id;
  const result = await Document.create(payload);

  return result;
};

const GetAllDocuments = async (): Promise<IDocument[]> => {
  const result = await Document.find()
    .populate('academicDepartment')
    .populate('faculty');

  const approvedDocuments = result.filter(
    document => document.status === 'approved'
  );

  return approvedDocuments;
};

const GetSingleDocument = async (id: string): Promise<IDocument | null> => {
  const result = await Document.findById(id)
    .populate('academicDepartment')
    .populate('faculty');

  return result;
};

const GetUnapprovedDocuments = async (): Promise<IDocument[] | null> => {
  const result = await Document.find({})
    .populate('academicDepartment')
    .populate('faculty');

  const unApprovedDocuments: IDocument[] = result.filter(
    Document => Document.status === 'pending'
  );

  return unApprovedDocuments;
};

const UpdateDocument = async (
  id: string,
  payload: Partial<IDocument>
): Promise<IDocument | null> => {
  const isDocumentExist = await Document.findById(id);
  if (!isDocumentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }

  const result = await Document.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const DeleteDocument = async (id: string): Promise<void> => {
  const document = await Document.findById(id);

  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }

  const pdfFile = document.pdf;
  const imageFile = document.image;

  const dir = path.join(process.cwd(), 'uploads/pdf');
  const imgDir = path.join(process.cwd(), 'uploads/images');

  await deleteFile(`${dir}/${pdfFile}`);

  await deleteFile(`${imgDir}/${imageFile}`);

  await Document.findByIdAndDelete(id);
};

const ApprovedDocument = async (
  user: JwtPayload,
  id: string
): Promise<IDocument> => {
  if (user.role !== 'admin') {
    throw new ApiError(httpStatus.NOT_FOUND, 'You are not authorize');
  }
  const isDocumentExist = await Document.findById(id);

  if (!isDocumentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }

  // Update the status of the Document to "approved"
  isDocumentExist.status = 'approved';

  // Save the updated Document
  const updatedDocument = await isDocumentExist.save();

  return updatedDocument;
};

export const DocumentService = {
  CreateDocument,
  GetAllDocuments,
  GetSingleDocument,
  GetUnapprovedDocuments,
  UpdateDocument,
  DeleteDocument,
  ApprovedDocument,
};
