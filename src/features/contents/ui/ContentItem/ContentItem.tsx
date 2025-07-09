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

  return (
    <ContentItemStyle $checked={checked} $isCheckable={isCheckable}>
      {isCheckable ? (
        <label className="contents-wrapper">
          <input
            type="checkbox"
            className="checkbox"
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
          />
          <div className="img">
            <img
              src={content.posterPath ?? defaultContentsImage}
              alt={content.title}
            />
          </div>
          <div className="title-wrapper">
            <p className="title">{content.title}</p>
          </div>
        </label>
      ) : (
        <Link to={`/${content.contentType}/${content.id}`}>
          <div className="contents-wrapper">
            <div className="img">
              <img
                src={content.posterPath ?? defaultContentsImage}
                alt={content.title}
              />
            </div>
            <div className="title-wrapper">
              <p className="title">{content.title}</p>
            </div>
          </div>
        </Link>
      )}
    </ContentItemStyle>
  );
};

const ContentItemStyle = styled.div<{
  $checked: boolean;
  $isCheckable?: boolean;
}>`
  .contents-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    vertical-align: top;
    line-height: 1;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    gap: 0;
    width: ${CONTENT_ITEM_WIDTH}px;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    border: ${({ theme, $checked }) =>
      $checked ? `2px solid ${theme.color.primary}` : '2px solid transparent'};
    transition: border 0.2s ease;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &:hover {
      border: ${({ $isCheckable, $checked, theme }) =>
        $isCheckable && !$checked
          ? `2px solid ${theme.color.primary}`
          : undefined};
    }

    .checkbox {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 20px;
      height: 20px;
      z-index: 2;
      cursor: pointer;
      margin: 0;
      padding: 0;
    }
  }

  .img {
    width: ${CONTENT_ITEM_WIDTH}px;
    height: ${CONTENT_ITEM_HEIGHT}px;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.borderRadius.medium};
    }

    ${hoverOverlay}
  }

  .title-wrapper {
    margin-top: 12px;
    text-align: left;
    width: ${CONTENT_ITEM_WIDTH}px;

    .title {
      font-weight: bold;
      padding: 0 0 2px 4px;
      margin: 0;           /* ✅ 추가: 텍스트 마진 제거 */
      line-height: 1.2;    /* ✅ 필요 시 조정 */
    }
  }
`;

export default ContentItem;
