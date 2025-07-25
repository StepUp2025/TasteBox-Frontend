import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useLatestContents } from 'features/contents/hooks/latest/useLatestContents';
import { useMoviesByGenre } from 'features/contents/hooks/movie/useGetMoviesByGenre';
import { usePopularMovies } from 'features/contents/hooks/movie/useGetPopularMovies';
import { usePopularTVs } from 'features/contents/hooks/tvs/useGetPopularTVs';
import { useTVsByGenre } from 'features/contents/hooks/tvs/useGetTVsByGenre';
import ContentsListViewer from 'features/contents/ui/ContentsList/ContentListViewer';
import { useUserPreference } from 'features/user/preference/hooks/useGetUserPreference';
import { useMemo } from 'react';

export default function MainPage() {
  const { data: preferenceData } = useUserPreference();
  const movieGenres = preferenceData?.movie.genres ?? [];
  const tvGenres = preferenceData?.tv.genres ?? [];
  const movieIds = useMemo(() => movieGenres.map((g) => g.id), [movieGenres]);
  const tvIds = useMemo(() => tvGenres.map((g) => g.id), [tvGenres]);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { data: latestContentsData } = useLatestContents(10);
  const latestContents = latestContentsData?.contents || [];

  const { data: popularMoviesData } = usePopularMovies(1, 18);
  const popularMovies = popularMoviesData?.contents || [];

  const { data: popularTVsData } = usePopularTVs(1, 18);
  const popularTVs = popularTVsData?.contents || [];

  const { data: genreMoviesData } = useMoviesByGenre(movieIds, 1, 18);
  const genreMovies = genreMoviesData?.contents || [];

  const { data: genreTVsData } = useTVsByGenre(tvIds, 1, 18);
  const genreTVs = genreTVsData?.contents || [];

  return (
    <>
      {isLoggedIn ? (
        <>
          <ContentsListViewer
            top={true}
            title="최근 추가한 콘텐츠"
            contents={latestContents}
            type="scroll"
          />
          <ContentsListViewer
            title="추천 영화"
            contents={genreMovies}
            type="link"
            linkTo="movie"
            contentType="movie"
          />
          <ContentsListViewer
            title="추천 TV시리즈"
            contents={genreTVs}
            type="link"
            linkTo="tv"
            contentType="tv"
          />
        </>
      ) : (
        <>
          <ContentsListViewer
            top={true}
            title="인기 영화"
            contents={popularMovies}
            type="link"
            linkTo="movie"
            contentType="movie"
          />
          <ContentsListViewer
            title="인기 TV시리즈"
            contents={popularTVs}
            type="link"
            linkTo="tv"
            contentType="tv"
          />
        </>
      )}
    </>
  );
}
