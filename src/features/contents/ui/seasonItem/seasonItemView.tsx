import defaultContentsImage from 'shared/assets/images/default-contents-image.png';
import { getImageUrl } from 'shared/utils/getImageUrl';
import styled from 'styled-components';
import {
  ContentsWrapperStyle,
  ImgWrapper,
  TitleWrapper,
} from '../ContentItem/ContentItem.style';

interface Season {
  id: number;
  title: string;
  posterPath?: string | null;
}

interface Props {
  season: Season;
}

const SeasonItemView = ({ season }: Props) => {
  return (
    <SeasonItemStyle>
      <div className="contents-wrapper">
        <ImgWrapper>
          <img
            src={getImageUrl(season.posterPath ?? null) || defaultContentsImage}
            alt={season.title}
          />
        </ImgWrapper>
        <TitleWrapper>
          <p className="title">{season.title}</p>
        </TitleWrapper>
      </div>
    </SeasonItemStyle>
  );
};

const SeasonItemStyle = styled.div`
  .contents-wrapper {
    ${ContentsWrapperStyle}
    cursor: default;
  }`;

export default SeasonItemView;
