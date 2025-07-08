import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Title } from 'shared/ui';
import { useGetCollectionDetail } from '../hooks/useGetCollectionDetail';
import {
  Description,
  Menu,
  MenuButton,
  MoreButton,
  Wrapper,
} from './CollectionHeader.style';

interface CollectionHeaderProps {
  showMoreButton?: boolean;
}

export const CollectionHeader = ({
  showMoreButton = true,
}: CollectionHeaderProps) => {
  const { id } = useParams();
  const numericId = Number(id);
  const { data, isPending } = useGetCollectionDetail(numericId);
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      <Wrapper>
        <Title as="h1" size="xlarge">
          {data?.title}
        </Title>
        {showMoreButton && (
          <>
            <MoreButton onClick={handleToggle}>
              <EllipsisVertical />
            </MoreButton>
            {open && (
              <Menu>
                <MenuButton>컬렉션 보드 수정</MenuButton>
                <MenuButton>컬렉션 콘텐츠 수정</MenuButton>
              </Menu>
            )}
          </>
        )}
      </Wrapper>
      <Description>{data?.description}</Description>
    </>
  );
};
