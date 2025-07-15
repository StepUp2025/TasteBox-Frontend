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
  return (
    <UserPreferenceListStyle>
      <Title size="small" color="thirdText" className="header">
        영화
      </Title>
      <div className="genre-buttons">
        {movie.genres.length === 0 ? (
          <Empty text="영화 취향이 없습니다" />
        ) : (
          movie.genres.map((genre) => (
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
          ))
        )}
      </div>

      <Title size="small" color="thirdText" className="header">
        TV 시리즈
      </Title>
      <div className="genre-buttons">
        {tv.genres.length === 0 ? (
          <Empty text="TV 시리즈 취향이 없습니다" />
        ) : (
          tv.genres.map((genre) => (
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
          ))
        )}
      </div>
    </UserPreferenceListStyle>
  );
};

const UserPreferenceListStyle = styled.div`
.genre-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 24px;
    width: 800px;
  }
  .emoji {
    display: inline-block;
    margin-right: none;
    margin-left: 4px;
    
  }
`;

export default UserPreferenceList;
