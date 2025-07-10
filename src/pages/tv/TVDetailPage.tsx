import { ContentType } from 'entities/contents/model/types/contents.type';
import { useRecommendsTVs } from 'features/contents/hooks/tvs/useGetRecommendsTVs';
import { useTVDetail } from 'features/contents/hooks/tvs/useGetTVDetail';
import ContentsList from 'features/contents/ui/ContentsList/ContentsList';
import { Calendar, Earth, Plus, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Button, Title } from 'shared/ui';
import styled, { useTheme } from 'styled-components';

export default function TVDetailPage() {
  const theme = useTheme();
  const { id } = useParams();
  const tvId = Number(id);
  const { data, isPending, isError, error } = useTVDetail(tvId);
  const { data: tvRecommends, isPending: tvRecPending } =
    useRecommendsTVs(tvId);
  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;
  if (!data) return <div>TV 정보를 찾을 수 없습니다.</div>;

  const seasonContents = data.seasons?.map((season) => ({
    id: season.id,
    title: season.title,
    posterPath: season.posterPath,
    contentType: 'tv' as ContentType,
  }));

  const {
    title,
    genres,
    status,
    firstAirDate,
    lastAirDate,
    overview,
    voteAverage,
    voteCount,
    originalLanguage,
    posterPath,
    backdropPath,
    numberOfSeasons,
  } = data;
  return (
    <Wrapper>
      <BackgroundPoster
        src={backdropPath || '/default-tv.png'}
        alt="background"
      />
      <HeaderSection>
        <Poster src={posterPath || '/default-tv.png'} alt={title} />
        <Info>
          <Title>{title} </Title>
          {status}

          <InfoRow>{genres?.map((g) => g.name).join(', ')}</InfoRow>
          <InfoRow>
            <Star size={24} />
            {voteAverage}({voteCount})
            <Calendar size={24} /> {firstAirDate}-{lastAirDate}
          </InfoRow>
          <InfoRow>
            <Earth size={24} /> {originalLanguage}
          </InfoRow>
          <Button
            onClick={() => {}}
            disabled={isPending}
            buttonSize="small"
            fontSize="small"
            scheme="menu"
            borderRadius="large"
            disableHoverOverlay={true}
          >
            <CollectionButton>
              <Plus size={24} stroke={theme.color.primary} />
              컬렉션 추가
            </CollectionButton>
          </Button>
        </Info>
      </HeaderSection>

      <OverviewSection>
        <Title>줄거리</Title>
        {overview}
      </OverviewSection>
      <SeasonSection>
        <Title> 시즌 ({numberOfSeasons}) </Title>
        <ContentsList
          title=""
          contents={seasonContents}
          type="link"
          linkTo="tv"
        />
      </SeasonSection>
      <RecommendSection>
        <Title>추천 TV 시리즈</Title>
        <ContentsList
          title=""
          contents={tvRecPending ? [] : tvRecommends?.contents || []}
          type="link"
          linkTo="tv"
        />
      </RecommendSection>
    </Wrapper>
  );
}
const SidebarWidth = 107;
const Wrapper = styled.div`
 position: relative;
  padding: 32px;
  margin: 0;
  margin-left: 90px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 99;
`;

const BackgroundPoster = styled.img`
position: fixed;
margin-left: ${SidebarWidth}px;  
width: calc(100vw - ${SidebarWidth}px);  
top: 0;
left: 0;
height: 40%;
object-fit: cover;
z-index: 1;
opacity: 0.3;
pointer-events: none;
`;

const HeaderSection = styled.section`
  display: flex;
  gap: 32px;
  align-items: flex-start;
`;

const Poster = styled.img`
  width: 220px;
  height: 320px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadow.default};
  object-fit: cover;
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

const SeasonSection = styled.section`
  margin: 40px 0 24px 0;
`;

const RecommendSection = styled.section`
  margin: 40px 0 24px 0;
`;

const CollectionButton = styled.button`
  color: ${({ theme }) => theme.color.primary};
  border: 1.5px solid ${({ theme }) => theme.color.primary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: ${({ theme }) => theme.fontSize.medium};
  padding: 6px 18px;
  display: flex;
  align-items: center;
  margin-top:20px;
  gap: 6px;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.color.subBackground};
    font-weight: bold;
}
`;
