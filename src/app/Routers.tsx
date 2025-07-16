// src/app/routers.tsx

import CollectionContentsModifyPage from 'pages/collection/CollectionContentsModifyPage';
import CollectionCreatePage from 'pages/collection/CollectionCreatePage';
import CollectionDetailPage from 'pages/collection/CollectionDetailPage';
import CollectionListPage from 'pages/collection/CollectionListPage';
import CollectionModifyPage from 'pages/collection/CollectionModifyPage';
import NotFoundPage from 'pages/common/NotFoundPage';
import LoginPage from 'pages/login/LoginPage';
import MainPage from 'pages/main/MainPage';
import MovieDetailPage from 'pages/movie/MovieDetailPage';
import MovieListPage from 'pages/movie/MovieListPage';
import MyPage from 'pages/myPage/MyPage';
import MovieGenreSelectPage from 'pages/preference/MovieGenreSelectPage';
import TVGenreSelectPage from 'pages/preference/TVGenreSelectPage';
import SignupPage from 'pages/signup/SignupPage';
import TVDetailPage from 'pages/tv/TVDetailPage';
import TVListPage from 'pages/tv/TVListPage';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

export const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/genre/movie" element={<MovieGenreSelectPage />} />
      <Route path="/genre/tv" element={<TVGenreSelectPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/movie" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/tv" element={<TVListPage />} />
        <Route path="/tv/:id" element={<TVDetailPage />} />

        <Route path="/collection" element={<CollectionListPage />} />
        <Route path="/collection/create" element={<CollectionCreatePage />} />
        <Route path="/collection/:id" element={<CollectionDetailPage />} />
        <Route
          path="/collection/:id/content-modify"
          element={<CollectionContentsModifyPage />}
        />
        <Route
          path="/collection/:id/modify"
          element={<CollectionModifyPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
