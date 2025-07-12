import ContentsListViewer from 'features/contents/ui/ContentsList/ContentListViewer';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from 'shared/ui';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';
import {
  CollectionWrapper,
  Description,
  Menu,
  MenuButton,
  MoreButton,
  MoreButtonWrapper,
} from './CollectionDetail.style';

export const CollectionDetail = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const { data, isPending } = useGetCollectionDetail(numericId);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const movies = data?.contents.filter((c) => c.contentType === 'movie') ?? [];
  const tvShows = data?.contents.filter((c) => c.contentType === 'tv') ?? [];

  const isEmpty = movies.length === 0 && tvShows.length === 0;

  if (isPending) return <Loading />;

  return (
    <>
      <CollectionWrapper>
        <Title as="h1" size="xlarge">
          {data?.title}
        </Title>

        <MoreButtonWrapper>
          <MoreButton onClick={handleToggle}>
            <EllipsisVertical />
          </MoreButton>

          {menuOpen && (
            <Menu>
              <MenuButton onClick={() => navigate(`/collection/${id}/modify`)}>
                컬렉션 보드 수정
              </MenuButton>
              <MenuButton
                onClick={() => navigate(`/collection/${id}/content-modify`)}
                disabled={isEmpty}
                title={isEmpty ? '수정할 콘텐츠가 없습니다' : ''}
              >
                컬렉션 콘텐츠 수정
              </MenuButton>
            </Menu>
          )}
        </MoreButtonWrapper>
      </CollectionWrapper>
      <Description>{data?.description}</Description>

      {isEmpty ? (
        <Empty
          text="컬렉션에 콘텐츠를 담아주세요."
          linkText="바로가기"
          linkTo="/movie"
        />
      ) : (
        <>
          {movies.length > 0 && (
            <ContentsListViewer title="영화" contents={movies} type="toggle" />
          )}
          {tvShows.length > 0 && (
            <ContentsListViewer
              title="TV 시리즈"
              contents={tvShows}
              type="toggle"
            />
          )}
        </>
      )}
    </>
  );
};
