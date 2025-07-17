import { useGetCollectionList } from 'features/collection/hooks/useGetCollectionList';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import CollectionCheckboxRow from './ModalCheckboxRow';

export interface ModalItemProps {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  contentId: number;
  addToCollections: (collectionId: number, options?: any) => void;
}

export default function ModalItem({
  selectedIds,
  setSelectedIds,
  contentId,
  addToCollections,
}: ModalItemProps) {
  const { data, isPending } = useGetCollectionList();

  if (isPending) return <Loading />;
  if (!data || !data.collections.length)
    return <CollectionEmpty>컬렉션을 생성해주세요!</CollectionEmpty>;

  return (
    <Container>
      <CollectionList>
        {data.collections.map((col) => (
          <CollectionCheckboxRow
            key={col.id}
            col={col}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            contentId={contentId}
            addToCollections={addToCollections}
          />
        ))}
      </CollectionList>
    </Container>
  );
}
const Container = styled.div`
  padding: 24px 0 12px 0;
`;

const CollectionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
`;

const CollectionEmpty = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 500;
`;
