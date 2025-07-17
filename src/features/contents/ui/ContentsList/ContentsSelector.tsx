import { Contents } from 'entities/contents/model';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ContentItemEdit from '../ContentItem/ContentItemEdit';
import { CONTENT_ITEM_GAP } from '../constants';
import { Header, Wrapper } from './ContentsList.stye';

interface Props {
  title: string;
  contents: Contents[];
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${CONTENT_ITEM_GAP}px;
  width: 100%;
`;

export default ContentsSelector;
