import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useLatestContents } from 'features/contents/hooks/latest/useLatestContents';
import { useMovieRecommends } from 'features/contents/hooks/movie/useGetMovieRecommends';
import { usePopularMovies } from 'features/contents/hooks/movie/useGetPopularMovies';
import { usePopularTVs } from 'features/contents/hooks/tvs/useGetPopularTVs';
import { useRecommendsTVs } from 'features/contents/hooks/tvs/useGetRecommendsTVs';
import ContentsListViewer from 'features/contents/ui/ContentsList/ContentListViewer';
import styled from 'styled-components';

export default function MainPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const { data } = useLatestContents(10);
  const latestContents = data?.contents || [];
  const { data: popularMoviesData } = usePopularMovies();
  const popularMovies = popularMoviesData?.contents || [];
  const { data: popularTVsData } = usePopularTVs();
  const popularTVs = popularTVsData?.contents || [];

  const recommendMovieId = 1;
  const recommendTVId = 5;

  const { data: movieRecommendsData } = useMovieRecommends(recommendMovieId);
  const movieRecommends = movieRecommendsData?.contents || [];

  const { data: tvRecommendsData } = useRecommendsTVs(recommendTVId);
  const tvRecommends = tvRecommendsData?.contents || [];

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
            contents={movieRecommends}
            type="link"
            linkTo="movie"
          />
          <ContentsListViewer
            title="추천 TV시리즈"
            contents={tvRecommends}
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
margin-left: 7rem;
  padding-left: 7rem;
`;
