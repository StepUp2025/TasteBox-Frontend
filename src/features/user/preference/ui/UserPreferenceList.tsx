import { Button, ErrorBox, Title } from 'shared/ui';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import { useUserPreference } from '../hooks/useGetUserPreference';

const UserPreferenceList = () => {
  const { data, isLoading } = useUserPreference();

  if (isLoading) return <Loading />;
  if (!data) return <ErrorBox errorMessage="취향을 불러오지 못했습니다" />;

  const { movie, tv } = data;

  if (movie.count === 0 && tv.count === 0) {
    return (
      <UserPreferenceListStyle>
        <Empty text="취향을 설정하지 않았습니다." height="50vh" />
      </UserPreferenceListStyle>
    );
  }

  return (
    <UserPreferenceListStyle>
      <Title size="small" color="thirdText" className="header">
        영화
      </Title>
      <div className="genre-buttons">
        {movie.genres.map((genre) => (
          <Button
            buttonSize="genre"
            fontSize="small"
            scheme="genreActive"
            borderRadius="round"
            disableHoverOverlay={true}
            key={genre.id}
          >
            {genre.name} <span className="emoji">{genre.emoji}</span>
          </Button>
        ))}
      </div>

      <Title size="small" color="thirdText" className="header">
        TV 시리즈
      </Title>
      <div className="genre-buttons">
        {tv.genres.map((genre) => (
          <Button
            buttonSize="genre"
            fontSize="small"
            scheme="genreActive"
            borderRadius="round"
            disableHoverOverlay={true}
            key={genre.id}
          >
            {genre.name} <span className="emoji">{genre.emoji}</span>
          </Button>
        ))}
      </div>
    </UserPreferenceListStyle>
  );
};

const UserPreferenceListStyle = styled.div`
  .genre-buttons {
    display: flex;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 24px;
    width: 100%;
    max-width: 800px;
    
  }

  .emoji {
    display: inline-block;
    margin-right: none;
    margin-left: 4px;
  }

  .empty-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default UserPreferenceList;
