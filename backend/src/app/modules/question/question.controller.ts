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
import { IQuestion } from './question.interface';
import { QuestionService } from './question.service';

function generateUniqueFileName(originalFileName: string) {
  const fileExtension = path.extname(originalFileName);
  const randomString = crypto.randomBytes(6).toString('hex'); // Generates a random 12-character hexadecimal string
  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}_${randomString}${fileExtension}`;

  return uniqueFileName;
}

const createQuestion = catchAsync(async (req: Request, res: Response) => {
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

  const result = await QuestionService.CreateQuestion(user, payload);

  sendResponse<IQuestion>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question created successfully',
    data: result,
  });
});

const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionService.GetAllQuestions();

  sendResponse<IQuestion[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Questions retrieved successfully',
    data: result,
  });
});

const getSingleQuestion = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await QuestionService.GetSingleQuestion(id);

  sendResponse<IQuestion>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question retrieved successfully',
    data: result,
  });
});

const getUnapprovedQuestions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await QuestionService.GetUnapprovedQuestions();

    sendResponse<IQuestion[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Question retrieved successfully',
      data: result,
    });
  }
);

const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await QuestionService.UpdateQuestion(id, payload);

  sendResponse<IQuestion>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question updated successfully',
    data: result,
  });
});

const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.QuestionId;
  await QuestionService.DeleteQuestion(id);

  sendResponse<IQuestion>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question deleted successfully',
  });
});

const approvedQuestion = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const id = req.params.id;
  const result = await QuestionService.ApprovedQuestion(user, id);

  sendResponse<IQuestion>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question status updated successfully',
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

export const QuestionController = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  getUnapprovedQuestions,
  updateQuestion,
  deleteQuestion,
  approvedQuestion,
  download,
};
