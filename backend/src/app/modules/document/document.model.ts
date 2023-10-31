import { DocumentModel, IDocument } from './document.interface';
import { Schema, model } from 'mongoose';

const documentSchema = new Schema<IDocument>(
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

export const Document = model<IDocument, DocumentModel>(
  'Document',
  documentSchema
);
