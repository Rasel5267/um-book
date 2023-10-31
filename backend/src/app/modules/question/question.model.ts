import { QuestionModel, IQuestion } from './question.interface';
import { Schema, model } from 'mongoose';

const questionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Question = model<IQuestion, QuestionModel>(
  'Question',
  questionSchema
);
