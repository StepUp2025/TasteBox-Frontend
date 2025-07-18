import { AxiosError } from 'axios';

export interface CustomErrorResponse {
  statusCode: number;
  message: string;
  error: ErrorCode;
  timestamp?: string;
}

export interface CustomValidationErrorResponse {
  statusCode: 400;
  message: Record<string, string[]>;
  error: ErrorCode.VALIDATION_ERROR;
  timestamp?: string;
}

export function isValidationError(
  error: AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
): error is AxiosError<CustomValidationErrorResponse> {
  return error.response?.data?.error === ErrorCode.VALIDATION_ERROR;
}

export enum ErrorCode {
  DUPLICATE_NICKNAME = 'DUPLICATE_NICKNAME',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  ALREADY_REGISTERED_ACCOUNT = 'ALREADY_REGISTERED_ACCOUNT',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  OAUTH_ACCOUNT_LOGIN = 'OAUTH_ACCOUNT_LOGIN',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
  OAUTH_ACCOUNT_PASSWORD_CHANGE = 'OAUTH_ACCOUNT_PASSWORD_CHANGE',
  INVALID_CURRENT_PASSWORD = 'INVALID_CURRENT_PASSWORD',
  UNIQUE_NICKNAME_GENERATION_FAILED = 'UNIQUE_NICKNAME_GENERATION_FAILED',
  INVALID_GENRE_ID = 'INVALID_GENRE_ID',
  INVALID_CONTENT_TYPE_KEY = 'INVALID_CONTENT_TYPE_KEY',
  CONTENT_NOT_FOUND = 'CONTENT_NOT_FOUND',
  TMDB_API_ERROR = 'TMDB_API_ERROR',
  INVALID_PAGE = 'INVALID_PAGE',
  S3_UPLOAD_FAIL = 'S3_UPLOAD_FAIL',
  S3_DELETE_FAIL = 'S3_DELETE_FAIL',
  COLLECTION_CREATE_FAILED = 'COLLECTION_CREATE_FAILED',
  COLLECTION_DELETE_FAILED = 'COLLECTION_DELETE_FAILED',
  COLLECTION_NOT_FOUND = 'COLLECTION_NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  UnauthorizedException = 'UnauthorizedException',
}
