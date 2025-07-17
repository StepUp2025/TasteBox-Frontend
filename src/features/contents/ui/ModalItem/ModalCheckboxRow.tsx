import { useRemoveCollectionContents } from 'features/collection/hooks/useRemoveCollectionContents';
import { toast } from 'sonner';
import styled from 'styled-components';

interface RowProps {
  col: any;
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  contentId: number;
  addToCollections: (collectionId: number, options?: any) => void;
}

export default function CollectionCheckboxRow({
  col,
  selectedIds,
  setSelectedIds,
  contentId,
  addToCollections,
}: RowProps) {
  const { mutate: remove } = useRemoveCollectionContents(col.id);

  const isAlreadyChecked = Array.isArray(col.contents)
    ? col.contents.some((c: any) => c.id === contentId)
    : Array.isArray(col.contentIds)
      ? col.contentIds.includes(contentId)
      : false;

  // 체크박스 토글 처리
  const handleToggle = () => {
    if (isAlreadyChecked) return;
    if (selectedIds.includes(col.id)) {
      setSelectedIds(selectedIds.filter((id) => id !== col.id));
      remove([contentId], {
        onSuccess: () => toast.success('컬렉션에서 콘텐츠가 삭제되었습니다!'),
        onError: () => toast.error('삭제에 실패했습니다!'),
      });
    } else {
      setSelectedIds([...selectedIds, col.id]);
      addToCollections(col.id, {
        onSuccess: () => toast.success('컬렉션에 추가되었습니다!'),
        onError: () => toast.error('추가에 실패했습니다!'),
      });
    }
  };

  return (
    <Label>
      <CheckBox
        type="checkbox"
        checked={isAlreadyChecked || selectedIds.includes(col.id)}
        disabled={isAlreadyChecked}
        onChange={handleToggle}
      />
      {col.title}
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: ${({ theme }) => theme.fontSize.large};
  cursor: pointer;
  
`;
const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
