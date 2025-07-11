import { ContentItem } from 'entities/collection';
import ContentsSelector from 'features/contents/ui/ContentsList/ContentsSelector';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';

const CollectionContentsEditor = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const { data, isPending } = useGetCollectionDetail(numericId);
  const [selectedMovies, setSelectedMovies] = useState<ContentItem[]>([]);
  const [selectedTvShows, setSelectedTvShows] = useState<ContentItem[]>([]);

  const selectedContents = [...selectedMovies, ...selectedTvShows];
  console.log('selectedContents', selectedContents); // 디버깅 용 콘솔로그

  if (isPending) return <Loading />;

  const movies = data?.contents.filter((c) => c.contentType === 'movie') ?? [];

  const tvShows = data?.contents.filter((c) => c.contentType === 'tv') ?? [];
  return (
    <CollectionContentsEditorStyle>
      <ContentsSelector
        title="영화"
        contents={movies}
        selectedContents={selectedMovies}
        setter={setSelectedMovies}
      />
      <ContentsSelector
        title="TV 시리즈"
        contents={tvShows}
        selectedContents={selectedTvShows}
        setter={setSelectedTvShows}
      />
    </CollectionContentsEditorStyle>
  );
};

const CollectionContentsEditorStyle = styled.div``;

export default CollectionContentsEditor;
