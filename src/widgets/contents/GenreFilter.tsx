import { GenreEmoji } from 'entities/genre';
import { ButtonScheme } from 'shared/types/theme';
import { Button } from 'shared/ui';
import styled from 'styled-components';

interface Props {
  genreList: GenreEmoji[];
  selectedGenreIds: number[];
  onToggle: (id: number) => void;
}

const GenreFilter = ({ genreList, selectedGenreIds, onToggle }: Props) => {
  return (
    <GenreFilterStyle>
      {genreList.map((genre) => (
        <GenreButton
          buttonSize="genre"
          fontSize="small"
          scheme="genreActive"
          borderRadius="round"
          key={genre.id}
          $active={selectedGenreIds.includes(genre.id)}
          onClick={() => onToggle(genre.id)}
        >
          {genre.name} <span className="emoji">{genre.emoji}</span>
        </GenreButton>
      ))}
    </GenreFilterStyle>
  );
};

const GenreFilterStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
  max-width: 100%;
`;

const GenreButton = styled(Button)<{ $active: boolean; scheme: ButtonScheme }>`

  && {background-color: ${({ $active, theme, scheme }) =>
    $active
      ? theme.buttonScheme[scheme].backgroundColor
      : theme.buttonScheme.genre.backgroundColor};
  color: ${({ $active, theme, scheme }) => ($active ? theme.buttonScheme[scheme].color : theme.buttonScheme.genre.color)};
}

  cursor: pointer;
  transition: background-color 0.2s ease;
`;

export default GenreFilter;
