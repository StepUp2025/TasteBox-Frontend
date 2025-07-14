import ContentsSelector from 'features/contents/ui/ContentsList/ContentsSelector';
import { ArrowLeft, Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BackgroundImage,
  BackgroundWrapper,
} from 'shared/styles/backgroundStyle';
import { Modal, Title } from 'shared/ui';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import { toast } from 'sonner';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';
import { useRemoveCollectionContents } from '../hooks/useRemoveCollectionContents';
import {
  DeleteButton,
  IconTitleContainer,
  IconWrapper,
  ModalText,
} from './CollectionContentsEditor.style';

const CollectionContentsEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = Number(id);

  const { data, isPending } = useGetCollectionDetail(numericId);
  const { mutate: removeContents } = useRemoveCollectionContents(numericId);

  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [selectedTvShows, setSelectedTvShows] = useState<number[]>([]);

  const nothingSelected =
    selectedMovies.length === 0 && selectedTvShows.length === 0;

  const [modalOpen, setModalOpen] = useState(false);
  const handleToggle = () => setModalOpen((prev) => !prev);

  const handleRemove = () => {
    const ids = [...selectedMovies, ...selectedTvShows];
    removeContents(ids, {
      onSuccess: () => {
        toast.success('선택한 콘텐츠가 삭제되었습니다.');
        setSelectedMovies([]);
        setSelectedTvShows([]);
        handleToggle();
      },
    });
  };

  if (isPending) return <Loading />;

  const movies = data?.contents.filter((c) => c.contentType === 'movie') ?? [];
  const tvShows = data?.contents.filter((c) => c.contentType === 'tv') ?? [];

  const isEmpty = movies.length === 0 && tvShows.length === 0;

  return (
    <>
      {data?.thumbnail && <BackgroundImage $imageUrl={data.thumbnail} />}
      <BackgroundWrapper>
        <IconTitleContainer>
          <IconWrapper onClick={() => navigate(`/collection/${id}`)}>
            <ArrowLeft size={32} />
          </IconWrapper>
          <Title size="xlarge">선택 및 삭제</Title>
        </IconTitleContainer>

        {isEmpty && (
          <Empty
            text="컬렉션에 콘텐츠를 담아주세요."
            linkText="바로가기"
            linkTo="/movie"
          />
        )}

        {movies.length > 0 && (
          <ContentsSelector
            title="영화"
            contents={movies}
            selectedContents={selectedMovies}
            setter={setSelectedMovies}
          />
        )}

        {tvShows.length > 0 && (
          <ContentsSelector
            title="TV 시리즈"
            contents={tvShows}
            selectedContents={selectedTvShows}
            setter={setSelectedTvShows}
          />
        )}

        {isEmpty || (
          <DeleteButton onClick={handleToggle} disabled={nothingSelected}>
            <Trash />
            삭제하기
          </DeleteButton>
        )}

        <Modal
          open={modalOpen}
          title="콘텐츠 삭제"
          onClose={handleToggle}
          confirmText="삭제"
          onConfirm={handleRemove}
        >
          <ModalText>선택한 콘텐츠를 정말 삭제하시겠어요?</ModalText>
        </Modal>
      </BackgroundWrapper>
    </>
  );
};

export default CollectionContentsEditor;
