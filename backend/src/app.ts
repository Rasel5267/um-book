import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routers from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app: Application = express();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

app.use('/images', express.static('uploads/images'));

app.use('/api/v1/', routers);

// global error handler
app.use(globalErrorHandler);

// handle not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
