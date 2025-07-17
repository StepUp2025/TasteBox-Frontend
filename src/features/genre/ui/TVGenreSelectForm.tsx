// TvGenreForm.tsx

import { useUserPreference } from 'features/user/preference/hooks/useGetUserPreference';
import { useUpdateUserPreference } from 'features/user/preference/hooks/useUpdateUserPreference';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ErrorBox } from 'shared/ui';
import { toast } from 'sonner';
import { ButtonWrapper, GenreSelectForm } from '../style/GenreSelectPage.style';
import { GenreSelector } from './GenreSelector';

export const TvGenreSelectForm = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>(() => {
    const saved = sessionStorage.getItem('selectedTvGenres');
    return saved ? JSON.parse(saved) : [];
  });

  const { mutate, isPending } = useUpdateUserPreference();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;
  const [errorInfo, setErrorInfo] = useState<{
    status: number;
    message?: string;
  } | null>(null);

  const { data: preferenceData } = useUserPreference();

  useEffect(() => {
    const saved = sessionStorage.getItem('selectedMovieGenres');
    const movieGenres = saved ? JSON.parse(saved) : [];

    if (movieGenres.length === 0) {
      toast.error('영화 장르 선택 후 TV 장르를 진행해주세요.');
      navigate('/genre/movie', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const saved = sessionStorage.getItem('selectedTvGenres');
    const hasSaved = saved && JSON.parse(saved).length > 0;
    if (!preferenceData || hasSaved) return;

    const genres = preferenceData.tv.genres.map((g) => g.id);
    setSelectedGenres(genres);
    sessionStorage.setItem('selectedTvGenres', JSON.stringify(genres));
  }, [preferenceData]);

  useEffect(() => {
    sessionStorage.setItem('selectedTvGenres', JSON.stringify(selectedGenres));
  }, [selectedGenres]);

  const handleSubmit = () => {
    const movieGenreIds = JSON.parse(
      sessionStorage.getItem('selectedMovieGenres') || '[]',
    );

    if (selectedGenres.length === 0) {
      toast.error('TV 시리즈 장르를 최소 1개 이상 선택해주세요.');
      return;
    }

    mutate(
      {
        movie: { genreIds: movieGenreIds },
        tv: { genreIds: selectedGenres },
      },
      {
        onSuccess: () => {
          sessionStorage.removeItem('selectedMovieGenres');
          sessionStorage.removeItem('selectedTvGenres');

          const redirectTo = from === '/login' ? '/' : '/mypage';
          navigate(redirectTo, { replace: true });
        },
        onError: (error) => {
          const res = error.response?.data;

          switch (res?.error) {
            case 'INVALID_GENRE_ID':
              setErrorInfo({
                status: 400,
                message:
                  '장르 정보 요청을 처리할 수 없었어요. 잠시 후 다시 시도해주세요.',
              });
              break;
            case 'USER_NOT_FOUND':
              toast.error('로그인이 필요해요. 다시 로그인해주세요.');
              navigate('/login', { replace: true });
              break;
            case 'INVALID_CONTENT_TYPE_KEY':
              setErrorInfo({
                status: 500,
                message:
                  '장르 정보를 불러오는 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.',
              });
              break;
            default:
              toast.error(
                '알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
              );
          }
        },
      },
    );
  };

  if (errorInfo) {
    return (
      <ErrorBox
        statusCode={errorInfo?.status}
        errorMessage={errorInfo?.message}
      />
    );
  }

  return (
    <GenreSelectForm>
      <GenreSelector
        type="tv"
        selectedIds={selectedGenres}
        onSelect={setSelectedGenres}
      />

      <ButtonWrapper>
        <Button
          onClick={() => navigate('/genre/movie', { state: { from } })}
          fontSize="small"
          scheme="secondary"
          buttonSize="medium"
          borderRadius="round"
        >
          이전
        </Button>
        <Button
          onClick={handleSubmit}
          fontSize="small"
          disabled={isPending || selectedGenres.length === 0}
          scheme="primary"
          buttonSize="medium"
          borderRadius="round"
        >
          제출
        </Button>
      </ButtonWrapper>
    </GenreSelectForm>
  );
};
