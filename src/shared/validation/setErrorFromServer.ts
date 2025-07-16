import { AxiosError } from 'axios';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import {
  CustomErrorResponse,
  CustomValidationErrorResponse,
} from 'shared/types/CustomErrorResponse';

export function setErrorFromServer<T extends FieldValues>(
  error: AxiosError<CustomErrorResponse | CustomValidationErrorResponse>,
  setError: UseFormSetError<T>,
) {
  const messages = error.response?.data.message;
  if (!messages) return;

  Object.entries(messages).forEach(([field, messages]) => {
    const message = messages[0];
    setError(field as Path<T>, {
      type: 'server',
      message,
    });
  });
}
