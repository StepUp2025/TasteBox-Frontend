import { useMovieDetail } from 'features/contents/hooks/movie/useGetMovieDetail';
import { useMovieRecommends } from 'features/contents/hooks/movie/useGetMovieRecommends';
import ContentsListViewer from 'features/contents/ui/ContentsList/ContentListViewer';
import CollectionContentsModifyModal from 'features/contents/ui/ModalItem/CollectionContentsModifyModal';
import { Calendar, Clock, Earth, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultContentsImage from 'shared/assets/images/default-contents-image.png';
import { BackgroundImage } from 'shared/styles/backgroundStyle';
import { Button, Title } from 'shared/ui';
import Loading from 'shared/ui/Loading/Loading';
import { getImageUrl } from 'shared/utils/getImageUrl';
import styled, { useTheme } from 'styled-components';
export default function MovieDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const contentId = Number(id);
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useMovieDetail(contentId);
  const { data: movieRecommendsData } = useMovieRecommends(contentId, 1, 18);
  const movieRecommends = movieRecommendsData?.contents || [];

  if (isPending) return <Loading />;
  if (isError) return <div>에러 발생: {error?.message}</div>;
  if (!data) return <div>영화 정보를 찾을 수 없습니다.</div>;

  const {
    title,
    genres,
    releaseDate,
    overview,
    voteAverage,
    voteCount,
    originalLanguage,
    posterPath,
    runtime,
    backdropPath,
  } = data;

  return (
    <Wrapper>
      <BackgroundImage
        $imageUrl={backdropPath ? getImageUrl(backdropPath) : undefined}
      />
      <HeaderSection>
        <Poster
          src={posterPath ? getImageUrl(posterPath) : defaultContentsImage}
          alt={title}
        />
        <Info>
          <Title>{title}</Title>
          <InfoRow>{genres?.map((g) => g.name).join(' · ')}</InfoRow>
          <InfoRow>
            <Star size={24} />
            {voteAverage}({voteCount})
            <Calendar size={24} /> {releaseDate}
          </InfoRow>
          <InfoRow>
            <Earth size={24} /> {originalLanguage?.toUpperCase()}
            <Clock size={24} />
            {runtime}분
          </InfoRow>
          <CollectionButton
            onClick={() => setIsModalOpen(true)}
            disabled={isPending}
            buttonSize="small"
            fontSize="small"
            scheme="primary"
            borderRadius="large"
          >
            <Plus size={24} stroke={theme.color.constantWhite} /> 컬렉션 추가
          </CollectionButton>
          <div>
            <CollectionContentsModifyModal
              contentId={contentId}
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={() => {
                setIsModalOpen(false);
                navigate('/collection/create');
              }}
            />
          </div>
        </Info>
      </HeaderSection>
      <OverviewSection>
        <Title>줄거리</Title>
        {overview}
      </OverviewSection>
      <ContentsListViewer
        title="추천영화"
        contents={movieRecommends}
        type="link"
        linkTo="movie"
        contentType="movie"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
 position: relative;
  padding: 32px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 99;
`;

const HeaderSection = styled.section`
 position: relative;
  display: flex;
  gap: 32px;
  align-items: flex-end;
  z-index: 3;
`;

const Poster = styled.img`
  width: 220px;
  height: 320px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  object-fit: cover;
  margin-top: 60px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const OverviewSection = styled.section`
  margin: 40px 0 24px 0;
  display: flex;
  flex-direction:column;
  gap: 20px;
`;

const CollectionButton = styled(Button)`
  width: 200px;
  height: 43px;
  margin-top: 40px;
  gap: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
