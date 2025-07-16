import { useGetCollectionList } from 'features/collection/hooks/useGetCollectionList';
import styled from 'styled-components';

interface ModalItemProps {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
}

export default function ModalItem({
  selectedIds,
  setSelectedIds,
}: ModalItemProps) {
  const { data, isPending } = useGetCollectionList();

  const handleToggle = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (isPending) return <div>목록 불러오는 중...</div>;
  if (!data || !data.collections.length)
    return <div>콜렉션을 추가해주세요.</div>;

  return (
    <Container>
      <CollectionList>
        {data.collections.map((col) => (
          <Label key={col.id}>
            <CheckBox
              type="checkbox"
              checked={selectedIds.includes(col.id)}
              onChange={() => handleToggle(col.id)}
            />
            {col.title}
          </Label>
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

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: ${({ theme }) => theme.fontSize.medium};
  cursor: pointer;
`;

const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  accent-color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;
