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

  const itemBody = (
    <>
      <div className="img">
        <img
          src={content.poster_path ?? defaultContentsImage}
          alt={content.title}
        />
      </div>
      <div className="title-wrapper">
        <p className="title">{content.title}</p>
      </div>
    </>
  );

  return (
    <ContentItemStyle $checked={checked} $isCheckable={isCheckable}>
      <div
        className="contents-wrapper"
        onChange={isCheckable ? () => setChecked((prev) => !prev) : undefined}
      >
        {isCheckable && (
          <input
            type="checkbox"
            className="checkbox"
            checked={checked}
            readOnly
          />
        )}
        {isCheckable ? (
          itemBody
        ) : (
          <Link to={`/${content.contentType}/${content.id}`}>{itemBody}</Link>
        )}
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
  border: ${({ theme, $checked }) => ($checked ? `2px solid ${theme.color.primary}` : 'none')};
  transition: border 0.2s ease;
  overflow: hidden;

  position: relative;
  z-index: 1;

  .checkbox {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  z-index: 2;
}

  &:hover {
      border: ${({ $isCheckable, $checked, theme }) =>
        $isCheckable && !$checked
          ? `2px solid ${theme.color.primary}`
          : undefined};
    }
  
}

.img {
    width: ${CONTENT_ITEM_WIDTH}px;
    height: ${CONTENT_ITEM_HEIGHT}px;
    border-radius: ${({ theme }) => theme.borderRadius.medium}; 
    position: relative;
    z-index: 0;

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
