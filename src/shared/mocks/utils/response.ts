import { HttpResponse } from 'msw';

export const createSuccessResponse = (
  message: string,
  data: unknown = null,
  status = 200,
) =>
  HttpResponse.json(
    {
      statusCode: status,
      message,
      ...(data !== null ? { data } : {}),
      timestamp: new Date().toISOString(),
    },
    { status },
  );

export const createErrorResponse = (
  status: number,
  message: string,
  errorCode: string,
) =>
  HttpResponse.json(
    {
      statusCode: status,
      message,
      error: errorCode,
      timestamp: new Date().toISOString(),
    },
    { status },
  );
