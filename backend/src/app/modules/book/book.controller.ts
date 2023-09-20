/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import { catchAsync } from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { bookFilterableFields } from './book.constant';
import { ApiError } from '../../../errors/ApiError';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import crypto from 'crypto';

function generateUniqueFileName(originalFileName: string) {
  const fileExtension = path.extname(originalFileName);
  const randomString = crypto.randomBytes(6).toString('hex'); // Generates a random 12-character hexadecimal string
  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}_${randomString}${fileExtension}`;

  return uniqueFileName;
}

const createBook = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const payload = req.body;

  // Check if files were uploaded
  if (!req.files) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No files were uploaded.');
  }
  const pdfFile = req.files.pdf as UploadedFile;

  // Generate unique file names by appending timestamps
  const pdfFileName = generateUniqueFileName(pdfFile.name);

  const dir = path.join(process.cwd(), 'uploads');

  pdfFile.mv(`${dir}/${pdfFileName}`, (err: any) => {
    if (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Error saving PDF file.'
      );
    }
  });

  // Add the unique file paths to the payload
  payload.pdf = `${pdfFileName}`;

  const result = await BookService.CreateBook(user, payload);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.GetAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.GetSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const getUnapprovedBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.GetUnapprovedBooks();

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await BookService.UpdateBook(id, payload);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookId;
  await BookService.DeleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
  });
});

const approvedBook = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const id = req.params.id;
  const result = await BookService.ApprovedBook(user, id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book status updated successfully',
    data: result,
  });
});

const download = catchAsync(async (req: Request, res: Response) => {
  const filename = req.params.filename;

  const dir = path.join(process.cwd(), 'uploads');
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

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  getUnapprovedBooks,
  updateBook,
  deleteBook,
  approvedBook,
  download,
};
