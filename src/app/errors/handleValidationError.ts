import mongoose from 'mongoose';
import { TErrorSource } from '../interface/error';
import config from '../config';

export const handleValidationError = (
  error: mongoose.Error.ValidationError,
) => {
  let statusCode = 400;
  let message = error.message || 'Validation Error';
  let errorSources: TErrorSource = [];
  for (const key in error.errors) {
    errorSources.push({
      path: key,
      message: error.errors[key].message,
    });
  }

  return {
    success: false,
    statusCode,
    message,
    errorSources,
    stack: config.node_env === 'development' ? error.stack : null,
  };
};
