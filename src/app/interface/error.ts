export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
  stack: string | null;
};
