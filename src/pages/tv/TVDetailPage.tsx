import { useAuthStore } from 'entities/auth/model/store/authStore';
import { useRecommendsTVs } from 'features/contents/hooks/tvs/useGetRecommendsTVs';
import { useTVDetail } from 'features/contents/hooks/tvs/useGetTVDetail';
import ContentsListViewer from 'features/contents/ui/ContentsList/ContentListViewer';
import CollectionContentsModifyModal from 'features/contents/ui/ModalItem/CollectionContentsModifyModal';
import SeasonListViewer from 'features/contents/ui/SeasonList/seasonListViewe';
import { Calendar, Earth, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultContentsImage from 'shared/assets/images/default-contents-image.png';
import { ImageSize } from 'shared/constants/image';
import { BackgroundImage } from 'shared/styles/backgroundStyle';
import { Button, Title } from 'shared/ui';
import Loading from 'shared/ui/Loading/Loading';
import { getImageUrl } from 'shared/utils/getImageUrl';
import { toast } from 'sonner';
import styled, { useTheme } from 'styled-components';

export default function TVDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const { id } = useParams();
  const contentId = Number(id);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => !!state.accessToken);
  const { data, isPending, isError, error } = useTVDetail(contentId);
  const { data: tvRecommendsData } = useRecommendsTVs(contentId, 1, 18);
  const tvRecommends = tvRecommendsData?.contents || [];

  if (isPending) return <Loading />;
  if (isError) return <div>에러 발생: {error?.message}</div>;
  if (!data) return <div>TV 시리즈 정보를 찾을 수 없습니다.</div>;

  const {
    title,
    genres,
    overview,
    voteAverage,
    voteCount,
    originalLanguage,
    posterPath,
    backdropPath,
    firstAirDate,
    lastAirDate,
    numberOfSeasons,
    seasons,
  } = data;

  return (
    <>
      <BackgroundImage
        $imageUrl={
          backdropPath
            ? getImageUrl(backdropPath, ImageSize.ORIGINAL)
            : undefined
        }
      />
      <Wrapper>
        <HeaderSection>
          <Poster
            src={posterPath ? getImageUrl(posterPath) : defaultContentsImage}
            alt={title}
          />
          <Info>
            <Title size="xlarge">{title}</Title>
            <InfoRow>
              <GenreStyle>{genres?.map((g) => g.name).join(' · ')}</GenreStyle>
            </InfoRow>
            <InfoRow>
              <Star size={24} />
              {voteAverage}({voteCount})
              <Calendar size={24} /> {firstAirDate}~{lastAirDate}
            </InfoRow>
            <InfoRow>
              <Earth size={24} />
              {originalLanguage?.toUpperCase()}
            </InfoRow>
            <CollectionButton
              onClick={() => {
                if (!isLoggedIn) {
                  toast('로그인이 필요한 기능입니다.', {
                    action: {
                      label: '바로가기',
                      onClick: () => navigate('/login'),
                    },
                  });
                  return;
                }
                setIsModalOpen(true);
              }}
              disabled={isPending}
              buttonSize="small"
              fontSize="small"
              scheme="primary"
              borderRadius="large"
            >
              <Plus size={24} stroke={theme.color.constantWhite} /> 컬렉션 추가
            </CollectionButton>
            <div>
              {isModalOpen && (
                <CollectionContentsModifyModal
                  contentId={contentId}
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onConfirm={() => {
                    setIsModalOpen(false);
                    navigate('/collection/create', { state: { contentId } });
                  }}
                />
              )}
            </div>
          </Info>
        </HeaderSection>
        {overview && (
          <OverviewSection>
            <Title>줄거리</Title>
            {overview}
          </OverviewSection>
        )}
        <SeasonsSection>
          <SeasonListViewer
            title="시즌"
            seasons={seasons.map((season) => ({
              ...season,
            }))}
            type="scroll"
            numberOfSeasons={numberOfSeasons}
          />
        </SeasonsSection>
        <ContentsListViewer
          title="추천TV시리즈"
          contents={tvRecommends}
          type="link"
          linkTo="tv"
          contentType="tv"
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
position: relative;
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

const GenreStyle = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.medium};
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
height: 320px;
flex-direction: column;
gap: 8px;
`;

const InfoRow = styled.div`
display: flex;
align-items: center;
gap: 8px;
margin-top: 20px;
font-size: ${({ theme }) => theme.fontSize.xsmall};
`;

const OverviewSection = styled.section`
margin: 2.5rem 15rem 1.5rem 0;
display: flex;
flex-direction:column;
gap: 20px;
`;

const SeasonsSection = styled.section`
display: flex;
align-items: center;
flex-direction: column;
margin-top: 4rem;
width: 100%;
`;

const CollectionButton = styled(Button)`
width: 200px;
height: 43px;
margin-top: 40px;
gap: 6px;
display: flex;
justify-content: center;
align-items: center;
white-space: nowrap;
`;
