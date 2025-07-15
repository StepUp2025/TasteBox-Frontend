import { InfiniteContents } from 'entities/contents/model/types/contents.type';
import { useEffect, useRef } from 'react';
import { ErrorBox } from 'shared/ui';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import ContentItemView from '../ContentItem/ContentItemView';
import {
  CONTENT_ITEM_GAP,
  CONTENT_LIST_MAX_WIDTH,
  CONTENT_LIST_MIN_WIDTH,
} from '../constants';

interface Props {
  data: InfiniteContents | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: Error | null;
}

const ContentsInfiniteList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  error,
}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isLoading, isFetchingNextPage]);

  return (
    <ContentsInfiniteListStyle>
      {isLoading && <Loading />}

      {error && <ErrorBox errorMessage="데이터를 불러오지 못했습니다" />}

      {!isLoading && data?.pages?.length === 0 && (
        <Empty text="표시할 컨텐츠가 없습니다." />
      )}

      <Grid>
        {data?.pages.map((page) =>
          page.contents.map((content) => (
            <ContentItemView key={content.id} content={content} />
          )),
        )}
      </Grid>

      {hasNextPage && <div ref={observerRef} />}
    </ContentsInfiniteListStyle>
  );
};

const ContentsInfiniteListStyle = styled.div`
  width: 100%;
  padding: 0 16px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${CONTENT_ITEM_GAP}px;
  width: 100%;
  max-width: ${CONTENT_LIST_MAX_WIDTH}px;
  min-width: ${CONTENT_LIST_MIN_WIDTH}px;
`;

export default ContentsInfiniteList;
