import { ContentType } from 'entities/contents/model/types/contents.type';
import { Button } from 'shared/ui';
import Loading from 'shared/ui/Loading/Loading';
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
