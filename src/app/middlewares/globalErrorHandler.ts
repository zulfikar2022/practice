import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse, TErrorSource } from '../interface/error';
import config from '../config';
import mongoose, { Error as MongooseError } from 'mongoose';
import { handleZodError } from '../errors/handleZodError';
import { handleValidationError } from '../errors/handleValidationError';
import { handleCastErrorDB } from '../errors/handleCastError';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import { AppError } from '../errors/AppError';
const { ValidationError } = MongooseError;

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  let simplifiedError = {
    success: false,
    statusCode,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err.stack : null,
  };

  if (err instanceof ZodError) {
    simplifiedError = handleZodError(err);
  } else if (err instanceof ValidationError) {
    simplifiedError = handleValidationError(err);
  } else if (err instanceof mongoose.Error.CastError) {
    simplifiedError = handleCastErrorDB(err);
  } else if (err.code === 11000) {
    simplifiedError = handleDuplicateError(err);
  } else if (err instanceof Error) {
    simplifiedError = {
      success: false,
      statusCode,
      message,
      errorSources: [
        {
          path: '',
          message: err.message,
        },
      ],
      stack: config.node_env === 'development' ? (err.stack ?? null) : null,
    };
  } else if (err instanceof AppError) {
    simplifiedError = {
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errorSources: [
        {
          path: '',
          message: err.message,
        },
      ],
      stack: config.node_env === 'development' ? (err.stack ?? null) : null,
    };
  }

  res.status(simplifiedError.statusCode).json(simplifiedError);
};
