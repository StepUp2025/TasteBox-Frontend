import { Contents } from 'entities/contents/model/types/contents.type';
import { Link } from 'react-router-dom';
import defaultContentsImage from 'shared/assets/images/default-contents-image.png';
import { getImageUrl } from 'shared/utils/getImageUrl';
import styled from 'styled-components';
import {
  ContentsWrapperStyle,
  ImgWrapper,
  TitleWrapper,
} from './ContentItem.style';

interface Props {
  content: Contents;
}

const ContentItemView = ({ content }: Props) => {
  return (
    <ContentItemStyle>
      <Link to={`/${content.contentType}/${content.id}`}>
        <div className="contents-wrapper">
          <ImgWrapper>
            <img
              src={
                content.posterPath
                  ? getImageUrl(content.posterPath)
                  : defaultContentsImage
              }
              alt={content.title}
            />
          </ImgWrapper>
          <TitleWrapper>
            <p className="title">{content.title}</p>
          </TitleWrapper>
        </div>
      </Link>
    </ContentItemStyle>
  );
};

const ContentItemStyle = styled.div`
  .contents-wrapper {
    ${ContentsWrapperStyle}
  }

`;

export default ContentItemView;
