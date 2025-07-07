import { useNavigate } from 'react-router-dom';
import popcorn from 'shared/assets/images/popcorn-fall.png';
import Button from '../Button/Button';
import {
  ErrorTitle,
  Image,
  Message,
  StatusText,
  Wrapper,
} from './ErrorBox.style';

interface ErrorBoxProps {
  statusCode?: number;
  errorMessage?: string;
}

export const ErrorBox = ({ statusCode, errorMessage }: ErrorBoxProps) => {
  const navigate = useNavigate();

  const getTitle = () => {
    if (statusCode === 404) return '404 Not Found';
    if (statusCode === 500) return '500 Server Error';
    return 'Error';
  };

  const getDefaultMessage = () => {
    if (statusCode === 404)
      return '페이지를 찾을 수 없어요.\n 주소가 잘못되었거나 삭제되었을 수 있어요.';
    if (statusCode === 500)
      return '서버에 문제가 발생했어요.\n 잠시 후 다시 시도해주세요.';
    return '문제가 발생했어요. 다시 시도해주세요.';
  };

  return (
    <Wrapper>
      <div>
        <ErrorTitle>Oops!</ErrorTitle>
        <StatusText>{getTitle()}</StatusText>
        <Message>{errorMessage || getDefaultMessage()}</Message>

        <Button
          buttonSize="small"
          fontSize="small"
          scheme="primary"
          borderRadius="medium"
          onClick={() => navigate(-1)}
        >
          이전 페이지로
        </Button>
      </div>
      <Image src={popcorn} alt="엎어진 팝콘" />
    </Wrapper>
  );
};
