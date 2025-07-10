import ContentsList from 'features/contents/ui/ContentsList/ContentsList';
import { useParams } from 'react-router-dom';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';

export const CollectionDetailBody = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const { data, isPending } = useGetCollectionDetail(numericId);

  if (isPending) return <Loading />;

  const movies = data?.contents.filter((c) => c.contentType === 'movie') ?? [];
  const tvShows = data?.contents.filter((c) => c.contentType === 'tv') ?? [];

  if (movies.length === 0 && tvShows.length === 0) {
    return (
      <Empty
        text="컬렉션에 콘텐츠를 담아주세요."
        linkText="바로가기"
        linkTo="/movie"
      />
    );
  }

  return (
    <>
      {movies.length > 0 && (
        <ContentsList title="영화" contents={movies} type="toggle" />
      )}

      {tvShows.length > 0 && (
        <ContentsList title="TV 시리즈" contents={tvShows} type="toggle" />
      )}
    </>
  );
};
