import { useAddCollectionContents } from 'features/collection/hooks/useAddCollectionContents';
import { useGetCollectionList } from 'features/collection/hooks/useGetCollectionList';
import { useRemoveCollectionContents } from 'features/collection/hooks/useRemoveCollectionContents';
import { useEffect, useState } from 'react';
import { Modal } from 'shared/ui';
import { toast } from 'sonner';
import styled from 'styled-components';

interface Props {
  contentId: number;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CollectionContentsModifyModal({
  contentId,
  open,
  onClose,
  onConfirm,
}: Props) {
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<number[]>(
    [],
  );

  const { data: collectionListData, refetch } = useGetCollectionList();
  const collections = collectionListData?.collections || [];

  const { mutate: addToCollections } = useAddCollectionContents(contentId);
  const { mutate: removeFromCollections } = useRemoveCollectionContents();

  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  useEffect(() => {
    if (!open || !collections.length || !contentId) return;

    const alreadyAdded = collections
      .filter(
        (col) =>
          Array.isArray(col.contents) &&
          col.contents.some((c) => c === contentId),
      )
      .map((col) => col.id);

    setSelectedCollectionIds(alreadyAdded);
  }, [open, collections, contentId]);

  const handleToggle = (collectionId: number) => {
    const isSelected = selectedCollectionIds.includes(collectionId);

    if (isSelected) {
      setSelectedCollectionIds((prev) =>
        prev.filter((id) => id !== collectionId),
      );
      removeFromCollections(
        { collectionId, contentIds: [contentId] },
        {
          onSuccess: () => toast.success('컬렉션에서 삭제되었습니다!'),
          onError: () => toast.error('삭제에 실패했습니다!'),
        },
      );
    } else {
      setSelectedCollectionIds((prev) => [...prev, collectionId]);
      addToCollections(collectionId, {
        onSuccess: () => toast.success('컬렉션에 추가되었습니다!'),
        onError: () => toast.error('추가에 실패했습니다!'),
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="컬렉션에 추가"
      confirmText="새 컬렉션 만들기"
      confirmType="button"
      onConfirm={onConfirm}
    >
      <Container>
        {collections.length === 0 ? (
          <CollectionEmpty>
            아직 컬렉션이 없습니다.
            <br />
            먼저 새 컬렉션을 만들어 주세요!
          </CollectionEmpty>
        ) : (
          <CollectionList>
            {collections.map((col) => (
              <Label key={col.id}>
                <CheckBox
                  type="checkbox"
                  checked={selectedCollectionIds.includes(col.id)}
                  onChange={() => handleToggle(col.id)}
                />
                {col.title}
              </Label>
            ))}
          </CollectionList>
        )}
      </Container>
    </Modal>
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
