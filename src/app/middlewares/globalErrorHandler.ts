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
// TASK: HAVE TO MAKE AN ERROR HANDLER THAT CAN HANDLE ZOD ERROR
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

let errorSources: TErrorSource = [
  {
    path: '',
    message: 'Something went wrong',
  },
];

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  let errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    success: false,
    statusCode,
    message: 'Validation Error',
    errorSources,
    stack: config.node_env === 'development' ? err.stack : null,
  };
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let simplifiedError = {
    success: false,
    statusCode,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err.stack : null,
  };

  if (err instanceof ZodError) {
    simplifiedError = handleZodError(err);
    res.status(simplifiedError.statusCode).json(simplifiedError);
  }

  res.status(statusCode).json(simplifiedError);
};
