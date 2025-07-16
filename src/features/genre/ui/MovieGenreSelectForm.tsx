// MovieGenreForm.tsx

import { useUserPreference } from 'features/user/preference/hooks/useGetUserPreference';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui';
import { toast } from 'sonner';
import { ButtonWrapper, GenreSelectForm } from '../style/GenreSelectPage.style';
import { GenreSelector } from './GenreSelector';

export const MovieGenreSelectForm = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>(() => {
    const saved = sessionStorage.getItem('selectedMovieGenres');
    return saved ? JSON.parse(saved) : [];
  });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  const { data: preferenceData } = useUserPreference();

  useEffect(() => {
    const saved = sessionStorage.getItem('selectedMovieGenres');
    const hasSaved = saved && JSON.parse(saved).length > 0;
    if (!preferenceData || hasSaved) return;

    const genres = preferenceData.movie.genres.map((g) => g.id);
    setSelectedGenres(genres);
    sessionStorage.setItem('selectedMovieGenres', JSON.stringify(genres));
  }, [preferenceData]);

  useEffect(() => {
    sessionStorage.setItem(
      'selectedMovieGenres',
      JSON.stringify(selectedGenres),
    );
  }, [selectedGenres]);

  const handleNext = () => {
    if (selectedGenres.length === 0) {
      toast.error('영화 장르를 최소 1개 이상 선택해주세요.');
      return;
    }

    navigate('/genre/tv', {
      state: {
        from,
      },
    });
  };

  return (
    <GenreSelectForm>
      <GenreSelector
        type="movie"
        selectedIds={selectedGenres}
        onSelect={setSelectedGenres}
      />

      <ButtonWrapper>
        <Button
          onClick={handleNext}
          fontSize="small"
          disabled={selectedGenres.length === 0}
          scheme="primary"
          buttonSize="medium"
          borderRadius="round"
        >
          다음
        </Button>
      </ButtonWrapper>
    </GenreSelectForm>
  );
};
