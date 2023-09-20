/* eslint-disable @typescript-eslint/no-explicit-any */
// deleteFile.ts
import fs from 'fs';
import { ApiError } from '../errors/ApiError';
import httpStatus from 'http-status';

export function deleteFile(fileName: any) {
  const deleteCallback = (err: any) => {
    if (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Error deleting image file'
      );
    }
  };

  if (fs.existsSync(fileName)) {
    fs.unlink(fileName, deleteCallback);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'File does not exist');
  }
}
