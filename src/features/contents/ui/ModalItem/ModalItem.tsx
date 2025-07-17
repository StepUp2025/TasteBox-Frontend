import { useGetCollectionList } from 'features/collection/hooks/useGetCollectionList';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';

export interface ModalItemProps {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  contentId: number;
}

// ModalItem.tsx
export default function ModalItem({
  selectedIds,
  setSelectedIds,
  contentId,
}: ModalItemProps & { contentId: number }) {
  const { data, isPending } = useGetCollectionList();

  const isAlreadyChecked = (col: any) =>
    col.contentIds ? col.contentIds.includes(contentId) : col.hasContent;

  const handleToggle = (id: number, already: boolean) => {
    if (already) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (isPending) return <Loading />;
  if (!data || !data.collections.length)
    return <CollectionEmpty> 컬렉션을 생성해주세요!</CollectionEmpty>;

  return (
    <Container>
      <CollectionList>
        {data.collections.map((col) => {
          const already = isAlreadyChecked(col);
          return (
            <Label key={col.id}>
              <CheckBox
                type="checkbox"
                checked={already || selectedIds.includes(col.id)}
                disabled={already}
                onChange={() => handleToggle(col.id, already)}
              />
              {col.title}
              {already && (
                <span style={{ color: 'primary', fontSize: 12 }}>
                  (이미 저장됨)
                </span>
              )}
            </Label>
          );
        })}
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

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: ${({ theme }) => theme.fontSize.small};
  cursor: pointer;
`;

const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const CollectionEmpty = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 500;
`;
