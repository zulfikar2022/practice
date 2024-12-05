// Error patter
/*
    success
    message
    errorSource: [
        path:'',
        message:'',
    ]
    stack(for development environment only)
*/

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
type TErrorSource = {
  path: string | number;
  message: string;
}[];

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'I am a Zod Error';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};
