import config from '../config';
import { TErrorResponse, TErrorSource } from '../interface/error';

export const handleDuplicateError = (error: any): TErrorResponse => {
  const duplicateKey = Object.keys(error.keyValue)[0];
  const message = `\"${error.keyValue[duplicateKey]}\" already exists. Please use another name.`;
  const errorSource: TErrorSource = [
    {
      path: duplicateKey,
      message: message,
    },
  ];

  return {
    success: false,
    statusCode: 400,
    message,
    errorSources: errorSource,
    stack: config.node_env === 'development' ? (error.stack ?? null) : null,
  };
};
