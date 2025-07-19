import { useAuthStore } from 'entities/auth/model/store/authStore';
import { ContentType } from 'entities/contents/model';
import {
  createMovieByGenreQueryFn,
  createTVByGenreQueryFn,
} from 'features/contents/hooks/createGenreQueryFn';
import { useInfiniteContents } from 'features/contents/hooks/useInfiniteContents';
import ContentsInfiniteList from 'features/contents/ui/ContentsList/ContentsInfiniteList';
import { CONTENT_LIST_MAX_WIDTH } from 'features/contents/ui/constants';
import ListTabs from 'features/contents/ui/ListTab/ListTabs';
import { tabMap } from 'features/contents/ui/ListTab/tabMap';
import { useUserPreference } from 'features/user/preference/hooks/useGetUserPreference';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import GenreFilter from './GenreFilter';

interface Props {
  contentType: ContentType;
}

const InfiniteListWidget = ({ contentType }: Props) => {
  const isLoggedIn = useAuthStore().isLoggedIn;
  const { data: preferenceData } = useUserPreference();
  const [_searchParams, setSearchParams] = useSearchParams();

  const movieGenres = preferenceData?.movie.genres ?? [];
  const tvGenres = preferenceData?.tv.genres ?? [];

  const movieIds = useMemo(() => movieGenres.map((g) => g.id), [movieGenres]);
  const tvIds = useMemo(() => tvGenres.map((g) => g.id), [tvGenres]);

  const genreList = contentType === 'movie' ? movieGenres : tvGenres;
  const genreIds = contentType === 'movie' ? movieIds : tvIds;

  const rawTabOptions = tabMap[contentType];
  const tabOptions = useMemo(() => {
    return isLoggedIn
      ? rawTabOptions
      : rawTabOptions.filter((tab) => tab.id !== 'byGenre');
  }, [isLoggedIn, rawTabOptions]);

  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  //  로컬 스토리지에서 이전 탭 id 읽고, 로그인 여부에 따라 탭 초기값 결정
  useEffect(() => {
    const defaultTab = isLoggedIn ? 'byGenre' : 'popular';

    const initialTab = defaultTab;

    setSelectedTab(initialTab);
  }, [isLoggedIn]);

  //  selectedTab이 바뀌면 localStorage에도 저장
  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    setSearchParams({ tab: tabId });
    localStorage.setItem(`selectedTab:${contentType}`, tabId);
  };

  const selectedOption =
    tabOptions.find((tab) => tab.id === selectedTab) ?? tabOptions[0];

  const [selectedGenreId, setSelectedGenreId] = useState<number[]>([]);

  //  장르 탭이면 선택 장르 ID 초기화
  useEffect(() => {
    if (
      selectedOption.id === 'byGenre' &&
      selectedGenreId.length === 0 &&
      preferenceData
    ) {
      setSelectedGenreId(genreIds);
    }
  }, [selectedOption.id, selectedGenreId.length, preferenceData, genreIds]);

  const toggleGenre = (id: number) => {
    setSelectedGenreId((prev) => {
      if (prev.includes(id)) {
        return prev.length === 1 ? prev : prev.filter((g) => g !== id);
      }
      return [...prev, id];
    });
  };

  const { queryKey, queryFn } = useMemo(() => {
    if (selectedOption.id === 'byGenre' && selectedGenreId.length > 0) {
      return {
        queryKey: [contentType, 'byGenre', ...selectedGenreId],
        queryFn:
          contentType === 'movie'
            ? createMovieByGenreQueryFn(selectedGenreId)
            : createTVByGenreQueryFn(selectedGenreId),
      };
    }
    return {
      queryKey: selectedOption.queryKey,
      queryFn: selectedOption.queryFn,
    };
  }, [selectedOption, contentType, selectedGenreId]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteContents({ queryKey, queryFn });

  if (!selectedTab) return <Loading />;

  return (
    <InfiniteListWidgetStyle>
      <div className="tab-bar">
        <ListTabs
          tabOptions={tabOptions}
          selectedTab={selectedTab}
          setSelectedTab={handleTabChange}
        />
        {selectedOption.id === 'byGenre' && (
          <GenreFilter
            genreList={genreList}
            selectedGenreIds={selectedGenreId}
            onToggle={toggleGenre}
          />
        )}
      </div>
      <ContentsInfiniteList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        error={error}
        contentType={contentType}
      />
    </InfiniteListWidgetStyle>
  );
};

const InfiniteListWidgetStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tab-bar {
    width: 100%;
    max-width: ${CONTENT_LIST_MAX_WIDTH}px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default InfiniteListWidget;
