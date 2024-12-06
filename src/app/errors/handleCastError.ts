import mongoose from 'mongoose';
import { TErrorResponse, TErrorSource } from '../interface/error';
import config from '../config';

export const handleCastErrorDB = (
  err: mongoose.Error.CastError,
): TErrorResponse => {
  const message = `Invalid ${err.path}: ${err.value._id}`;
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    success: false,
    statusCode: 400,
    message,
    errorSources: errorSource,
    stack: config.node_env === 'development' ? (err.stack ?? null) : null,
  };
};
