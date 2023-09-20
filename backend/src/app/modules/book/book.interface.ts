import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IFaculty } from '../faculty/faculty.interface';

export type IBook = {
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  description: string;
  image: string;
  pdf?: string;
  status: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  faculty?: Types.ObjectId | IFaculty;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  author?: string;
  publisher?: string;
  publicationDate?: string;
};
