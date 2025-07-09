import { Button, Title } from 'shared/ui';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import { useUserPreference } from '../hooks/useGetUserPreference';

const UserPreferenceList = () => {
  const { data, isLoading } = useUserPreference();
  if (isLoading) return <Loading />;
  if (!data)
    return (
      <Empty
        text="취향을 선택해주세요"
        linkText="취향 선택하기"
        linkTo="/genre/movie"
        state={{ from: '/mypage' }}
      />
    );
  const { movies, tvs } = data;
  return (
    <UserPreferenceListStyle>
      <Title size="small" color="thirdText" className="header">
        영화
      </Title>
      <div className="genre-buttons">
        {movies.genres.length === 0 ? (
          <Empty text="영화 취향이 없습니다" />
        ) : (
          movies.genres.map((genre) => (
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
        {tvs.genres.length === 0 ? (
          <Empty text="TV 시리즈 취향이 없습니다" />
        ) : (
          tvs.genres.map((genre) => (
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
