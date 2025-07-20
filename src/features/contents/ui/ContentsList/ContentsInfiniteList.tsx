import {
  ContentType,
  InfiniteContents,
} from 'entities/contents/model/types/contents.type';
import { useEffect, useRef } from 'react';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import ContentItemView from '../ContentItem/ContentItemView';
import { CONTENT_ITEM_GAP } from '../constants';

interface Props {
  data: InfiniteContents | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  contentType: ContentType;
}

const ContentsInfiniteList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  contentType,
}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const ENABLE_INFINITE_SCROLL = true; //  여기 false면 무한스크롤 비활성화

  useEffect(() => {
    if (!ENABLE_INFINITE_SCROLL) return;

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

      {!isLoading &&
        (data?.pages.length === 0 ||
          data?.pages.every((page) => page.contents.length === 0)) && (
          <Empty text="표시할 콘텐츠가 없습니다." />
        )}

      <Grid>
        {data?.pages.map((page) =>
          page.contents?.map((content) => (
            <ContentItemView
              key={content.id}
              content={content}
              contentType={contentType}
            />
          )),
        )}
      </Grid>

      {ENABLE_INFINITE_SCROLL && hasNextPage && <div ref={observerRef} />}
    </ContentsInfiniteListStyle>
  );
};

const ContentsInfiniteListStyle = styled.div`
  width: 100%;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${CONTENT_ITEM_GAP}px;
  width: 100%;
`;

export default ContentsInfiniteList;
