/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { IBook } from './book.interface';
import { Book } from './book.model';
import { ApiError } from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { UploadedFile } from 'express-fileupload';
import { deleteFile } from '../../../shared/deleteFile';
import path from 'path';

const CreateBook = async (
  user: JwtPayload,
  payload: IBook & { pdfFile: UploadedFile; imageFile: UploadedFile }
): Promise<IBook> => {
  const isFacultyExist = await Faculty.findOne({ id: user.userId });
  if (!isFacultyExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // Insert other book data into the database
  payload.faculty = isFacultyExist._id;
  const result = await Book.create(payload);

  return result;
};

const GetAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find()
    .populate('academicDepartment')
    .populate('faculty');

  const approvedBooks = result.filter(book => book.status === 'approved');

  return approvedBooks;
};

const GetSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id)
    .populate('academicDepartment')
    .populate('faculty');

  return result;
};

const GetUnapprovedBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find({})
    .populate('academicDepartment')
    .populate('faculty');

  const unApprovedBooks: IBook[] = result.filter(
    book => book.status === 'pending'
  );

  return unApprovedBooks;
};

const UpdateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const DeleteBook = async (id: string): Promise<void> => {
  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const pdfFile = book.pdf;
  const imageFile = book.image;

  const dir = path.join(process.cwd(), 'uploads/pdf');
  const imgDir = path.join(process.cwd(), 'uploads/images');

  await deleteFile(`${dir}/${pdfFile}`);

  await deleteFile(`${imgDir}/${imageFile}`);

  await Book.findByIdAndDelete(id);
};

const ApprovedBook = async (user: JwtPayload, id: string): Promise<IBook> => {
  if (user.role !== 'admin') {
    throw new ApiError(httpStatus.NOT_FOUND, 'You are not authorize');
  }
  const isBookExist = await Book.findById(id);

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  // Update the status of the book to "approved"
  isBookExist.status = 'approved';

  // Save the updated book
  const updatedBook = await isBookExist.save();

  return updatedBook;
};

export const BookService = {
  CreateBook,
  GetAllBooks,
  GetSingleBook,
  GetUnapprovedBooks,
  UpdateBook,
  DeleteBook,
  ApprovedBook,
};
