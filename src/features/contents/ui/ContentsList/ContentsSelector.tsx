import { CollectionContent } from 'entities/collection';
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
  contents: CollectionContent[];
  selectedContents: number[];
  setter: Dispatch<SetStateAction<number[]>>;
}

const ContentsSelector = ({
  title,
  contents,
  selectedContents = [],
  setter,
}: Props) => {
  const toggleContent = (id: number, checked: boolean) => {
    setter((prev) =>
      checked ? [...prev, id] : prev.filter((contentId) => contentId !== id),
    );
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
            checked={selectedContents.includes(item.id)}
            onCheck={toggleContent}
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
