import { HttpResponse } from 'msw';

export const createSuccessResponse = (message?: string, data?: unknown) => {
  if (data !== undefined && data !== null) {
    return HttpResponse.json(data);
  }

  return HttpResponse.json(message ?? '');
};

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
