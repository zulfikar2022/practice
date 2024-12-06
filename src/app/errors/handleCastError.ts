import mongoose from 'mongoose';
import { TErrorResponse, TErrorSource } from '../interface/error';
import config from '../config';

export const handleCastErrorDB = (
  err: mongoose.Error.CastError,
): TErrorResponse => {
  const message = err.message;
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message,
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
