import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorResponse } from '../interface/error';

export const handleZodError = (err: ZodError): TErrorResponse => {
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
    stack: config.node_env === 'development' ? (err.stack ?? null) : null,
  };
};
