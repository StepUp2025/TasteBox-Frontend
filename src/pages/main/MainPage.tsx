import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useLatestContents } from 'features/contents/hooks/latest/latest';
import { useMovieRecommends } from 'features/contents/hooks/movie/useGetMovieRecommends';
import { usePopularMovies } from 'features/contents/hooks/movie/useGetPopularMovies';
import { usePopularTVs } from 'features/contents/hooks/tvs/useGetPopularTVs';
import { useRecommendsTVs } from 'features/contents/hooks/tvs/useGetRecommendsTVs';
import ContentsList from 'features/contents/ui/ContentsList/ContentsList';

export default function MainPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const { data, isPending } = useLatestContents(10);
  const latestContents = data?.contents || [];
  const { data: popularMoviesData, isPending: popularRecPending } =
    usePopularMovies();
  const popularMovies = popularMoviesData?.contents || [];
  const { data: popularTVsData, isPending: popularTVsPending } =
    usePopularTVs();
  const popularTVs = popularTVsData?.contents || [];

  const recommendMovieId = 1;
  const recommendTVId = 5;

  const { data: movieRecommends, isPending: movieRecPending } =
    useMovieRecommends(recommendMovieId);
  const { data: tvRecommends, isPending: tvRecPending } =
    useRecommendsTVs(recommendTVId);

  return (
    <>
      {isLoggedIn ? (
        <>
          <ContentsList
            title="최근 추가한 컨텐츠"
            contents={isPending ? [] : latestContents}
            type="scroll"
          />
          <ContentsList
            title="추천 영화"
            contents={movieRecPending ? [] : movieRecommends?.contents || []}
            type="link"
            linkTo="movie"
          />
          <ContentsList
            title="추천 TV시리즈"
            contents={tvRecPending ? [] : tvRecommends?.contents || []}
            type="link"
            linkTo="tv"
          />
        </>
      ) : (
        <>
          <ContentsList
            title="인기 영화"
            contents={popularRecPending ? [] : popularMovies}
            type="link"
            linkTo="movie"
          />
          <ContentsList
            title="인기 TV시리즈"
            contents={popularTVsPending ? [] : popularTVs}
            type="link"
            linkTo="tv"
          />
        </>
      )}
    </>
  );
}
