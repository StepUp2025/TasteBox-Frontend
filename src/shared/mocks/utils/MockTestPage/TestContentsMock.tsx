import {
  fetchMovieDetail,
  fetchMoviesByGenre,
  fetchPopularMovies,
  fetchRecommends,
} from 'entities/contents/model/api/movieApi';
import {
  fetchPopularTVs,
  fetchRecommendsTVs,
  fetchTVDetail,
  fetchTVsByGenre,
} from 'entities/contents/model/api/tvsApi';
import {
  Divider,
  SectionTitle,
  TestButton,
  useTestLogger,
} from 'shared/mocks/utils/MockTestUtils';

const TestContentMock = () => {
  const { log, logResult } = useTestLogger();

  return (
    <div style={{ padding: 20 }}>
      <h1>🧪 Contents API 테스트 페이지</h1>

      <SectionTitle text="🎬 영화 API 테스트" />
      <TestButton
        label="인기 영화 리스트 조회"
        onClick={async () => {
          try {
            const res = await fetchPopularMovies();
            logResult('fetchPopularMovies', res);
          } catch (err) {
            logResult('fetchPopularMovies error', err);
          }
        }}
      />
      <TestButton
        label="장르별 영화 조회 (genreId: 1)"
        onClick={async () => {
          try {
            const res = await fetchMoviesByGenre({ genreId: 1, page: 1 });
            logResult('fetchMoviesByGenre', res);
          } catch (err) {
            logResult('fetchMoviesByGenre error', err);
          }
        }}
      />
      <TestButton
        label="추천 영화 조회 (id: 1)"
        onClick={async () => {
          try {
            const res = await fetchRecommends(1);
            logResult('fetchRecommends', res);
          } catch (err) {
            logResult('fetchRecommends error', err);
          }
        }}
      />
      <TestButton
        label="영화 상세 조회 (id: 1)"
        onClick={async () => {
          try {
            const res = await fetchMovieDetail(1);
            logResult('fetchMovieDetail(1)', res);
          } catch (err) {
            logResult('fetchMovieDetail(1) error', err);
          }
        }}
      />
      <TestButton
        label="영화 상세 조회 (없는 id)"
        onClick={async () => {
          try {
            const res = await fetchMovieDetail(999);
            logResult('fetchMovieDetail(999)', res);
          } catch (err) {
            logResult('fetchMovieDetail(999) error', err);
          }
        }}
      />

      <Divider />

      <SectionTitle text="📺 TV 시리즈 API 테스트" />
      <TestButton
        label="인기 TV 리스트 조회"
        onClick={async () => {
          try {
            const res = await fetchPopularTVs();
            logResult('fetchPopularTVs', res);
          } catch (err) {
            logResult('fetchPopularTVs error', err);
          }
        }}
      />
      <TestButton
        label="장르별 TV 조회 (genreId: 1)"
        onClick={async () => {
          try {
            const res = await fetchTVsByGenre({ genreId: 1, page: 1 });
            logResult('fetchTVsByGenre', res);
          } catch (err) {
            logResult('fetchTVsByGenre error', err);
          }
        }}
      />
      <TestButton
        label="추천 TV 조회 (id: 101)"
        onClick={async () => {
          try {
            const res = await fetchRecommendsTVs(101);
            logResult('fetchRecommendsTVs', res);
          } catch (err) {
            logResult('fetchRecommendsTVs error', err);
          }
        }}
      />
      <TestButton
        label="TV 시리즈 상세 조회 (id: 101)"
        onClick={async () => {
          try {
            const res = await fetchTVDetail(101);
            logResult('fetchTVDetail(101)', res);
          } catch (err) {
            logResult('fetchTVDetail(101) error', err);
          }
        }}
      />
      <TestButton
        label="TV 시리즈 상세 조회 (없는 id)"
        onClick={async () => {
          try {
            const res = await fetchTVDetail(999);
            logResult('fetchTVDetail(999)', res);
          } catch (err) {
            logResult('fetchTVDetail(999) error', err);
          }
        }}
      />

      <Divider />

      <pre style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{log}</pre>
    </div>
  );
};

export default TestContentMock;
