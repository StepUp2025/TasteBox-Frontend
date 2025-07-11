import { useGetCollectionList } from 'features/collection/hooks/useGetCollectionList';
import { ErrorBox } from 'shared/ui';
import { Empty } from 'shared/ui/empty/empty';
import Loading from 'shared/ui/Loading/Loading';
import styled from 'styled-components';
import CollectionCardItem from './CollectionCardItem';
import ProfileWidgetHeader from './ProfileWidgetHeader';

const UserCollectionList = () => {
  const { data, isPending } = useGetCollectionList();
  if (isPending) return <Loading />;
  if (!data) return <ErrorBox errorMessage="컬렉션을 불러오지 못했습니다" />;

  const { collections } = data;
  return (
    <UserCollectionListStyle>
      <ProfileWidgetHeader
        title="내가 추가한 컬렉션"
        linkTo="/collection"
        linkText="컬렉션 생성하기"
      />

      {collections.length === 0 ? (
        <Empty text="콜렉션이 없습니다" />
      ) : (
        <div className="collection-list">
          {collections.map((c) => (
            <CollectionCardItem key={c.id} collection={c} />
          ))}
        </div>
      )}
    </UserCollectionListStyle>
  );
};

const UserCollectionListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .collection-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
    width: 100%;
    width: 800px;
    margin-top: 24px;
  }
`;

export default UserCollectionList;
