import { Contents } from 'entities/contents/model/types/contents.type';
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
  checked?: boolean;
  onCheck?: (id: number, checked: boolean) => void;
}

const ContentItemEdit = ({ content, checked = false, onCheck }: Props) => {
  const handleChange = () => {
    onCheck?.(content.id, !checked); // 체크 상태 업데이트
  };

  return (
    <ContentItemStyle $checked={checked}>
      <label className="contents-wrapper">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={handleChange}
        />
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
      </label>
    </ContentItemStyle>
  );
};

const ContentItemStyle = styled.div<{ $checked: boolean }>`
  .contents-wrapper {
    ${ContentsWrapperStyle};

    border: ${({ theme, $checked }) =>
      $checked ? `2px solid ${theme.color.primary}` : '2px solid transparent'};
    transition: border 0.2s ease;

    &:hover {
      border: ${({ theme, $checked }) =>
        !$checked ? `2px solid ${theme.color.primary}` : undefined};
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
    }
  }


`;

export default ContentItemEdit;
