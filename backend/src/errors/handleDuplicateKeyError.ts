import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';

const handleDuplicateKeyError = (
  error: mongoose.MongooseError
): IGenericErrorResponse => {
  if (error.message === 'duplicate key error') {
    const statusCode = 400;
    const message = 'Duplicate key error';
    const errorMessages = [
      {
        path: '',
        message: 'Duplicate key error',
      },
    ];
    return {
      statusCode,
      message,
      errorMessages,
    };
  } else {
    throw error;
  }
};

export default handleDuplicateKeyError;