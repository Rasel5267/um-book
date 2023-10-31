import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IFaculty } from '../faculty/faculty.interface';

export type IQuestion = {
  title: string;
  author: string;
  image: string;
  pdf?: string;
  status: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  faculty?: Types.ObjectId | IFaculty;
};

export type QuestionModel = Model<IQuestion, Record<string, unknown>>;
