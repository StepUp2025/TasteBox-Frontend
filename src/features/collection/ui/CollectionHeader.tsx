import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from 'shared/ui';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';
import {
  Description,
  Menu,
  MenuButton,
  MoreButton,
  MoreButtonWrapper,
  Wrapper,
} from './CollectionHeader.style';

interface CollectionHeaderProps {
  isEditMode?: boolean;
  onToggleEditMode?: (edit: boolean) => void;
}

export const CollectionHeader = ({
  isEditMode = false,
  onToggleEditMode,
}: CollectionHeaderProps) => {
  const { id } = useParams();
  const numericId = Number(id);
  const { data } = useGetCollectionDetail(numericId);

  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(isEditMode);

  const navigate = useNavigate();

  const handleToggle = () => setMenuOpen((prev) => !prev);

  const handleToggleEdit = () => {
    const newMode = !editMode;
    setEditMode(newMode);
    onToggleEditMode?.(newMode);
    setMenuOpen(false);
  };

  return (
    <>
      <Wrapper>
        <Title as="h1" size="xlarge">
          {data?.title}
        </Title>

        {!editMode && (
          <MoreButtonWrapper>
            <MoreButton onClick={handleToggle}>
              <EllipsisVertical />
            </MoreButton>

            {menuOpen && (
              <Menu>
                <MenuButton
                  onClick={() => navigate(`/collection/${id}/modify`)}
                >
                  컬렉션 보드 수정
                </MenuButton>
                <MenuButton onClick={handleToggleEdit}>
                  컬렉션 콘텐츠 수정
                </MenuButton>
              </Menu>
            )}
          </MoreButtonWrapper>
        )}
      </Wrapper>
      <Description>{data?.description}</Description>
    </>
  );
};
