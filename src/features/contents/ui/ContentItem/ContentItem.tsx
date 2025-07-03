import { Contents } from 'entities/contents/model/types/contents.type';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultContentsImage from 'shared/assets/images/default-contents-image.png';
import { hoverOverlay } from 'shared/styles/hoverOverlay';
import styled from 'styled-components';
import { CONTENT_ITEM_HEIGHT, CONTENT_ITEM_WIDTH } from '../constants';

interface Props {
  content: Contents;
  isCheckable?: boolean;
}

const ContentItem = ({ content, isCheckable }: Props) => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = (e: React.MouseEvent) => {
    e.stopPropagation(); //체크 클릭했을 때 링크 이동 방지
    setChecked((prev) => !prev);
  };

  return (
    <ContentItemStyle $checked={checked} $isCheckable={isCheckable}>
      <div className="contents-wrapper">
        {isCheckable && (
          <input
            type="checkbox"
            className="checkbox"
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
            onClick={toggleCheck}
          />
        )}
        <Link to={`/${content.contentType}/${content.id}`}>
          <div className="img">
            <img
              src={content.poster_path ?? defaultContentsImage}
              alt={content.title}
            />
          </div>
          <div className="title-wrapper">
            <p className="title">{content.title}</p>
          </div>
        </Link>
      </div>
    </ContentItemStyle>
  );
};

const ContentItemStyle = styled.div<{
  $checked: boolean;
  $isCheckable?: boolean;
}>`
.contents-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${CONTENT_ITEM_WIDTH}px;
  border-radius: ${({ theme }) => theme.borderRadius.medium}; 
}

.img {
    width: ${CONTENT_ITEM_WIDTH}px;
    height: ${CONTENT_ITEM_HEIGHT}px;
    border-radius: ${({ theme }) => theme.borderRadius.medium}; 
    position: relative;

    img {
      width: 100%;
      height: auto;
      border-radius: ${({ theme }) => theme.borderRadius.medium}; 
      object-fit: cover;  // 비율 유지
    }
    ${hoverOverlay}
  }
.title-wrapper {
    margin-top: 12px;
    text-align: left;
    width: ${CONTENT_ITEM_WIDTH}px;

    .title {
      font-weight: bold;
    }
  }

  .img {
    border: ${({ theme, $checked }) => ($checked ? `1px solid ${theme.color.primary}` : 'none')}; 
  }
`;

export default ContentItem;
