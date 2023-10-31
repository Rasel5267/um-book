import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IFaculty } from '../faculty/faculty.interface';

export type IDocument = {
  title: string;
  author: string;
  image: string;
  pdf?: string;
  status: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  faculty?: Types.ObjectId | IFaculty;
};

export type DocumentModel = Model<IDocument, Record<string, unknown>>;
