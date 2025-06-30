// src/app/routers.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Error from './Error';

import LoginPage from 'pages/login/LoginPage';
import SignupPage from 'pages/signup/SignupPage';
import MainPage from 'pages/main/MainPage';
import MyPage from 'pages/myPage/MyPage';

import MovieGenreSelectPage from 'pages/preference/MovieGenreSelectPage';
import TVGenreSelectPage from 'pages/preference/TVGenreSelectPage';

import MovieListPage from 'pages/movie/MovieListPage';
import MovieDetailPage from 'pages/movie/MovieDetailPage';

import TVListPage from 'pages/tv/TVListPage';
import TVDetailPage from 'pages/tv/TVDetailPage';

import CollectionCreatePage from 'pages/collection/CollectionCreatePage';
import CollectionDetailPage from 'pages/collection/CollectionDetailPage';
import CollectionModifyPage from 'pages/collection/CollectionModifyPage';

export const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/preference/movie" element={<MovieGenreSelectPage />} />
      <Route path="/preference/tv" element={<TVGenreSelectPage />} />

      <Route element={<Layout />} errorElement={<Error />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/movie" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/tv" element={<TVListPage />} />
        <Route path="/tv/:id" element={<TVDetailPage />} />

        <Route path="/collection" element={<CollectionCreatePage />} />
        <Route path="/collection/:id" element={<CollectionDetailPage />} />
        <Route path="/collection/:id/modify" element={<CollectionModifyPage />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};
