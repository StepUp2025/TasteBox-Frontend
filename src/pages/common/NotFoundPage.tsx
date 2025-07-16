import { ErrorBox } from 'shared/ui';

export default function NotFoundPage() {
  return <ErrorBox statusCode={404} />;
}
