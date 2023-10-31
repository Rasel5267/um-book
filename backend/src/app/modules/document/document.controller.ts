/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import { catchAsync } from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../../../errors/ApiError';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import crypto from 'crypto';
import { IDocument } from './document.interface';
import { DocumentService } from './document.service';

function generateUniqueFileName(originalFileName: string) {
  const fileExtension = path.extname(originalFileName);
  const randomString = crypto.randomBytes(6).toString('hex'); // Generates a random 12-character hexadecimal string
  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}_${randomString}${fileExtension}`;

  return uniqueFileName;
}

const createDocument = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const payload = req.body;

  // Check if files were uploaded
  if (!req.files) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No files were uploaded.');
  }
  const pdfFile = req.files.pdf as UploadedFile;
  const imageFile = req.files.image as UploadedFile;

  // Generate unique file names by appending timestamps
  const pdfFileName = generateUniqueFileName(pdfFile.name);
  const imgFileName = generateUniqueFileName(imageFile.name);

  const dir = path.join(process.cwd(), 'uploads/pdf');
  const imgDir = path.join(process.cwd(), 'uploads/images');

  pdfFile.mv(`${dir}/${pdfFileName}`, (err: any) => {
    if (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Error saving PDF file.'
      );
    }
  });

  imageFile.mv(`${imgDir}/${imgFileName}`, (err: any) => {
    if (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Error saving Image file.'
      );
    }
  });

  // Add the unique file paths to the payload
  payload.pdf = `${pdfFileName}`;
  payload.image = `${imgFileName}`;

  const result = await DocumentService.CreateDocument(user, payload);

  sendResponse<IDocument>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document created successfully',
    data: result,
  });
});

const getAllDocuments = catchAsync(async (req: Request, res: Response) => {
  const result = await DocumentService.GetAllDocuments();

  sendResponse<IDocument[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Documents retrieved successfully',
    data: result,
  });
});

const getSingleDocument = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DocumentService.GetSingleDocument(id);

  sendResponse<IDocument>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document retrieved successfully',
    data: result,
  });
});

const getUnapprovedDocuments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DocumentService.GetUnapprovedDocuments();

    sendResponse<IDocument[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Document retrieved successfully',
      data: result,
    });
  }
);

const updateDocument = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await DocumentService.UpdateDocument(id, payload);

  sendResponse<IDocument>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document updated successfully',
    data: result,
  });
});

const deleteDocument = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.DocumentId;
  await DocumentService.DeleteDocument(id);

  sendResponse<IDocument>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document deleted successfully',
  });
});

const approvedDocument = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const id = req.params.id;
  const result = await DocumentService.ApprovedDocument(user, id);

  sendResponse<IDocument>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document status updated successfully',
    data: result,
  });
});

const download = catchAsync(async (req: Request, res: Response) => {
  const filename = req.params.filename;

  const dir = path.join(process.cwd(), 'uploads/pdf');
  const filePath = path.join(dir, filename);

  res.download(filePath, function (err) {
    if (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  });
});

export const DocumentController = {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  getUnapprovedDocuments,
  updateDocument,
  deleteDocument,
  approvedDocument,
  download,
};
