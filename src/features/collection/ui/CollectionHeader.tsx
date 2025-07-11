import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from 'shared/ui';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';
import {
  CollectionWrapper,
  Description,
  Menu,
  MenuButton,
  MoreButton,
  MoreButtonWrapper,
} from '../style/CollectionPage.style';

export const CollectionHeader = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const { data } = useGetCollectionDetail(numericId);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <CollectionWrapper>
        <Title as="h1" size="xlarge">
          {data?.title}
        </Title>

        <MoreButtonWrapper>
          <MoreButton onClick={handleToggle}>
            <EllipsisVertical />
          </MoreButton>

          {menuOpen && (
            <Menu>
              <MenuButton onClick={() => navigate(`/collection/${id}/modify`)}>
                컬렉션 보드 수정
              </MenuButton>
              <MenuButton
                onClick={() => navigate(`/collection/${id}/content-modify`)}
              >
                컬렉션 콘텐츠 수정
              </MenuButton>
            </Menu>
          )}
        </MoreButtonWrapper>
      </CollectionWrapper>
      <Description>{data?.description}</Description>
    </>
  );
};
