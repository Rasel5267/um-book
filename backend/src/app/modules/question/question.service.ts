/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { UploadedFile } from 'express-fileupload';
import { deleteFile } from '../../../shared/deleteFile';
import path from 'path';
import { IQuestion } from './question.interface';
import { Question } from './question.model';

const CreateQuestion = async (
  user: JwtPayload,
  payload: IQuestion & { pdfFile: UploadedFile; imageFile: UploadedFile }
): Promise<IQuestion> => {
  const isFacultyExist = await Faculty.findOne({ id: user.userId });
  if (!isFacultyExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // Insert other Question data into the database
  payload.faculty = isFacultyExist._id;
  const result = await Question.create(payload);

  return result;
};

const GetAllQuestions = async (): Promise<IQuestion[]> => {
  const result = await Question.find()
    .populate('academicDepartment')
    .populate('faculty');

  const approvedQuestions = result.filter(
    Question => Question.status === 'approved'
  );

  return approvedQuestions;
};

const GetSingleQuestion = async (id: string): Promise<IQuestion | null> => {
  const result = await Question.findById(id)
    .populate('academicDepartment')
    .populate('faculty');

  return result;
};

const GetUnapprovedQuestions = async (): Promise<IQuestion[] | null> => {
  const result = await Question.find({})
    .populate('academicDepartment')
    .populate('faculty');

  const unApprovedQuestions: IQuestion[] = result.filter(
    Question => Question.status === 'pending'
  );

  return unApprovedQuestions;
};

const UpdateQuestion = async (
  id: string,
  payload: Partial<IQuestion>
): Promise<IQuestion | null> => {
  const isQuestionExist = await Question.findById(id);
  if (!isQuestionExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  const result = await Question.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const DeleteQuestion = async (id: string): Promise<void> => {
  const question = await Question.findById(id);

  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  const pdfFile = question.pdf;
  const imageFile = question.image;

  const dir = path.join(process.cwd(), 'uploads/pdf');
  const imgDir = path.join(process.cwd(), 'uploads/images');

  await deleteFile(`${dir}/${pdfFile}`);

  await deleteFile(`${imgDir}/${imageFile}`);

  await Question.findByIdAndDelete(id);
};

const ApprovedQuestion = async (
  user: JwtPayload,
  id: string
): Promise<IQuestion> => {
  if (user.role !== 'admin') {
    throw new ApiError(httpStatus.NOT_FOUND, 'You are not authorize');
  }
  const isQuestionExist = await Question.findById(id);

  if (!isQuestionExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  // Update the status of the Question to "approved"
  isQuestionExist.status = 'approved';

  // Save the updated Question
  const updatedQuestion = await isQuestionExist.save();

  return updatedQuestion;
};

export const QuestionService = {
  CreateQuestion,
  GetAllQuestions,
  GetSingleQuestion,
  GetUnapprovedQuestions,
  UpdateQuestion,
  DeleteQuestion,
  ApprovedQuestion,
};
