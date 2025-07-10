import { ContentItem } from 'entities/collection';
import { Contents } from 'entities/contents/model/types/contents.type';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ContentItemEdit from '../ContentItem/ContentItemEdit';
import {
  CONTENT_ITEM_GAP,
  CONTENT_LIST_MAX_WIDTH,
  CONTENT_LIST_MIN_WIDTH,
} from '../constants';
import { Header, Wrapper } from './ContentsList.stye';

interface Props {
  title: string;
  contents: Contents[];
  selectedContents: ContentItem[];
  setter: Dispatch<SetStateAction<ContentItem[]>>;
}

const ContentsSelector = ({
  title,
  contents,
  selectedContents = [],
  setter,
}: Props) => {
  const selectContent = (
    id: number,
    contentType: Contents['contentType'],
    checked: boolean,
  ) => {
    const contentItem: ContentItem = { id, contentType };
    if (checked) {
      setter((prev) => [...prev, contentItem]);
    } else {
      setter((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <Wrapper>
      <Header>
        <h2>{title}</h2>
      </Header>

      <ContentsSelectorContainer>
        {contents.map((item) => (
          <ContentItemEdit
            key={item.id}
            content={item}
            checked={selectedContents.some((c) => c.id === item.id)}
            onCheck={selectContent}
          />
        ))}
      </ContentsSelectorContainer>
    </Wrapper>
  );
};

const ContentsSelectorContainer = styled.div`
  display: flex;
  margin: 0 auto;
  gap: ${CONTENT_ITEM_GAP}px;
  flex-wrap: wrap;
  overflow-x: visible;
  padding-bottom: 0;
  width: 100%;
  max-width: ${CONTENT_LIST_MAX_WIDTH}px;
  min-width: ${CONTENT_LIST_MIN_WIDTH}px;
`;

export default ContentsSelector;
