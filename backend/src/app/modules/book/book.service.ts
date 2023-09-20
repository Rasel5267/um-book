/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { ApiError } from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { bookSearchableFields } from './book.constant';
import { UploadedFile } from 'express-fileupload';
import { deleteFile } from '../../../shared/deleteFile';
import path from 'path';

const CreateBook = async (
  user: JwtPayload,
  payload: IBook & { pdfFile: UploadedFile }
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

const GetAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        const query = {
          [field]: {
            $regex: new RegExp(`^${value}$`, 'i'), // 'i' flag for case-insensitive
          },
        };
        return query;
      }),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .populate('academicDepartment')
    .populate('faculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const approvedBooks = result.filter(book => book.status === 'approved');

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: approvedBooks,
  };
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

  const dir = path.join(process.cwd(), 'uploads');

  await deleteFile(`${dir}/${pdfFile}`);

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
