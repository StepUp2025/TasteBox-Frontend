import axios from 'axios';
import { ContentType } from 'entities/contents/model/types/contents.type';
import { CustomErrorResponse } from 'shared/types/CustomErrorResponse';
import { Button, ErrorBox } from 'shared/ui';
import Loading from 'shared/ui/Loading/Loading';
import { toast } from 'sonner';
import { useGetMovieGenres } from '../hooks/useGetMovieGenres';
import { useGetTVSeriesGenres } from '../hooks/useGetTVSeriesGenres';
import { GenreButton } from '../style/GenreSelectPage.style';

interface Props {
  type: ContentType;
  selectedIds: number[];
  onSelect: (updated: number[]) => void;
}

export const GenreSelector = ({ type, selectedIds, onSelect }: Props) => {
  const movieGenresQuery = useGetMovieGenres();
  const tvGenresQuery = useGetTVSeriesGenres();

  const genres =
    type === 'movie'
      ? movieGenresQuery.data?.genres
      : tvGenresQuery.data?.genres;

  const isError =
    type === 'movie' ? movieGenresQuery.isError : tvGenresQuery.isError;

  const error = type === 'movie' ? movieGenresQuery.error : tvGenresQuery.error;

  if (isError && axios.isAxiosError(error)) {
    const res = error.response?.data as CustomErrorResponse;

    switch (res?.error) {
      case 'CONTENT_NOT_FOUND':
        return (
          <ErrorBox
            statusCode={400}
            errorMessage="장르 정보를 불러오는 중 문제가 발생했어요."
          />
        );
      case 'TMDB_API_ERROR':
        return (
          <ErrorBox
            statusCode={500}
            errorMessage="장르 정보를 불러오는 중 문제가 발생했어요."
          />
        );
      default:
        toast.error(
          res?.message ?? '문제가 발생했어요. 잠시 후 다시 시도해주세요.',
        );
    }
  }

  const isLoading =
    type === 'movie' ? movieGenresQuery.isLoading : tvGenresQuery.isLoading;

  if (isLoading) return <Loading />;

  const toggleGenre = (id: number) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((g) => g !== id)
      : [...selectedIds, id];
    onSelect(updated);
  };

  return (
    <GenreButton>
      {genres?.map((genre) => {
        const isSelected = selectedIds.includes(genre.id);
        return (
          <Button
            key={genre.id}
            scheme={isSelected ? 'genreActive' : 'genre'}
            buttonSize="genre"
            fontSize="small"
            borderRadius="round"
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name} {genre.emoji}
          </Button>
        );
      })}
    </GenreButton>
  );
};
