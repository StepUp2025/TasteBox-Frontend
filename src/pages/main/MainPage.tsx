import { useAuthStore } from 'entities/auth/model/store/authStore';
import ContentsList from 'features/contents/ui/ContentsList/ContentsList';
import { mockContents } from 'shared/mocks/handlers/contentsHandlers';

export default function MainPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const recentContents = mockContents;
  const recommendedMovies = mockContents.filter(
    (c) => c.contentType === 'movie',
  );
  const recommendedTVs = mockContents.filter((c) => c.contentType === 'tv');
  const popularMovies = mockContents.filter((c) => c.contentType === 'movie');
  const popularTVs = mockContents.filter((c) => c.contentType === 'tv');

  return (
    <>
      {isLoggedIn && (
        <ContentsList
          title="최근 추가한 컨텐츠"
          contents={recentContents}
          type="scroll"
        />
      )}
      {isLoggedIn ? (
        <>
          <ContentsList
            title="추천 영화"
            contents={recommendedMovies}
            type="link"
            linkTo="movie"
          />
          <ContentsList
            title="추천 TV시리즈"
            contents={recommendedTVs}
            type="link"
            linkTo="tv"
          />
        </>
      ) : (
        <>
          <ContentsList
            title="인기 영화"
            contents={popularMovies}
            type="link"
            linkTo="movie"
          />
          <ContentsList
            title="인기 TV시리즈"
            contents={popularTVs}
            type="link"
            linkTo="tv"
          />
        </>
      )}
    </>
  );
}
