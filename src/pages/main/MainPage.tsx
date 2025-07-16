import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useLatestContents } from 'features/contents/hooks/latest/useLatestContents';
import { useMoviesByGenre } from 'features/contents/hooks/movie/useGetMoviesByGenre';
import { usePopularMovies } from 'features/contents/hooks/movie/useGetPopularMovies';
import { usePopularTVs } from 'features/contents/hooks/tvs/useGetPopularTVs';
import { useTVsByGenre } from 'features/contents/hooks/tvs/useGetTVsByGenre';
import ContentsListViewer from 'features/contents/ui/ContentsList/ContentListViewer';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export default function MainPage() {
  const [searchParams] = useSearchParams();
  const genreIdsParam = searchParams.get('genreIds');
  const parsedGenreIds = genreIdsParam
    ? genreIdsParam.split(',').map(Number)
    : [];
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const { data: latestContentsData } = useLatestContents(18);
  const latestContents = latestContentsData?.contents || [];

  const { data: popularMoviesData } = usePopularMovies(1, 18);
  const popularMovies = popularMoviesData?.contents || [];

  const { data: popularTVsData } = usePopularTVs(1, 18);
  const popularTVs = popularTVsData?.contents || [];

  const { data: genreMoviesData } = useMoviesByGenre(parsedGenreIds, 1, 18);
  const genreMovies = genreMoviesData?.contents || [];

  const { data: genreTVsData } = useTVsByGenre(parsedGenreIds, 1, 18);
  const genreTVs = genreTVsData?.contents || [];

  return (
    <>
      {isLoggedIn ? (
        <MaintWrapper>
          <ContentsListViewer
            title="최근 추가한 컨텐츠"
            contents={latestContents}
            type="scroll"
          />
          <ContentsListViewer
            title="추천 영화"
            contents={genreMovies}
            type="link"
            linkTo="movie"
          />
          <ContentsListViewer
            title="추천 TV시리즈"
            contents={genreTVs}
            type="link"
            linkTo="tv"
          />
        </MaintWrapper>
      ) : (
        <MaintWrapper>
          <ContentsListViewer
            title="인기 영화"
            contents={popularMovies}
            type="link"
            linkTo="movie"
          />
          <ContentsListViewer
            title="인기 TV시리즈"
            contents={popularTVs}
            type="link"
            linkTo="tv"
          />
        </MaintWrapper>
      )}
    </>
  );
}

const MaintWrapper = styled.div`
`;
