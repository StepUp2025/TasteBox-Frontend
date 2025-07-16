import { useGetCollectionList } from 'features/collection/hooks/useGetCollectionList';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ErrorBox, Title } from 'shared/ui';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import {
  AddButton,
  CollectionCardList,
  CollectionListHeader,
  CollectionListStyle,
  IconAlign,
} from './Collection.style';
import CollectionCardItem from './CollectionCardItem';

const CollectionList = () => {
  const navigate = useNavigate();
  const { data, isPending } = useGetCollectionList();
  if (isPending) return <Loading />;
  if (!data) return <ErrorBox errorMessage="컬렉션을 불러오지 못했습니다" />;

  const { collections } = data;
  return (
    <CollectionListStyle>
      <CollectionListHeader>
        <Title>내 컬렉션</Title>
        <AddButton
          onClick={() => {
            navigate('/collection/create');
          }}
        >
          <IconAlign>
            <Plus />
          </IconAlign>
          컬렉션 생성하기
        </AddButton>
      </CollectionListHeader>

      {collections.length === 0 ? (
        <Empty text="컬렉션이 없습니다. 컬렉션을 생성해보세요." />
      ) : (
        <CollectionCardList>
          {collections.map((c) => (
            <CollectionCardItem key={c.id} collection={c} />
          ))}
        </CollectionCardList>
      )}
    </CollectionListStyle>
  );
};

export default CollectionList;
